
import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from app.infrastructure.models.match_event import MatchEvent, MatchEventType, TeamSide
from app.infrastructure.models.match import MatchModel
from datetime import datetime, timezone
import uuid

# [Feature: Live Match Management] [Story: LMM-TO-005] [Ticket: LMM-TO-005-DB-T01]
@pytest.mark.asyncio
async def test_save_timeout_event(db_session: AsyncSession):
    async_session = db_session
    # 1. Create a dummy match
    match_id = uuid.uuid4()
    match = MatchModel(
        id=match_id,
        home_team="Home",
        visitor_team="Visitor",
        start_time=datetime.now(timezone.utc),
        duration_half=30,
        current_half=1,
        is_active=True,
        accumulated_time_ms=0,
        is_running=False,
        score_local=0,
        score_visitor=0
    )
    async_session.add(match)
    await async_session.commit()

    # 2. Create TIMEOUT event
    event_id = str(uuid.uuid4())
    event = MatchEvent(
        id=event_id,
        match_id=match_id,
        event_type=MatchEventType.TIMEOUT,
        team_side=TeamSide.LOCAL,
        minute=15,
        player_number=None 
    )
    async_session.add(event)
    await async_session.commit()

    # 3. Verify
    async_session.expire_all()
    fetched_event = await async_session.get(MatchEvent, event_id)
    assert fetched_event is not None
    assert fetched_event.event_type == MatchEventType.TIMEOUT
    assert fetched_event.team_side == TeamSide.LOCAL
