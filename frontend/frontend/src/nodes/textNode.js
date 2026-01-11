import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode, nodeInputStyles, nodeLabelStyles } from './BaseNode';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  // Extract variables from the text in the format {{variableName}}
  useEffect(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [...currText.matchAll(regex)];
    const vars = [...new Set(matches.map(match => match[1]))];
    setVariables(vars);
  }, [currText]);

  return (
    <BaseNode label="Text" selected={selected}>
      
      {/* Dynamic input handles (LEFT side) */}
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: 40 + index * 20 }}
          className="w-2 h-2 !bg-slate-500 border-2 border-slate-900"
        />
      ))}

      <div>
        <label className={nodeLabelStyles}>Content</label>
        <textarea
          ref={textareaRef}
          className={nodeInputStyles + ' resize-none'}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={1}
        />
      </div>

      {/* Output handle (RIGHT side) */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="w-2 h-2 !bg-slate-500 border-2 border-slate-900"
      />
    </BaseNode>
  );
};
