# CI/CD — Руководство разработчика

## Триггеры

| Событие                         | Что запускает                                                |
| ------------------------------- | ------------------------------------------------------------ |
| `push` в `master` или `develop` | Полный CI-пайплайн                                           |
| Открытие / обновление любого PR | Полный CI-пайплайн                                           |
| Успешное завершение CI на `master` | Release Please (через `workflow_run`)                     |

Release Please запускается **строго по цепочке** после CI: воркфлоу триггерится на событие `workflow_run` с `types: [completed]` и условием `conclusion == 'success'`. Если CI упал — Release Please вообще не стартует.

Конкурентные запуски CI отменяются: новый коммит в ту же ветку аннулирует предыдущий прогон (`cancel-in-progress: true`).

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
```

Docker-образы в CI **не собираются** — это делает только Release Please при создании релиза (см. ниже).

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

---

## Релиз

### Как работает release-please

1. После успешного CI на ветке `master` срабатывает триггер `workflow_run` и стартует воркфлоу Release Please.
2. Release Please анализирует commit-сообщения (Conventional Commits) и:
   - создаёт или обновляет **Release PR** с CHANGELOG
   - при мёрже Release PR — создаёт **git-тег** и **GitHub Release** автоматически
3. После создания релиза запускается job `docker-publish` (через `needs: release-please` + `if: release_created`).

**Теги создавать вручную не нужно** — release-please делает это самостоятельно.

### Цепочка запуска

```
push в master
    └── CI
          ├── ❌ упал → workflow_run.conclusion=failure → Release Please НЕ стартует
          └── ✓ зелёный → workflow_run.conclusion=success → Release Please стартует
                └── release-please-action
                      ├── обычный коммит  → обновляет release-PR
                      └── мёрж release-PR → создаёт тег + GitHub Release
                            └── docker-publish (только если release_created=true)
                                  └── собирает и пушит образы
```

### Что происходит при мёрже PR в `master`

| Что замёрджено                 | CI | release-please | Тег + Release | Docker push |
| ------------------------------ | :-: | :----------------: | :-----------: | :---------: |
| feat / fix PR, CI зелёный      | ✓  | обновляет release-PR | ✗             | ✗           |
| feat / fix PR, CI упал         | ✗  | не запускается     | ✗             | ✗           |
| docs / chore (без user-facing) | ✓  | ничего не меняет   | ✗             | ✗           |
| release-PR (от release-please) | ✓  | создаёт тег        | ✓             | ✓           |
| release-PR, CI упал            | ✗  | не запускается     | ✗             | ✗           |

Docker-образы собираются и пушатся **только** при мёрже release-PR с зелёным CI. Это единственное место в пайплайне, где образы попадают в Docker Hub.

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
