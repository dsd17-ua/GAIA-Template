# LMM-TO-004-DB-T01 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-004-DB-T01**  
**Related user story**: **LMM-TO-004** (Disciplinary Sanctions)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: Links to `LMM-TO-004-DB-T01` and scenarios `Exclusion Timer`.

---

## 1) Context & Objective
- **Ticket summary**: Create `match_events` table to store timeline (goals, cards, exclusions).
- **Impacted entities/tables**: New table `match_events`.
- **Impacted services/modules**: `MatchEvent` Model.
- **Impacted tests**: Repo test.

## 2) Scope
- **In scope**: 
  - Table `match_events`: `id` (UUID), `match_id` (FK), `event_type` (Enum: GOAL, YELLOW_CARD, RED_CARD, 2MIN), `team_id`, `player_number`, `minute` (or `timestamp_ms`).
  - Relationship with `Match`.
- **Out of scope**: 
  - Analytics (aggregations) - MVP only needs storage.
- **Assumptions**: 
  - `event_type` is sufficient for MVP.

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define Test**: `tests/integration/test_events_repo.py`.
2.  **Implementation**:
    - Enum definition.
    - Model `MatchEvent`.
    - Migration.
3.  **Refactor**: None.

### 3.2 NFR hooks
- **Integrity**: FK to `matches.id`.

## 4) Atomic Task Breakdown

### Task 1: Model & Migration
- **Purpose**: Persistence.
- **Artifacts impacted**: `backend/app/infrastructure/models/match_event.py`, `backend/alembic/versions/*_create_events.py`.
- **Test types**: Integration.
- **BDD Acceptance**: Can store a RED_CARD event.
