# LMM-TO-002-DB-T01 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-002-DB-T01**  
**Related user story**: **LMM-TO-002** (Game Clock Control)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: Links to `LMM-TO-002-DB-T01` and scenarios `Start/Stop Clock`.

---

## 1) Context & Objective
- **Ticket summary**: Add clock state tracking to the `matches` table to persist timer status (running/stopped) and accumulated time.
- **Impacted entities/tables**: Table `matches`.
- **Impacted services/modules**: `Match` Model, Alembic.
- **Impacted tests**: Integration tests for repo updates.

## 2) Scope
- **In scope**: 
  - Migration to add: `last_start_ts` (nullable timestamp), `accumulated_time_ms` (int, default 0), `is_running` (boolean).
  - Update `Match` SQLAlchemy model.
  - Update `Match` Pydantic schemas (if necessary for internal use, though BE-T02 handles public API).
- **Out of scope**: 
  - Time synchronization logic (handled in BE/FE).
- **Assumptions**: 
  - `matches` table exists (LMM-TO-001 accomplished).

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define Repo Test**: `tests/integration/test_matches_state.py` checking persistence of clock fields.
2.  **Implementation**:
    - Add fields to Model.
    - Generate Migration.
    - Apply Migration.
3.  **Refactor**: None expected.

### 3.2 NFR hooks
- **Precision**: Store time in milliseconds (`accumulated_time_ms`) to avoid rounding drift.
- **UTC**: `last_start_ts` must be UTC.

## 4) Atomic Task Breakdown

### Task 1: Model Update
- **Purpose**: Update ORM.
- **Prerequisites**: LMM-TO-001.
- **Artifacts impacted**: `backend/app/infrastructure/models/match.py`.
- **Test types**: Unit.
- **BDD Acceptance**: Model instantiation accepts new fields.

### Task 2: Migration
- **Purpose**: DB Schema update.
- **Prerequisites**: Task 1.
- **Artifacts impacted**: `backend/alembic/versions/*_add_clock_state.py`.
- **Test types**: Integration.
- **BDD Acceptance**: `matches` table has `is_running` column after upgrade.
