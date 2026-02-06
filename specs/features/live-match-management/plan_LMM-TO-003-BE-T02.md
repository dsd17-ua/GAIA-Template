# LMM-TO-003-BE-T02 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-003-BE-T02**  
**Related user story**: **LMM-TO-003** (Score Management)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: Links to `LMM-TO-003-BE-T02` and scenarios `Add Goal`.

---

## 1) Context & Objective
- **Ticket summary**: PATCH /matches/{id}/score
- **Impacted entities/tables**: Match.
- **Impacted services/modules**: Endpoint.
- **Impacted tests**: API Test.

## 2) Scope
- **In scope**: 
  - Update `score_local` or `score_visitor` via API.
- **Out of scope**: 
  - Goal Event (Actor, Minute) -> T004.
- **Assumptions**: 
  - Simple counter update.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define Test**: `test_matches_api.py` verify score update.
2.  **Implementation**:
    - Schema `UpdateScore`.
    - Router implementation.
3.  **Refactor**: None.

### 3.2 NFR hooks
- **Validation**: Cannot decrement below 0.

## 4) Atomic Task Breakdown

### Task 1: Endpoint
- **Purpose**: Update Score.
- **Artifacts impacted**: `backend/app/presentation/routers/matches.py`, `backend/app/application/match_service.py`.
- **Test types**: Integration.
- **BDD Acceptance**: POST score update reflects in GET.
