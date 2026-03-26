const WORKFLOW_NODE_TYPES = {
  INPUT: 'INPUT',
  TRANSFORM: 'TRANSFORM',
  AI: 'AI',
  OUTPUT: 'OUTPUT',
};

const EXECUTION_STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

module.exports = {
  WORKFLOW_NODE_TYPES,
  EXECUTION_STATUS,
};
