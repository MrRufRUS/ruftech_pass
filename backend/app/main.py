from fastapi import FastAPI
from app.routers.user import router as user_router

app = FastAPI(openapi_prefix="/api/v1")

app.include_router(user_router)

