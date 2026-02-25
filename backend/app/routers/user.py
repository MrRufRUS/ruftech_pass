from fastapi import APIRouter, Request


router = APIRouter(tags=["users"])

@router.post("/signup")
async def signup(request: Request):
    return {"message": "User created"}

@router.post("/login")
async def login(request: Request):
    return {"message": "User logged in"}

@router.post("/logout")
async def logout(request: Request):
    return {"message": "User logged out"}