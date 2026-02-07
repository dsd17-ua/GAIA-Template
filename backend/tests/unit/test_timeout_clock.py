import pytest
from unittest.mock import AsyncMock, MagicMock
from datetime import datetime, timedelta, timezone
from app.application.match_service import MatchService
from app.domain.schemas.event import CreateMatchEvent
from app.infrastructure.models.match_event import MatchEventType, TeamSide

@pytest.mark.asyncio
async def test_timeout_stops_clock():
    # GIVEN a running match
    mock_repo = AsyncMock()
    service = MatchService(mock_repo)
    
    match_id = "test-match-id"
    start_time = datetime.now(timezone.utc) - timedelta(seconds=10)
    
    mock_match = MagicMock()
    mock_match.id = match_id
    mock_match.is_running = True
    mock_match.last_start_ts = start_time
    mock_match.accumulated_time_ms = 0
    mock_match.home_team = "Home"
    mock_match.visitor_team = "Visitor"
    
    # Mock get_by_id to return our running match
    mock_repo.get_by_id.return_value = mock_match
    # Mock count_events to allow timeout (limit not reached)
    mock_repo.count_events.return_value = 0
    
    # WHEN a timeout is logged
    event_in = CreateMatchEvent(
        event_type=MatchEventType.TIMEOUT,
        team_side=TeamSide.LOCAL,
        minute=0,
        player_number=None
    )
    
    await service.log_event(match_id, event_in)
    
    # THEN the match should be stopped (is_running = False)
    # AND accumulated_time_ms should be updated (> 0)
    
    # Verify save_event was called
    mock_repo.save_event.assert_called_once()
    
    # Verify update was called on the match (to save state)
    mock_repo.update.assert_called_once()
    
    # Verify state changes
    updated_match = mock_repo.update.call_args[0][0]
    assert updated_match.is_running is False, "Clock should be stopped after timeout"
    assert updated_match.accumulated_time_ms > 0, "Accumulated time should include elapsed duration"
    assert updated_match.last_start_ts is None, "Last start timestamp should be cleared"
