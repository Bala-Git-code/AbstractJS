import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode, nodeInputStyles, nodeLabelStyles } from './BaseNode';

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode label="Input" selected={selected}>
      {/* Moving the Handle here ensures it calculates its 'right' 
          position relative to the BaseNode container. 
      */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        style={{ 
          top: '50%', 
          transform: 'translateY(-50%)',
          right: '-6px' // This ensures the circle sits exactly on the edge
        }}
        className="w-3 h-3 !bg-blue-500 border-2 border-blue-700"
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
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};