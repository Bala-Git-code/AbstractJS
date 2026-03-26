import { Link } from 'react-router-dom';

function WorkflowCard({ workflow, onDelete }) {
  return (
    <article className="workflow-card">
      <div className="workflow-card-header">
        <div>
          <p className="eyebrow">Workflow</p>
          <h3>{workflow.name}</h3>
        </div>
        <Link className="ghost-button" to={`/builder/${workflow._id}`}>
          Open
        </Link>
      </div>
      <p className="workflow-description">{workflow.description || 'No description provided.'}</p>
      <dl className="workflow-meta">
        <div>
          <dt>Nodes</dt>
          <dd>{workflow.nodes.length}</dd>
        </div>
        <div>
          <dt>Edges</dt>
          <dd>{workflow.edges.length}</dd>
        </div>
        <div>
          <dt>Author</dt>
          <dd>{workflow.createdBy}</dd>
        </div>
      </dl>
      <div className="workflow-actions">
        <Link className="primary-button" to={`/builder/${workflow._id}`}>
          Edit workflow
        </Link>
        <button className="danger-button" type="button" onClick={() => onDelete(workflow._id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default WorkflowCard;
