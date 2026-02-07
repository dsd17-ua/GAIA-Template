
import pytest
from unittest.mock import AsyncMock, MagicMock
from app.application.match_service import MatchService
from app.domain.schemas.event import CreateMatchEvent
from app.infrastructure.models.match_event import MatchEventType, TeamSide

# [Feature: Live Match Management] [Story: LMM-TO-005] [Ticket: LMM-TO-005-BE-T02]
@pytest.mark.asyncio
async def test_create_timeout_event_success():
    # Given
    repo_mock = AsyncMock()
    # Mock counting events: returns 2 (so 3rd is allowed)
    repo_mock.count_events.return_value = 2
    repo_mock.get_by_id.return_value = MagicMock() # Match exists
    
    service = MatchService(repo_mock)
    
    event_in = CreateMatchEvent(
        event_type=MatchEventType.TIMEOUT,
        team_side=TeamSide.LOCAL,
        minute=10
    )
    
    # When
    await service.log_event("match-123", event_in)
    
    # Then
    repo_mock.save_event.assert_called_once()

@pytest.mark.asyncio
async def test_create_timeout_event_limit_reached():
    # Given
    repo_mock = AsyncMock()
    # Mock counting events: returns 3 (so 4th is forbidden)
    repo_mock.count_events.return_value = 3
    repo_mock.get_by_id.return_value = MagicMock()
    
    service = MatchService(repo_mock)
    
    event_in = CreateMatchEvent(
        event_type=MatchEventType.TIMEOUT,
        team_side=TeamSide.LOCAL,
        minute=10
    )
    
    # When / Then
    with pytest.raises(ValueError, match="Timeout limit reached"):
        await service.log_event("match-123", event_in)
