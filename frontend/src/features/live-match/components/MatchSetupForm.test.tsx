import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MatchSetupForm } from './MatchSetupForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';

// Mock the API hook
const mockMutate = vi.fn();

vi.mock('../api/createMatch', () => ({
    useCreateMatch: () => ({
        mutate: mockMutate,
        isPending: false,
        error: null,
    }),
}));

const renderWithProviders = (ui: React.ReactNode) => {
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>{ui}</BrowserRouter>
        </QueryClientProvider>
    );
};

describe('MatchSetupForm', () => {
    it('renders correctly', () => {
        renderWithProviders(<MatchSetupForm />);
        expect(screen.getByText('New Match')).toBeInTheDocument();
        expect(screen.getByLabelText(/home team/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/visitor team/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /start match/i })).toBeInTheDocument();
    });

    it('validates required fields', async () => {
        renderWithProviders(<MatchSetupForm />);

        const submitBtn = screen.getByRole('button', { name: /start match/i });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            // Check for Zod validation messages
            expect(screen.getByText(/Home team name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Visitor team name is required/i)).toBeInTheDocument();
        });

        expect(mockMutate).not.toHaveBeenCalled();
    });

    it('submits valid data', async () => {
        renderWithProviders(<MatchSetupForm />);

        fireEvent.change(screen.getByLabelText(/home team/i), { target: { value: 'Team A' } });
        fireEvent.change(screen.getByLabelText(/visitor team/i), { target: { value: 'Team B' } });

        fireEvent.click(screen.getByRole('button', { name: /start match/i }));

        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalledWith(
                expect.objectContaining({
                    home_team: 'Team A',
                    visitor_team: 'Team B',
                }),
                expect.anything()
            );
        });
    });
});
