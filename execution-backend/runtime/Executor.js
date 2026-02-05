const NodeRegistry = require('./NodeRegistry');

class Executor {
    constructor(graph) {
        this.nodesData = graph.nodes;
        this.edgesData = graph.edges;
        this.nodeInstances = new Map();
    }

    async execute() {
        console.log("--- Execution Started ---");

        // 1. Instantiate all nodes (Abstraction: Creation is separate from execution)
        this.nodesData.forEach(nodeData => {
            const nodeInstance = NodeRegistry.createNode(nodeData.type, nodeData.id, nodeData.data);
            this.nodeInstances.set(nodeData.id, nodeInstance);
        });

        // 2. Determine Execution Order (Abstraction: Linear sequencer)
        // We build an adjacency map: source_id -> target_id
        const adj = new Map();
        const incoming = new Set();

        this.edgesData.forEach(edge => {
            adj.set(edge.source, edge.target);
            incoming.add(edge.target);
        });

        // Find the start node (a node that is not a target of any other node)
        let startNodeId = null;
        for (const [id] of this.nodeInstances) {
            if (!incoming.has(id)) {
                startNodeId = id;
                break; // Assuming single pipeline for V1
            }
        }

        if (!startNodeId) {
            console.log("No start node found or empty graph.");
            return;
        }

        // 3. Execution Loop
        // This is the core "Runtime" that orchestrates the flow.
        let currentId = startNodeId;
        while (currentId) {
            const node = this.nodeInstances.get(currentId);
            if (!node) {
                console.warn(`Node ${currentId} found in edge but not in node list.`);
                break;
            }

            try {
                // EXECUTE the node. We await it, respecting the abstraction.
                await node.execute();
            } catch (err) {
                console.error(`Error executing node ${currentId}:`, err);
                throw err; // Stop pipeline on error
            }

            // Move to next node
            currentId = adj.get(currentId);
        }

        console.log("--- Execution Finished ---");
    }
}

module.exports = Executor;
