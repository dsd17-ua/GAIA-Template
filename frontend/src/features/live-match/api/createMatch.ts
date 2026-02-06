import { useMutation } from '@tanstack/react-query';
import { api } from '@/api/http';
import type { MatchCreate, MatchResponse } from '../types';

export const useCreateMatch = () => {
    return useMutation({
        mutationFn: async (data: MatchCreate) => {
            const response = await api.post<MatchResponse>('/matches', data);
            return response.data;
        },
    });
};
