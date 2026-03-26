import { useMemo } from 'react';

const fieldDefinitions = {
  INPUT: [
    { key: 'label', label: 'Label' },
    { key: 'key', label: 'Input key' },
    { key: 'defaultValue', label: 'Default value', multiline: true },
  ],
  TRANSFORM: [
    { key: 'label', label: 'Label' },
    { key: 'mode', label: 'Mode', select: ['template', 'merge'] },
    { key: 'template', label: 'Template', multiline: true },
  ],
  AI: [
    { key: 'label', label: 'Label' },
    { key: 'model', label: 'Model' },
    { key: 'systemPrompt', label: 'System prompt', multiline: true },
    { key: 'prompt', label: 'Prompt', multiline: true },
  ],
  OUTPUT: [
    { key: 'label', label: 'Label' },
    { key: 'strategy', label: 'Strategy', select: ['collect', 'json'] },
  ],
};

function PropertyInspector({
  workflow,
  selectedNode,
  onWorkflowChange,
  onNodeDataChange,
  onDeleteNode,
}) {
  const fields = useMemo(
    () => (selectedNode ? fieldDefinitions[selectedNode.type] || [] : []),
    [selectedNode]
  );

  return (
    <section className="builder-panel">
      <div className="panel-heading">
        <p className="eyebrow">Inspector</p>
        <h3>{selectedNode ? selectedNode.type : 'Workflow'}</h3>
      </div>

      {!selectedNode ? (
        <div className="form-stack">
          <label>
            <span>Name</span>
            <input
              value={workflow.name}
              onChange={(event) => onWorkflowChange('name', event.target.value)}
              placeholder="Customer support intake"
            />
          </label>
          <label>
            <span>Description</span>
            <textarea
              value={workflow.description}
              onChange={(event) => onWorkflowChange('description', event.target.value)}
              rows={4}
            />
          </label>
          <label>
            <span>Created by</span>
            <input
              value={workflow.createdBy}
              onChange={(event) => onWorkflowChange('createdBy', event.target.value)}
              placeholder="Jane Doe"
            />
          </label>
        </div>
      ) : (
        <div className="form-stack">
          {fields.map((field) => (
            <label key={field.key}>
              <span>{field.label}</span>
              {field.select ? (
                <select
                  value={selectedNode.data?.[field.key] ?? field.select[0]}
                  onChange={(event) =>
                    onNodeDataChange(selectedNode.id, field.key, event.target.value)
                  }
                >
                  {field.select.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.multiline ? (
                <textarea
                  value={selectedNode.data?.[field.key] ?? ''}
                  onChange={(event) =>
                    onNodeDataChange(selectedNode.id, field.key, event.target.value)
                  }
                  rows={5}
                />
              ) : (
                <input
                  value={selectedNode.data?.[field.key] ?? ''}
                  onChange={(event) =>
                    onNodeDataChange(selectedNode.id, field.key, event.target.value)
                  }
                />
              )}
            </label>
          ))}
          <button className="danger-button" type="button" onClick={() => onDeleteNode(selectedNode.id)}>
            Remove node
          </button>
        </div>
      )}
    </section>
  );
}

export default PropertyInspector;
