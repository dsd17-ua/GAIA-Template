import { api } from '@/api/http';

export enum MatchEventType {
    GOAL = "GOAL",
    YELLOW_CARD = "YELLOW_CARD",
    RED_CARD = "RED_CARD",
    TWO_MIN = "TWO_MIN",
    TIMEOUT = "TIMEOUT"
}

export enum TeamSide {
    LOCAL = "LOCAL",
    VISITOR = "VISITOR"
}

export interface MatchEvent {
    id: string;
    match_id: string;
    event_type: MatchEventType;
    team_side: TeamSide;
    minute: number;
    player_number?: number;
    created_at: string;
}

export interface CreateMatchEvent {
    event_type: MatchEventType;
    team_side: TeamSide;
    minute: number;
    player_number?: number;
}

export const matchEventService = {
    createEvent: async (matchId: string, event: CreateMatchEvent): Promise<MatchEvent> => {
        const response = await api.post(`/matches/${matchId}/events`, event);
        return response.data;
    }
};
