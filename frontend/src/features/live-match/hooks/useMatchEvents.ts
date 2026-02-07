import { useState } from 'react';
import { matchEventService } from '@/features/live-match/services/matchEventService';
import type { MatchEvent, CreateMatchEvent } from '@/features/live-match/services/matchEventService';

export const useMatchEvents = (matchId: string) => {
    const [events, setEvents] = useState<MatchEvent[]>([]);
    const [isCreating, setIsCreating] = useState(false);

    const addEvent = async (event: CreateMatchEvent) => {
        setIsCreating(true);
        try {
            const newEvent = await matchEventService.createEvent(matchId, event);
            setEvents(prev => [...prev, newEvent]);
            return newEvent;
        } catch (error) {
            console.error("Failed to add event", error);
            throw error;
        } finally {
            setIsCreating(false);
        }
    };

    // Filter helpers
    const exclusions = events.filter(e => e.event_type === "TWO_MIN");

    return {
        events,
        exclusions,
        addEvent,
        isCreating
    };
};
