import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/http';
import type { MatchResponse } from '../types';

export const useMatch = (matchId: string) => {
    return useQuery({
        queryKey: ['match', matchId],
        queryFn: async () => {
            const response = await api.get<MatchResponse>(`/matches/${matchId}`);
            return response.data;
        },
        enabled: !!matchId,
    });
};
