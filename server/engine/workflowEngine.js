const { performance } = require('perf_hooks');
const { topologicalSort } = require('../utils/graph');
const { WORKFLOW_NODE_TYPES } = require('../../shared/constants');
const { generateStructuredResponse } = require('../services/aiService');
const appError = require('../utils/appError');

function indexEdges(edges) {
  const incoming = new Map();

  edges.forEach((edge) => {
    if (!incoming.has(edge.target)) {
      incoming.set(edge.target, []);
    }
    incoming.get(edge.target).push(edge);
  });

  return incoming;
}

function mapNodeResults(nodeIds, results) {
  return nodeIds.reduce((acc, nodeId) => {
    acc[nodeId] = results[nodeId];
    return acc;
  }, {});
}

async function executeInputNode(node, context) {
  const key = node.data?.key || node.data?.label || node.id;
  const fallbackValue = node.data?.defaultValue ?? '';
  return context.input[key] ?? fallbackValue;
}

async function executeTransformNode(node, context) {
  const template = node.data?.template || '';
  const mode = node.data?.mode || 'template';
  const inputValues = context.upstreamValues;

  if (mode === 'merge') {
    return {
      ...context.previousResult,
      ...inputValues,
    };
  }

  return template.replace(/\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g, (_, token) => {
    return inputValues[token] ?? context.allResults[token] ?? '';
  });
}

async function executeAiNode(node, context) {
  const template = node.data?.prompt || '';
  const systemPrompt = node.data?.systemPrompt || '';
  const hydratedPrompt = template.replace(/\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g, (_, token) => {
    return context.upstreamValues[token] ?? context.allResults[token] ?? '';
  });

  return generateStructuredResponse({
    prompt: hydratedPrompt,
    systemPrompt,
    model: node.data?.model,
  });
}

async function executeOutputNode(node, context) {
  const strategy = node.data?.strategy || 'collect';
  if (strategy === 'json') {
    return {
      label: node.data?.label || node.id,
      value: context.upstreamValues,
    };
  }
  return context.previousResult ?? context.upstreamValues;
}

async function executeNode(node, context) {
  switch (node.type) {
    case WORKFLOW_NODE_TYPES.INPUT:
      return executeInputNode(node, context);
    case WORKFLOW_NODE_TYPES.TRANSFORM:
      return executeTransformNode(node, context);
    case WORKFLOW_NODE_TYPES.AI:
      return executeAiNode(node, context);
    case WORKFLOW_NODE_TYPES.OUTPUT:
      return executeOutputNode(node, context);
    default:
      throw appError(`Unsupported node type: ${node.type}`, 400);
  }
}

async function runWorkflow(workflow, input = {}) {
  if (!workflow.nodes.length) {
    throw appError('Workflow must contain at least one node.', 400);
  }

  const orderedNodeIds = topologicalSort(workflow.nodes, workflow.edges);
  const nodesById = new Map(workflow.nodes.map((node) => [node.id, node]));
  const incomingEdges = indexEdges(workflow.edges);
  const results = {};
  const logs = [];
  const startedAt = performance.now();

  for (const nodeId of orderedNodeIds) {
    const node = nodesById.get(nodeId);
    const dependencies = incomingEdges.get(nodeId) || [];
    const upstreamValues = {};

    dependencies.forEach((edge) => {
      upstreamValues[edge.sourceHandle || edge.source] = results[edge.source];
    });

    logs.push({
      level: 'info',
      nodeId,
      message: `Executing ${node.type} node.`,
      details: { dependencies: dependencies.map((edge) => edge.source) },
    });

    try {
      const result = await executeNode(node, {
        input,
        previousResult:
          dependencies.length > 0 ? results[dependencies[dependencies.length - 1].source] : null,
        upstreamValues,
        allResults: results,
      });
      results[nodeId] = result;
      logs.push({
        level: 'info',
        nodeId,
        message: 'Node execution completed.',
        details: { result },
      });
    } catch (error) {
      logs.push({
        level: 'error',
        nodeId,
        message: error.message,
      });
      error.logs = logs;
      throw error;
    }
  }

  const outputNodes = workflow.nodes.filter((node) => node.type === WORKFLOW_NODE_TYPES.OUTPUT);
  const result = outputNodes.length
    ? mapNodeResults(outputNodes.map((node) => node.id), results)
    : mapNodeResults(orderedNodeIds, results);

  return {
    logs,
    result,
    executionTime: Math.round(performance.now() - startedAt),
  };
}

module.exports = {
  runWorkflow,
};
