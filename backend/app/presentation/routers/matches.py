from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.domain.schemas.match import MatchCreate, MatchResponse, MatchClockUpdate, MatchScoreUpdate
from app.application.match_service import MatchService
from app.infrastructure.repositories.match_repository import SQLMatchRepository
from app.infrastructure.database import Base
from typing import AsyncGenerator

from app.dependencies import get_db

router = APIRouter(prefix="/api/v1/matches", tags=["matches"])

@router.post("", response_model=MatchResponse, status_code=status.HTTP_201_CREATED)
async def create_match(
    match_in: MatchCreate,
    session: AsyncSession = Depends(get_db) 
):
    repo = SQLMatchRepository(session)
    service = MatchService(repo)
    return await service.create_match(match_in)

@router.patch("/{match_id}/clock", response_model=MatchResponse)
async def update_match_clock(
    match_id,
    clock_update: MatchClockUpdate,
    session: AsyncSession = Depends(get_db)
):
    repo = SQLMatchRepository(session)
    service = MatchService(repo)
    return await service.update_match_clock(match_id, clock_update.action)

@router.patch("/{match_id}/score", response_model=MatchResponse)
async def update_match_score(
    match_id,
    score_update: MatchScoreUpdate,
    session: AsyncSession = Depends(get_db)
):
    repo = SQLMatchRepository(session)
    service = MatchService(repo)
    return await service.update_match_score(match_id, score_update)

@router.get("/{match_id}", response_model=MatchResponse)
async def get_match(
    match_id,
    session: AsyncSession = Depends(get_db)
):
    repo = SQLMatchRepository(session)
    service = MatchService(repo)
    return await service.get_match(match_id)
