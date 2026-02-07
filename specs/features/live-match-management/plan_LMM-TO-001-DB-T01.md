# LMM-TO-001-DB-T01 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-001-DB-T01**  
**Related user story**: **LMM-TO-001** (from `specs/features/live-match-management/user-stories.md`)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: All tasks must include inline references to `LMM-TO-001-DB-T01` and scenarios `New Match Setup`, `Period Configuration`.

---

## 1) Context & Objective
- **Ticket summary**: Initialize the `matches` table to store match configuration and current state, supporting the "Match Configuration" story.
- **Impacted entities/tables**: New table `matches`.
- **Impacted services/modules**: Backend Domain (Entity), Infrastructure (SQLAlchemy Model, Alembic).
- **Impacted tests**: New integration tests for repository/migration.

## 2) Scope
- **In scope**: 
  - Define `Match` entity and table.
  - Alembic migration to create table.
  - Basic fields: `id`, `home_team`, `visitor_team`, `start_time` (scheduled), `duration_half` (default 30), `current_half` (1), `is_active` (bool).
  - Validation of Environment: Generate `docker-compose.yml` if missing (Prerequisite).
- **Out of scope**: 
  - Match Events (goals, cards) -> Covered in TO-004.
  - Clock state (running/paused) -> Covered in TO-002, though we might add basic fields if obvious, but strict vertical sizing suggests waiting.
- **Assumptions**: 
  - PostgreSQL is the DB.
  - Alembic is already initialized or needs initialization (Discovery showed `backend/alembic` exists? No, `backend/` exists).

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Environment Setup (Pre-req)**: Ensure `docker-compose.yml` exists to run DB for tests.
2.  **Define Tests**: Write integration test `tests/integration/test_matches_repo.py` failing because table/model doesn't exist.
3.  **Implementation**:
    - Create Domain Entity.
    - Create SQLAlchemy Model.
    - Generate Alembic Migration.
    - Apply Migration.
4.  **Refactor**: Ensure clean separation of layers.

### 3.2 NFR hooks
- **Security**: ID should be UUIDv4 to prevent enumeration (or Integer if low risk, but UUID preferred for offline sync future-proofing).
- **Observability**: Migration logs.

## 4) Atomic Task Breakdown

### Task 1: Environment & Containerization (Prerequisite)
- **Purpose**: Ensure `docker-compose.yml` exists as per Rules.
- **Prerequisites**: None.
- **Artifacts impacted**: `docker-compose.yml`.
- **Test types**: Manual (`docker compose up -d`).
- **BDD Acceptance**: Given I am in root, When I run `docker compose ps`, Then I see `db`, `backend`, `frontend` services running.

### Task 2: Define Match Domain Entity & Model
- **Purpose**: Define the core business object.
- **Prerequisites**: Task 1.
- **Artifacts impacted**: `backend/app/domain/match.py`, `backend/app/infrastructure/models/match.py`.
- **Test types**: Unit.
- **BDD Acceptance**: Matches `MatchCreate` requirements.

### Task 3: Database Migration
- **Purpose**: specific schema creation.
- **Prerequisites**: Task 2.
- **Artifacts impacted**: `backend/alembic/versions/*_create_matches_table.py`.
- **Test types**: Integration (apply/downgrade).
- **BDD Acceptance**: Given a postgres DB, When upgrade is run, Then `matches` table exists.

### Task 4: Documentation Update
- **Purpose**: Update DataModel.
- **Prerequisites**: Task 3.
- **Artifacts impacted**: `specs/DataModel.md`.
- **Test types**: Review.
- **BDD Acceptance**: ER Diagram reflects `matches` table.
