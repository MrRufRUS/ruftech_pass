# CI/CD — Руководство разработчика

## Триггеры

| Событие                         | Что запускает                                   |
| ------------------------------- | ----------------------------------------------- |
| `push` в `master` или `develop` | Полный CI-пайплайн                              |
| Открытие / обновление любого PR | Полный CI-пайплайн                              |
| Успешный CI на `master`         | Release Please (создание/обновление Release PR) |

Конкурентные запуски отменяются: новый коммит в ту же ветку аннулирует предыдущий прогон (`cancel-in-progress: true`).

---

## Этапы CI

Все этапы выполняются последовательно (каждый зависит от предыдущего):

```
backend-lint
    └── backend-test
            └── backend-build
                    └── frontend-lint
                            └── frontend-test ─── coverage-report (параллельно)
                                    └── frontend-build
                                            └── docker-backend
                                                    └── docker-frontend
```

### 1. `backend-lint` — линтинг бэкенда

- Инструмент: `ruff check .`
- Рабочая директория: `backend/`
- Python: 3.12, пакетный менеджер: `uv`

### 2. `backend-test` — тесты бэкенда

- Инструмент: `pytest --cov=app`
- БД: SQLite in-memory (без PostgreSQL)
- JWT-ключи генерируются при каждом прогоне (`openssl genrsa`)
- Env-переменные:
  - `DATABASE_URL=sqlite:///:memory:`
  - `PASSWORD_SECRET_KEY=AAAA...=` (тестовый Fernet-ключ)
- Артефакт: `backend-coverage.md` + `coverage.xml` (7 дней)

### 3. `backend-build` — проверка импорта

- Устанавливает только prod-зависимости (`uv sync --no-dev`)
- Проверяет, что приложение импортируется без ошибок:
  ```bash
  PYTHONPATH=app uv run python -c "from main import app; print('OK')"
  ```

### 4. `frontend-lint` — линтинг фронтенда

- Инструмент: `pnpm turbo lint` (ESLint 9 flat config)
- Использует составное действие `.github/actions/frontend-setup`

### 5. `frontend-test` — тесты фронтенда

- Инструмент: `pnpm turbo test:coverage` (Vitest)
- Артефакт: `frontend-coverage.md` + директории `coverage/` (7 дней)
- Coverage-summary генерируется скриптом `scripts/coverage-summary.js`

### 6. `frontend-build` — production-сборка

- Инструмент: `pnpm turbo build` (Vite + tsc + SSR prerender)

### `coverage-report` — сводный отчёт (параллельно с `frontend-build`)

- Запускается после `backend-test` + `frontend-test` (`needs: [backend-test, frontend-test]`)
- Объединяет оба отчёта в `combined-coverage.md`
- При PR — обновляет sticky-комментарий в PR (через `marocchino/sticky-pull-request-comment`)
- Артефакт хранится 30 дней

### 7–8. `docker-backend` / `docker-frontend`

- Собирают Docker-образы для проверки корректности Dockerfile
- **НЕ публикуют** образы в Registry — только локальная сборка с тегом `:ci`

---

## Релиз

### Как работает release-please

1. После успешного CI на ветке `master` автоматически запускается `release-please`.
2. Release Please анализирует commit-сообщения (Conventional Commits) и:
   - создаёт или обновляет **Release PR** с CHANGELOG
   - при мёрже Release PR — создаёт **git-тег** и **GitHub Release** автоматически

**Теги создавать вручную не нужно** — release-please делает это самостоятельно.

### Формат тега

Вида `v1.2.3`. Версия определяется типом коммитов:
- `feat:` → minor bump
- `fix:` → patch bump
- `BREAKING CHANGE` / `!` суффикс → major bump

### Публикация Docker-образов

Срабатывает **только при создании релиза** (т.е. после мёржа Release PR):

```
docker push <DOCKERHUB_USERNAME>/ruftech-backend:<tag>
docker push <DOCKERHUB_USERNAME>/ruftech-backend:latest
docker push <DOCKERHUB_USERNAME>/ruftech-frontend:<tag>
docker push <DOCKERHUB_USERNAME>/ruftech-frontend:latest
```

Образы публикуются с тегом версии (`v1.2.3`) и тегом `latest`.

### Необходимые secrets

| Secret               | Где                 | Для чего                |
| -------------------- | ------------------- | ----------------------- |
| `DOCKERHUB_USERNAME` | GitHub repo secrets | Docker Hub логин        |
| `DOCKERHUB_TOKEN`    | GitHub repo secrets | Docker Hub access token |

---

## Проверка CI локально

### Backend

```bash
cd backend

# Линтинг
uv run ruff check .

# Тесты
mkdir -p certs
openssl genrsa -out certs/jwt-private.pem 2048
openssl rsa -in certs/jwt-private.pem -pubout -out certs/jwt-public.pem

DATABASE_URL="sqlite:///:memory:" \
PASSWORD_SECRET_KEY="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=" \
uv run pytest --cov=app --cov-report=term-missing

# Проверка импорта (prod-режим)
uv sync --no-dev
PYTHONPATH=app DATABASE_URL="sqlite:///./build_check.db" \
  uv run python -c "from main import app; print('OK')"
```

### Frontend

```bash
cd frontend

# Линтинг
pnpm turbo lint

# Тесты
pnpm turbo test:coverage

# Сборка
pnpm turbo build
```

---

## Файлы конфигурации

| Файл                                        | Назначение                                             |
| ------------------------------------------- | ------------------------------------------------------ |
| `.github/workflows/ci.yml`                  | Основной CI-пайплайн                                   |
| `.github/workflows/release-please.yml`      | Автоматический релиз + публикация образов              |
| `.github/actions/frontend-setup/action.yml` | Составное действие: Node 24 + pnpm 10                  |
| `release-please-config.json`                | Конфиг release-please (тип репозитория, маппинг путей) |
| `.release-please-manifest.json`             | Текущие версии пакетов                                 |
