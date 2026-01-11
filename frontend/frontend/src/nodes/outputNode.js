import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode, nodeInputStyles, nodeLabelStyles } from './BaseNode';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode label="Output" selected={selected}>
      <Handle 
        type="target" 
        position={Position.Left} 
        id={`${id}-value`} 
        className="w-2 h-2 !bg-slate-500 border-2 border-slate-900" 
      />
      <div>
        <label className={nodeLabelStyles}>Name</label>
        <input 
          type="text" 
          className={nodeInputStyles} 
          value={currName} 
          onChange={(e) => setCurrName(e.target.value)} 
        />
      </div>
      <div>
        <label className={nodeLabelStyles}>Type</label>
        <select 
          className={nodeInputStyles} 
          value={outputType} 
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </BaseNode>
  );
}