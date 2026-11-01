import os
import time
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from app.database import init_db, save_log
from app.routes import products, search, price, rating

load_dotenv()


@asynccontextmanager
async def lifespan(app):
    init_db()
    yield


app = FastAPI(title="Products API", lifespan=lifespan)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    duration_ms = (time.perf_counter() - start) * 1000
    # רושמים רק בקשות ל-API (כולל בקשות שנכשלו)
    if request.url.path.startswith("/api"):
        path = request.url.path
        description = "Request completed" if response.status_code < 400 else f"Request failed ({response.status_code})"
        save_log(description, request.method, path, round(duration_ms, 2))
    return response


for module in (products, search, price, rating):
    app.include_router(module.router, prefix="/api")

# הגשת ה-Frontend (קבצי ה-Build) בנתיב / - חייב להיות אחרי ה-Routes של ה-API
dist = Path(__file__).parent.parent / "frontend" / "dist"
if dist.exists():
    app.mount("/", StaticFiles(directory=dist, html=True), name="frontend")
