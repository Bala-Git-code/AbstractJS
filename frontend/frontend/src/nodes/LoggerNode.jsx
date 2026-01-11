import { BaseNode } from "./BaseNode";
import { Handle, Position } from "reactflow";

const LoggerNode = ({ id, selected }) => (
  <div>
    <Handle
      type="target"
      position={Position.Left}
      id={`${id}-input`}
      className="w-2 h-2 !bg-slate-500 border-2 border-slate-900"
    />
    <BaseNode label="Logger" selected={selected}>
      <p className="text-xs text-slate-400">
        Logs the incoming value to the console.
      </p>
    </BaseNode>
  </div>
);

export default LoggerNode;
