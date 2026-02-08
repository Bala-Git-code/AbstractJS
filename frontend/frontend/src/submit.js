// submit.js
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const result = await response.json();

      alert(
        `Pipeline Analysis ✅\n\n` +
        `Nodes: ${result.num_nodes}\n` +
        `Edges: ${result.num_edges}\n` +
        `Is DAG: ${result.is_dag ? 'Yes' : 'No'}`
      );
    } catch (error) {
      alert('❌ Failed to analyze pipeline. Ensure backend is running.');
      console.error(error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      borderTop: '1px solid #2a2a2a',
      backgroundColor: '#121212'
    }}>
      <button
        onClick={handleSubmit}
        style={{
          padding: '12px 24px',
          fontSize: '14px',
          fontWeight: 'bold',
          borderRadius: '4px',
          backgroundColor: '#00ff9c',
          color: '#0b0b0b',
          border: 'none',
          cursor: 'pointer',
          textTransform: 'uppercase',
          boxShadow: '0 0 10px rgba(0, 255, 156, 0.5)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#0b0b0b';
          e.target.style.color = '#00ff9c';
          e.target.style.border = '1px solid #00ff9c';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#00ff9c';
          e.target.style.color = '#0b0b0b';
          e.target.style.border = 'none';
        }}
      >
        Submit Pipeline
      </button>
    </div>
  );
};
