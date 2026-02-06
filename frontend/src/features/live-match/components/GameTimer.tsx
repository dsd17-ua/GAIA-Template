import React from "react";
import { useGameTimer, TimerState } from "../hooks/useGameTimer";
import { updateMatchClock } from "../api/updateClock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";

interface GameTimerProps {
    matchId: string;
    initialState?: TimerState;
}

export const GameTimer: React.FC<GameTimerProps> = ({ matchId, initialState }) => {
    const { displayTime, isRunning, start, stop, setState } = useGameTimer(initialState);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleStart = async () => {
        try {
            setIsLoading(true);
            // Optimistic update
            start();
            const updatedMatch = await updateMatchClock(matchId, { action: "START" });

            // Sync state from server response (authoritative)
            if (updatedMatch.last_start_ts !== undefined) {
                setState({
                    isRunning: updatedMatch.is_running || false,
                    lastStartTs: updatedMatch.last_start_ts || null,
                    accumulatedTimeMs: updatedMatch.accumulated_time_ms || 0
                });
            }
        } catch (error) {
            console.error("Failed to start clock", error);
            // Rollback if needed (for MVP just logging)
            stop();
        } finally {
            setIsLoading(false);
        }
    };

    const handleStop = async () => {
        try {
            setIsLoading(true);
            // Optimistic update
            stop();
            const updatedMatch = await updateMatchClock(matchId, { action: "STOP" });

            // Sync state from server response
            if (updatedMatch.last_start_ts !== undefined) {
                setState({
                    isRunning: updatedMatch.is_running || false,
                    lastStartTs: updatedMatch.last_start_ts || null,
                    accumulatedTimeMs: updatedMatch.accumulated_time_ms || 0
                });
            }
        } catch (error) {
            console.error("Failed to stop clock", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-sm border-0 shadow-none bg-transparent">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Game Time
                </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
                <div className="text-4xl font-mono font-bold tabular-nums tracking-tight text-foreground" aria-label="Game Timer">
                    {displayTime}
                </div>
                <div className="flex gap-2">
                    {!isRunning ? (
                        <Button
                            onClick={handleStart}
                            disabled={isLoading}
                            size="icon"
                            className="h-10 w-10 rounded-full transition-all"
                            aria-label="Start Clock"
                        >
                            <Play className="h-4 w-4 fill-current" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleStop}
                            disabled={isLoading}
                            variant="secondary"
                            size="icon"
                            className="h-10 w-10 rounded-full transition-all"
                            aria-label="Stop Clock"
                        >
                            <Pause className="h-4 w-4 fill-current" />
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
