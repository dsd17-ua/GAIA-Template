# Custom Feature Implementation Tickets

## Feature: Live Match Management (`live-match-management`)
This feature covers the local-first match management system. Since it's MVP and "Local Persistence" is key, we prioritize frontend logic but include Backend/DB support for future sync or basic state saving if connectivity exists.

---

### Story: LMM-TO-001 — Match Configuration
**Source**: `user-stories.md`
**Key Scenarios**: New Match Setup, Period Configuration

#### Tickets for LMM-TO-001

1. - [x] **LMM-TO-001-DB-T01 — Create Matches Table**
   - **Type**: DB
   - **Description**: Create `matches` table to store configuration and current state.
   - **Scope**: Table `matches` (id, home_team, visitor_team, start_time, duration_half, current_half, is_active).
   - **Deliverables**: Alembic migration.

2. - [x] **LMM-TO-001-BE-T02 — Create Match Endpoint** (2026-02-06)
   - **Type**: BE
   - **Description**: Endpoint `POST /api/v1/matches` to initialize a new match.
   - **Scope**: Pydantic models `MatchCreate`, `MatchResponse`.
   - **Dependencies**: T01.
   - **Deliverables**: Validated endpoint.

3. - [x] **LMM-TO-001-FE-T03 — Match Setup Form** (2026-02-06)
   - **Type**: FE
   - **Description**: UI form to input team names and create match.
   - **Scope**: Inputs for Local/Visitor names. "Start Match" button.
   - **Dependencies**: T02 (or mock).
   - **Deliverables**: Form component, Zod validation, Navigation to Dashboard.

---

### Story: LMM-TO-002 — Game Clock Control
**Source**: `user-stories.md`
**Key Scenarios**: Start/Stop Clock, Manual Time Adjustment

#### Tickets for LMM-TO-002

1. - [x] **LMM-TO-002-DB-T01 — Add Clock State to Matches** (2026-02-06)
   - **Type**: DB
   - **Description**: Add columns to track clock state (last_start_ts, accumulated_time_ms, is_running).
   - **Scope**: Migration to alter `matches` table.
   - **Deliverables**: Alembic migration.

2. - [x] **LMM-TO-002-BE-T02 — Endpoint `PATCH /api/v1/matches/{id}/clock` (Start/Stop)** (2026-02-06)
   - **Type**: BE
   - **Description**: Endpoint `PATCH /matches/{id}/clock` to sync time state.
   - **Scope**: Logic to calculate server-side time or trust client timestamp (MVP: trust client or simple sync).
   - **Dependencies**: T01.

3. - [x] (2026-02-06) **LMM-TO-002-FE-T03**: Game Clock Frontend t (Hook)**
   - **Type**: FE
   - **Description**: Build a robust `useGameTimer` hook.
   - **Scope**: `setInterval` logic, precise time tracking (delta), specialized Pause/Resume controls.
   - **Deliverables**: `<GameTimer />` component, Unit tests for hook.
- [x] (2026-02-06) **LMM-BUG-001**: Fix missing matches table (500 Error)

---

### Story: LMM-TO-003 — Score Management
**Source**: `user-stories.md`
**Key Scenarios**: Add Goal, Undo

#### Tickets for LMM-TO-003

1. - [x] **LMM-TO-003-DB-T01 — Add Scores to Matches** (2026-02-06)
   - **Type**: DB
   - **Description**: Add `score_local` and `score_visitor` columns.
   - **Scope**: Migration.
   - **Deliverables**: Migration.

   - **Deliverables**: Migration.

2. - [x] **LMM-TO-003-BE-T02 — Update Score Endpoint** (2026-02-06)
   - **Type**: BE
   - **Description**: `PATCH /matches/{id}/score` to update goals.
   - **Scope**: Atomic updates preferred or simple state overwrite for MVP.
   - **Dependencies**: T01.

3. - [x] **LMM-TO-003-FE-T03** (Scoreboard UI)
  - [x] `ScoreBoard.tsx` (Component)
  - [x] `useMatchScore` (Hook)
  - [x] `MatchDashboardPage` (Integration)
  - [x] Test component

- [x] **LMM-BUG-002** (Scoreboard Team Names)
  - [x] Update `ScoreBoard` props
  - [x] Pass team names from `MatchDashboardPage`
  - [x] Verify fix
   - **Type**: FE
   - **Description**: Large buttons for +1 Goal (Local/Visitor) and correction (-1).
   - **Scope**: Optimistic UI updates (React Query w/ `onMutate`).
   - **Deliverables**: Score component, instant feedback.

---

### Story: LMM-TO-004 — Disciplinary Sanctions
**Source**: `user-stories.md`
**Key Scenarios**: 2-Min Suspension, Cards

#### Tickets for LMM-TO-004

1. - [x] **LMM-TO-004-DB-T01 — Create Match Events Table**
   - **Type**: DB
   - **Description**: Table `match_events` for log (goals, fouls, exclusions).
   - **Scope**: `id`, `match_id`, `event_type` (GOAL, 2MIN, YELLOW, RED), `team_side`, `minute`, `player_number`.
   - **Deliverables**: Migration.

2. - [x] **LMM-TO-004-BE-T02 — Log Event Endpoint**
   - **Type**: BE
   - **Description**: `POST /matches/{id}/events`.
   - **Scope**: Generic event logger.
   - **Dependencies**: T01.

3. - [x] **LMM-TO-004-FE-T03 — Exclusion Timers UI** (2026-02-07)
   - **Type**: FE
   - **Description**: Management of concurrent 2-min timers.
   - **Scope**: "Add Suspension" button. countdowns associated with game clock (pause when game pauses).
   - **Deliverables**: `<ExclusionList />` component.

4. - [x] **LMM-BUG-003 — Fix useMatchEvents Import Error** (2026-02-07)
   - **Type**: BUG
   - **Description**: Fix `SyntaxError` due to missing `type` modifier in imports (caused by `verbatimModuleSyntax`).
   - **Scope**: `useMatchEvents.ts`, `ExclusionList.tsx`, etc.
   - **Deliverables**: Working build.

5. - [x] **LMM-BUG-005 — Improve Team Selection Visibility** (2026-02-07)
   - **Type**: UX/BUG
   - **Description**: The team selection in `AddExclusionDialog` is ambiguous. Needs better visual cues (colors/buttons) to distinguish Home vs Visitor.
   - **Scope**: `AddExclusionDialog.tsx`.
   - **Deliverables**: Improved UI for team selection.

---

### Story: LMM-TO-005 — Timeouts
**Source**: `user-stories.md`
**Key Scenarios**: Call Timeout, Timeout Limit

#### Tickets for LMM-TO-005

1. - [ ] **LMM-TO-005-DB-T01 — Add Timeout Columns**
   - **Type**: DB
   - **Description**: Track used timeouts `timeouts_local`, `timeouts_visitor` in `matches` or aggregate from events.
   - **Scope**: Migration or Reuse `match_events`. Let's use `matches` count for simplicity or events. (Decision: Events table is better). Reuse LMM-TO-004-DB-T01.
   - **Description**: Verify `match_events` handles TIMEOUT type.

2. - [ ] **LMM-TO-005-BE-T02 — Timeout Validation Logic**
   - **Type**: BE
   - **Description**: Ensure max 3 timeouts per team.
   - **Scope**: Validation in `POST /events`.
   - **Dependencies**: LMM-TO-004-BE-T02.

3. - [ ] **LMM-TO-005-FE-T03 — Timeout Button & Counter**
   - **Type**: FE
   - **Description**: UI to request timeout.
   - **Scope**: Stop clock automatically when pressed. Show indicators (bubbles) of used timeouts.
   - **Deliverables**: Timeout controls.

---

### Story: LMM-TO-006 — Local Data Persistence
**Source**: `user-stories.md`
**Key Scenarios**: Page Reload

#### Tickets for LMM-TO-006

1. - [ ] **LMM-TO-006-FE-T01 — LocalStorage Sync Layer**
   - **Type**: FE
   - **Description**: Implement a persistency layer (middleware or effect) that saves Match State to `localStorage` on every change.
   - **Scope**: `useLocalStorage` for the main `useMatch` hook.
   - **Deliverables**: Robust restore on reload.

2. - [ ] **LMM-TO-006-FE-T02 — State Rehydration Logic**
   - **Type**: FE
   - **Description**: Logic to decide whether to load from Server or LocalStorage (Conflict resolution strategy: simplified "Local wins" for MVP).
   - **Scope**: Hook initialization.
   - **Deliverables**: Rehydration tests.
