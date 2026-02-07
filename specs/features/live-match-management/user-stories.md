# User Stories: Live Match Management

**Feature:** Live Match Management (`live-match-management`)
**Acronym:** `LMM`
**Primary Actor:** Table Official (`TO`)

To ensure the integrity and smooth running of a handball match, the Table Official needs a reliable tool to manage the scoreboard, time, and game events.

---

## 2. User Stories

### LMM-TO-001: Match Configuration
**As a** Table Official,
**I want** to configure the match details before starting,
**So that** the scoreboard reflects the correct teams and settings.

**Acceptance Criteria:**
- **Scenario 1: New Match Setup (Happy Path)**
  - Given I am on the home screen
  - When I select "New Match"
  - And I enter "Team A" as Local and "Team B" as Visitor
  - And I confirm the setup
  - Then the match dashboard should load with score 0-0 and timer at 00:00.

- **Scenario 2: Period Configuration**
  - Given I am setting up a match
  - When I check the default duration
  - Then it should be set to 30:00 minutes per half by default.

---

### LMM-TO-002: Game Clock Control
**As a** Table Official,
**I want** to start, stop, and manage the game clock,
**So that** the match duration is tracked accurately according to referee whistles.

**Acceptance Criteria:**
- **Scenario 1: Start/Stop Clock**
  - Given the match is active and clock is stopped
  - When I click "Start Time"
  - Then the clock should begin counting up (or down, configurable).
  - When I click "Stop Time"
  - Then the clock should pause immediately.

- **Scenario 2: Manual Time Adjustment**
  - Given the game is paused
  - When I edit the clock time manually
  - Then the new time should be reflected on the display.

---

### LMM-TO-003: Score Management
**As a** Table Official,
**I want** to update the goals for both teams,
**So that** the current result is visible and correct.

**Acceptance Criteria:**
- **Scenario 1: Add Goal**
  - Given the match is in progress
  - When I click "+1 Goal" for the Local Team
  - Then the Local Team score should increment by 1 instantly.

- **Scenario 2: Correct Score (Undo)**
  - Given I accidentally added a goal
  - When I click "-1 Goal" (or Undo)
  - Then the score should decrease by 1.
  - And the score cannot go below 0.

---

### LMM-TO-004: Disciplinary Sanctions (Exclusions & Cards)
**As a** Table Official,
**I want** to register cards and manage 2-minute exclusions,
**So that** I know when excluded players can return to the field.

**Acceptance Criteria:**
- **Scenario 1: Register 2-Minute Exclusion**
  - Given the match is in progress
  - When I add a "2 Min Suspension" for the Visitor Team
  - Then a separate 2-minute countdown timer should appear for that team.
  - And this exclusion timer should run only when the main game clock is running.

- **Scenario 2: Register Yellow/Red Cards**
  - Given the match is in progress
  - When I select a card (Yellow or Red) for a team
  - Then the event should be logged visually next to the team score.

---

### LMM-TO-005: Timeouts
**As a** Table Official,
**I want** to manage team timeouts,
**So that** I can track how many timeouts each team has used.

**Acceptance Criteria:**
- **Scenario 1: Call Timeout**
  - Given a team has timeouts remaining
  - When I activate "Timeout" for that team
  - Then the main game clock should stop automatically.
  - And the timeout counter for that team should increment.

- **Scenario 2: Timeout Limit**
  - Given a team has used 3 timeouts
  - When I attempt to add another
  - Then the system should warn that the limit is reached.

---

### LMM-TO-006: Local Data Persistence (Resilience)
**As a** Table Official,
**I want** the match state to be saved automatically,
**So that** I don't lose the game progress if the browser accidentally reloads.

**Acceptance Criteria:**
- **Scenario 1: Page Reload**
  - Given a match is in progress with Score 10-10 and Time 15:00
  - When the browser page is reloaded
  - Then the app should restore the exact same Score and Time.
  - And the clock should be in "Paused" state after reload.
