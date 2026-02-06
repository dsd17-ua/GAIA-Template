import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateMatch } from '../api/createMatch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const matchSchema = z.object({
    home_team: z.string().min(2, "Home team name is required (min 2 chars)"),
    visitor_team: z.string().min(2, "Visitor team name is required (min 2 chars)"),
});

type MatchFormData = z.infer<typeof matchSchema>;

export const MatchSetupForm = () => {
    const navigate = useNavigate();
    const { mutate, isPending, error } = useCreateMatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MatchFormData>({
        resolver: zodResolver(matchSchema),
        defaultValues: {
            home_team: '',
            visitor_team: '',
        },
    });

    const onSubmit = (data: MatchFormData) => {
        mutate(data, {
            onSuccess: (match) => {
                navigate(`/matches/${match.id}/dashboard`);
            },
        });
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">New Match</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="home_team">Home Team</Label>
                        <Input
                            id="home_team"
                            placeholder="e.g. Locals API"
                            {...register('home_team')}
                        />
                        {errors.home_team && (
                            <p className="text-sm text-red-500 font-medium">{errors.home_team.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="visitor_team">Visitor Team</Label>
                        <Input
                            id="visitor_team"
                            placeholder="e.g. Visitors API"
                            {...register('visitor_team')}
                        />
                        {errors.visitor_team && (
                            <p className="text-sm text-red-500 font-medium">{errors.visitor_team.message}</p>
                        )}
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                            Failed to create match. Please try again.
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? 'Creating...' : 'Start Match'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};
