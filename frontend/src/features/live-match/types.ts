export interface MatchCreate {
    home_team: string;
    visitor_team: string;
    start_time?: string; // ISO 8601
    duration_half?: number;
}

export interface MatchResponse {
    id: string;
    home_team: string;
    visitor_team: string;
    start_time: string;
    current_half: number;
    is_active: boolean;
    score_local: number;
    score_visitor: number;
    // Clock State
    last_start_ts?: string | null;
    accumulated_time_ms?: number;
    is_running?: boolean;
}

export type ClockAction = 'START' | 'STOP';

export interface ClockUpdatePayload {
    action: ClockAction;
}
