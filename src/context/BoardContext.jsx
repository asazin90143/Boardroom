import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';

const BoardContext = createContext(null);

export const useBoard = () => {
    const context = useContext(BoardContext);
    if (!context) {
        throw new Error('useBoard must be used within a BoardProvider');
    }
    return context;
};

export const BoardProvider = ({ children }) => {
    const { user } = useAuth();
    const [currentBoard, setCurrentBoard] = useState(null);
    const [items, setItems] = useState([]);
    const [historyLogs, setHistoryLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    // Default board ID (for MVP, we use a single board per user)
    const boardId = user ? `board_${user.uid}` : null;

    // Subscribe to items changes
    useEffect(() => {
        if (!boardId || !user) {
            setItems([]);
            return;
        }

        setLoading(true);
        const itemsRef = collection(db, 'boards', boardId, 'items');

        const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
            const itemsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setItems(itemsData);
            setLoading(false);
        }, (error) => {
            console.error('Error fetching items:', error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [boardId, user]);

    // Subscribe to history logs
    useEffect(() => {
        if (!boardId || !user) {
            setHistoryLogs([]);
            return;
        }

        const historyRef = collection(db, 'boards', boardId, 'history');
        const historyQuery = query(historyRef, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(historyQuery, (snapshot) => {
            const logsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setHistoryLogs(logsData);
        }, (error) => {
            console.error('Error fetching history:', error);
        });

        return () => unsubscribe();
    }, [boardId, user]);

    // Add history log entry
    const addHistoryLog = useCallback(async (actionType, itemSummary) => {
        if (!boardId || !user) return;

        try {
            const historyRef = collection(db, 'boards', boardId, 'history');
            await addDoc(historyRef, {
                userId: user.uid,
                userName: user.displayName || user.email,
                userPhoto: user.photoURL,
                actionType,
                itemSummary,
                timestamp: serverTimestamp()
            });
        } catch (error) {
            console.error('Error adding history log:', error);
        }
    }, [boardId, user]);

    // Create item
    const createItem = useCallback(async (type, content, positionX, positionY, color = '#fef08a') => {
        if (!boardId || !user) return;

        try {
            const itemsRef = collection(db, 'boards', boardId, 'items');
            const newItem = {
                type,
                content,
                positionX,
                positionY,
                color,
                createdBy: user.uid,
                lastModified: serverTimestamp()
            };

            const docRef = await addDoc(itemsRef, newItem);
            await addHistoryLog('CREATE', `Created ${type}: "${content.substring(0, 30)}..."`);

            return docRef.id;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    }, [boardId, user, addHistoryLog]);

    // Update item position
    const updateItemPosition = useCallback(async (itemId, positionX, positionY) => {
        if (!boardId || !user) return;

        try {
            const itemRef = doc(db, 'boards', boardId, 'items', itemId);
            await updateDoc(itemRef, {
                positionX,
                positionY,
                lastModified: serverTimestamp()
            });

            await addHistoryLog('MOVE', `Moved item to (${Math.round(positionX)}, ${Math.round(positionY)})`);
        } catch (error) {
            console.error('Error updating item position:', error);
            throw error;
        }
    }, [boardId, user, addHistoryLog]);

    // Update item content
    const updateItemContent = useCallback(async (itemId, content) => {
        if (!boardId || !user) return;

        try {
            const itemRef = doc(db, 'boards', boardId, 'items', itemId);
            await updateDoc(itemRef, {
                content,
                lastModified: serverTimestamp()
            });

            await addHistoryLog('EDIT', `Edited: "${content.substring(0, 30)}..."`);
        } catch (error) {
            console.error('Error updating item content:', error);
            throw error;
        }
    }, [boardId, user, addHistoryLog]);

    // Update item color
    const updateItemColor = useCallback(async (itemId, color) => {
        if (!boardId || !user) return;

        try {
            const itemRef = doc(db, 'boards', boardId, 'items', itemId);
            await updateDoc(itemRef, {
                color,
                lastModified: serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating item color:', error);
            throw error;
        }
    }, [boardId, user]);

    // Delete item
    const deleteItem = useCallback(async (itemId, itemSummary) => {
        if (!boardId || !user) return;

        try {
            const itemRef = doc(db, 'boards', boardId, 'items', itemId);
            await deleteDoc(itemRef);

            await addHistoryLog('DELETE', `Deleted: "${itemSummary.substring(0, 30)}..."`);
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    }, [boardId, user, addHistoryLog]);

    const value = {
        currentBoard,
        items,
        historyLogs,
        loading,
        createItem,
        updateItemPosition,
        updateItemContent,
        updateItemColor,
        deleteItem
    };

    return (
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    );
};

export default BoardContext;
