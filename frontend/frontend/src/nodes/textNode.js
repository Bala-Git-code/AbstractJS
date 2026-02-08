import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { BaseNode, nodeInputStyles, nodeLabelStyles } from './BaseNode';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const variables = useMemo(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [...currText.matchAll(regex)];
    return [...new Set(matches.map(match => match[1]))];
  }, [currText]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  return (
    <BaseNode label="Text" selected={selected}>
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
            style={{ top: `${topPosition}%`, left: '-5px' }}
          />
        );
      })}

      <div className="flex flex-col">
        <label className={nodeLabelStyles}>Content</label>
        <textarea
          ref={textareaRef}
          className={`${nodeInputStyles} resize-none overflow-hidden min-h-[40px]`}
          style={{ fontFamily: 'inherit' }}
          value={currText}
          onChange={handleTextChange}
          rows={1}
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%', right: '-5px' }}
      />
    </BaseNode>
  );
};