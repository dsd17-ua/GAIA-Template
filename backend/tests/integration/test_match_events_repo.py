import pytest
from uuid import uuid4
from datetime import datetime
from sqlalchemy import select
from app.infrastructure.models.match_event import MatchEvent, MatchEventType, TeamSide
from app.infrastructure.models.match import MatchModel
from sqlalchemy.ext.asyncio import AsyncSession

@pytest.mark.integration
@pytest.mark.asyncio
async def test_create_and_retrieve_match_event(db_session: AsyncSession):
    # 1. Create a match first (FK constraint)
    match_id = uuid4()
    match = MatchModel(
        id=match_id,
        home_team="Home",
        visitor_team="Visitor",
        start_time=datetime.now(),
        duration_half=30,
        current_half=1,
        is_active=True
    )
    db_session.add(match)
    await db_session.commit()

    # 2. Create an event (Goal)
    event_id = str(uuid4())
    event = MatchEvent(
        id=event_id,
        match_id=str(match_id),
        event_type=MatchEventType.GOAL,
        team_side=TeamSide.LOCAL,
        minute=10,
        player_number=9
    )
    db_session.add(event)
    await db_session.commit()

    # 3. Retrieve event
    result = await db_session.execute(select(MatchEvent).filter(MatchEvent.id == event_id))
    saved_event = result.scalars().first()
    
    assert saved_event is not None
    assert saved_event.event_type == MatchEventType.GOAL
    assert saved_event.team_side == TeamSide.LOCAL
    assert saved_event.minute == 10
    assert saved_event.player_number == 9
    assert saved_event.match_id == str(match_id)

@pytest.mark.integration
@pytest.mark.asyncio
async def test_fk_constraint_fails(db_session: AsyncSession):
    # Try to create event for non-existent match
    event_id = str(uuid4())
    event = MatchEvent(
        id=event_id,
        match_id=str(uuid4()), # Non-existent
        event_type=MatchEventType.RED_CARD,
        team_side=TeamSide.VISITOR,
        minute=55
    )
    db_session.add(event)
    with pytest.raises(Exception): # IntegrityError
        await db_session.commit()
    await db_session.rollback()
