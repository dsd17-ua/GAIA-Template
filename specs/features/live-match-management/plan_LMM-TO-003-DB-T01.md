# LMM-TO-003-DB-T01 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-003-DB-T01**  
**Related user story**: **LMM-TO-003** (Score Management)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: Links to `LMM-TO-003-DB-T01` and scenarios `Add Goal`.

---

## 1) Context & Objective
- **Ticket summary**: Add `score_local` and `score_visitor` columns to `matches` table.
- **Impacted entities/tables**: `matches`.
- **Impacted services/modules**: `Match` Model.
- **Impacted tests**: Repo integration test.

## 2) Scope
- **In scope**: 
  - Migration adding 2 integer columns (default 0).
  - Model update.
- **Out of scope**: 
  - Complex history log (that's T004 - Events).
- **Assumptions**: 
  - Negative scores blocked at App/Constraint level (Check Constraint optional but good).

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define Test**: `tests/integration/test_matches_score.py` verifying persistence.
2.  **Implementation**:
    - Model update.
    - Migration.
    - Apply.
3.  **Refactor**: None.

### 3.2 NFR hooks
- **Integrity**: `CHECK(score_local >= 0)`.

## 4) Atomic Task Breakdown

### Task 1: Model & Migration
- **Purpose**: Persist scores.
- **Artifacts impacted**: `backend/app/infrastructure/models/match.py`, `backend/alembic/versions/*_add_scores.py`.
- **Test types**: Integration.
- **BDD Acceptance**: Can save match with score 10-10.
