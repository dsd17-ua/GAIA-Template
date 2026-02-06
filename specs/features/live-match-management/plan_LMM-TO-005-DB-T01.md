# LMM-TO-005-DB-T01 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-005-DB-T01**  
**Related user story**: **LMM-TO-005** (Timeouts)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: Links to `LMM-TO-005-DB-T01` and scenarios `Call Timeout`.

---

## 1) Context & Objective
- **Ticket summary**: Ensure database supports TIMEOUT events.
- **Impacted entities/tables**: `match_events`.
- **Impacted services/modules**: `MatchEventType` Enum.
- **Impacted tests**: Repo integration.

## 2) Scope
- **In scope**: 
  - Add `TIMEOUT` to `MatchEventType` enum (PostgreSQL ENUM update).
  - Ensure `match_events` can store it.
- **Out of scope**: 
  - New table.
- **Assumptions**: 
  - PG Enum requires migration to add value.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define Test**: `test_events_repo.py` try save TIMEOUT.
2.  **Implementation**:
    - Update Model Enum.
    - Migration (alembic enum alter).
3.  **Refactor**: None.

### 3.2 NFR hooks
- **Integrity**: Enum Validation.

## 4) Atomic Task Breakdown

### Task 1: Enum Update & Migration
- **Purpose**: Support new event type.
- **Artifacts impacted**: `backend/app/infrastructure/models/match_event.py`, `backend/alembic/versions/*_add_timeout_enum.py`.
- **Test types**: Integration.
- **BDD Acceptance**: Can save event with type TIMEOUT.
