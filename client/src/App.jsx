import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import DashboardPage from './pages/DashboardPage';
import BuilderPage from './pages/BuilderPage';
import ExecutionPage from './pages/ExecutionPage';

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/builder/new" element={<BuilderPage />} />
        <Route path="/builder/:workflowId" element={<BuilderPage />} />
        <Route path="/executions/:executionId" element={<ExecutionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

export default App;
