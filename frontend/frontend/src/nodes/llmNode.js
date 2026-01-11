import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, selected }) => {
  return (
    <BaseNode label="LLM" selected={selected}>
      <Handle 
        type="target" 
        position={Position.Left} 
        id={`${id}-system`} 
        style={{top: '33%'}} 
        className="w-2 h-2 !bg-slate-500 border-2 border-slate-900" 
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id={`${id}-prompt`} 
        style={{top: '66%'}} 
        className="w-2 h-2 !bg-slate-500 border-2 border-slate-900" 
      />
      <div className="text-xs text-slate-400 italic py-1">
        This is an LLM node.
      </div>
      <Handle 
        type="source" 
        position={Position.Right} 
        id={`${id}-response`} 
        className="w-2 h-2 !bg-slate-500 border-2 border-slate-900" 
      />
    </BaseNode>
  );
}