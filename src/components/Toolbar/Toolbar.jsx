import { useRef } from 'react';
import { FiPlus, FiClock, FiImage, FiUpload } from 'react-icons/fi';
import './Toolbar.css';

const Toolbar = ({ onAddNote, onAddImage, onToggleHistory }) => {
    const fileInputRef = useRef(null);

    const handleUrlClick = () => {
        const url = window.prompt("Enter Image URL:");
        if (url) {
            onAddImage(url);
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // 800KB limit to be safe for Firestore (1MB max doc size)
            if (file.size > 800000) {
                alert("File is too large! Firestore allows max 1MB per document. Please use a smaller image or a URL.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                onAddImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = null;
    };

    return (
        <div className="toolbar">
            <div className="toolbar-content">
                <button className="toolbar-btn primary" onClick={onAddNote}>
                    <FiPlus size={20} />
                    <span>Add Note</span>
                </button>

                <button className="toolbar-btn" onClick={handleUrlClick} title="Add Image from URL">
                    <FiImage size={20} />
                    <span>Image URL</span>
                </button>

                <button className="toolbar-btn" onClick={handleUploadClick} title="Upload Image File">
                    <FiUpload size={20} />
                    <span>Upload</span>
                </button>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileChange}
                />

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
