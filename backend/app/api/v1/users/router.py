from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Form,
    Response,
    Request,
)

from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

import jwt

from typing import Annotated

from core.config import settings

from .schemas import (
    UserSchema,
    UserLoginSchema,
    UserMeSchema,
    UserUpdateSchema,
    TokenInfo,
    TokenData,
)
from . import utils

users_router = APIRouter(prefix="/jwt", tags=["users"])

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/jwt/login/", auto_error=False)

john = UserSchema(
    id=1, username="john", password=utils.hash_password("secret"), email="ex@ya.ru"
)
bob = UserSchema(
    id=2, username="bob", password=utils.hash_password("bobdebob"), email="bob@ya.ru"
)


users_db: dict[str, UserSchema] = {john.username: john, bob.username: bob}


def validate_auth_user(user_login: UserLoginSchema):
    username = user_login.username
    password = user_login.password

    unauthed_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )

    user = users_db.get(username)
    if not user:
        raise unauthed_exception

    if not utils.validate_password(password, user.password):
        raise unauthed_exception

    return user


def validate_auth_user_by_token(
    request: Request,
    token: Annotated[str | None, Depends(oauth2_scheme)],
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
    user = users_db.get(token_data.username)
    if user is None:
        raise credentials_exception
    user_me = UserMeSchema(
        id=user.id, username=user.username, email=user.email)
    return user_me


@users_router.post("/login/", response_model=TokenInfo)
def auth_user_issue_jwt(
    response: Response, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    user: UserSchema = validate_auth_user(
        UserLoginSchema(username=form_data.username,
                        password=form_data.password)
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
def create_user_and_issue_jwt(
    response: Response,
    username: str = Form(...),
    password: str = Form(...),
    email: str | None = Form(None),
):
    if username in users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists"
        )
    user_id = max((user.id for user in users_db.values()), default=1) + 1
    new_user = UserSchema(
        id=user_id,
        username=username,
        password=utils.hash_password(password),
        email=email,
    )
    users_db[username] = new_user

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
):
    del users_db[current_user.username]
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
):
    user = users_db.get(current_user.username)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    update: dict = {}
    if payload.email is not None:
        update["email"] = payload.email
    if payload.password is not None:
        update["password"] = utils.hash_password(payload.password)
        response.delete_cookie(key="access_token")

    updated_user = user.model_copy(update=update) if update else user
    users_db[current_user.username] = updated_user

    return UserMeSchema(id=updated_user.id, username=updated_user.username, email=updated_user.email)
