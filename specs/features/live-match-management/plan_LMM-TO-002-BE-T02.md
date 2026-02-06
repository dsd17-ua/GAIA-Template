# LMM-TO-002-BE-T02 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-002-BE-T02**  
**Related user story**: **LMM-TO-002** (Game Clock Control)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: Links to `LMM-TO-002-BE-T02` and scenarios `Start/Stop Clock`.

---

## 1) Context & Objective
- **Ticket summary**: Expose `PATCH /matches/{id}/clock` to update timer state (Start/Pause).
- **Impacted entities/tables**: `Match`.
- **Impacted services/modules**: `MatchRouter`, `MatchService`.
- **Impacted tests**: API tests.

## 2) Scope
- **In scope**: 
  - Endpoint to receive `action` (START/STOP) or exact `accumulated_time_ms`.
  - Logic to update `is_running`, `last_start_ts`.
- **Out of scope**: 
  - Complex drift correction (trust client for MVP or simple server calculation).
- **Assumptions**: 
  - Server time is authoritative for `last_start_ts`.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define API Tests**: `test_matches_api.py` -> `test_update_clock`.
2.  **Implementation**:
    - Add `UpdateClock` schema.
    - Add `update_clock` method in Service.
    - Add Router endpoint.
3.  **Refactor**: Ensure consistency.

### 3.2 NFR hooks
- **Idempotency**: Stopping an already stopped clock should be 200 OK no-op.

## 4) Atomic Task Breakdown

### Task 1: Application Logic
- **Purpose**: Handle State Transition.
- **Artifacts impacted**: `backend/app/application/match_service.py`.
- **Test types**: Unit.
- **BDD Acceptance**: Start sets `is_running=True` and `last_start_ts=now`. Stop calculates `accumulated += now - start` and sets `is_running=False`.

### Task 2: API Endpoint
- **Purpose**: Expose logic.
- **Artifacts impacted**: `backend/app/presentation/routers/matches.py`.
- **Test types**: Integration.
- **BDD Acceptance**: PATCH returns updated state.
