import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScoreBoard } from './ScoreBoard';
import { describe, it, expect, vi } from 'vitest';

describe('ScoreBoard Component', () => {
    it('renders current scores', () => {
        render(
            <ScoreBoard
                scoreLocal={10}
                scoreVisitor={5}
                onUpdateScore={() => { }}
                isUpdating={false}
            />
        );
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('interfaces with update callbacks correctly', () => {
        const handleUpdate = vi.fn();
        render(
            <ScoreBoard
                scoreLocal={0}
                scoreVisitor={0}
                onUpdateScore={handleUpdate}
                isUpdating={false}
            />
        );

        const localPlusBtn = screen.getByLabelText('Increment Local Score');
        fireEvent.click(localPlusBtn);
        expect(handleUpdate).toHaveBeenCalledWith('local', 1);

        const visitorPlusBtn = screen.getByLabelText('Increment Visitor Score');
        fireEvent.click(visitorPlusBtn);
        expect(handleUpdate).toHaveBeenCalledWith('visitor', 1);
    });

    it('renders disabled buttons when updating', () => {
        render(
            <ScoreBoard
                scoreLocal={0}
                scoreVisitor={0}
                onUpdateScore={() => { }}
                isUpdating={true}
            />
        );
        expect(screen.getByLabelText('Increment Local Score')).toBeDisabled();
    });
});
