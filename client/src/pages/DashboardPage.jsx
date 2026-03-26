import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import WorkflowCard from '../features/dashboard/WorkflowCard';
import { workflowApi } from '../services/api';

function DashboardPage() {
  const [workflows, setWorkflows] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadWorkflows = async () => {
    try {
      setIsLoading(true);
      setError('');
      setWorkflows(await workflowApi.list());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWorkflows();
  }, []);

  const handleDelete = async (workflowId) => {
    await workflowApi.remove(workflowId);
    await loadWorkflows();
  };

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Workflow registry</h1>
          <p>Manage saved workflows, open the visual builder, and keep execution graphs versioned.</p>
        </div>
        <Link className="primary-button" to="/builder/new">
          Create workflow
        </Link>
      </header>

      {error ? <div className="alert error">{error}</div> : null}
      {isLoading ? <div className="panel">Loading workflows...</div> : null}

      {!isLoading && workflows.length === 0 ? (
        <EmptyState
          title="No workflows yet"
          body="Create your first AI workflow to start composing nodes and running executions."
          action={
            <Link className="primary-button" to="/builder/new">
              Start building
            </Link>
          }
        />
      ) : null}

      <div className="workflow-grid">
        {workflows.map((workflow) => (
          <WorkflowCard key={workflow._id} workflow={workflow} onDelete={handleDelete} />
        ))}
      </div>
    </section>
  );
}

export default DashboardPage;
