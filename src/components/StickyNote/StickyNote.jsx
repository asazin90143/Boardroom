import { useState, useRef, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { FiTrash2, FiEdit3, FiMinus, FiPlus } from 'react-icons/fi';
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
    const { updateItemContent, updateItemColor, updateItem, deleteItem } = useBoard();
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(item.content);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const textareaRef = useRef(null);
    const colorPickerRef = useRef(null);
    const noteRef = useRef(null);

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: item.id,
        disabled: isEditing,
    });

    const isImage = item.type === 'image';

    const style = {
        transform: CSS.Transform.toString(transform),
        left: item.positionX,
        top: item.positionY,
        width: item.width || (isImage ? '300px' : '220px'),
        height: item.height || (isImage ? 'auto' : '180px'),
        backgroundColor: isImage ? 'transparent' : (item.color || '#fef08a'),
        zIndex: isDragging ? 1000 : 1,
        opacity: isDragging ? 0.8 : 1,
        fontSize: (item.fontSize || 16) + 'px',
        border: isImage ? 'none' : undefined,
        boxShadow: isImage ? 'none' : undefined,
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

    const handleResizeEnd = () => {
        if (noteRef.current) {
            const w = noteRef.current.style.width;
            const h = noteRef.current.style.height;
            // Only update if styles were explicitly set by resize handle (non-empty)
            if (w && h) {
                updateItem(item.id, { width: w, height: h });
            }
        }
    };

    const handleFontSizeChange = (delta) => {
        const current = parseInt(item.fontSize) || 16;
        const next = Math.max(10, Math.min(64, current + delta));
        updateItem(item.id, { fontSize: next });
    };

    const handleDoubleClick = (e) => {
        if (isImage) return;
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
            ref={(node) => { setNodeRef(node); noteRef.current = node; }}
            className={`sticky-note ${isDragging ? 'dragging' : ''} ${isEditing ? 'editing' : ''}`}
            style={style}
            onDoubleClick={handleDoubleClick}
            onMouseUp={handleResizeEnd}
            {...(!isEditing ? { ...listeners, ...attributes } : {})}
        >
            <div className={`note-header ${isImage ? 'image-header' : ''}`}>
                {!isImage && (
                    <div className="size-controls">
                        <button
                            className="size-btn"
                            onClick={(e) => { e.stopPropagation(); handleFontSizeChange(-2) }}
                            title="Smaller Text"
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <FiMinus />
                        </button>
                        <button
                            className="size-btn"
                            onClick={(e) => { e.stopPropagation(); handleFontSizeChange(2) }}
                            title="Larger Text"
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <FiPlus />
                        </button>
                    </div>
                )}

                {!isImage && (
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
                )}

                {/* For images, we can add a delete button clearly visible */}
                <div style={{ flex: 1 }}></div>

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

            {isImage ? (
                <div className="note-image-container">
                    <img
                        src={item.content}
                        alt="Board Item"
                        draggable={false}
                        className="note-image"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=Invalid+Image'; }}
                    />
                </div>
            ) : (
                isEditing ? (
                    <textarea
                        ref={textareaRef}
                        className="note-textarea"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        style={{ fontSize: 'inherit' }}
                        placeholder="Type your note..."
                    />
                ) : (
                    <div className="note-content">
                        {item.content || 'Double-click to edit...'}
                    </div>
                )
            )}

            {!isImage && (
                <div className="note-footer">
                    <span className="note-hint">Drag • Edit • Resize</span>
                </div>
            )}
        </div>
    );
};

export default StickyNote;
