from api.v1.users import utils as users_utils
from api.v1.users.router import validate_auth_user_by_token
from api.v1.users.schemas import UserSchema
from fastapi import APIRouter, Depends, HTTPException, status

from .schemas import (
    PasswordCreateSchema,
    PasswordDetailSchema,
    PasswordPublicSchema,
    PasswordUpdateSchema,
)

passwords_router = APIRouter(prefix="/passwords", tags=["passwords"])

passwords_db: dict[int, dict] = {}


def _next_id() -> int:
    return max(passwords_db.keys(), default=0) + 1


@passwords_router.post("/", response_model=PasswordDetailSchema)
def create_password(
    payload: PasswordCreateSchema,
    current_user: UserSchema = Depends(validate_auth_user_by_token),
):
    owner_id = current_user.id
    for rec in passwords_db.values():
        if (
            rec["owner_id"] == owner_id
            and rec["service_name"] == payload.service_name
            and rec["login"] == payload.login
        ):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Password record for this service/login already exists",
            )

    rec_id = _next_id()
    password_hash = users_utils.hash_password(payload.password)  # bytes
    passwords_db[rec_id] = {
        "owner_id": owner_id,
        "service_name": payload.service_name,
        "service_url": payload.service_url,
        "login": payload.login,
        "password_hash": password_hash,
    }

    return PasswordDetailSchema(
        id=rec_id,
        service_name=payload.service_name,
        service_url=payload.service_url,
        login=payload.login,
        password_hash=password_hash.decode("utf-8"),
    )


@passwords_router.get("/", response_model=list[PasswordPublicSchema])
def list_passwords(
    current_user: UserSchema = Depends(validate_auth_user_by_token),
):
    items: list[PasswordPublicSchema] = []
    for rec_id, rec in passwords_db.items():
        if rec["owner_id"] != current_user.id:
            continue
        items.append(
            PasswordPublicSchema(
                id=rec_id,
                service_name=rec["service_name"],
            )
        )
    return items


@passwords_router.get("/{password_id}", response_model=PasswordDetailSchema)
def get_password(
    password_id: int,
    current_user: UserSchema = Depends(validate_auth_user_by_token),
):
    rec = passwords_db.get(password_id)
    if rec is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    if rec["owner_id"] != current_user.id:
        # Не раскрываем наличие записи чужого пользователя.
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    return PasswordDetailSchema(
        id=password_id,
        service_name=rec["service_name"],
        service_url=rec["service_url"],
        login=rec["login"],
        password_hash=rec["password_hash"].decode("utf-8"),
    )


@passwords_router.patch("/{password_id}", response_model=PasswordDetailSchema)
def patch_password(
    password_id: int,
    payload: PasswordUpdateSchema,
    current_user: UserSchema = Depends(validate_auth_user_by_token),
):
    rec = passwords_db.get(password_id)
    if rec is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    if rec["owner_id"] != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    new_service_name = (
        payload.service_name
        if payload.service_name is not None
        else rec["service_name"]
    )
    new_service_url = (
        payload.service_url if payload.service_url is not None else rec["service_url"]
    )
    new_login = payload.login if payload.login is not None else rec["login"]

    for other_id, other in passwords_db.items():
        if other_id == password_id:
            continue
        if (
            other["owner_id"] == current_user.id
            and other["service_name"] == new_service_name
            and other["login"] == new_login
        ):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Password record for this service/login already exists",
            )

    rec["service_name"] = new_service_name
    rec["service_url"] = new_service_url
    rec["login"] = new_login

    if payload.password is not None:
        rec["password_hash"] = users_utils.hash_password(payload.password)

    return PasswordDetailSchema(
        id=password_id,
        service_name=rec["service_name"],
        service_url=rec["service_url"],
        login=rec["login"],
        password_hash=rec["password_hash"].decode("utf-8"),
    )


@passwords_router.delete("/{password_id}")
def delete_password(
    password_id: int,
    current_user: UserSchema = Depends(validate_auth_user_by_token),
):
    rec = passwords_db.get(password_id)
    if rec is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    if rec["owner_id"] != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    del passwords_db[password_id]
    return {"message": "Password record deleted"}
