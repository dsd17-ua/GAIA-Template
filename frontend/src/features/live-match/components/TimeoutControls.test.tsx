
import { render, screen, fireEvent } from '@testing-library/react';
import { TimeoutControls } from './TimeoutControls';
import { TeamSide } from '../services/matchEventService';
import '@testing-library/jest-dom';

describe('TimeoutControls', () => {
    const mockOnCallTimeout = vi.fn();

    const defaultProps = {
        onCallTimeout: mockOnCallTimeout,
        timeoutsUsedLocal: 0,
        timeoutsUsedVisitor: 0,
        isGameRunning: true,
        homeTeamName: 'Home',
        visitorTeamName: 'Visitor',
        disabled: false
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders with correct buttons', () => {
        render(<TimeoutControls {...defaultProps} />);

        expect(screen.getAllByText('T-OUT')).toHaveLength(2);

        // Check local button
        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toBeEnabled(); // Local
        expect(buttons[1]).toBeEnabled(); // Visitor
    });

    test('calls onCallTimeout with correct side when clicked', () => {
        render(<TimeoutControls {...defaultProps} />);

        const buttons = screen.getAllByRole('button');

        // Click Local
        fireEvent.click(buttons[0]);
        expect(mockOnCallTimeout).toHaveBeenCalledWith(TeamSide.LOCAL);

        // Click Visitor
        fireEvent.click(buttons[1]);
        expect(mockOnCallTimeout).toHaveBeenCalledWith(TeamSide.VISITOR);
    });

    test('disables button when max timeouts reached', () => {
        render(<TimeoutControls {...defaultProps} timeoutsUsedLocal={3} />);

        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toBeDisabled(); // Local should be disabled
        expect(buttons[1]).toBeEnabled(); // Visitor still enabled
    });

    test('disables both buttons when globally disabled', () => {
        render(<TimeoutControls {...defaultProps} disabled={true} />);

        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toBeDisabled();
        expect(buttons[1]).toBeDisabled();
    });
});
