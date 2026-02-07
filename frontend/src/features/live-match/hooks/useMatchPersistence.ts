import { useEffect, useRef } from 'react';
import type { MatchResponse } from '../types';
import type { MatchEvent } from '../services/matchEventService';
import { storageService } from '../services/storage';

export const useMatchPersistence = (
    matchId: string | undefined,
    match: MatchResponse | undefined,
    events: MatchEvent[]
) => {
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!matchId || !match) return;

        // Skip saving on first render to avoid overwriting storage with potentially stale initial state
        // UNLESS we want to enforce that what's in memory wins.
        // For hydration, we load FIRST, then render. So subsequent renders are updates.

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const state = {
            matchId,
            events,
            lastUpdated: Date.now()
        };

        storageService.saveMatchState(matchId, state);

    }, [matchId, match, events]);
};
