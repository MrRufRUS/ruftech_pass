from fastapi import FastAPI
from api.v1 import router as api_v1_router
from core.config import settings

app = FastAPI()
app.include_router(api_v1_router, prefix=settings.api_v1_prefix)
