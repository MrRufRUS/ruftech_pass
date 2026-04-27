# CI/CD — Руководство разработчика

## Триггеры

| Событие                         | Что запускает                                                |
| ------------------------------- | ------------------------------------------------------------ |
| `push` в `master` или `develop` | Полный CI-пайплайн                                           |
| Открытие / обновление любого PR | Полный CI-пайплайн                                           |
| `push` в `master`               | Release Please (создание/обновление Release PR или релиз)    |

CI и Release Please запускаются **независимо** друг от друга при пуше в `master` — release-please больше не зависит от завершения CI.

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

1. При любом `push` в `master` запускается `release-please` (независимо от CI).
2. Release Please анализирует commit-сообщения (Conventional Commits) и:
   - создаёт или обновляет **Release PR** с CHANGELOG
   - при мёрже Release PR — создаёт **git-тег** и **GitHub Release** автоматически

**Теги создавать вручную не нужно** — release-please делает это самостоятельно.

### Что происходит при мёрже PR в `master`

| Что замёрджено                 | release-PR обновится | Тег и GitHub Release | Docker push |
| ------------------------------ | :------------------: | :------------------: | :---------: |
| feat / fix PR                  |          ✓           |          ✗           |      ✗      |
| docs / chore (без user-facing) |          ✗           |          ✗           |      ✗      |
| release-PR (от release-please) |          —           |          ✓           |      ✓      |

**Обычный PR в master:** release-please обновляет release-PR, ничего не публикуется.

**Мёрж release-PR в master:** release-please создаёт тег и GitHub Release, после чего job `docker-publish` собирает и пушит образы. Это **единственное** место в пайплайне, где собираются Docker-образы.

> **Защита от сломанного master.** Job `release-please` физически стартует параллельно с CI (оба триггерятся по `push: master`), но первым шагом запускает `lewagon/wait-on-check-action`, ожидающий успеха CI-job `Сборка фронтенда` на том же коммите (`github.sha`). Поведение по конечному состоянию CI:
>
> - **CI зелёный** → шаг ожидания проходит, дальше работает release-please-action и (если был замёржен release-PR) запускается `docker-publish`.
> - **CI красный/cancelled** → шаг ожидания падает, release-please-action не выполняется. Release-PR не обновляется, тег не создаётся, `docker-publish` не запускается (зависит от `release-please` через `needs:`).
>
> Таким образом ни release-PR с CHANGELOG, ни git-тег, ни Docker-образ не появляются без подтверждённого зелёного CI на конкретном коммите.

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
