from uuid import uuid4
from app.domain.match import Match
from app.domain.schemas.match import MatchCreate
from app.domain.ports.match_repository import MatchRepository

# [Feature: Live Match Management] [Story: LMM-TO-001] [Ticket: LMM-TO-001-BE-T02]
class MatchService:
    def __init__(self, repository: MatchRepository):
        self.repository = repository

    async def create_match(self, schema: MatchCreate) -> Match:
        match = Match(
            id=uuid4(),
            home_team=schema.home_team,
            visitor_team=schema.visitor_team,
            start_time=schema.start_time,
            duration_half=schema.duration_half
        )
        return await self.repository.save(match)
