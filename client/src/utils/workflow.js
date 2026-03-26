let nodeCounter = 0;
let edgeCounter = 0;

const defaultsByType = {
  INPUT: {
    label: 'Request Input',
    key: 'input',
    defaultValue: '',
  },
  TRANSFORM: {
    label: 'Transform',
    mode: 'template',
    template: '{{INPUT-1}}',
  },
  AI: {
    label: 'AI Prompt',
    model: '',
    systemPrompt: 'You are a helpful workflow assistant.',
    prompt: 'Summarize this context as JSON: {{TRANSFORM-1}}',
  },
  OUTPUT: {
    label: 'Result',
    strategy: 'collect',
  },
};

export function createInitialWorkflow() {
  return {
    _id: null,
    name: 'New Workflow',
    description: 'Describe what this workflow automates.',
    createdBy: 'Workspace Owner',
    nodes: [],
    edges: [],
  };
}

export function ensureWorkflowShape(workflow = {}) {
  return {
    ...createInitialWorkflow(),
    ...workflow,
    nodes: workflow.nodes || [],
    edges: workflow.edges || [],
  };
}

export function createNodeTemplate(type) {
  return {
    type,
    data: defaultsByType[type],
  };
}

export function createNodeInstance(type, position = { x: 80, y: 80 }) {
  nodeCounter += 1;
  return {
    id: `${type}-${nodeCounter}`,
    type,
    position,
    data: { ...defaultsByType[type] },
  };
}

export function createEdgeId(source, target) {
  edgeCounter += 1;
  return `edge-${source}-${target}-${edgeCounter}`;
}

export function parseJsonInput(text) {
  if (!text.trim()) {
    return {};
  }
  return JSON.parse(text);
}
