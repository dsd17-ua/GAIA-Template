from uuid import uuid4
from app.domain.match import Match
from app.domain.schemas.match import MatchCreate, MatchScoreUpdate
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

    async def update_match_clock(self, match_id, action: str) -> Match:
        match = await self.repository.get_by_id(match_id)
        if not match:
            raise ValueError("Match not found")
            
        from datetime import datetime, timezone
        now = datetime.now(timezone.utc)

        if action == "START":
            if not match.is_running:
                match.is_running = True
                match.last_start_ts = now
        
        elif action == "STOP":
            if match.is_running and match.last_start_ts:
                delta = now - match.last_start_ts
                match.accumulated_time_ms += int(delta.total_seconds() * 1000)
                match.is_running = False
                match.last_start_ts = None
                
        return await self.repository.update(match)

    async def update_match_score(self, match_id, score_in: MatchScoreUpdate) -> Match:
        match = await self.repository.get_by_id(match_id)
        if not match:
            raise ValueError("Match not found")
            
        if score_in.score_local is not None:
            if score_in.score_local < 0:
                 raise ValueError("Score cannot be negative")
            match.score_local = score_in.score_local
            
        if score_in.score_visitor is not None:
             if score_in.score_visitor < 0:
                 raise ValueError("Score cannot be negative")
             match.score_visitor = score_in.score_visitor
             
        return await self.repository.update(match)

    async def get_match(self, match_id) -> Match:
        match = await self.repository.get_by_id(match_id)
        if not match:
            raise ValueError("Match not found")
        return match
