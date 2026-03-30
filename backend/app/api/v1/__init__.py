from fastapi import APIRouter
from .users.router import users_router

router = APIRouter()
router.include_router(users_router)
