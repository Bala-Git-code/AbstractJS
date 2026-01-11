import { BaseNode } from "./BaseNode";
import { Handle, Position } from "reactflow";

const DelayNode = ({ id, selected }) => (
  <div>
    <Handle type="target" position={Position.Left} id={`${id}-in`} className="w-2 h-2 !bg-slate-500 border-2 border-slate-900" />
    <Handle type="source" position={Position.Right} id={`${id}-out`} className="w-2 h-2 !bg-slate-500 border-2 border-slate-900" />
    <BaseNode label="Delay" selected={selected}>
      <p className="text-xs text-slate-400">Delay execution of the workflow.</p>
    </BaseNode>
  </div>
);

export default DelayNode;