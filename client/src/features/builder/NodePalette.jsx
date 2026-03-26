import { createNodeTemplate } from '../../utils/workflow';

const palette = [
  { type: 'INPUT', label: 'Input', description: 'Inject request input into the graph.' },
  { type: 'TRANSFORM', label: 'Transform', description: 'Format, merge, or reshape data.' },
  { type: 'AI', label: 'AI', description: 'Send a dynamic prompt to OpenAI.' },
  { type: 'OUTPUT', label: 'Output', description: 'Return the final workflow result.' },
];

function NodePalette() {
  const handleDragStart = (event, type) => {
    event.dataTransfer.setData(
      'application/abstractjs-node',
      JSON.stringify(createNodeTemplate(type))
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <section className="builder-panel">
      <div className="panel-heading">
        <p className="eyebrow">Palette</p>
        <h3>Node types</h3>
      </div>
      <div className="palette-grid">
        {palette.map((item) => (
          <button
            key={item.type}
            type="button"
            className="palette-item"
            draggable
            onDragStart={(event) => handleDragStart(event, item.type)}
          >
            <strong>{item.label}</strong>
            <span>{item.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default NodePalette;
