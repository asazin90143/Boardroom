import { FiLogOut, FiClock, FiMenu } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = ({ onToggleHistory, showHistory }) => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <div className="header-logo">
                    <span className="logo-icon">📋</span>
                    <span className="logo-text">Boardroom</span>
                </div>
            </div>

            <div className="header-right">
                <button
                    className={`header-btn ${showHistory ? 'active' : ''}`}
                    onClick={onToggleHistory}
                    title="Toggle History"
                >
                    <FiClock size={18} />
                    <span className="btn-label">History</span>
                </button>

                <div className="user-section">
                    {user?.photoURL && (
                        <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="user-avatar"
                        />
                    )}
                    <div className="user-info">
                        <span className="user-name">{user?.displayName || 'User'}</span>
                    </div>
                </div>

                <button className="header-btn logout-btn" onClick={handleLogout} title="Logout">
                    <FiLogOut size={18} />
                </button>
            </div>
        </header>
    );
};

export default Header;
