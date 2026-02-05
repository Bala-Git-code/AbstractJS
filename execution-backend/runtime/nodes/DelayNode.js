const AbstractNode = require('./AbstractNode');

class DelayNode extends AbstractNode {
    async execute() {
        const time = this.data.time || 0;
        console.log(`[DelayNode ${this.id}]: Starting delay of ${time}ms`);

        // Abstraction: User asks for "delay", we use setTimeout wrapped in Promise.
        // They don't see the complexity of async/wait.
        await new Promise(resolve => setTimeout(resolve, time));

        console.log(`[DelayNode ${this.id}]: Completed delay`);
        return { status: 'delayed', time };
    }
}

module.exports = DelayNode;
