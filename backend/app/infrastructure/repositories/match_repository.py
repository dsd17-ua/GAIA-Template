from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.domain.match import Match
from app.domain.ports.match_repository import MatchRepository
from app.infrastructure.models.match import MatchModel

# [Feature: Live Match Management] [Story: LMM-TO-001] [Ticket: LMM-TO-001-BE-T02]
class SQLMatchRepository(MatchRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def save(self, match: Match) -> Match:
        model = MatchModel(
            id=match.id,
            home_team=match.home_team,
            visitor_team=match.visitor_team,
            start_time=match.start_time,
            duration_half=match.duration_half,
            current_half=match.current_half,
            is_active=match.is_active
        )
        self.session.add(model)
        await self.session.commit()
        await self.session.refresh(model)
        return match

    async def get_by_id(self, id) -> Match | None:
        result = await self.session.execute(select(MatchModel).where(MatchModel.id == id))
        model = result.scalar_one_or_none()
        if model:
            return Match.model_validate(model)
        return None
