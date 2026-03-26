const Workflow = require('../models/Workflow');
const appError = require('../utils/appError');
const { topologicalSort } = require('../utils/graph');

async function validateWorkflowGraph(payload) {
  try {
    topologicalSort(payload.nodes, payload.edges);
  } catch (error) {
    throw appError(error.message, 400);
  }
}

async function createWorkflow(payload) {
  await validateWorkflowGraph(payload);
  return Workflow.create(payload);
}

async function listWorkflows() {
  return Workflow.find().sort({ updatedAt: -1 }).lean();
}

async function getWorkflowById(id) {
  const workflow = await Workflow.findById(id).lean();
  if (!workflow) {
    throw appError('Workflow not found.', 404);
  }
  return workflow;
}

async function updateWorkflow(id, payload) {
  await validateWorkflowGraph(payload);
  const workflow = await Workflow.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();
  if (!workflow) {
    throw appError('Workflow not found.', 404);
  }
  return workflow;
}

async function deleteWorkflow(id) {
  const workflow = await Workflow.findByIdAndDelete(id).lean();
  if (!workflow) {
    throw appError('Workflow not found.', 404);
  }
  return workflow;
}

module.exports = {
  createWorkflow,
  listWorkflows,
  getWorkflowById,
  updateWorkflow,
  deleteWorkflow,
};
