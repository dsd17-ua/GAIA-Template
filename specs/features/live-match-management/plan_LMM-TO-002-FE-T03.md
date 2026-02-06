# LMM-TO-002-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-002-FE-T03**  
**Related user story**: **LMM-TO-002** (Game Clock Control)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: Links to `LMM-TO-002-FE-T03` and scenarios `Start/Stop Clock`.

---

## 1) Context & Objective
- **Ticket summary**: Implement a `useGameTimer` hook and Timer Component to display and control math time.
- **Impacted entities/tables**: CLI-side state.
- **Impacted services/modules**: `src/features/live-match/hooks/useGameTimer.ts`.
- **Impacted tests**: Unit tests for the hook.

## 2) Scope
- **In scope**: 
  - `useGameTimer` hook: interval logic, start/stop methods, drift correction (optional for MVP, stick to simple delta).
  - `<GameTimer />` component: Display MM:SS. Start/Stop buttons.
  - Integration with `PATCH /clock` (optimistic).
- **Out of scope**: 
  - Complex server sync (trust local, push state to server).
- **Assumptions**: 
  - Precision of 1s display is enough, tracking in ms internally.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define Hook Test**: `useGameTimer.test.ts` (using `renderHook`).
2.  **Implementation**:
    - Hook logic (state: accumulated, lastStart, isRunning).
    - Component logic.
3.  **Refactor**: Clean up effect cleanup.

### 3.2 NFR hooks
- **Performance**: `requestAnimationFrame` or efficient `setInterval` to avoid UI lag.
- **Accessibility**: Aria labels for Start/Stop buttons.

## 4) Atomic Task Breakdown

### Task 1: Hook Implementation
- **Purpose**: Core Logic.
- **Artifacts impacted**: `src/features/live-match/hooks/useGameTimer.ts`.
- **Test types**: Unit.
- **BDD Acceptance**: `start()` moves state to running. `stop()` halts accumulation.

### Task 2: Component UI
- **Purpose**: Input/Output.
- **Artifacts impacted**: `src/features/live-match/components/GameTimer.tsx`.
- **Test types**: Component.
- **BDD Acceptance**: Displays formatted time. Clicking pause stops visual count.
