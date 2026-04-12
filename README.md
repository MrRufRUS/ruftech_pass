# RufTECH Pass

Менеджер паролей: фронтенд (React 19 + Vite + TanStack Router) и бэкенд (FastAPI + PostgreSQL).

## Документация

| Документ | Описание |
|---|---|
| [docs/project-overview-pdr.md](docs/project-overview-pdr.md) | Обзор продукта, архитектура, ключевые компоненты |
| [docs/system-architecture.md](docs/system-architecture.md) | Диаграммы, слои приложения, потоки данных |
| [docs/code-standards.md](docs/code-standards.md) | Стандарты кода и соглашения |
| [docs/development-roadmap.md](docs/development-roadmap.md) | Дорожная карта и прогресс |
| [docs/project-changelog.md](docs/project-changelog.md) | Журнал изменений |
| [frontend/CLAUDE.md](frontend/CLAUDE.md) | Детальное руководство по монорепозиторию фронтенда |

## Структура проекта

```
.
├── frontend/          # Turborepo-монорепозиторий (pnpm workspaces)
│   ├── apps/pass/     # Основное React-приложение
│   └── packages/      # Общие пакеты (ui, tokens, http-client и др.)
└── backend/           # FastAPI-приложение
    ├── app/
    │   ├── api/v1/    # Роуты (users, passwords)
    │   ├── core/      # Настройки (config.py)
    │   └── db/        # Модели, сессия, зависимости
    ├── alembic/       # Миграции БД
    └── certs/         # RSA-ключи для JWT (jwt-private.pem, jwt-public.pem)
```

## Переменные окружения

### Backend — `backend/.env`

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/ruftech-pass
PASSWORD_SECRET_KEY=<случайная-строка-для-шифрования-паролей>
```

JWT работает через RSA-ключи — файлы `backend/certs/jwt-private.pem` и `backend/certs/jwt-public.pem` должны существовать (алгоритм RS256, токен живёт 5 минут).

### Frontend — `frontend/apps/pass/.env`

```env
VITE_API_URL=http://localhost:8000    # базовый URL бэкенда
```

## Запуск и сборка

### Frontend

Требования: Node 24, pnpm 10.

```bash
cd frontend

pnpm install                              # установить зависимости

# Разработка
pnpm turbo dev                            # все пакеты
pnpm --filter ruftech-pass dev            # только приложение (порт 5173)

# Сборка
pnpm turbo build                          # все пакеты
pnpm --filter ruftech-pass build          # только приложение → apps/pass/dist/

# Тесты
pnpm turbo test                           # unit-тесты (Vitest)
pnpm turbo test:coverage                  # с покрытием
pnpm test:e2e                             # E2E (Playwright)

# Линтинг
pnpm turbo lint
```

### Backend

Требования: Python 3.12, PostgreSQL.

```bash
cd backend

uv sync

# Миграции
uv run alembic upgrade head

# Запуск (порт 8000)
uv run uvicorn app.main:app --reload
```

### Docker (полный стек)

Из корня репозитория:

```bash
docker compose up --build
# Backend:  http://localhost:8000
# Frontend: http://localhost:8080
```

Переменная `VITE_API_URL` передаётся в сборку фронтенда как build arg (по умолчанию `http://localhost:8000`). Чтобы переопределить:

```bash
VITE_API_URL=https://api.example.com docker compose up --build
```
