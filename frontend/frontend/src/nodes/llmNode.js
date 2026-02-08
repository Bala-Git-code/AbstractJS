import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, selected }) => {
  return (
    <BaseNode label="LLM" selected={selected}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: '33%', left: '-5px' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: '66%', left: '-5px' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        style={{ top: '50%', right: '-5px' }}
      />
      <div style={{ fontSize: '12px', color: '#e6e6e6', fontStyle: 'italic', padding: '4px 0' }}>
        This is an LLM node.
      </div>
    </BaseNode>
  );
}