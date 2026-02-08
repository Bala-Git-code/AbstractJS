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
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        style={{ top: '50%', right: '-5px' }}
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