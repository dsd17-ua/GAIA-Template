import { useState, useEffect, useRef } from "react";

export interface TimerState {
    accumulatedTimeMs: number;
    lastStartTs: string | null;
    isRunning: boolean;
}

export const useGameTimer = (initialState?: TimerState) => {
    const [state, setState] = useState<TimerState>(initialState || {
        accumulatedTimeMs: 0,
        lastStartTs: null,
        isRunning: false
    });

    const [ms, setMs] = useState(0);
    const rafRef = useRef<number>(0);

    // Sync internal state with props if they change (server update)
    useEffect(() => {
        if (initialState) {
            setState(initialState);
        }
    }, [initialState]);

    useEffect(() => {
        const update = () => {
            let currentMs = state.accumulatedTimeMs;
            if (state.isRunning && state.lastStartTs) {
                const start = new Date(state.lastStartTs).getTime();
                const now = new Date().getTime();
                currentMs += (now - start);
            }
            setMs(currentMs);
        };

        update(); // Immediate update

        if (state.isRunning) {
            const loop = () => {
                update();
                rafRef.current = requestAnimationFrame(loop);
            };
            rafRef.current = requestAnimationFrame(loop);
        } else {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        }

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [state]);

    const start = () => {
        setState(prev => {
            if (prev.isRunning) return prev;
            return {
                ...prev,
                isRunning: true,
                lastStartTs: new Date().toISOString()
            };
        });
    };

    const stop = () => {
        setState(prev => {
            if (!prev.isRunning || !prev.lastStartTs) return prev;
            const now = new Date().getTime();
            const start = new Date(prev.lastStartTs).getTime();
            const delta = now - start;
            return {
                ...prev,
                isRunning: false,
                lastStartTs: null,
                accumulatedTimeMs: prev.accumulatedTimeMs + delta
            };
        });
    };

    const formatTime = (totalMs: number) => {
        const totalSeconds = Math.floor(totalMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return {
        displayTime: formatTime(ms),
        ms,
        isRunning: state.isRunning,
        start,
        stop,
        // Expose set methods if needed for optimistic updates from outside or just rely on prop sync
        setState
    };
};
