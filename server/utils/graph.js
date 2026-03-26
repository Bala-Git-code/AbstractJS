function buildAdjacency(nodes, edges) {
  const adjacency = new Map();
  const inDegree = new Map();

  nodes.forEach((node) => {
    adjacency.set(node.id, []);
    inDegree.set(node.id, 0);
  });

  edges.forEach((edge) => {
    if (!adjacency.has(edge.source) || !adjacency.has(edge.target)) {
      return;
    }
    adjacency.get(edge.source).push(edge.target);
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
  });

  return { adjacency, inDegree };
}

function topologicalSort(nodes, edges) {
  const { adjacency, inDegree } = buildAdjacency(nodes, edges);
  const queue = [];
  const ordered = [];

  inDegree.forEach((degree, nodeId) => {
    if (degree === 0) {
      queue.push(nodeId);
    }
  });

  while (queue.length > 0) {
    const nodeId = queue.shift();
    ordered.push(nodeId);

    adjacency.get(nodeId).forEach((nextNodeId) => {
      const nextDegree = inDegree.get(nextNodeId) - 1;
      inDegree.set(nextNodeId, nextDegree);
      if (nextDegree === 0) {
        queue.push(nextNodeId);
      }
    });
  }

  if (ordered.length !== nodes.length) {
    throw new Error('Workflow graph contains a cycle.');
  }

  return ordered;
}

module.exports = {
  topologicalSort,
};
