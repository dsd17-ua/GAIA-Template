from datetime import datetime
from uuid import UUID, uuid4
from pydantic import BaseModel, Field, ConfigDict

# [Feature: Live Match Management] [Story: LMM-TO-001] [Ticket: LMM-TO-001-DB-T01]
class Match(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    home_team: str
    visitor_team: str
    start_time: datetime
    duration_half: int = 30
    current_half: int = 1
    is_active: bool = True
    
    # Clock state (LMM-TO-002 preparation, but good to have rudimentary fields if needed, 
    # but strictly per plan I should focus on TO-001 scope. 
    # Plan says: "Clock state -> Covered in TO-002". So I will omit specific clock fields for now).

    model_config = ConfigDict(from_attributes=True)
