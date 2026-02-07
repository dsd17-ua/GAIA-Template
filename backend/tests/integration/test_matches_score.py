import pytest
from datetime import datetime
from app.domain.match import Match
from app.infrastructure.repositories.match_repository import SQLMatchRepository

@pytest.mark.integration
@pytest.mark.asyncio
async def test_match_score_persistence(db_session):
    # Given
    repo = SQLMatchRepository(db_session)
    match = Match(
        home_team="Scorers A", 
        visitor_team="Scorers B", 
        start_time=datetime.utcnow()
    )
    # Set initial score (simulating default or explicit set)
    match.score_local = 10
    match.score_visitor = 5
    
    # When
    created_match = await repo.save(match)
    
    # Then
    assert created_match.id is not None
    assert created_match.score_local == 10
    assert created_match.score_visitor == 5
    
    # When: Retrieve
    retrieved_match = await repo.get_by_id(created_match.id)
    assert retrieved_match.score_local == 10
    assert retrieved_match.score_visitor == 5
