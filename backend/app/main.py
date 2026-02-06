from fastapi import FastAPI
from app.presentation.routers.matches import router as matches_router

app = FastAPI(title="Live Match Management API")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(matches_router)

@app.get("/health")
async def health_check():
    return {"status": "ok"}
