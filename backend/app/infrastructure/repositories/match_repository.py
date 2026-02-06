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
            is_active=match.is_active,
            last_start_ts=match.last_start_ts,
            accumulated_time_ms=match.accumulated_time_ms,
            is_running=match.is_running,
            score_local=match.score_local,
            score_visitor=match.score_visitor
        )
        self.session.add(model)
        await self.session.commit()
        await self.session.refresh(model)
        return match

        if model:
            return Match.model_validate(model)
        return None

    async def get_by_id(self, id) -> Match | None:
        result = await self.session.execute(select(MatchModel).where(MatchModel.id == id))
        model = result.scalar_one_or_none()
        if model:
            return Match.model_validate(model)
        return None

    async def update(self, match: Match) -> Match:
        # We use explicit update or merge. Since 'match' is a Pydantic object, 
        # we can't just merge it directly into SQL session unless mapped.
        # We'll retrieve the model and update fields, or use an UPDATE statement.
        # Retrieving and updating is safer for ORM consistency.
        
        result = await self.session.execute(select(MatchModel).where(MatchModel.id == match.id))
        model = result.scalar_one_or_none()
        
        if not model:
            raise ValueError(f"Match {match.id} not found")

        # Update fields
        model.home_team = match.home_team
        model.visitor_team = match.visitor_team
        model.start_time = match.start_time
        model.duration_half = match.duration_half
        model.current_half = match.current_half
        model.is_active = match.is_active
        model.last_start_ts = match.last_start_ts
        model.accumulated_time_ms = match.accumulated_time_ms
        model.is_running = match.is_running
        model.score_local = match.score_local
        model.score_visitor = match.score_visitor
        
        await self.session.commit()
        await self.session.refresh(model)
        return Match.model_validate(model)
