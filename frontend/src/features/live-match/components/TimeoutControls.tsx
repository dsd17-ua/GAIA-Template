
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
    activeTimeoutTeam?: TeamSide | null;
}

const MAX_TIMEOUTS = 3;

export const TimeoutControls: React.FC<TimeoutControlsProps> = ({
    onCallTimeout,
    timeoutsUsedLocal,
    timeoutsUsedVisitor,
    isGameRunning,
    homeTeamName,
    visitorTeamName,
    disabled = false,
    activeTimeoutTeam = null
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
        <div className="flex flex-col gap-4 bg-card text-card-foreground rounded-xl border shadow-sm p-4 h-full">
            {/* Active Timeout Indicator */}
            {!isGameRunning && activeTimeoutTeam && (
                <div className={`w-full text-center py-2 rounded-md font-bold animate-pulse ${activeTimeoutTeam === TeamSide.LOCAL
                        ? "bg-primary/20 text-primary border border-primary"
                        : "bg-destructive/20 text-destructive border border-destructive"
                    }`}>
                    TIMEOUT: {activeTimeoutTeam === TeamSide.LOCAL ? homeTeamName : visitorTeamName}
                </div>
            )}

            <div className="flex justify-between items-center w-full">
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
                    <div className="flex flex-col items-center mt-1">
                        {renderBubbles(timeoutsUsedLocal, TeamSide.LOCAL)}
                        <span className="text-[10px] text-muted-foreground mt-1">LOCAL</span>
                    </div>
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
                    <div className="flex flex-col items-center mt-1">
                        {renderBubbles(timeoutsUsedVisitor, TeamSide.VISITOR)}
                        <span className="text-[10px] text-muted-foreground mt-1">VISITOR</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
