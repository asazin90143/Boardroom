import { FiPlus, FiClock, FiImage } from 'react-icons/fi';
import './Toolbar.css';

const Toolbar = ({ onAddNote, onToggleHistory }) => {
    return (
        <div className="toolbar">
            <div className="toolbar-content">
                <button className="toolbar-btn primary" onClick={onAddNote}>
                    <FiPlus size={20} />
                    <span>Add Note</span>
                </button>

                <button className="toolbar-btn" onClick={() => alert('Image upload coming in Phase 2!')}>
                    <FiImage size={20} />
                    <span>Add Image</span>
                </button>

                <div className="toolbar-divider"></div>

                <button className="toolbar-btn" onClick={onToggleHistory}>
                    <FiClock size={20} />
                    <span>History</span>
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
