import { useMutation } from '@tanstack/react-query';
import { api } from '@/api/http';
import type { MatchResponse, MatchScoreUpdate } from '../types';

export const useUpdateScore = () => {
    return useMutation({
        mutationFn: async ({ matchId, data }: { matchId: string; data: MatchScoreUpdate }) => {
            const response = await api.patch<MatchResponse>(`/matches/${matchId}/score`, data);
            return response.data;
        },
    });
};
