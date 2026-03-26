const mongoose = require('mongoose');

const workflowNodeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    position: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { _id: false }
);

const workflowEdgeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    source: { type: String, required: true },
    target: { type: String, required: true },
    sourceHandle: { type: String, default: null },
    targetHandle: { type: String, default: null },
  },
  { _id: false }
);

const workflowSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    nodes: { type: [workflowNodeSchema], default: [] },
    edges: { type: [workflowEdgeSchema], default: [] },
    createdBy: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workflow', workflowSchema);
