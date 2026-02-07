import pytest
from httpx import AsyncClient
from datetime import datetime
from uuid import uuid4
from app.infrastructure.models.match import MatchModel
from app.infrastructure.models.match_event import MatchEventType, TeamSide
from sqlalchemy.ext.asyncio import AsyncSession

@pytest.mark.integration
@pytest.mark.asyncio
async def test_create_event_api(client: AsyncClient, db_session: AsyncSession):
    # Given: A match exists
    match_id = uuid4()
    match = MatchModel(
        id=match_id,
        home_team="Home Events",
        visitor_team="Visitor Events",
        start_time=datetime.now(),
        duration_half=30,
        current_half=1,
        is_active=True
    )
    db_session.add(match)
    await db_session.commit()

    # When: We post an event
    payload = {
        "event_type": "GOAL",
        "team_side": "LOCAL",
        "minute": 12,
        "player_number": 9
    }
    
    response = await client.post(f"/api/v1/matches/{match_id}/events", json=payload)
    
    # Then
    assert response.status_code == 201
    data = response.json()
    assert data["event_type"] == "GOAL"
    assert data["team_side"] == "LOCAL"
    assert data["minute"] == 12
    assert data["player_number"] == 9
    assert data["match_id"] == str(match_id)
    assert "id" in data

@pytest.mark.integration
@pytest.mark.asyncio
async def test_create_event_match_not_found(client: AsyncClient, db_session: AsyncSession):
    # Given: Random match id
    match_id = str(uuid4())
    
    # When
    payload = {
        "event_type": "YELLOW_CARD",
        "team_side": "VISITOR",
        "minute": 45
    }
    response = await client.post(f"/api/v1/matches/{match_id}/events", json=payload)
    
    # Then
    assert response.status_code == 404 # Depends on how we handle ValueError in exception handler or service
    # If service raises ValueError, we might get 500 unless we have an exception handler.
    # Let's check main.py or exception handlers. 
    # Usually ValueError translates to 400 or 422, or 500 if unhandled.
    # But for "Match not found", it should be 404.
    
    # Let's inspect behaviors. 
    # If I see 500, I will add an exception handler.

@pytest.mark.integration
@pytest.mark.asyncio
async def test_create_event_validation_error(client: AsyncClient, db_session: AsyncSession):
    # Given: A match exists
    match_id = uuid4()
    match = MatchModel(
        id=match_id,
        home_team="Home Valid",
        visitor_team="Visitor Valid",
        start_time=datetime.now(),
        duration_half=30
    )
    db_session.add(match)
    await db_session.commit()
    
    # When: Invalid minute
    payload = {
        "event_type": "GOAL",
        "team_side": "LOCAL",
        "minute": 150, # Invalid > 120
        "player_number": 10
    }
    response = await client.post(f"/api/v1/matches/{match_id}/events", json=payload)
    
    # Then
    assert response.status_code == 422
