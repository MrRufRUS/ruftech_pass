from fastapi import APIRouter
from .users.router import users_router
from .passwords.router import passwords_router

router = APIRouter()
router.include_router(users_router)
router.include_router(passwords_router)
