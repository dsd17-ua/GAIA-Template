# LMM-TO-001-BE-T02 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-001-BE-T02**  
**Related user story**: **LMM-TO-001** (from `specs/features/live-match-management/user-stories.md`)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: All tasks must include inline references to `LMM-TO-001-BE-T02` and scenarios `New Match Setup`.

---

## 1) Context & Objective
- **Ticket summary**: Implement the `POST /api/v1/matches` endpoint to initialize new matches.
- **Impacted entities/tables**: Uses `Match` entity.
- **Impacted services/modules**: `MatchService`, `MatchRepository`, `MatchRouter`.
- **Impacted tests**: Unit tests for Service, Integration/Contract tests for API.

## 2) Scope
- **In scope**: 
  - Pydantic Models (`MatchCreate`, `MatchResponse`).
  - Use Case: `CreateMatch`.
  - Repository Interface & SQL Implementation.
  - FastAPI Route.
- **Out of scope**: 
  - Authentication (MVP is Public/Local).
  - Advanced validation (e.g. checking overlap).
- **Assumptions**: 
  - DB table exists (via T01).
  - FastAPI project structure is successfully scaffolded (if not, Task 1 must ensure it).

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define DTOs & Service Tests**: Write unit tests for `CreateMatch` use case.
2.  **Define API Tests**: Write `tests/integration/test_matches_api.py`.
3.  **Implementation**:
    - DTOs.
    - Repository.
    - Router.
    - Wiring in `main.py`.
4.  **Refactor**: Ensure proper dependency injection.

### 3.2 NFR hooks
- **Performance**: Endpoint response < 200ms.
- **Validation**: Strict Pydantic V2 validation (`extra='forbid'`).
- **Observability**: Structured log on match creation (match_id, teams).

## 4) Atomic Task Breakdown

### Task 1: Domain & Application Layer
- **Purpose**: Business logic separation.
- **Prerequisites**: LMM-TO-001-DB-T01.
- **Artifacts impacted**: `backend/app/application/match_service.py`, `backend/app/domain/schemas/match.py` (DTOs).
- **Test types**: Unit.
- **BDD Acceptance**: `CreateMatch` accepts local/visitor and returns created Match with ID.

### Task 2: Repository Implementation
- **Purpose**: Persistence adapter.
- **Prerequisites**: Task 1.
- **Artifacts impacted**: `backend/app/infrastructure/repositories/match_repository.py`.
- **Test types**: Integration (DB).
- **BDD Acceptance**: Save returns entity with generated ID.

### Task 3: API Endpoint
- **Purpose**: Data exposure.
- **Prerequisites**: Task 2.
- **Artifacts impacted**: `backend/app/presentation/routers/matches.py`, `backend/app/main.py`.
- **Test types**: Integration (HTTP).
- **BDD Acceptance**: POST `/matches` with valid payload returns 201 Created and JSON body.

### Task 4: Documentation Update
- **Purpose**: API spec visibility.
- **Prerequisites**: Task 3.
- **Artifacts impacted**: `specs/ArchitecturalModel.md` (Update Components).
- **Test types**: Review.
- **BDD Acceptance**: Router listed in component diagram.
