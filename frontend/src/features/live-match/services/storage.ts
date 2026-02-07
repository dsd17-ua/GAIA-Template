import type { MatchEvent } from './matchEventService';

export interface MatchState {
    matchId: string;
    events: MatchEvent[];
    lastUpdated: number;
}

const PREFIX = 'match_';

class LocalStorageService {
    saveMatchState(matchId: string, state: MatchState): void {
        try {
            const key = `${PREFIX}${matchId}`;
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error('[LocalStorageService] Failed to save state:', error);
        }
    }

    loadMatchState(matchId: string): MatchState | null {
        try {
            const key = `${PREFIX}${matchId}`;
            const stored = localStorage.getItem(key);
            if (!stored) return null;
            return JSON.parse(stored) as MatchState;
        } catch (error) {
            console.error('[LocalStorageService] Failed to load state:', error);
            // If main state is corrupted, better return null than crash
            return null;
        }
    }

    clearMatchState(matchId: string): void {
        try {
            const key = `${PREFIX}${matchId}`;
            localStorage.removeItem(key);
        } catch (error) {
            console.error('[LocalStorageService] Failed to clear state:', error);
        }
    }
}

export const storageService = new LocalStorageService();
