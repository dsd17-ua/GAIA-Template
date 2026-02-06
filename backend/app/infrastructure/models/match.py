from sqlalchemy import Column, String, Integer, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.infrastructure.database import Base # We need to create this Base!
import uuid

# [Feature: Live Match Management] [Story: LMM-TO-001] [Ticket: LMM-TO-001-DB-T01]
class MatchModel(Base):
    __tablename__ = "matches"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    home_team = Column(String, nullable=False)
    visitor_team = Column(String, nullable=False)
    start_time = Column(DateTime(timezone=True), nullable=False)
    duration_half = Column(Integer, default=30, nullable=False)
    current_half = Column(Integer, default=1, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    
    # Clock State
    last_start_ts = Column(DateTime(timezone=True), nullable=True)
    accumulated_time_ms = Column(Integer, default=0, nullable=False)
    is_running = Column(Boolean, default=False, nullable=False)

    # Score State
    score_local = Column(Integer, default=0, nullable=False)
    score_visitor = Column(Integer, default=0, nullable=False)
