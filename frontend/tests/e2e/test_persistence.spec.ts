import { test, expect } from '@playwright/test';
import { MatchEventType } from '../../src/features/live-match/services/matchEventService';

test('Persistent Match State on Reload', async ({ page }) => {
    // 1. Create a new match
    await page.goto('http://localhost:5188/');
    // App redirects to /matches/new automatically

    await page.getByLabel('Home Team').fill('Persist Home');
    await page.getByLabel('Visitor Team').fill('Persist Visitor');
    await page.getByRole('button', { name: 'Start Match' }).click();

    // Wait for dashboard
    await expect(page).toHaveURL(/\/matches\/.*\/dashboard/);

    // 2. Add an event (Timeout for Local/Home team)
    // Click the first T-OUT button (Local team)
    const timeoutButtons = page.getByRole('button', { name: 'T-OUT' });
    await timeoutButtons.first().click();

    // Verify timeout indicator appears with home team name
    await expect(page.getByText(/TIMEOUT:.*Persist Home/)).toBeVisible();

    // 3. Reload the page
    await page.reload();

    // 4. Verify state is restored
    // Timeout indicator should still be visible
    await expect(page.getByText(/TIMEOUT:.*Persist Home/)).toBeVisible();

    // Verify teams are correct (fetched from backend, but good check)
    await expect(page.getByRole('heading', { name: 'Persist Home vs Persist Visitor' })).toBeVisible();
});
