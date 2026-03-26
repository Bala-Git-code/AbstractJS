import { Handle, Position } from '@xyflow/react';

function NodeFrame({ title, accent, children }) {
  return (
    <div className="flow-node" style={{ '--accent': accent }}>
      <div className="flow-node-header">
        <span className="flow-node-dot" />
        <strong>{title}</strong>
      </div>
      <div className="flow-node-body">{children}</div>
    </div>
  );
}

export function InputNode({ data }) {
  return (
    <NodeFrame title="Input" accent="#68d391">
      <Handle type="source" position={Position.Right} />
      <p>{data.label || 'Input node'}</p>
      <small>Key: {data.key || 'input'}</small>
    </NodeFrame>
  );
}

export function TransformNode({ data }) {
  return (
    <NodeFrame title="Transform" accent="#f6ad55">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <p>{data.label || 'Transform node'}</p>
      <small>{data.mode === 'merge' ? 'Merge upstream data' : 'Template transform'}</small>
    </NodeFrame>
  );
}

export function AiNode({ data }) {
  return (
    <NodeFrame title="AI" accent="#63b3ed">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <p>{data.label || 'AI node'}</p>
      <small>Model: {data.model || 'default'}</small>
    </NodeFrame>
  );
}

export function OutputNode({ data }) {
  return (
    <NodeFrame title="Output" accent="#fc8181">
      <Handle type="target" position={Position.Left} />
      <p>{data.label || 'Output node'}</p>
      <small>Strategy: {data.strategy || 'collect'}</small>
    </NodeFrame>
  );
}

export const workflowNodeTypes = {
  INPUT: InputNode,
  TRANSFORM: TransformNode,
  AI: AiNode,
  OUTPUT: OutputNode,
};
