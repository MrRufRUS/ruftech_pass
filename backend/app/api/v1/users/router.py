from typing import Annotated

import jwt
from core.config import settings
from db.depedency import get_db
from db.models import User
from fastapi import APIRouter, Depends, Form, HTTPException, Request, Response, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from . import utils
from .schemas import (
    TokenData,
    TokenInfo,
    UserLoginSchema,
    UserMeSchema,
    UserSchema,
    UserUpdateSchema,
)

users_router = APIRouter(prefix="/jwt", tags=["users"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/jwt/login/", auto_error=False)


def validate_auth_user(user_login: UserLoginSchema, db: Session) -> UserSchema:
    username = user_login.username
    password = user_login.password

    unauthed_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )

    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise unauthed_exception

    if not utils.validate_password(password, bytes.fromhex(user.password_hash[2:])):
        raise unauthed_exception
    return user


def validate_auth_user_by_token(
    request: Request,
    token: Annotated[str | None, Depends(oauth2_scheme)],
    db: Session = Depends(get_db),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not token:
        token = request.cookies.get("access_token")
    if not token:
        raise credentials_exception
    try:
        payload = utils.decode_jwt(token)
        username: str = payload.get("username")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except jwt.InvalidTokenError:
        raise credentials_exception
    user = db.query(User).filter(User.username == token_data.username).first()
    if user is None:
        raise credentials_exception
    user_me = UserMeSchema(id=user.id, username=user.username, email=user.email)
    return user_me


@users_router.post("/login/", response_model=TokenInfo)
def auth_user_issue_jwt(
    response: Response,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db),
):
    user: UserSchema = validate_auth_user(
        UserLoginSchema(username=form_data.username, password=form_data.password), db
    )
    jwt_payload = {"sub": str(user.id), "username": user.username}
    token = utils.encode_jwt(jwt_payload)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        max_age=settings.auth_jwt.access_token_expire_minutes * 60,
    )
    return TokenInfo(access_token=token, token_type="Bearer")


@users_router.post("/signup/", status_code=status.HTTP_201_CREATED)
def create_user(
    response: Response,
    username: str = Form(...),
    password: str = Form(...),
    email: str | None = Form(None),
    db: Session = Depends(get_db),
):
    if db.query(User).filter(User.username == username).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists"
        )
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists"
        )
    new_user = User(
        username=username,
        password_hash=utils.hash_password(password),
        email=email,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created"}


@users_router.post("/logout/")
def logout(
    response: Response,
    current_user: Annotated[UserSchema, Depends(validate_auth_user_by_token)],
):
    response.delete_cookie(key="access_token")
    return {"message": "Logged out"}


@users_router.delete("/delete/")
def delete_user(
    response: Response,
    current_user: Annotated[UserSchema, Depends(validate_auth_user_by_token)],
    db: Session = Depends(get_db),
):
    db_user = db.query(User).filter(User.username == current_user.username).first()
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    db.delete(db_user)
    db.commit()
    response.delete_cookie(key="access_token")
    return {"message": "User deleted"}


@users_router.get("/me/")
def get_current_user(
    current_user: Annotated[UserMeSchema, Depends(validate_auth_user_by_token)],
):
    return current_user


@users_router.patch("/me/", response_model=UserMeSchema)
def patch_current_user(
    payload: UserUpdateSchema,
    response: Response,
    current_user: Annotated[UserSchema, Depends(validate_auth_user_by_token)],
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.username == current_user.username).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    if payload.email is not None:
        user.email = payload.email
    if payload.password is not None:
        user.password_hash = utils.hash_password(payload.password)
        response.delete_cookie(key="access_token")

    db.commit()
    db.refresh(user)
    return UserMeSchema(id=user.id, username=user.username, email=user.email)
