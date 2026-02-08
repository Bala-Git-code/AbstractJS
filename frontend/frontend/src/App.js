import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', backgroundColor: '#0b0b0b' }}>
      <div style={{ width: '250px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #2a2a2a' }}>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <PipelineToolbar />
        </div>
        <div style={{ flexShrink: 0 }}>
          <SubmitButton />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
