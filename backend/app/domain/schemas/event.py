from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from app.infrastructure.models.match_event import MatchEventType, TeamSide

class CreateMatchEvent(BaseModel):
    event_type: MatchEventType
    team_side: TeamSide
    minute: int = Field(..., ge=0, le=120)
    player_number: Optional[int] = Field(None, ge=1, le=99)

    model_config = ConfigDict(
        json_schema_extra = {
            "example": {
                "event_type": "GOAL",
                "team_side": "LOCAL",
                "minute": 15,
                "player_number": 10
            }
        }
    )

class MatchEventResponse(BaseModel):
    id: str
    match_id: str
    event_type: MatchEventType
    team_side: TeamSide
    minute: int
    player_number: Optional[int]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
