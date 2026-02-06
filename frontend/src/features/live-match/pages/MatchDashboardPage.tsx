import React from "react";
import { useParams } from "react-router-dom";
import { GameTimer } from "../components/GameTimer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const MatchDashboardPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) return <div>Invalid Match ID</div>;

    return (
        <div className="container mx-auto p-8 space-y-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Match Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Game Clock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <GameTimer matchId={id} />
                    </CardContent>
                </Card>

                {/* Placeholders for other widgets */}
                <Card className="opacity-50">
                    <CardHeader>
                        <CardTitle>Scoreboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Coming soon...
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
