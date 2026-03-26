import { create } from 'zustand';
import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import {
  createEdgeId,
  createInitialWorkflow,
  createNodeInstance,
  ensureWorkflowShape,
} from '../utils/workflow';

const useWorkflowBuilderStore = create((set, get) => ({
  workflow: createInitialWorkflow(),
  nodes: [],
  edges: [],
  selectedNodeId: null,
  setWorkflowDocument: (workflow) => {
    const nextWorkflow = ensureWorkflowShape(workflow);
    set({
      workflow: nextWorkflow,
      nodes: nextWorkflow.nodes,
      edges: nextWorkflow.edges,
      selectedNodeId: null,
    });
  },
  updateWorkflowField: (field, value) =>
    set((state) => ({ workflow: { ...state.workflow, [field]: value } })),
  addNodeFromTemplate: (template, position) =>
    set((state) => {
      const node = createNodeInstance(template.type, position);
      node.data = { ...node.data, ...template.data };
      const nodes = [...state.nodes, node];
      return {
        nodes,
        workflow: { ...state.workflow, nodes },
      };
    }),
  onNodesChange: (changes) =>
    set((state) => {
      const nodes = applyNodeChanges(changes, state.nodes);
      return { nodes, workflow: { ...state.workflow, nodes } };
    }),
  onEdgesChange: (changes) =>
    set((state) => {
      const edges = applyEdgeChanges(changes, state.edges);
      return { edges, workflow: { ...state.workflow, edges } };
    }),
  onConnect: (connection) =>
    set((state) => {
      const edges = addEdge(
        {
          ...connection,
          id: createEdgeId(connection.source, connection.target),
          animated: true,
        },
        state.edges
      );
      return { edges, workflow: { ...state.workflow, edges } };
    }),
  setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),
  updateNodeData: (nodeId, key, value) =>
    set((state) => {
      const nodes = state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, [key]: value } } : node
      );
      return { nodes, workflow: { ...state.workflow, nodes } };
    }),
  deleteNode: (nodeId) =>
    set((state) => {
      const nodes = state.nodes.filter((node) => node.id !== nodeId);
      const edges = state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
      return {
        nodes,
        edges,
        selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
        workflow: { ...state.workflow, nodes, edges },
      };
    }),
  getSelectedNode: () => {
    const state = get();
    return state.nodes.find((node) => node.id === state.selectedNodeId) || null;
  },
  getPayload: () => {
    const { workflow, nodes, edges } = get();
    return {
      name: workflow.name,
      description: workflow.description,
      createdBy: workflow.createdBy,
      nodes,
      edges,
    };
  },
}));

export default useWorkflowBuilderStore;
