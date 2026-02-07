import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { TeamSide } from '@/features/live-match/services/matchEventService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddExclusionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (data: { team_side: TeamSide; player_number: number }) => void;
    homeTeamName: string;
    visitorTeamName: string;
}

export const AddExclusionDialog: React.FC<AddExclusionDialogProps> = ({
    isOpen, onClose, onAdd, homeTeamName, visitorTeamName
}) => {
    const [teamSide, setTeamSide] = useState<TeamSide>(TeamSide.LOCAL);
    const [playerNumber, setPlayerNumber] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const num = parseInt(playerNumber);
        if (num > 0) {
            onAdd({ team_side: teamSide, player_number: num });
            setPlayerNumber('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Add 2-Min Suspension</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Team</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                type="button"
                                variant={teamSide === TeamSide.LOCAL ? "default" : "outline"}
                                onClick={() => setTeamSide(TeamSide.LOCAL)}
                                className={`h-24 flex flex-col items-center justify-center gap-2 relative transition-all ${teamSide === TeamSide.LOCAL ? 'ring-2 ring-primary ring-offset-2' : 'hover:bg-accent'}`}
                            >
                                {teamSide === TeamSide.LOCAL && (
                                    <div className="absolute top-2 right-2">
                                        <Check className="h-4 w-4" />
                                    </div>
                                )}
                                <span className="text-xl font-bold">HOME</span>
                                <span className="text-sm opacity-90 truncate w-full text-center px-2">{homeTeamName}</span>
                            </Button>

                            <Button
                                type="button"
                                variant={teamSide === TeamSide.VISITOR ? "destructive" : "outline"}
                                onClick={() => setTeamSide(TeamSide.VISITOR)}
                                className={`h-24 flex flex-col items-center justify-center gap-2 relative transition-all ${teamSide === TeamSide.VISITOR ? 'ring-2 ring-destructive ring-offset-2' : 'hover:bg-accent'}`}
                            >
                                {teamSide === TeamSide.VISITOR && (
                                    <div className="absolute top-2 right-2">
                                        <Check className="h-4 w-4" />
                                    </div>
                                )}
                                <span className="text-xl font-bold">VISITOR</span>
                                <span className="text-sm opacity-90 truncate w-full text-center px-2">{visitorTeamName}</span>
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Player Number</Label>
                        <Input
                            type="number"
                            value={playerNumber}
                            onChange={(e) => setPlayerNumber(e.target.value)}
                            placeholder="e.g. 10"
                            required
                            min="1"
                            max="99"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Add Suspension
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};


