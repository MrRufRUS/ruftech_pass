from pydantic import BaseModel


class PasswordCreateSchema(BaseModel):
    service_name: str
    service_url: str | None = None
    login: str
    password: str


class PasswordPublicSchema(BaseModel):
    id: int
    service_name: str
    service_url: str | None = None


class PasswordDetailSchema(BaseModel):
    id: int
    service_name: str
    service_url: str | None = None
    login: str
    password: str


class PasswordUpdateSchema(BaseModel):
    service_name: str | None = None
    service_url: str | None = None
    login: str | None = None
    password: str | None = None


class PasswordListQuery(BaseModel):
    service_name: str | None = None
    service_url: str | None = None
    login: str | None = None
