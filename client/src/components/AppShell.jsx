import { Link, NavLink } from 'react-router-dom';

function AppShell({ children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/">
          <span className="brand-mark">A</span>
          <div>
            <strong>AbstractJS</strong>
            <p>AI workflow platform</p>
          </div>
        </Link>

        <nav className="nav">
          <NavLink to="/" end className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/builder/new" className="nav-link">
            New Workflow
          </NavLink>
        </nav>

        <section className="sidebar-panel">
          <p className="eyebrow">Execution model</p>
          <h3>Composable DAG engine</h3>
          <p>
            Build graph-based workflows, persist them in MongoDB, and run AI-driven
            executions with structured logs.
          </p>
        </section>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
}

export default AppShell;
