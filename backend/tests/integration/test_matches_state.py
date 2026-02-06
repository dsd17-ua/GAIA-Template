import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from app.infrastructure.models.match import MatchModel
from datetime import datetime, timezone

# [Feature: Live Match Management] [Story: LMM-TO-002] [Ticket: LMM-TO-002-DB-T01]
@pytest.mark.asyncio
async def test_match_state_persistence(db_session: AsyncSession):
    """
    Test that we can persist clock state fields:
    - last_start_ts
    - accumulated_time_ms
    - is_running
    """
    match = MatchModel(
        home_team="Team A",
        visitor_team="Team B",
        start_time=datetime.now(timezone.utc),
        # New fields
        last_start_ts=datetime.now(timezone.utc),
        accumulated_time_ms=1000,
        is_running=True
    )
    
    db_session.add(match)
    await db_session.commit()
    await db_session.refresh(match)
    
    assert match.accumulated_time_ms == 1000
    assert match.is_running is True
    assert match.last_start_ts is not None
