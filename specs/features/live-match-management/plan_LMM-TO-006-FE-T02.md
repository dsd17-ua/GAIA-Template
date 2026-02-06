# LMM-TO-006-FE-T02 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-006-FE-T02**  
**Related user story**: **LMM-TO-006** (Local Data Persistence)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: Links to `LMM-TO-006-FE-T02` and scenarios `Offline Recovery`.

---

## 1) Context & Objective
- **Ticket summary**: Restore match state from localStorage on application load.
- **Impacted entities/tables**: Store Init Logic.
- **Impacted services/modules**: `useMatchStore.initialize`.
- **Impacted tests**: Unit.

## 2) Scope
- **In scope**: 
  - `loadMatchState(id)` service method.
  - Call during Component Mount or Store Init.
  - Basic validation (if date > 24h old, ignore? MVP: just load).
- **Out of scope**: 
  - Conflict resolution with Server (MVP is local-first/offline tolerant).

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define Test**: `hydration.test.ts`.
2.  **Implementation**:
    - Loader Logic.
    - Integration to `useMatchStore`.
3.  **Refactor**: None.

### 3.2 NFR hooks
- **UX**: Show "Restored from backup" toast.

## 4) Atomic Task Breakdown

### Task 1: Loader Logic
- **Purpose**: Hydrate.
- **Artifacts impacted**: `src/features/live-match/services/storage.ts` (update).
- **Test types**: Unit.
- **BDD Acceptance**: Refresh page maintains score.
