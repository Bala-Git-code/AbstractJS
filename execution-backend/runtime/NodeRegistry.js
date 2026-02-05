const LogNode = require('./nodes/LogNode');
const DelayNode = require('./nodes/DelayNode');
const MathNode = require('./nodes/MathNode');

class NodeRegistry {
    static createNode(type, id, data) {
        switch (type) {
            case 'log':
                // Prompt Requirement: "1. Log Node ... data: { message }"
                return new LogNode(id, data);
            case 'delay':
                // Prompt Requirement: "2. Delay Node ... data: { time }"
                return new DelayNode(id, data);
            case 'math':
                // Prompt Requirement: "3. Math Node ... data: { operation, a, b }"
                return new MathNode(id, data);
            default:
                throw new Error(`Unknown node type: ${type}`);
        }
    }
}

module.exports = NodeRegistry;
