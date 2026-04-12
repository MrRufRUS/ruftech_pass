from datetime import datetime, timedelta

import bcrypt
import jwt
from core.config import settings
from cryptography.fernet import Fernet

_cipher: Fernet | None = None


def _get_cipher() -> Fernet:
    global _cipher
    if _cipher is None:
        _cipher = Fernet(settings.PASSWORD_SECRET_KEY.encode())
    return _cipher


def encode_jwt(
    payload: dict,
    key: str | None = None,
    algorithm: str = settings.auth_jwt.algorithm,
    expire_minutes: int = settings.auth_jwt.access_token_expire_minutes,
    expire_timedelta: timedelta | None = None,
):
    # Ключ читается лениво при вызове, а не при импорте модуля
    if key is None:
        key = settings.auth_jwt.private_key_path.read_text()
    to_encode = payload.copy()
    now = datetime.utcnow()
    if expire_timedelta:
        expire = now + expire_timedelta
    else:
        expire = now + timedelta(minutes=expire_minutes)
    to_encode.update(exp=expire, iat=now)
    encoded = jwt.encode(to_encode, key, algorithm=algorithm)
    return encoded


def decode_jwt(
    token: str | bytes,
    public_key: str | None = None,
    algorithm: str = settings.auth_jwt.algorithm,
):
    # Ключ читается лениво при вызове, а не при импорте модуля
    if public_key is None:
        public_key = settings.auth_jwt.public_key_path.read_text()
    decoded = jwt.decode(token, public_key, algorithms=[algorithm])
    return decoded


def hash_password(password: str) -> bytes:
    salt = bcrypt.gensalt()
    pwd_bytes: bytes = password.encode()
    return bcrypt.hashpw(pwd_bytes, salt)


def validate_password(password: str, hashed_password: bytes) -> bool:
    return bcrypt.checkpw(password.encode(), hashed_password)


def encrypt_password(password: str) -> str:
    return _get_cipher().encrypt(password.encode()).decode()


def decrypt_password(encrypted: str) -> str:
    return _get_cipher().decrypt(encrypted.encode()).decode()
