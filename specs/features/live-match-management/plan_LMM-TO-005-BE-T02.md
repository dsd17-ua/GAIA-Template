# LMM-TO-005-BE-T02 — Implementation Plan

**Source ticket**: `specs/features/live-match-management/tickets.md` → **LMM-TO-005-BE-T02**  
**Related user story**: **LMM-TO-005** (Timeouts)  
**Plan version**: v1.0 — (Agent, 2026-02-06)  
**Traceability**: Links to `LMM-TO-005-BE-T02` and scenarios `Call Timeout`.

---

## 1) Context & Objective
- **Ticket summary**: Business logic to enforce timeout limits (Max 3 per team).
- **Impacted entities/tables**: Logic in Service.
- **Impacted services/modules**: `MatchService.create_event`.
- **Impacted tests**: Unit/Combined integration.

## 2) Scope
- **In scope**: 
  - Validator in `MatchService`: Count existing TIMEOUT events for the team. Reject if >= 3.
- **Out of scope**: 
  - Complex half-time split (e.g. max 2 per half) - MVP says "Max 3 per match".

## 3) Detailed Work Plan (TDD + BDD)

### 3.1 Test-first sequencing
1.  **Define Test**: `test_timeout_rules.py` (Unit).
2.  **Implementation**:
    - Add logic in `create_event` use case.
3.  **Refactor**: None.

### 3.2 NFR hooks
- **Rule Engine**: Keep rule separate if possible, or simple check.

## 4) Atomic Task Breakdown

### Task 1: Validator Logic
- **Purpose**: Enforce Rules.
- **Artifacts impacted**: `backend/app/application/match_service.py`.
- **Test types**: Unit.
- **BDD Acceptance**: 4th timeout request returns 400 Bad Request.
