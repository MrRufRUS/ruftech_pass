from pydantic import BaseModel, ConfigDict


class UserCreateSchema(BaseModel):
    username: str
    password: str
    email: str | None = None


class UserSchema(BaseModel):
    model_config = ConfigDict(strict=True)
    id: int
    username: str
    password: bytes
    email: str | None = None


class UserMeSchema(BaseModel):
    id: int
    username: str
    email: str | None = None


class UserUpdateSchema(BaseModel):
    email: str | None = None
    password: str | None = None


class UserLoginSchema(BaseModel):
    username: str
    password: str


class TokenInfo(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str
