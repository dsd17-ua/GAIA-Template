from pydantic import BaseModel, ConfigDict
from datetime import datetime
from uuid import UUID
from typing import Optional
from app.infrastructure.models.match_event import MatchEventType, TeamSide

class CreateMatchEvent(BaseModel):
    event_type: MatchEventType
    team_side: TeamSide
    minute: int
    player_number: Optional[int] = None

class MatchEventResponse(BaseModel):
    id: str
    match_id: str
    event_type: MatchEventType
    team_side: TeamSide
    minute: int
    player_number: Optional[int]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
