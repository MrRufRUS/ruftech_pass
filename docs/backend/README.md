# Backend — Руководство разработчика

FastAPI-приложение на Python 3.12. Пакетный менеджер: `uv`.

---

## Требования

- Python 3.12+
- PostgreSQL 16 (для локальной разработки)
- `uv` — устанавливается через pip

```bash
cd backend
pip install uv
uv sync          # установить все зависимости (включая dev)
```

## Структура

```
backend/
├── app/
│   ├── main.py              — FastAPI app, CORS middleware, подключение роутеров
│   ├── api/v1/
│   │   ├── users/
│   │   │   ├── router.py    — Эндпоинты: signup, login, me, logout, updateMe, deleteAccount
│   │   │   ├── schemas.py   — Pydantic-схемы: UserSchema, TokenInfo, UserUpdateSchema
│   │   │   └── utils.py     — JWT encode/decode (RS256), bcrypt хэширование
│   │   └── passwords/
│   │       ├── router.py    — CRUD эндпоинты паролей
│   │       └── schemas.py   — PasswordCreateSchema, PasswordDetailSchema, PasswordPublicSchema
│   ├── core/
│   │   └── config.py        — Settings (DATABASE_URL, PASSWORD_SECRET_KEY, API_V1_PREFIX)
│   └── db/
│       ├── models.py        — SQLAlchemy модели: User, Password
│       ├── database.py      — create_engine, SessionLocal, Base
│       └── depedency.py     — FastAPI Depends(get_db)
├── alembic/                 — Миграции БД
│   ├── env.py
│   └── versions/
├── tests/                   — pytest тесты
├── certs/                   — RSA ключи для JWT (git-ignored)
└── pyproject.toml           — Метаданные, зависимости
```

## Локальный запуск

### 1. Переменные окружения

Файл `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/ruftech-pass
PASSWORD_SECRET_KEY=<случайная-строка-base64>
```

### 2. JWT ключи

```bash
mkdir -p certs
openssl genrsa -out certs/jwt-private.pem 2048
openssl rsa -in certs/jwt-private.pem -pubout -out certs/jwt-public.pem
```

Алгоритм: **RS256**. Токен живёт **5 минут**. Ключи хранить в `backend/certs/` (в `.gitignore`).

### 3. Миграции и запуск

```bash
uv run alembic upgrade head          # применить миграции
uv run uvicorn app.main:app --reload  # запуск (порт 8000)
```

## API эндпоинты

Префикс: `/api/v1`

### Аутентификация (`/api/v1/jwt/`)

| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/jwt/signup/` | Регистрация (`username`, `password`, `email?`) |
| POST | `/jwt/login/` | Вход, возвращает JWT в cookie |
| GET | `/jwt/me/` | Данные текущего пользователя |
| POST | `/jwt/logout/` | Выход (удаление cookie) |
| PATCH | `/jwt/me/` | Обновление профиля |
| DELETE | `/jwt/delete/` | Удаление аккаунта |

### Пароли (`/api/v1/passwords/`)

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/passwords/` | Список всех паролей пользователя |
| POST | `/passwords/` | Создание пароля |
| GET | `/passwords/{id}` | Получение одного пароля |
| PATCH | `/passwords/{id}` | Обновление пароля |
| DELETE | `/passwords/{id}` | Удаление пароля |

Поля пароля: `service_name`, `url?`, `login`, `password` (шифруется через Fernet).

## Модели данных

```python
class User(Base):
    id: int (PK)
    username: str (unique)
    email: str | None (unique)
    password_hash: bytes  # bcrypt

class Password(Base):
    id: int (PK)
    user_id: int (FK → User.id)
    service_name: str
    url: str | None
    login: str
    password: bytes  # Fernet-encrypted
```

## Шифрование паролей

Пользовательские пароли шифруются симметрично через **Fernet** (`cryptography`). Ключ — `PASSWORD_SECRET_KEY` из env.

## Миграции (Alembic)

```bash
# Создать новую миграцию
uv run alembic revision --autogenerate -m "add column X"

# Применить
uv run alembic upgrade head

# Откатить
uv run alembic downgrade -1
```

Конфиг: `alembic/env.py` читает `DATABASE_URL` из env.

## Линтинг

```bash
uv run ruff check .      # проверка
uv run ruff check --fix  # автоисправление
```

## Тестирование

Руководство по написанию тестов: [../testing-guide.md](../testing-guide.md)

```bash
# Генерация тестовых JWT-ключей (если ещё не сделано)
mkdir -p certs
openssl genrsa -out certs/jwt-private.pem 2048
openssl rsa -in certs/jwt-private.pem -pubout -out certs/jwt-public.pem

# Запуск тестов (SQLite in-memory, без PostgreSQL)
DATABASE_URL="sqlite:///:memory:" \
PASSWORD_SECRET_KEY="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=" \
uv run pytest --cov=app --cov-report=term-missing
```

## Production-сборка (Docker)

```bash
# Из корня репозитория
docker compose up --build
# Backend доступен на: http://localhost:8000
# Swagger UI: http://localhost:8000/docs
```

Dockerfile: `backend/Dockerfile` (python:3.12-slim, `uv sync --no-dev`).

При запуске через docker-compose миграции применяются отдельным сервисом `migrations` перед стартом `backend`.
