from pydantic import BaseModel, ConfigDict
from datetime import datetime
from uuid import UUID
from typing import Optional

# [Feature: Live Match Management] [Story: LMM-TO-001] [Ticket: LMM-TO-001-BE-T02]
class MatchCreate(BaseModel):
    home_team: str
    visitor_team: str
    start_time: datetime
    duration_half: int = 30
    
    model_config = ConfigDict(json_schema_extra={
        "example": {
            "home_team": "Local Team",
            "visitor_team": "Visitor Team",
            "start_time": "2026-02-06T12:00:00Z",
            "duration_half": 30
        }
    })


# [Feature: Live Match Management] [Story: LMM-TO-002] [Ticket: LMM-TO-002-BE-T02]
class MatchClockUpdate(BaseModel):
    action: str  # START or STOP

# [Feature: Live Match Management] [Story: LMM-TO-001] [Ticket: LMM-TO-001-BE-T02]
class MatchResponse(BaseModel):
    id: UUID
    home_team: str
    visitor_team: str
    start_time: datetime
    duration_half: int
    current_half: int
    is_active: bool
    
    # Clock State
    last_start_ts: Optional[datetime] = None
    accumulated_time_ms: int = 0
    is_running: bool = False
    
    model_config = ConfigDict(from_attributes=True)
