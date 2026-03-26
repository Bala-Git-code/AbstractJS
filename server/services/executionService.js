const Execution = require('../models/Execution');
const Workflow = require('../models/Workflow');
const { EXECUTION_STATUS } = require('../../shared/constants');
const { runWorkflow } = require('../engine/workflowEngine');
const appError = require('../utils/appError');

async function createExecution(workflowId, input) {
  const workflow = await Workflow.findById(workflowId).lean();
  if (!workflow) {
    throw appError('Workflow not found.', 404);
  }

  const execution = await Execution.create({
    workflowId,
    status: EXECUTION_STATUS.RUNNING,
    input,
    logs: [
      {
        level: 'info',
        message: 'Workflow execution started.',
      },
    ],
  });

  try {
    const { logs, result, executionTime } = await runWorkflow(workflow, input);
    execution.status = EXECUTION_STATUS.COMPLETED;
    execution.logs = [...execution.logs, ...logs];
    execution.result = result;
    execution.executionTime = executionTime;
    await execution.save();
  } catch (error) {
    execution.status = EXECUTION_STATUS.FAILED;
    execution.logs = [...execution.logs, ...(error.logs || [])];
    execution.error = error.message;
    execution.executionTime = execution.executionTime || 0;
    await execution.save();
  }

  return Execution.findById(execution._id).populate('workflowId').lean();
}

async function getExecutionById(id) {
  const execution = await Execution.findById(id).populate('workflowId').lean();
  if (!execution) {
    throw appError('Execution not found.', 404);
  }
  return execution;
}

module.exports = {
  createExecution,
  getExecutionById,
};
