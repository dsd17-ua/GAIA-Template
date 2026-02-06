from fastapi import FastAPI

app = FastAPI(title="Live Match Management API")

@app.get("/health")
async def health_check():
    return {"status": "ok"}
