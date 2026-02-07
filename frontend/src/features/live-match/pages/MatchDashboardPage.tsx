import { useParams } from "react-router-dom";
import { GameTimer } from "../components/GameTimer";
import { ScoreBoard } from "../components/ScoreBoard";
import { useMatch } from "../api/getMatch";
import { useMatchScore } from "../hooks/useMatchScore";
import { useMatchEvents } from "../hooks/useMatchEvents";
import { useMatchPersistence } from '../hooks/useMatchPersistence';
import { storageService } from '../services/storage';
import { ExclusionList } from "../components/ExclusionList";
import { AddExclusionDialog } from "../components/AddExclusionDialog";
import { TimeoutControls } from "../components/TimeoutControls";
import { MatchEventType, TeamSide } from "../services/matchEventService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useMemo } from "react";

export const MatchDashboardPage: React.FC = () => {
    const { matchId } = useParams<{ matchId: string }>();
    // const navigate = useNavigate(); // Removed as per instruction

    // 1. Load persisted state synchronously (lazy initializer)
    const persistedState = useMemo(() => {
        if (!matchId) return null;
        return storageService.loadMatchState(matchId);
    }, [matchId]);

    // 2. Initialize hooks
    const { data: match, isLoading } = useMatch(matchId!); // Removed 'error' as per instruction
    const { updateScore, isUpdating } = useMatchScore(matchId!);

    // Initialize events with persisted data if available
    const { events, exclusions, addEvent } = useMatchEvents( // Removed 'isCreating' as per instruction
        matchId!,
        persistedState?.events || []
    );

    // 3. Enable Persistence Sync
    useMatchPersistence(matchId, match, events);
    const [isExclusionModalOpen, setIsExclusionModalOpen] = useState(false);

    const timeoutsLocal = events.filter(e => e.event_type === MatchEventType.TIMEOUT && e.team_side === TeamSide.LOCAL).length;
    const timeoutsVisitor = events.filter(e => e.event_type === MatchEventType.TIMEOUT && e.team_side === TeamSide.VISITOR).length;

    if (!matchId) return <div>Invalid Match ID</div>;
    if (isLoading) return <div>Loading match...</div>;
    if (!match) return <div>Match not found</div>;

    return (
        <div className="container mx-auto p-8 space-y-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {match.home_team} vs {match.visitor_team}
            </h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Game Clock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <GameTimer matchId={matchId!} initialState={{
                            accumulatedTimeMs: match.accumulated_time_ms || 0,
                            lastStartTs: match.last_start_ts || null,
                            isRunning: match.is_running || false
                        }} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Scoreboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScoreBoard
                            scoreLocal={match.score_local}
                            scoreVisitor={match.score_visitor}
                            homeTeamName={match.home_team}
                            visitorTeamName={match.visitor_team}
                            onUpdateScore={updateScore}
                            isUpdating={isUpdating}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sanctions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ExclusionList
                            exclusions={exclusions}
                            onAddExclusion={() => setIsExclusionModalOpen(true)}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Timeouts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TimeoutControls
                            timeoutsUsedLocal={timeoutsLocal}
                            timeoutsUsedVisitor={timeoutsVisitor}
                            isGameRunning={match.is_running || false}
                            homeTeamName={match.home_team}
                            visitorTeamName={match.visitor_team}
                            activeTimeoutTeam={
                                !match.is_running && events.length > 0 && events[events.length - 1].event_type === MatchEventType.TIMEOUT
                                    ? events[events.length - 1].team_side
                                    : null
                            }
                            onCallTimeout={(side) => addEvent({
                                event_type: MatchEventType.TIMEOUT,
                                team_side: side,
                                minute: 0 // Should use game timer
                            })}
                        />
                    </CardContent>
                </Card>
            </div>

            <AddExclusionDialog
                isOpen={isExclusionModalOpen}
                onClose={() => setIsExclusionModalOpen(false)}
                onAdd={(data) => {
                    addEvent({
                        event_type: MatchEventType.TWO_MIN,
                        team_side: data.team_side,
                        minute: 0, // Should use game timer
                        player_number: data.player_number
                    });
                }}
                homeTeamName={match.home_team}
                visitorTeamName={match.visitor_team}
            />
        </div>
    );
};
