import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GameTimer } from "./GameTimer";
import * as api from "../api/updateClock";

// Mock the hook if complex, but testing integration is better.
// Mock the API call
vi.mock("../api/updateClock", () => ({
    updateMatchClock: vi.fn(),
}));

describe("GameTimer", () => {
    it("renders with initial 00:00", () => {
        render(<GameTimer matchId="123" />);
        expect(screen.getByText("00:00")).toBeInTheDocument();
    });

    it("calls updateMatchClock with START when Start button clicked", async () => {
        // mock resolved value
        (api.updateMatchClock as any).mockResolvedValue({
            id: "123",
            last_start_ts: new Date().toISOString(),
            accumulated_time_ms: 0,
            is_running: true
        });

        render(<GameTimer matchId="123" />);

        const startButton = screen.getByRole("button", { name: /Start/i });
        fireEvent.click(startButton);

        await waitFor(() => {
            expect(api.updateMatchClock).toHaveBeenCalledWith("123", { action: "START" });
        });
    });
});
