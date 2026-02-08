// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '20px', backgroundColor: '#121212', height: '100%', borderRight: '1px solid #2a2a2a' }}>
            <h3 style={{ color: '#00ff9c', marginBottom: '20px', fontSize: '14px', textTransform: 'uppercase' }}>Components</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
            </div>
        </div>
    );
};
