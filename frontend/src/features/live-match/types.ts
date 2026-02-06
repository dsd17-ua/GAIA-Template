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
}
