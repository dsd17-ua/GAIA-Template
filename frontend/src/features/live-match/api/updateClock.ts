import axios from 'axios';
import type { MatchResponse, ClockUpdatePayload } from '../types';

export const updateMatchClock = async (matchId: string, payload: ClockUpdatePayload): Promise<MatchResponse> => {
    const response = await axios.patch(`/api/v1/matches/${matchId}/clock`, payload);
    return response.data;
};
