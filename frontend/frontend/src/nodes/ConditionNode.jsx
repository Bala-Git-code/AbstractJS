import { BaseNode } from "./BaseNode";
import { Handle, Position } from "reactflow";

const ConditionNode = ({ id, selected }) => (
  <div>
    <Handle type="target" position={Position.Left} id={`${id}-condition`} className="w-2 h-2 !bg-slate-500 border-2 border-slate-900" />
    <Handle type="source" position={Position.Right} id={`${id}-true`} style={{ top: '30%' }} className="w-2 h-2 !bg-slate-500 border-2 border-slate-900" />
    <Handle type="source" position={Position.Right} id={`${id}-false`} style={{ top: '70%' }} className="w-2 h-2 !bg-slate-500 border-2 border-slate-900" />
    <BaseNode label="Condition" selected={selected}>
      <div className="flex flex-col gap-2 py-1">
         <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
            <span>False</span>
            <span>True</span>
         </div>
         <p className="text-xs text-slate-400 italic text-center border border-slate-800 rounded py-1">If / Else</p>
      </div>
    </BaseNode>
  </div>
);

export default ConditionNode;