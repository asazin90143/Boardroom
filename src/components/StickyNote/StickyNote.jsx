import { useState, useRef, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';
import { useBoard } from '../../context/BoardContext';
import './StickyNote.css';

const COLORS = [
    '#fef08a', // yellow
    '#fecaca', // red
    '#bbf7d0', // green
    '#bfdbfe', // blue
    '#ddd6fe', // purple
    '#fed7aa', // orange
    '#fbcfe8', // pink
    '#e5e7eb', // gray
];

const StickyNote = ({ item }) => {
    const { updateItemContent, updateItemColor, deleteItem } = useBoard();
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(item.content);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const textareaRef = useRef(null);
    const colorPickerRef = useRef(null);

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: item.id,
        disabled: isEditing,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        left: item.positionX,
        top: item.positionY,
        backgroundColor: item.color || '#fef08a',
        zIndex: isDragging ? 1000 : 1,
        opacity: isDragging ? 0.8 : 1,
    };

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.select();
        }
    }, [isEditing]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
                setShowColorPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDoubleClick = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleBlur = async () => {
        setIsEditing(false);
        if (content !== item.content) {
            await updateItemContent(item.id, content);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setContent(item.content);
            setIsEditing(false);
        }
        if (e.key === 'Enter' && e.ctrlKey) {
            handleBlur();
        }
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (window.confirm('Delete this note?')) {
            await deleteItem(item.id, item.content);
        }
    };

    const handleColorChange = async (color) => {
        await updateItemColor(item.id, color);
        setShowColorPicker(false);
    };

    return (
        <div
            ref={setNodeRef}
            className={`sticky-note ${isDragging ? 'dragging' : ''} ${isEditing ? 'editing' : ''}`}
            style={style}
            onDoubleClick={handleDoubleClick}
            {...(!isEditing ? { ...listeners, ...attributes } : {})}
        >
            <div className="note-header">
                <button
                    className="note-btn color-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowColorPicker(!showColorPicker);
                    }}
                    title="Change color"
                >
                    <FiEdit3 size={14} />
                </button>
                <button
                    className="note-btn delete-btn"
                    onClick={handleDelete}
                    title="Delete note"
                >
                    <FiTrash2 size={14} />
                </button>
            </div>

            {showColorPicker && (
                <div className="color-picker" ref={colorPickerRef}>
                    {COLORS.map((color) => (
                        <button
                            key={color}
                            className="color-option"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(color)}
                        />
                    ))}
                </div>
            )}

            {isEditing ? (
                <textarea
                    ref={textareaRef}
                    className="note-textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your note..."
                />
            ) : (
                <div className="note-content">
                    {item.content || 'Double-click to edit...'}
                </div>
            )}

            <div className="note-footer">
                <span className="note-hint">Drag to move • Double-click to edit</span>
            </div>
        </div>
    );
};

export default StickyNote;
