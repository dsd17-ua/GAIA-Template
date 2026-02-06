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
