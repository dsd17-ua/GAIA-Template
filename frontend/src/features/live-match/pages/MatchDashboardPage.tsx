import React from "react";
import { useParams } from "react-router-dom";
import { GameTimer } from "../components/GameTimer";
import { ScoreBoard } from "../components/ScoreBoard";
import { useMatch } from "../api/getMatch";
import { useMatchScore } from "../hooks/useMatchScore";
import { useMatchEvents } from "../hooks/useMatchEvents";
import { ExclusionList } from "../components/ExclusionList";
import { AddExclusionDialog } from "../components/AddExclusionDialog";
import { TimeoutControls } from "../components/TimeoutControls";
import { MatchEventType, TeamSide } from "../services/matchEventService";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const MatchDashboardPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: match, isLoading } = useMatch(id || "");
    const { updateScore, isUpdating } = useMatchScore(id || "");
    const { exclusions, events, addEvent } = useMatchEvents(id || "");
    const [isExclusionModalOpen, setIsExclusionModalOpen] = useState(false);

    const timeoutsLocal = events.filter(e => e.event_type === MatchEventType.TIMEOUT && e.team_side === TeamSide.LOCAL).length;
    const timeoutsVisitor = events.filter(e => e.event_type === MatchEventType.TIMEOUT && e.team_side === TeamSide.VISITOR).length;

    if (!id) return <div>Invalid Match ID</div>;
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
                        <GameTimer matchId={id} initialState={{
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
