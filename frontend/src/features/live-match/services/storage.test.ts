import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storageService } from './storage';
import type { MatchState } from './storage';
import { MatchEventType, TeamSide } from './matchEventService';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
        clear: vi.fn(() => {
            store = {};
        }),
        key: vi.fn((index: number) => Object.keys(store)[index] || null),
        get length() { return Object.keys(store).length; }
    };
})();

Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock
});

const MOCK_MATCH_ID = 'test-match-id';
const MOCK_STATE: MatchState = {
    matchId: MOCK_MATCH_ID,
    events: [
        {
            id: 'evt-1',
            match_id: MOCK_MATCH_ID,
            event_type: MatchEventType.GOAL,
            team_side: TeamSide.LOCAL,
            minute: 10,
            player_number: 7,
            created_at: new Date().toISOString()
        }
    ],
    lastUpdated: Date.now()
};

describe('LocalStorageService', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('should save match state', () => {
        storageService.saveMatchState(MOCK_MATCH_ID, MOCK_STATE);

        expect(localStorage.setItem).toHaveBeenCalledWith(
            `match_${MOCK_MATCH_ID}`,
            JSON.stringify(MOCK_STATE)
        );
    });

    it('should load match state', () => {
        localStorage.setItem(`match_${MOCK_MATCH_ID}`, JSON.stringify(MOCK_STATE));

        const loaded = storageService.loadMatchState(MOCK_MATCH_ID);
        expect(loaded).toEqual(MOCK_STATE);
    });

    it('should return null if no state exists', () => {
        const loaded = storageService.loadMatchState('non-existent');
        expect(loaded).toBeNull();
    });

    it('should clear match state', () => {
        localStorage.setItem(`match_${MOCK_MATCH_ID}`, JSON.stringify(MOCK_STATE));
        storageService.clearMatchState(MOCK_MATCH_ID);

        expect(localStorage.removeItem).toHaveBeenCalledWith(`match_${MOCK_MATCH_ID}`);
    });

    it('should handle invalid JSON gracefully', () => {
        // Bypass mock setItem stringify to test invalid JSON
        (localStorage.getItem as any).mockReturnValueOnce('{invalid-json');

        const loaded = storageService.loadMatchState(MOCK_MATCH_ID);
        expect(loaded).toBeNull();
    });
});
