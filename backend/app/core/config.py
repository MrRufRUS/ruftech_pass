import os
from pathlib import Path

from dotenv import load_dotenv
from pydantic import BaseModel
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent.parent

load_dotenv(BASE_DIR / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")
PASSWORD_SECRET_KEY = os.getenv("PASSWORD_SECRET_KEY")


class AuthJWT(BaseModel):
    private_key_path: Path = BASE_DIR / "certs" / "jwt-private.pem"
    public_key_path: Path = BASE_DIR / "certs" / "jwt-public.pem"
    algorithm: str = "RS256"
    access_token_expire_minutes: int = 5


class Settings(BaseSettings):
    api_v1_prefix: str = "/api/v1"
    auth_jwt: AuthJWT = AuthJWT()

    @property
    def DATABASE_URL(self) -> str:
        return DATABASE_URL

    @property
    def PASSWORD_SECRET_KEY(self) -> str:
        return PASSWORD_SECRET_KEY


settings = Settings()
