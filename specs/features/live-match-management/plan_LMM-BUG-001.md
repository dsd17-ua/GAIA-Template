# LMM-BUG-001: Fix missing matches table (500 Error)

## Goal
Resolve the `Internal Server Error` when creating a match, caused by `relation "matches" does not exist`.

## User Review Required
> [!NOTE]
> This is a database state issue. The fix involves applying existing migrations to the running container.

## Proposed Changes
### Backend / Database
- **CORRECTION**: Migration `4048678bf782` incorrectly attempts to create the `matches` table again.
- Rewrite `4048678bf782_add_clock_state.py` to use `op.add_column` for `last_start_ts`, `accumulated_time_ms`, and `is_running`.
- Reset DB state (Drop table, clear revisions).
- Apply Alembic migrations.

## Verification Plan
### Automated Tests
- Integration tests already pass (they use a fresh DB context).

### Manual Verification
1. Run `docker compose exec backend alembic upgrade head`.
2. Retry creating a match in the frontend.
3. Expect 200 OK and redirection to dashboard.
