# Руководство по тестированию

> Детальный справочник по существующим тестам — в [tests-overview.md](./tests-overview.md).

---

## Пирамида тестов

| Тип             | Определение                                      | Инструмент      |
| --------------- | ------------------------------------------------ | --------------- |
| **Unit**        | Одна функция/модуль в полной изоляции            | pytest / Vitest |
| **Integration** | Несколько модулей вместе; внешний I/O мокируется | pytest / Vitest |
| **Component**   | React-компонент через RTL; API мокируется        | Vitest + RTL    |
| **E2E**         | Полный браузер против реального стека            | Playwright      |

---

## Бэкенд (pytest)

### Запуск тестов

```bash
cd backend

# Сгенерировать JWT-ключи (один раз)
mkdir -p certs
openssl genrsa -out certs/jwt-private.pem 2048
openssl rsa -in certs/jwt-private.pem -pubout -out certs/jwt-public.pem

# Запустить тесты
DATABASE_URL="sqlite:///:memory:" \
PASSWORD_SECRET_KEY="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=" \
uv run pytest

# С покрытием
uv run pytest --cov=app --cov-report=term-missing
```

### Структура директорий

```
backend/tests/
├── conftest.py          # фикстуры: engine, db, client, auth_client
├── test_users.py        # тесты эндпоинтов /api/v1/jwt/*
├── test_passwords.py    # тесты эндпоинтов /api/v1/passwords/*
└── test_utils.py        # тесты утилит (JWT, хэширование)
```

### Доступные фикстуры

| Фикстура       | Scope              | Описание                                               |
| -------------- | ------------------ | ------------------------------------------------------ |
| `test_engine`  | session            | SQLite in-memory движок с созданными таблицами         |
| `clean_tables` | function (autouse) | Очищает все строки между тестами                       |
| `db`           | function           | SQLAlchemy сессия для прямой работы с БД               |
| `client`       | function           | FastAPI TestClient с переопределённым `get_db`         |
| `auth_client`  | function           | TestClient, предварительно залогиненный как `testuser` |

### Написание нового теста

```python
# tests/test_my_feature.py

from .conftest import create_test_user


# Тест без авторизации (client)
def test_endpoint_returns_expected(client):
    resp = client.post("/api/v1/jwt/signup/", data={"username": "alice", "password": "pass"})
    assert resp.status_code == 201
    assert resp.json() == {"message": "User created"}


# Тест с предсозданным пользователем (db + client)
def test_authenticated_endpoint(client, db):
    create_test_user(db, username="bob", password="secret")
    resp = client.post("/api/v1/jwt/login/", data={"username": "bob", "password": "secret"})
    assert resp.status_code == 200
    assert "access_token" in resp.json()


# Тест с авторизованным клиентом (auth_client)
def test_protected_endpoint(auth_client):
    resp = auth_client.get("/api/v1/jwt/me/")
    assert resp.status_code == 200
    assert resp.json()["username"] == "testuser"
```

### Правила написания тестов бэкенда

- Одна фикстура `db` + `client` на тест — изоляция гарантируется `clean_tables` (autouse)
- Для создания тестовых пользователей — только `create_test_user()` из `conftest.py`
- Используй `assert resp.status_code == X` перед чтением тела ответа
- Всегда проверяй структуру ответа, не только статус-код
- SQLite in-memory — достаточно для CRUD; миграции Alembic запускать не нужно в тестах

---

## Фронтенд (Vitest)

### Запуск тестов

```bash
cd frontend

pnpm turbo test              # все unit/integration/component тесты
pnpm turbo test:coverage     # с отчётом покрытия
pnpm --filter ruftech-pass test          # только приложение
pnpm --filter @ruftech/helpers test      # только пакет helpers
pnpm test:e2e                # E2E (Playwright, нужен запущенный стек)
pnpm coverage:all            # запустить все + собрать сводный отчёт
```

### Где размещать тесты

```
apps/pass/src/__tests__/         # тесты для приложения pass
packages/<name>/src/__tests__/   # тесты для пакета
```

Формат имени файла: `<module-name>.test.ts` или `<component-name>.test.tsx`.

### Окружение

- **happy-dom** — лёгкий DOM, быстрее jsdom. Настроен в `vite.config.ts` как `environment: 'happy-dom'`.
- `src/test-setup.ts` — глобальный сетап RTL + мок `matchMedia`.
- Покрытие исключить для файла: добавить `/* c8 ignore file */` в первую строку.

### Unit-тест (чистая функция)

```typescript
// src/__tests__/i18n.test.ts
import { describe, it, expect } from 'vitest'
import { isLocale, detectLocale } from '../shared/i18n/locale'

describe('isLocale', () => {
  it('returns true for supported locale', () => {
    expect(isLocale('ru')).toBe(true)
    expect(isLocale('en')).toBe(true)
  })

  it('returns false for unknown locale', () => {
    expect(isLocale('fr')).toBe(false)
  })
})
```

### Integration-тест (несколько модулей, мокированный fetch)

```typescript
// src/__tests__/auth-api.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { login } from '../shared/auth/auth-api'

// Мокируем HTTP-клиент на уровне модуля
const mockFetch = vi.fn()
vi.mock('../shared/http', () => ({ httpClient: { fetch: mockFetch } }))

describe('login', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('sends form-encoded POST to /v1/jwt/login/', async () => {
    mockFetch.mockResolvedValue({ access_token: 'tok', token_type: 'bearer' })

    await login({ username: 'alice', password: 'pass' })

    expect(mockFetch).toHaveBeenCalledWith(
      '/v1/jwt/login/',
      expect.objectContaining({ method: 'POST' })
    )
  })
})
```

### Component-тест (React Testing Library)

```typescript
// src/__tests__/login-form.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { LoginForm } from '../components/LoginForm'

// Мокируем API на уровне модуля
vi.mock('../shared/auth/auth-api', () => ({
  login: vi.fn().mockResolvedValue({ access_token: 'tok' }),
}))

describe('LoginForm', () => {
  it('renders username and password fields', () => {
    render(<LoginForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('calls onSuccess after successful login', async () => {
    const onSuccess = vi.fn()
    render(<LoginForm onSuccess={onSuccess} onSwitchMode={vi.fn()} />)

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'alice' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } })
    fireEvent.click(screen.getByRole('button', { name: /войти/i }))

    await screen.findByText(/loading/i)  // опционально — ждём состояния
    expect(onSuccess).toHaveBeenCalled()
  })
})
```

### E2E-тест (Playwright)

Тесты в `packages/e2e/src/`. Требует запущенный стек (`docker compose up` или `pnpm turbo dev`).

```typescript
// packages/e2e/src/smoke.spec.ts
import { test, expect } from '@playwright/test'

test('homepage has correct title in Russian', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/RufTECH Pass/)
})

test('auth page renders login form', async ({ page }) => {
  await page.goto('/auth')
  await expect(page.getByRole('heading', { name: /войти/i })).toBeVisible()
})
```

### Правила написания тестов фронтенда

- Моки объявляй на уровне модуля через `vi.mock(...)`, не внутри `it()`
- Используй `screen.getByRole` / `getByLabelText` вместо `getByTestId` — тесты ближе к реальному использованию
- В component-тестах проверяй поведение (клики, ввод, отображение), не реализацию
- Для асинхронных операций используй `findBy*` (ожидает появления) вместо `getBy*`
- Не мокируй то, что не нужно — чистые утилиты тестируй как есть
- Один `describe` = один модуль/компонент; `it` описывает конкретный сценарий

---

## Покрытие

Порог покрытия: **>= 70% (жёлтый)**, цель **>= 90% (зелёный)**.

```bash
# Сводный отчёт (фронт + бэк)
cd frontend && pnpm coverage:all
```

Отчёт публикуется как sticky-комментарий в PR автоматически через CI.
