const AbstractNode = require('./AbstractNode');

class MathNode extends AbstractNode {
    async execute() {
        const { operation, a, b } = this.data;
        let result;

        // Abstraction: Safe execution of math. No `eval` or direct code injection.
        switch (operation) {
            case 'add':
                result = a + b;
                break;
            case 'subtract':
                result = a - b;
                break;
            case 'multiply':
                result = a * b;
                break;
            case 'divide':
                if (b === 0) throw new Error("Division by zero");
                result = a / b;
                break;
            default:
                throw new Error(`Unknown operation: ${operation}`);
        }

        console.log(`[MathNode ${this.id}]: Executing ${a} ${operation} ${b} = ${result}`);
        return { result };
    }
}

module.exports = MathNode;
