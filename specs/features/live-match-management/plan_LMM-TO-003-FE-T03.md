# LMM-TO-003-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-003-FE-T03**  
**Related user story**: **LMM-TO-003** (Score Management)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: Links to `LMM-TO-003-FE-T03` and scenarios `Add Goal`.

---

## 1) Context & Objective
- **Ticket summary**: Controls to increment/decrement scores.
- **Impacted entities/tables**: UI State.
- **Impacted services/modules**: `ScoreBoard` Component, `useScore` hook.
- **Impacted tests**: Component test.

## 2) Scope
- **In scope**: 
  - `ScoreBoard` component: Large numbers, + / - buttons.
  - Integration: `PATCH /score` endpoint (optional sync).
- **Out of scope**: 
  - Complex animation (MVP).

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define Test**: `ScoreBoard.test.tsx` (RTL).
2.  **Implementation**:
    - Hook logic.
    - Component.
3.  **Refactor**: None.

### 3.2 NFR hooks
- **Accessibility**: Big buttons, descriptive labels.

## 4) Atomic Task Breakdown

### Task 1: Component
- **Purpose**: UI.
- **Artifacts impacted**: `src/features/live-match/components/ScoreBoard.tsx`.
- **Test types**: Component.
- **BDD Acceptance**: Click + increments displayed score.
