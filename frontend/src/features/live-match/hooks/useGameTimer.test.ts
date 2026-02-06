import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useGameTimer } from "./useGameTimer";

describe("useGameTimer", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should initialize with 0:00", () => {
        const { result } = renderHook(() => useGameTimer());
        expect(result.current.displayTime).toBe("00:00");
        expect(result.current.isRunning).toBe(false);
    });

    it("should update time when started", () => {
        const { result } = renderHook(() => useGameTimer());

        act(() => {
            result.current.start();
        });

        expect(result.current.isRunning).toBe(true);

        // Advance 10 seconds
        act(() => {
            vi.advanceTimersByTime(10000);
        });

        expect(result.current.displayTime).toBe("00:10");
    });

    it("should pause time when stopped", () => {
        const { result } = renderHook(() => useGameTimer());

        act(() => {
            result.current.start();
        });

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        act(() => {
            result.current.stop();
        });

        expect(result.current.isRunning).toBe(false);
        expect(result.current.displayTime).toBe("00:05");

        // Advance more time, should not change
        act(() => {
            vi.advanceTimersByTime(5000);
        });

        expect(result.current.displayTime).toBe("00:05");
    });

    it("should handle initial state from server", () => {
        // simulating state: 1 min accumulated, running since 10s ago
        const now = new Date();
        const tenSecondsAgo = new Date(now.getTime() - 10000).toISOString();
        const initialState = {
            accumulatedTimeMs: 60000,
            lastStartTs: tenSecondsAgo,
            isRunning: true
        };

        const { result } = renderHook(() => useGameTimer(initialState));

        // Should be 1m + 10s = 1:10
        expect(result.current.displayTime).toBe("01:10");
    });
});
