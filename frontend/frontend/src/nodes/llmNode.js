import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, selected }) => {
  return (
    <div>
      <Handle 
        type="target" 
        position={Position.Left} 
        id={`${id}-system`} 
        style={{top: '33%'}} 
        className="w-3 h-3 !bg-orange-500 border-2 border-orange-700 hover:!bg-orange-400 hover:!shadow-lg hover:!shadow-orange-500/50 transition-all" 
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id={`${id}-prompt`} 
        style={{top: '66%'}} 
        className="w-3 h-3 !bg-orange-500 border-2 border-orange-700 hover:!bg-orange-400 hover:!shadow-lg hover:!shadow-orange-500/50 transition-all" 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id={`${id}-response`} 
        className="w-3 h-3 !bg-blue-500 border-2 border-blue-700 !top-1/2 hover:!bg-blue-400 hover:!shadow-lg hover:!shadow-blue-500/50 transition-all" 
      />
      <BaseNode label="LLM" selected={selected}>
        <div className="text-xs text-slate-400 italic py-1">
          This is an LLM node.
        </div>
      </BaseNode>
    </div>
  );
}