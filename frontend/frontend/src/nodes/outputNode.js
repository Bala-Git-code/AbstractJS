import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode, nodeInputStyles, nodeLabelStyles } from './BaseNode';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <div>
      <Handle 
        type="target" 
        position={Position.Left} 
        id={`${id}-value`} 
        className="w-3 h-3 !bg-purple-500 border-2 border-purple-700 !top-1/2 hover:!bg-purple-400 hover:!shadow-lg hover:!shadow-purple-500/50 transition-all" 
      />
      <BaseNode label="Output" selected={selected}>
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
    </div>
  );
}