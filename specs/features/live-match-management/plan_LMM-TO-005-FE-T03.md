# LMM-TO-005-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-005-FE-T03**  
**Related user story**: **LMM-TO-005** (Timeouts)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: Links to `LMM-TO-005-FE-T03` and scenarios `Call Timeout`.

---

## 1) Context & Objective
- **Ticket summary**: UI to request timeout.
- **Impacted entities/tables**: UI State.
- **Impacted services/modules**: `TimeoutControls` Component.
- **Impacted tests**: Component test.

## 2) Scope
- **In scope**: 
  - Button "T" or "Time-out" per team.
  - Disable if count >= 3 or clock stopped (rules apply).
  - Countdown for timeout duration (1 min standard) - Optional visually but good for UX.
- **Out of scope**: 
  - Complex buzzer sound.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define Test**: `TimeoutControls.test.tsx`.
2.  **Implementation**:
    - Component.
    - Integration with `POST /events`.
3.  **Refactor**: None.

### 3.2 NFR hooks
- **Feedback**: Show "Timeout Active" banner/modal.

## 4) Atomic Task Breakdown

### Task 1: Component
- **Purpose**: UI.
- **Artifacts impacted**: `src/features/live-match/components/TimeoutControls.tsx`.
- **Test types**: Component.
- **BDD Acceptance**: Click timeout -> calls API, shows active state.
