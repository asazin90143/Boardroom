import { AuthProvider, useAuth } from './context/AuthContext';
import { BoardProvider } from './context/BoardContext';
import LoginPage from './components/LoginPage/LoginPage';
import Canvas from './components/Canvas/Canvas';
import './App.css';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-container">
          <div className="loading-logo">📋</div>
          <div className="loading-spinner"></div>
          <p>Loading Boardroom...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <BoardProvider>
      <Canvas />
    </BoardProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
