const express = require('express');
const Executor = require('./runtime/Executor');

const app = express();
const PORT = 3000;

app.use(express.json());

// POST /execute - The single entry point for the graph execution
app.post('/execute', async (req, res) => {
    try {
        const { nodes, edges } = req.body;

        if (!nodes || !edges) {
            return res.status(400).json({ error: "Invalid input. 'nodes' and 'edges' are required." });
        }

        console.log(`Received request to execute graph with ${nodes.length} nodes.`);

        // Initialize Executor with the received graph
        const executor = new Executor({ nodes, edges });

        // Run the execution
        await executor.execute();

        res.json({ status: 'success', message: 'Execution completed successfully.' });
    } catch (error) {
        console.error("Execution failed:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend abstraction engine running on http://localhost:${PORT}`);
});
