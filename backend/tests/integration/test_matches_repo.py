import pytest
from sqlalchemy import select
from uuid import uuid4
from datetime import datetime, timezone
from app.infrastructure.models.match import MatchModel

@pytest.mark.integration
@pytest.mark.asyncio
async def test_create_and_retrieve_match(db_session):
    # Given
    match_data = MatchModel(
        id=uuid4(),
        home_team="Locals",
        visitor_team="Visitors",
        start_time=datetime.now(timezone.utc),
        duration_half=30,
        current_half=1,
        is_active=True
    )
    
    # When
    db_session.add(match_data)
    await db_session.commit()
    
    # Then
    stmt = select(MatchModel).where(MatchModel.id == match_data.id)
    result = await db_session.execute(stmt)
    retrieved = result.scalar_one_or_none()
    
    assert retrieved is not None
    assert retrieved.home_team == "Locals"
    assert retrieved.visitor_team == "Visitors"
    assert retrieved.is_active is True
