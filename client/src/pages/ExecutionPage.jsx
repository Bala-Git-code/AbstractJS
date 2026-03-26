import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { executionApi } from '../services/api';
import { formatDate, formatJson } from '../utils/format';

function ExecutionPage() {
  const { executionId } = useParams();
  const [execution, setExecution] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    executionApi
      .get(executionId)
      .then(setExecution)
      .catch((err) => setError(err.message));
  }, [executionId]);

  if (error) {
    return <div className="alert error">{error}</div>;
  }

  if (!execution) {
    return <div className="panel">Loading execution...</div>;
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Execution</p>
          <h1>{execution.workflowId?.name || 'Workflow execution'}</h1>
          <p>Inspect the runtime result, per-node logs, and output payload emitted by the engine.</p>
        </div>
        <div className="button-row">
          <StatusBadge status={execution.status} />
          {execution.workflowId?._id ? (
            <Link className="ghost-button" to={`/builder/${execution.workflowId._id}`}>
              Back to builder
            </Link>
          ) : null}
        </div>
      </header>

      <div className="execution-grid">
        <section className="panel">
          <h3>Summary</h3>
          <dl className="summary-list">
            <div>
              <dt>Execution ID</dt>
              <dd>{execution._id}</dd>
            </div>
            <div>
              <dt>Started</dt>
              <dd>{formatDate(execution.createdAt)}</dd>
            </div>
            <div>
              <dt>Runtime</dt>
              <dd>{execution.executionTime} ms</dd>
            </div>
            <div>
              <dt>Error</dt>
              <dd>{execution.error || 'None'}</dd>
            </div>
          </dl>
        </section>

        <section className="panel">
          <h3>Result</h3>
          <pre>{formatJson(execution.result)}</pre>
        </section>
      </div>

      <section className="panel">
        <h3>Logs</h3>
        <div className="log-list">
          {execution.logs.map((log, index) => (
            <article key={`${log.timestamp}-${index}`} className={`log-entry log-${log.level}`}>
              <div>
                <strong>{log.nodeId || 'system'}</strong>
                <span>{formatDate(log.timestamp)}</span>
              </div>
              <p>{log.message}</p>
              {log.details ? <pre>{formatJson(log.details)}</pre> : null}
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default ExecutionPage;
