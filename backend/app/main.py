from fastapi import FastAPI
from app.presentation.routers.matches import router as matches_router

app = FastAPI(title="Live Match Management API")

app.include_router(matches_router)

@app.get("/health")
async def health_check():
    return {"status": "ok"}
