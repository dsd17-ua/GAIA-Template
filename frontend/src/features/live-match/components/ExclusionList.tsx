import React, { useState, useEffect } from 'react';
import { MatchEvent } from '@/features/live-match/services/matchEventService';

interface ExclusionListProps {
    exclusions: MatchEvent[]; // Only TWO_MIN events
    onAddExclusion: () => void;
}

export const ExclusionList: React.FC<ExclusionListProps> = ({ exclusions, onAddExclusion }) => {
    // Timer logic would go here or in a hook. For MVP, we just list them.
    // Real countdown requires created_at + 2 mins - now.

    const calculateTimeLeft = (createdAt: string) => {
        const start = new Date(createdAt).getTime();
        const end = start + 2 * 60 * 1000;
        const now = new Date().getTime();
        const diff = end - now;
        if (diff <= 0) return "0:00";
        const m = Math.floor(diff / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const [, setTick] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    if (exclusions.length === 0) {
        return (
            <div className="p-4 border rounded bg-gray-50 text-center text-gray-500">
                <p>No active exclusions</p>
                <button
                    onClick={onAddExclusion}
                    className="mt-2 text-blue-600 hover:underline"
                >
                    Add Exclusion
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-sm">Active Exclusions</h3>
                <button
                    onClick={onAddExclusion}
                    className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                >
                    Add Exclusion
                </button>
            </div>
            {exclusions.map(ex => (
                <div key={ex.id} className="flex justify-between items-center p-2 bg-white border rounded shadow-sm">
                    <span className="font-bold">#{ex.player_number}</span>
                    <span className="font-mono text-red-600">
                        {calculateTimeLeft(ex.created_at)}
                    </span>
                    <span className="text-xs text-gray-500">{ex.team_side}</span>
                </div>
            ))}
        </div>
    );
};
