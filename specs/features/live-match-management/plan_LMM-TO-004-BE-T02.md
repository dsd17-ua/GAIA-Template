# LMM-TO-004-BE-T02 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-004-BE-T02**  
**Related user story**: **LMM-TO-004** (Disciplinary Sanctions)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: Links to `LMM-TO-004-BE-T02` and scenarios `Exclusion Timer`.

---

## 1) Context & Objective
- **Ticket summary**: POST /matches/{id}/events
- **Impacted entities/tables**: `match_events`.
- **Impacted services/modules**: `MatchRouter`, `MatchService`.
- **Impacted tests**: API integration.

## 2) Scope
- **In scope**: 
  - Endpoint to log events (Goals, Cards, Exclusions).
  - Pydantic Validation (event type, player number).
- **Out of scope**: 
  - Complex state machine (e.g. banning player actions after red card) - MVP just logs.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define Test**: `test_events_api.py`.
2.  **Implementation**:
    - Schema `CreateEvent`.
    - Service logic.
    - Router endpoint.
3.  **Refactor**: None.

### 3.2 NFR hooks
- **Validation**: `player_number` must be valid integer (1-99).

## 4) Atomic Task Breakdown

### Task 1: Endpoint
- **Purpose**: Log Event.
- **Artifacts impacted**: `backend/app/presentation/routers/events.py` (or matches.py sub-router).
- **Test types**: Integration.
- **BDD Acceptance**: POST event returns 201.
