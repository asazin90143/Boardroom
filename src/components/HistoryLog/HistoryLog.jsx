import { FiX, FiPlus, FiMove, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useBoard } from '../../context/BoardContext';
import './HistoryLog.css';

const actionIcons = {
    CREATE: FiPlus,
    MOVE: FiMove,
    EDIT: FiEdit3,
    DELETE: FiTrash2,
};

const actionColors = {
    CREATE: '#22c55e',
    MOVE: '#3b82f6',
    EDIT: '#f59e0b',
    DELETE: '#ef4444',
};

const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Just now';

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString();
};

const HistoryLog = ({ isOpen, onClose }) => {
    const { historyLogs } = useBoard();

    return (
        <div className={`history-panel ${isOpen ? 'open' : ''}`}>
            <div className="history-header">
                <h2 className="history-title">
                    <span className="title-icon">📜</span>
                    History Log
                </h2>
                <button className="close-btn" onClick={onClose}>
                    <FiX size={20} />
                </button>
            </div>

            <div className="history-content">
                {historyLogs.length === 0 ? (
                    <div className="history-empty">
                        <div className="empty-icon">🕐</div>
                        <p>No activity yet</p>
                        <span>Your actions will appear here</span>
                    </div>
                ) : (
                    <div className="history-list">
                        {historyLogs.map((log) => {
                            const Icon = actionIcons[log.actionType] || FiEdit3;
                            const color = actionColors[log.actionType] || '#888';

                            return (
                                <div key={log.id} className="history-item">
                                    <div
                                        className="item-icon"
                                        style={{ backgroundColor: `${color}20`, color }}
                                    >
                                        <Icon size={14} />
                                    </div>

                                    <div className="item-content">
                                        <div className="item-action">
                                            <span className="action-type" style={{ color }}>
                                                {log.actionType}
                                            </span>
                                            <span className="action-summary">{log.itemSummary}</span>
                                        </div>

                                        <div className="item-meta">
                                            {log.userPhoto && (
                                                <img
                                                    src={log.userPhoto}
                                                    alt=""
                                                    className="meta-avatar"
                                                />
                                            )}
                                            <span className="meta-user">{log.userName}</span>
                                            <span className="meta-time">{formatTimestamp(log.timestamp)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryLog;
