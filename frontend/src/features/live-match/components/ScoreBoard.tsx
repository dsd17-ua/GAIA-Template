import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming this exists based on standards
// If not, I'll fallback to standard HTML or check where Button is. MatchSetupForm will tell me.

interface ScoreBoardProps {
    scoreLocal: number;
    scoreVisitor: number;
    homeTeamName: string;
    visitorTeamName: string;
    onUpdateScore: (team: 'local' | 'visitor', delta: number) => void;
    isUpdating: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
    scoreLocal,
    scoreVisitor,
    homeTeamName,
    visitorTeamName,
    onUpdateScore,
    isUpdating
}) => {
    return (
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto border border-gray-100">
            {/* Local Team */}
            <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{homeTeamName}</span>
                <span className="text-6xl font-bold text-gray-900 font-mono tracking-tight">{scoreLocal}</span>
                <div className="flex gap-2 mt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateScore('local', -1)}
                        disabled={isUpdating || scoreLocal <= 0}
                        aria-label="Decrement Local Score"
                        className="w-10 h-10 p-0 rounded-full border-2"
                    >
                        -
                    </Button>
                    <Button
                        onClick={() => onUpdateScore('local', 1)}
                        disabled={isUpdating}
                        aria-label="Increment Local Score"
                        className="w-10 h-10 p-0 rounded-full shadow-sm bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        +
                    </Button>
                </div>
            </div>

            <div className="h-16 w-px bg-gray-200 mx-4"></div>

            {/* Visitor Team */}
            <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{visitorTeamName}</span>
                <span className="text-6xl font-bold text-gray-900 font-mono tracking-tight">{scoreVisitor}</span>
                <div className="flex gap-2 mt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateScore('visitor', -1)}
                        disabled={isUpdating || scoreVisitor <= 0}
                        aria-label="Decrement Visitor Score"
                        className="w-10 h-10 p-0 rounded-full border-2"
                    >
                        -
                    </Button>
                    <Button
                        onClick={() => onUpdateScore('visitor', 1)}
                        disabled={isUpdating}
                        aria-label="Increment Visitor Score"
                        className="w-10 h-10 p-0 rounded-full shadow-sm bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        +
                    </Button>
                </div>
            </div>
        </div>
    );
};
