from pydantic import AnyHttpUrl, BaseModel


class PasswordCreateSchema(BaseModel):
    service_name: str
    service_url: AnyHttpUrl | None = None
    login: str
    password: str


class PasswordPublicSchema(BaseModel):
    id: int
    service_name: str


class PasswordDetailSchema(BaseModel):
    id: int
    service_name: str
    service_url: AnyHttpUrl | None = None
    login: str
    password_hash: str


class PasswordUpdateSchema(BaseModel):
    service_name: str | None = None
    service_url: AnyHttpUrl | None = None
    login: str | None = None
    password: str | None = None


class PasswordListQuery(BaseModel):
    service_name: str | None = None
    login: str | None = None
