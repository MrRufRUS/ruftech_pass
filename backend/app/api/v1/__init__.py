from fastapi import APIRouter

from .passwords.router import passwords_router
from .users.router import users_router

router = APIRouter()
router.include_router(users_router)
router.include_router(passwords_router)
