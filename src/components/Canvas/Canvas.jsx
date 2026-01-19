import { useState, useRef, useCallback } from 'react';
import { DndContext, DragOverlay, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { useBoard } from '../../context/BoardContext';
import StickyNote from '../StickyNote/StickyNote';
import Toolbar from '../Toolbar/Toolbar';
import HistoryLog from '../HistoryLog/HistoryLog';
import Header from '../Header/Header';
import './Canvas.css';

const Canvas = () => {
    const { items, updateItemPosition, createItem, loading } = useBoard();
    const [activeId, setActiveId] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const canvasRef = useRef(null);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        },
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });

    const sensors = useSensors(mouseSensor, touchSensor);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event) => {
        const { active, delta } = event;

        if (delta.x !== 0 || delta.y !== 0) {
            const item = items.find(i => i.id === active.id);
            if (item) {
                const newX = Math.max(0, item.positionX + delta.x);
                const newY = Math.max(0, item.positionY + delta.y);
                await updateItemPosition(active.id, newX, newY);
            }
        }

        setActiveId(null);
    };

    const handleCanvasClick = useCallback((e) => {
        // Only handle clicks directly on canvas background
        if (e.target === canvasRef.current || e.target.classList.contains('canvas-background')) {
            // Optionally create note on double-click
        }
    }, []);

    const handleAddNote = async () => {
        const canvasRect = canvasRef.current?.getBoundingClientRect();
        const centerX = canvasRect ? (canvasRect.width / 2) - 110 : 200;
        const centerY = canvasRect ? (canvasRect.height / 2) - 90 : 200;

        // Add some randomness so notes don't stack
        const randomOffset = () => Math.random() * 100 - 50;

        await createItem(
            'text',
            'New Note',
            centerX + randomOffset(),
            centerY + randomOffset()
        );
    };

    const activeItem = activeId ? items.find(i => i.id === activeId) : null;

    return (
        <div className="canvas-wrapper">
            <Header onToggleHistory={() => setShowHistory(!showHistory)} showHistory={showHistory} />

            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div
                    ref={canvasRef}
                    className="canvas"
                    onClick={handleCanvasClick}
                >
                    <div className="canvas-background">
                        <div className="cork-texture"></div>
                    </div>

                    {loading && (
                        <div className="canvas-loading">
                            <div className="loading-spinner"></div>
                            <span>Loading your board...</span>
                        </div>
                    )}

                    {!loading && items.length === 0 && (
                        <div className="canvas-empty">
                            <div className="empty-icon">📌</div>
                            <h3>Your board is empty</h3>
                            <p>Click "Add Note" to create your first sticky note!</p>
                        </div>
                    )}

                    {items.map((item) => (
                        item.type === 'text' && (
                            <StickyNote key={item.id} item={item} />
                        )
                    ))}

                    <DragOverlay>
                        {activeItem ? (
                            <div
                                className="drag-overlay-note"
                                style={{ backgroundColor: activeItem.color || '#fef08a' }}
                            >
                                {activeItem.content}
                            </div>
                        ) : null}
                    </DragOverlay>
                </div>
            </DndContext>

            <Toolbar onAddNote={handleAddNote} onToggleHistory={() => setShowHistory(!showHistory)} />

            <HistoryLog isOpen={showHistory} onClose={() => setShowHistory(false)} />
        </div>
    );
};

export default Canvas;
