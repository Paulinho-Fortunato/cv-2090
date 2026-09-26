import { useCallback, useRef, useEffect } from 'react';
import { ResumeData } from '../types/resume';

interface HistoryState {
  past: ResumeData[];
  present: ResumeData;
  future: ResumeData[];
}

const MAX_HISTORY = 50;

export function useHistory(initialState: ResumeData) {
  const historyRef = useRef<HistoryState>({
    past: [],
    present: initialState,
    future: [],
  });

  const set = useCallback((newState: ResumeData) => {
    const { past, present } = historyRef.current;
    
    // Não adicionar ao histórico se não mudou
    if (JSON.stringify(present) === JSON.stringify(newState)) {
      return;
    }

    historyRef.current = {
      past: [...past, present].slice(-MAX_HISTORY),
      present: newState,
      future: [],
    };
  }, []);

  const undo = useCallback(() => {
    const { past, present, future } = historyRef.current;
    
    if (past.length === 0) {
      return present;
    }

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    historyRef.current = {
      past: newPast,
      present: previous,
      future: [present, ...future],
    };

    return previous;
  }, []);

  const redo = useCallback(() => {
    const { past, present, future } = historyRef.current;
    
    if (future.length === 0) {
      return present;
    }

    const next = future[0];
    const newFuture = future.slice(1);

    historyRef.current = {
      past: [...past, present],
      present: next,
      future: newFuture,
    };

    return next;
  }, []);

  const canUndo = useCallback(() => {
    return historyRef.current.past.length > 0;
  }, []);

  const canRedo = useCallback(() => {
    return historyRef.current.future.length > 0;
  }, []);

  const getState = useCallback(() => {
    return historyRef.current.present;
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return {
    set,
    undo,
    redo,
    canUndo,
    canRedo,
    getState,
  };
}
