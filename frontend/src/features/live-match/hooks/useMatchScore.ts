import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/http';
import type { MatchResponse, MatchScoreUpdate } from '../types';

export const useMatchScore = (matchId: string) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: MatchScoreUpdate) => {
            const response = await api.patch<MatchResponse>(`/matches/${matchId}/score`, data);
            return response.data;
        },
        onMutate: async (newData) => {
            // Cancel outgoing refetches
            const queryKey = ['match', matchId];
            await queryClient.cancelQueries({ queryKey });

            // Snapshot previous value
            const previousMatch = queryClient.getQueryData<MatchResponse>(queryKey);

            // Optimistically update
            if (previousMatch) {
                const currentScoreLocal = previousMatch.score_local;
                const currentScoreVisitor = previousMatch.score_visitor;

                const newLocal = newData.score_local !== undefined ? newData.score_local : currentScoreLocal;
                const newVisitor = newData.score_visitor !== undefined ? newData.score_visitor : currentScoreVisitor;

                queryClient.setQueryData<MatchResponse>(queryKey, {
                    ...previousMatch,
                    score_local: newLocal,
                    score_visitor: newVisitor
                });
            }

            return { previousMatch };
        },
        onError: (_err, _newTodo, context: any) => {
            const queryKey = ['match', matchId];
            if (context?.previousMatch) {
                queryClient.setQueryData(queryKey, context.previousMatch);
            }
        },
        onSettled: () => {
            const queryKey = ['match', matchId];
            queryClient.invalidateQueries({ queryKey });
        },
    });

    const updateScore = (team: 'local' | 'visitor', delta: number) => {
        const queryKey = ['match', matchId];
        const currentData = queryClient.getQueryData<MatchResponse>(queryKey);
        if (!currentData) return;

        const currentScore = team === 'local' ? currentData.score_local : currentData.score_visitor;
        let newScore = currentScore + delta;
        if (newScore < 0) newScore = 0;

        const payload = team === 'local'
            ? { score_local: newScore }
            : { score_visitor: newScore };

        mutate(payload);
    };

    return {
        updateScore,
        isUpdating: isPending
    };
};
