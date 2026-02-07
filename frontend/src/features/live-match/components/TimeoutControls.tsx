
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { TeamSide } from '../services/matchEventService';

interface TimeoutControlsProps {
    onCallTimeout: (teamSide: TeamSide) => void;
    timeoutsUsedLocal: number;
    timeoutsUsedVisitor: number;
    isGameRunning: boolean;
    homeTeamName: string;
    visitorTeamName: string;
    disabled?: boolean;
}

const MAX_TIMEOUTS = 3;

export const TimeoutControls: React.FC<TimeoutControlsProps> = ({
    onCallTimeout,
    timeoutsUsedLocal,
    timeoutsUsedVisitor,
    isGameRunning,
    homeTeamName,
    visitorTeamName,
    disabled = false
}) => {

    const renderBubbles = (used: number, teamSide: TeamSide) => {
        return (
            <div className="flex gap-1 mt-1">
                {Array.from({ length: MAX_TIMEOUTS }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full border ${i < (MAX_TIMEOUTS - used)
                                ? (teamSide === TeamSide.LOCAL ? 'bg-primary border-primary' : 'bg-destructive border-destructive')
                                : 'bg-transparent border-gray-300'
                            }`}
                        title={i < (MAX_TIMEOUTS - used) ? "Available" : "Used"}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="flex justify-between items-center bg-card text-card-foreground rounded-xl border shadow-sm p-4 h-full">
            <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex justify-between w-full items-center">
                    {/* Local Timeout */}
                    <div className="flex flex-col items-center">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex gap-2 border-primary text-primary hover:bg-primary/10"
                            disabled={disabled || timeoutsUsedLocal >= MAX_TIMEOUTS}
                            onClick={() => onCallTimeout(TeamSide.LOCAL)}
                        >
                            <Clock className="w-4 h-4" />
                            <span className="font-bold">T-OUT</span>
                        </Button>
                        {renderBubbles(timeoutsUsedLocal, TeamSide.LOCAL)}
                    </div>

                    <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                        Timeouts
                    </div>

                    {/* Visitor Timeout */}
                    <div className="flex flex-col items-center">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex gap-2 border-destructive text-destructive hover:bg-destructive/10"
                            disabled={disabled || timeoutsUsedVisitor >= MAX_TIMEOUTS}
                            onClick={() => onCallTimeout(TeamSide.VISITOR)}
                        >
                            <span className="font-bold">T-OUT</span>
                            <Clock className="w-4 h-4" />
                        </Button>
                        {renderBubbles(timeoutsUsedVisitor, TeamSide.VISITOR)}
                    </div>
                </div>
            </div>
        </div>
    );
};
