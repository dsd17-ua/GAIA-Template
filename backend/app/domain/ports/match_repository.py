from abc import ABC, abstractmethod
from app.domain.match import Match

# [Feature: Live Match Management] [Story: LMM-TO-001] [Ticket: LMM-TO-001-BE-T02]
class MatchRepository(ABC):
    @abstractmethod
    async def save(self, match: Match) -> Match:
        pass
    
    @abstractmethod
    async def get_by_id(self, match_id) -> Match | None:
        pass

    @abstractmethod
    async def update(self, match: Match) -> Match:
        pass

    @abstractmethod
    async def count_events(self, match_id: str, event_type: str, team_side: str) -> int:
        pass

    @abstractmethod
    async def save_event(self, event) -> None:
        pass
