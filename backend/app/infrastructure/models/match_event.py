import enum
from sqlalchemy import Column, String, Integer, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.infrastructure.database import Base

class MatchEventType(str, enum.Enum):
    GOAL = "GOAL"
    YELLOW_CARD = "YELLOW_CARD"
    RED_CARD = "RED_CARD"
    TWO_MIN = "TWO_MIN"
    TIMEOUT = "TIMEOUT"

class TeamSide(str, enum.Enum):
    LOCAL = "LOCAL"
    VISITOR = "VISITOR"

class MatchEvent(Base):
    __tablename__ = "match_events"

    id = Column(String, primary_key=True)
    match_id = Column(UUID(as_uuid=True), ForeignKey("matches.id"), nullable=False)
    event_type = Column(Enum(MatchEventType), nullable=False)
    team_side = Column(Enum(TeamSide), nullable=False)
    minute = Column(Integer, nullable=False)
    player_number = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # [Feature: Disciplinary Sanctions] [Story: LMM-TO-004] [Ticket: LMM-TO-004-DB-T01]
