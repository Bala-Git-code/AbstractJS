class AbstractNode {
  constructor(id, data) {
    this.id = id;
    this.data = data;
    if (new.target === AbstractNode) {
      throw new TypeError("Cannot construct AbstractNode instances directly");
    }
  }

  async execute() {
    throw new Error("Method 'execute()' must be implemented.");
  }
}

module.exports = AbstractNode;
