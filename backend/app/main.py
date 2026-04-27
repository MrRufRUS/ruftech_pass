from api.v1 import router as api_v1_router
from core.config import settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/health", tags=["health"])
def health():
    return {"status": "ok"}


Instrumentator(
    excluded_handlers=["/metrics", "/health"],
).instrument(app).expose(app, include_in_schema=False)

app.include_router(api_v1_router, prefix=settings.api_v1_prefix)
