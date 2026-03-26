const mongoose = require('mongoose');
const { EXECUTION_STATUS } = require('../../shared/constants');

const executionLogSchema = new mongoose.Schema(
  {
    level: { type: String, enum: ['info', 'error'], default: 'info' },
    message: { type: String, required: true },
    nodeId: { type: String, default: null },
    timestamp: { type: Date, default: Date.now },
    details: { type: mongoose.Schema.Types.Mixed, default: undefined },
  },
  { _id: false }
);

const executionSchema = new mongoose.Schema(
  {
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workflow',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(EXECUTION_STATUS),
      default: EXECUTION_STATUS.PENDING,
    },
    input: { type: mongoose.Schema.Types.Mixed, default: {} },
    logs: { type: [executionLogSchema], default: [] },
    result: { type: mongoose.Schema.Types.Mixed, default: null },
    error: { type: String, default: null },
    executionTime: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Execution', executionSchema);
