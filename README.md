# RufTECH Pass

Менеджер паролей: фронтенд (React 19 + Vite + TanStack Router) и бэкенд (FastAPI + PostgreSQL).

## Документация

**[→ docs/README.md](docs/README.md)** — полный индекс документации.

| Документ                                                   | Описание                                  |
| ---------------------------------------------------------- | ----------------------------------------- |
| [docs/frontend/README.md](docs/frontend/README.md)         | Фронтенд: монорепо, команды, архитектура  |
| [docs/backend/README.md](docs/backend/README.md)           | Бэкенд: структура, API, миграции          |
| [docs/ci-cd-guide.md](docs/ci-cd-guide.md)                 | CI-этапы, релиз, Docker Hub               |
| [docs/testing-guide.md](docs/testing-guide.md)             | Как писать тесты (backend + frontend)     |
| [docs/system-architecture.md](docs/system-architecture.md) | Диаграммы, слои приложения, потоки данных |
| [docs/code-standards.md](docs/code-standards.md)           | Стандарты кода и соглашения               |

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

## Релизы и Docker-образы

Релизами управляет [release-please](https://github.com/googleapis/release-please-action). CI и релизный пайплайн запускаются независимо при `push` в `master` (см. [docs/ci-cd-guide.md](docs/ci-cd-guide.md)).

### Что происходит при мёрже PR в `master`

| Что замёрджено                 | release-PR обновится | Тег и GitHub Release | Docker push |
| ------------------------------ | :------------------: | :------------------: | :---------: |
| feat / fix PR                  |          ✓           |          ✗           |      ✗      |
| docs / chore (без user-facing) |          ✗           |          ✗           |      ✗      |
| release-PR (от release-please) |          —           |          ✓           |      ✓      |

#### 1. Обычный feature/fix PR смерджен в master

```
push в master
    ├── CI запускается → линт/тесты/сборка
    └── release-please запускается
            └── анализирует новые conventional-коммиты
                  ├── если есть feat/fix → создаёт ИЛИ обновляет release-PR
                  └── release_created = false
                       └── docker-publish ✗ НЕ запускается
```

Образы не собираются. Просто копится список изменений в release-PR.

#### 2. release-PR смерджен в master

```
push в master (мердж "chore(master): release X.Y.Z")
    ├── CI запускается → линт/тесты/сборка
    └── release-please запускается
            └── видит, что release-PR замёржен
                  ├── создаёт git-тег vX.Y.Z
                  ├── создаёт GitHub Release
                  └── release_created = true
                       └── docker-publish ✓ ЗАПУСКАЕТСЯ
                            └── собирает и пушит образы (vX.Y.Z + latest)
```

Docker-образы собираются **ровно один раз** — при мёрже release-PR. В обычном CI (на feature-PR и push в `master`) docker не собирается. Никакого ручного тегирования делать не нужно — release-please создаёт release-PR автоматически на основе [Conventional Commits](https://www.conventionalcommits.org/).
