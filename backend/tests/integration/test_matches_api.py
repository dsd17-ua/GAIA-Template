import pytest
from httpx import AsyncClient
from datetime import datetime
from uuid import uuid4

@pytest.mark.integration
@pytest.mark.asyncio
async def test_create_match_api(client: AsyncClient, db_session):
    # Given
    payload = {
        "home_team": "Locals API",
        "visitor_team": "Visitors API",
        "start_time": datetime.utcnow().isoformat(),
        "duration_half": 30
    }
    
    # When
    response = await client.post("/api/v1/matches", json=payload)
    
    # Then
    assert response.status_code == 201
    data = response.json()
    assert data["home_team"] == "Locals API"
    assert "id" in data

@pytest.mark.integration
@pytest.mark.asyncio
async def test_update_match_clock(client: AsyncClient, db_session):
    # Given: A match exists
    create_payload = {
        "home_team": "Team Clock",
        "visitor_team": "Visitors Clock",
        "start_time": datetime.utcnow().isoformat(),
        "duration_half": 30
    }
    create_response = await client.post("/api/v1/matches", json=create_payload)
    assert create_response.status_code == 201
    match_id = create_response.json()["id"]

    # When: We START the clock
    patch_payload = {"action": "START"}
    response = await client.patch(f"/api/v1/matches/{match_id}/clock", json=patch_payload)

    # Then
    assert response.status_code == 200
    data = response.json()
    assert data["is_running"] is True
    assert data["last_start_ts"] is not None
    
    # Wait a bit (simulate time passing if possible, or just call stop immediately)
    # Since it's integration, we can't easily advance time without mocking datetime.
    # But we can check that STOP updates the state correctly.
    
    patch_payload_stop = {"action": "STOP"}
    response_stop = await client.patch(f"/api/v1/matches/{match_id}/clock", json=patch_payload_stop)
    assert response_stop.status_code == 200
    data_stop = response_stop.json()
    assert data_stop["is_running"] is False
    assert data_stop["last_start_ts"] is None
    # accumulated_time_ms might be 0 instanly if test is fast, but fields should be correct.
    data = response.json()
    assert data["is_running"] is True
    assert data["last_start_ts"] is not None

    # When: We STOP the clock
    patch_payload = {"action": "STOP"}
    response_stop = await client.patch(f"/api/v1/matches/{match_id}/clock", json=patch_payload)
    
    # Then
    assert response_stop.status_code == 200
    data_stop = response_stop.json()
    assert data_stop["is_running"] is False
