const asyncHandler = require('../middleware/asyncHandler');
const executionService = require('../services/executionService');

const runWorkflow = asyncHandler(async (req, res) => {
  const execution = await executionService.createExecution(
    req.body.workflowId,
    req.body.input || {}
  );
  res.status(201).json(execution);
});

const getExecution = asyncHandler(async (req, res) => {
  const execution = await executionService.getExecutionById(req.params.id);
  res.json(execution);
});

module.exports = {
  runWorkflow,
  getExecution,
};
