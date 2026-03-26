import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import NodePalette from '../features/builder/NodePalette';
import PropertyInspector from '../features/builder/PropertyInspector';
import RunPanel from '../features/builder/RunPanel';
import { workflowNodeTypes } from '../features/builder/nodeTypes';
import useWorkflowBuilderStore from '../store/workflowBuilderStore';
import { executionApi, workflowApi } from '../services/api';
import useAsyncAction from '../hooks/useAsyncAction';
import { createInitialWorkflow, parseJsonInput } from '../utils/workflow';

function BuilderPage() {
  const { workflowId } = useParams();
  const navigate = useNavigate();
  const reactFlow = useReactFlow();
  const [runInput, setRunInput] = useState('{\n  "input": "Hello from AbstractJS"\n}');
  const [lastExecutionId, setLastExecutionId] = useState('');
  const {
    workflow,
    nodes,
    edges,
    selectedNodeId,
    setWorkflowDocument,
    updateWorkflowField,
    addNodeFromTemplate,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    updateNodeData,
    deleteNode,
    getSelectedNode,
    getPayload,
  } = useWorkflowBuilderStore();

  const selectedNode = useMemo(() => getSelectedNode(), [getSelectedNode, selectedNodeId, nodes]);
  const saveAction = useAsyncAction(async () => {
    const payload = getPayload();
    if (workflowId) {
      const updated = await workflowApi.update(workflowId, payload);
      setWorkflowDocument(updated);
      return updated;
    }
    const created = await workflowApi.create(payload);
    setWorkflowDocument(created);
    navigate(`/builder/${created._id}`, { replace: true });
    return created;
  });
  const runAction = useAsyncAction(async () => {
    const savedWorkflowId = workflowId || (await saveAction.run())._id;
    const execution = await executionApi.run({
      workflowId: savedWorkflowId,
      input: parseJsonInput(runInput),
    });
    setLastExecutionId(execution._id);
    return execution;
  });

  useEffect(() => {
    const loadWorkflow = async () => {
      if (!workflowId) {
        setWorkflowDocument(createInitialWorkflow());
        return;
      }
      const workflowDocument = await workflowApi.get(workflowId);
      setWorkflowDocument(workflowDocument);
    };

    loadWorkflow().catch((error) => {
      saveAction.setError(error.message);
    });
  }, [workflowId, setWorkflowDocument]);

  const handleDrop = (event) => {
    event.preventDefault();
    const rawTemplate = event.dataTransfer.getData('application/abstractjs-node');
    if (!rawTemplate) {
      return;
    }
    const template = JSON.parse(rawTemplate);
    const position = reactFlow.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    addNodeFromTemplate(template, position);
  };

  return (
    <section className="page builder-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Builder</p>
          <h1>{workflow.name}</h1>
          <p>Compose deterministic steps, AI prompts, and final outputs in a scalable DAG editor.</p>
        </div>
        <div className="button-row">
          {lastExecutionId ? (
            <Link className="ghost-button" to={`/executions/${lastExecutionId}`}>
              View last execution
            </Link>
          ) : null}
          <button className="primary-button" type="button" onClick={() => saveAction.run()}>
            {saveAction.isLoading ? 'Saving...' : 'Save workflow'}
          </button>
        </div>
      </header>

      {saveAction.error ? <div className="alert error">{saveAction.error}</div> : null}
      {runAction.error ? <div className="alert error">{runAction.error}</div> : null}

      <div className="builder-layout">
        <div className="builder-sidebar">
          <NodePalette />
          <RunPanel
            runInput={runInput}
            onRunInputChange={setRunInput}
            onRunWorkflow={() => runAction.run()}
            isRunning={runAction.isLoading}
            resultLink={
              lastExecutionId ? (
                <Link className="ghost-button" to={`/executions/${lastExecutionId}`}>
                  Open execution log
                </Link>
              ) : null
            }
          />
        </div>

        <div
          className="canvas-panel"
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={workflowNodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            onNodeClick={(_, node) => setSelectedNode(node.id)}
            onPaneClick={() => setSelectedNode(null)}
            defaultEdgeOptions={{
              animated: true,
              style: { strokeWidth: 2, stroke: '#f8b84e' },
            }}
          >
            <MiniMap />
            <Controls />
            <Background gap={24} size={1} color="#2a334a" />
          </ReactFlow>
        </div>

        <div className="builder-sidebar">
          <PropertyInspector
            workflow={workflow}
            selectedNode={selectedNode}
            onWorkflowChange={updateWorkflowField}
            onNodeDataChange={updateNodeData}
            onDeleteNode={deleteNode}
          />
        </div>
      </div>
    </section>
  );
}

export default BuilderPage;
