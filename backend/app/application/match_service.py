from uuid import uuid4
from app.domain.match import Match
from app.domain.schemas.match import MatchCreate, MatchScoreUpdate
from app.domain.schemas.event import CreateMatchEvent, MatchEventResponse
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

    async def log_event(self, match_id: str, event_in: CreateMatchEvent) -> MatchEventResponse:
        # 1. Verify match exists
        match = await self.repository.get_by_id(match_id)
        if not match:
             raise ValueError("Match not found")

        # 2. Create event entity
        from datetime import datetime, timezone
        
        event_data = event_in.model_dump()
        event_data["id"] = str(uuid4())
        event_data["match_id"] = match_id
        event_data["created_at"] = datetime.now()

        # [Feature: Timeouts] [Story: LMM-TO-005] [Ticket: LMM-TO-005-BE-T02]
        from app.infrastructure.models.match_event import MatchEventType
        if event_in.event_type == MatchEventType.TIMEOUT:
            count = await self.repository.count_events(match_id, event_in.event_type, event_in.team_side)
            if count >= 3:
                raise ValueError("Timeout limit reached")
            
            # [Feature: Timeouts] [Story: LMM-TO-005] [Bug: LMM-BUG-007]
            # Fix: Stop clock when timeout is called
            if match.is_running:
                now = datetime.now(timezone.utc)
                if match.last_start_ts:
                    delta = now - match.last_start_ts
                    match.accumulated_time_ms += int(delta.total_seconds() * 1000)
                match.is_running = False
                match.last_start_ts = None
                await self.repository.update(match)
        
        # 3. Save
        class EventDTO:
            def __init__(self, **entries):
                self.__dict__.update(entries)
                
        event_obj = EventDTO(**event_data)
        
        await self.repository.save_event(event_obj)
        
        return MatchEventResponse(**event_data)
