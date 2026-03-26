function RunPanel({ runInput, onRunInputChange, onRunWorkflow, isRunning, resultLink }) {
  return (
    <section className="builder-panel">
      <div className="panel-heading">
        <p className="eyebrow">Run</p>
        <h3>Execute workflow</h3>
      </div>
      <label className="form-stack">
        <span>Input JSON</span>
        <textarea value={runInput} onChange={(event) => onRunInputChange(event.target.value)} rows={8} />
      </label>
      <button className="primary-button" type="button" onClick={onRunWorkflow} disabled={isRunning}>
        {isRunning ? 'Running...' : 'Run workflow'}
      </button>
      {resultLink}
    </section>
  );
}

export default RunPanel;
