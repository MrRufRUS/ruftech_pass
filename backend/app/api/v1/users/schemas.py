from pydantic import BaseModel, ConfigDict, EmailStr


class UserCreateSchema(BaseModel):
    username: str
    password: str
    email: EmailStr | None = None


class UserSchema(BaseModel):
    model_config = ConfigDict(strict=True)
    id: int
    username: str
    password: bytes
    email: EmailStr | None = None


class UserMeSchema(BaseModel):
    id: int
    username: str
    email: EmailStr | None = None


class UserLoginSchema(BaseModel):
    username: str
    password: str


class TokenInfo(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str
