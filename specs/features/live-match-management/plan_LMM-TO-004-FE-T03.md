# LMM-TO-004-FE-T03 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-004-FE-T03**  
**Related user story**: **LMM-TO-004** (Disciplinary Sanctions)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: Links to `LMM-TO-004-FE-T03` and scenarios `Exclusion Timer`.

---

## 1) Context & Objective
- **Ticket summary**: Display active exclusions and cards on the dashboard.
- **Impacted entities/tables**: UI State (Exclusion List).
- **Impacted services/modules**: `ExclusionList` Component.
- **Impacted tests**: Component test.

## 2) Scope
- **In scope**: 
  - `ExclusionList` component showing 2-min timers countdown.
  - Buttons to add sanctions (Yellow, Red, 2min) -> Modal/Popover.
  - Integration with `POST /events`.
- **Out of scope**: 
  - Complex animation. Beeping when time is up (nice to have, optional).

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define Test**: `ExclusionList.test.tsx` (RTL).
2.  **Implementation**:
    - `useExclusions` hook (derived from events or local state).
    - UI Components.
3.  **Refactor**: None.

### 3.2 NFR hooks
- **Clarity**: distinct colors for cards.

## 4) Atomic Task Breakdown

### Task 1: Component
- **Purpose**: UI.
- **Artifacts impacted**: `src/features/live-match/components/ExclusionList.tsx`.
- **Test types**: Component.
- **BDD Acceptance**: Start 2min exclusion -> timer counts down.
