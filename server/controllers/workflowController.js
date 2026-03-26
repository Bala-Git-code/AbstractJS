const asyncHandler = require('../middleware/asyncHandler');
const workflowService = require('../services/workflowService');

const createWorkflow = asyncHandler(async (req, res) => {
  const workflow = await workflowService.createWorkflow(req.body);
  res.status(201).json(workflow);
});

const listWorkflows = asyncHandler(async (req, res) => {
  const workflows = await workflowService.listWorkflows();
  res.json(workflows);
});

const getWorkflow = asyncHandler(async (req, res) => {
  const workflow = await workflowService.getWorkflowById(req.params.id);
  res.json(workflow);
});

const updateWorkflow = asyncHandler(async (req, res) => {
  const workflow = await workflowService.updateWorkflow(req.params.id, req.body);
  res.json(workflow);
});

const deleteWorkflow = asyncHandler(async (req, res) => {
  await workflowService.deleteWorkflow(req.params.id);
  res.status(204).send();
});

module.exports = {
  createWorkflow,
  listWorkflows,
  getWorkflow,
  updateWorkflow,
  deleteWorkflow,
};
