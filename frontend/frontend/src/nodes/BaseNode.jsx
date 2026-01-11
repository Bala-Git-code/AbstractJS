
import { twMerge } from 'tailwind-merge';


export const nodeInputStyles = "w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50 nodrag";
export const nodeLabelStyles = "block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1";

export const BaseNode = ({ label, children, selected }) => (
  <div className={twMerge(
    "relative flex flex-col min-w-[200px] bg-slate-900 border rounded-lg shadow-xl transition-all",
    selected ? "border-blue-500 ring-1 ring-blue-500/20" : "border-slate-700"
  )}>
    {/* Header */}
    <div className="px-3 py-2 bg-slate-800/50 border-b border-slate-700 rounded-t-lg">
      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-tight">{label}</span>
    </div>
    
    {/* Body */}
    <div className="p-3 flex flex-col gap-3">
      {children}
    </div>
  </div>
);