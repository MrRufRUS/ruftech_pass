from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1 import router as api_v1_router
from core.config import settings

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credantials=True,
    allow_methods=["*"],
    allowd_headers=["*"]
)
app.include_router(api_v1_router, prefix=settings.api_v1_prefix)
