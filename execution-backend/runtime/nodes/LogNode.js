const AbstractNode = require('./AbstractNode');

class LogNode extends AbstractNode {
    async execute() {
        // Abstraction: User defines "log" intent, we handle how it's logged.
        // In a real system, this might send to a logging service, file, or stdout.
        console.log(`[LogNode ${this.id}]: ${this.data.message}`);
        return { status: 'logged', message: this.data.message };
    }
}

module.exports = LogNode;
