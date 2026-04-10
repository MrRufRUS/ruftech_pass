from typing import Annotated

from api.v1.users import utils as users_utils
from api.v1.users.router import validate_auth_user_by_token
from api.v1.users.schemas import UserMeSchema
from db.depedency import get_db
from db.models import Password
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .schemas import (
    PasswordCreateSchema,
    PasswordDetailSchema,
    PasswordPublicSchema,
    PasswordUpdateSchema,
)

passwords_router = APIRouter(prefix="/passwords", tags=["passwords"])


@passwords_router.post("/", response_model=PasswordDetailSchema)
def create_password(
    payload: PasswordCreateSchema,
    current_user: Annotated[UserMeSchema, Depends(validate_auth_user_by_token)],
    db: Session = Depends(get_db),
):
    owner_id = current_user.id

    # Проверка на дубликат
    existing = (
        db.query(Password)
        .filter(
            Password.user_id == owner_id,
            Password.service_name == payload.service_name,
            Password.username == payload.login,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Password record for this service/login already exists",
        )

    password_hash = users_utils.encrypt_password(payload.password)
    password_record = Password(
        user_id=owner_id,
        service_name=payload.service_name,
        service_url=payload.service_url,
        username=payload.login,
        encrypted_password=password_hash,
    )
    db.add(password_record)
    db.commit()
    db.refresh(password_record)

    return PasswordDetailSchema(
        id=password_record.id,
        service_name=password_record.service_name,
        service_url=password_record.service_url,
        login=password_record.username,
        password=password_record.encrypted_password,
    )


@passwords_router.get("/", response_model=list[PasswordPublicSchema])
def list_passwords(
    current_user: Annotated[UserMeSchema, Depends(validate_auth_user_by_token)],
    db: Session = Depends(get_db),
):
    records = db.query(Password).filter(Password.user_id == current_user.id).all()

    return [
        PasswordPublicSchema(
            id=rec.id,
            service_name=rec.service_name,
            service_url=rec.service_url,
        )
        for rec in records
    ]


@passwords_router.get("/{password_id}", response_model=PasswordDetailSchema)
def get_password(
    password_id: int,
    current_user: Annotated[UserMeSchema, Depends(validate_auth_user_by_token)],
    db: Session = Depends(get_db),
):
    rec = db.query(Password).filter(Password.id == password_id).first()

    if rec is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    if rec.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    return PasswordDetailSchema(
        id=rec.id,
        service_name=rec.service_name,
        service_url=rec.service_url,
        login=rec.username,
        password=users_utils.decrypt_password(rec.encrypted_password),
    )


@passwords_router.patch("/{password_id}", response_model=PasswordDetailSchema)
def patch_password(
    password_id: int,
    payload: PasswordUpdateSchema,
    current_user: Annotated[UserMeSchema, Depends(validate_auth_user_by_token)],
    db: Session = Depends(get_db),
):
    rec = db.query(Password).filter(Password.id == password_id).first()

    if rec is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    if rec.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    new_service_name = (
        payload.service_name if payload.service_name is not None else rec.service_name
    )
    new_login = payload.login if payload.login is not None else rec.username
    new_service_url = (
        payload.service_url if payload.service_url is not None else rec.service_url
    )
    new_password = (
        payload.password
        if payload.password is not None
        else users_utils.decrypt_password(rec.encrypted_password)
    )

    # Проверка на дубликат с новыми значениями
    existing = (
        db.query(Password)
        .filter(
            Password.user_id == current_user.id,
            Password.id != password_id,
            Password.service_name == new_service_name,
            Password.service_url == new_service_url,
            Password.username == new_login,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Password record for this service/login already exists",
        )

    rec.service_name = new_service_name
    rec.username = new_login
    rec.service_url = new_service_url
    rec.encrypted_password = users_utils.encrypt_password(new_password)

    db.commit()
    db.refresh(rec)

    return PasswordDetailSchema(
        id=rec.id,
        service_name=rec.service_name,
        service_url=rec.service_url,
        login=rec.username,
        password=rec.encrypted_password,
    )


@passwords_router.delete("/{password_id}")
def delete_password(
    password_id: int,
    current_user: Annotated[UserMeSchema, Depends(validate_auth_user_by_token)],
    db: Session = Depends(get_db),
):
    rec = db.query(Password).filter(Password.id == password_id).first()

    if rec is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    if rec.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    db.delete(rec)
    db.commit()

    return {"message": "Password record deleted"}
