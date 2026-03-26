const Joi = require('joi');
const { WORKFLOW_NODE_TYPES } = require('../../shared/constants');

const nodeSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string()
    .valid(...Object.values(WORKFLOW_NODE_TYPES))
    .required(),
  position: Joi.object({
    x: Joi.number().required(),
    y: Joi.number().required(),
  }).required(),
  data: Joi.object().unknown(true).default({}),
});

const edgeSchema = Joi.object({
  id: Joi.string().required(),
  source: Joi.string().required(),
  target: Joi.string().required(),
  sourceHandle: Joi.string().allow(null, ''),
  targetHandle: Joi.string().allow(null, ''),
});

const workflowSchema = Joi.object({
  name: Joi.string().trim().min(2).max(120).required(),
  description: Joi.string().allow('').max(500).default(''),
  nodes: Joi.array().items(nodeSchema).min(1).required(),
  edges: Joi.array().items(edgeSchema).required(),
  createdBy: Joi.string().trim().min(2).max(120).required(),
});

const executionSchema = Joi.object({
  workflowId: Joi.string().required(),
  input: Joi.object().unknown(true).default({}),
});

module.exports = {
  workflowSchema,
  executionSchema,
};
