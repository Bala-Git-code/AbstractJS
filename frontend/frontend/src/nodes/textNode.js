import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store'; 
import { BaseNode, nodeInputStyles, nodeLabelStyles } from './BaseNode';

export const TextNode = ({ id, data, selected }) => {
  // Use store data as initial state
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  
  // Access the update function from your Zustand store
  const updateNodeField = useStore((state) => state.updateNodeField);

  // useMemo prevents handles from flickering/disappearing while typing
  const variables = useMemo(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [...currText.matchAll(regex)];
    return [...new Set(matches.map(match => match[1]))];
  }, [currText]);

  // Sync local text change to the global store immediately
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText);
  };

  // Auto-resize the textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  return (
    <div className="relative"> 
      {/* Dynamic Input Handles (Left Side) */}
      {variables.map((variable, index) => {
        const topPosition = variables.length === 1 
          ? 50 
          : (index * (100 / (variables.length - 1)));

        return (
          <Handle
            key={`${id}-${variable}`}
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            style={{ 
              top: `${topPosition}%`, 
              left: '-8px', 
            }}
            className="w-4 h-4 !bg-green-500 border-2 border-slate-900 hover:!bg-green-400 z-50 pointer-events-auto"
          />
        );
      })}

      <BaseNode label="Text" selected={selected}>
        <div className="flex flex-col">
          <label className={nodeLabelStyles}>Content</label>
          <textarea
            ref={textareaRef}
            className={`${nodeInputStyles} resize-none overflow-hidden min-h-[40px]`}
            value={currText}
            onChange={handleTextChange}
            rows={1}
          />
        </div>
      </BaseNode>

      {/* Output Handle (Right Side) */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%', right: '-8px' }}
        className="w-4 h-4 !bg-blue-500 border-2 border-slate-900 hover:!bg-blue-400 z-50 pointer-events-auto"
      />
    </div>
  );
};