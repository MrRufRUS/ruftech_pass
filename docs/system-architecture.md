# Архитектура системы RufTECH Pass

## Обзор

RufTECH Pass использует классическую архитектуру клиент-сервер с разделением на фронтенд (React/Vite) и бэкенд (FastAPI).

## Диаграмма архитектуры

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (User)                            │
└────────┬─────────────────────────────────────────────┬───────┘
         │                                              │
         │ HTTPS                                        │
         ▼                                              ▼
┌──────────────────────────────────────┐    ┌──────────────────┐
│       RufTECH Pass Frontend           │    │  Static Assets   │
│  (React 19 + TanStack Router v2)     │    │  (Nginx/CDN)     │
│                                       │    └──────────────────┘
│  • Dashboard Page                     │
│  • Auth Page (Login)                  │
│  • i18n ($locale routing)             │
│  • Vanilla Extract CSS                │
│                                       │
└────┬──────────────────┬──────────────┬┘
     │                  │              │
     ▼                  ▼              ▼
┌─────────────────────────────────────────────┐
│    HTTP Client Layer (Custom Plugin Arch)   │
│                                              │
│  • withBaseURL('/api')                      │
│  • withLogging()                            │
│  • withCredentials() [JWT in header]        │
└────┬─────────────────────────────────────────┘
     │
     │ HTTP/REST API
     │
     ▼
┌────────────────────────────────────────────┐
│         FastAPI Backend                    │
│                                            │
│  Routes:                                   │
│  • POST   /v1/jwt/login/                   │
│  • POST   /v1/jwt/logout/                  │
│  • GET    /v1/jwt/me/                      │
│  • GET    /v1/passwords/                   │
│  • POST   /v1/passwords/                   │
│  • GET    /v1/passwords/{id}               │
│  • PATCH  /v1/passwords/{id}               │
│  • DELETE /v1/passwords/{id}               │
└────┬────────────────────────────────────────┘
     │
     ▼
┌────────────────────────────────────────────┐
│    SQLAlchemy ORM + Database Layer         │
│                                            │
│  Models:                                   │
│  • User (with hashed password)             │
│  • Password (encrypted storage)            │
└────────────────────────────────────────────┘
     │
     ▼
┌────────────────────────────────────────────┐
│      PostgreSQL / SQLite Database          │
└────────────────────────────────────────────┘
```

## Слои приложения

### 1. Presentation Layer (Фронтенд)

**Технология**: React 19 + TanStack Router v2 + Vanilla Extract CSS

**Компоненты**:

```
src/
├── pages/
│   ├── auth/
│   │   ├── auth-page.tsx           # Form для login
│   │   └── auth-page.css.ts
│   ├── dashboard/
│   │   ├── dashboard-page.tsx      # Main container (state machine)
│   │   ├── password-list.tsx       # Password table
│   │   ├── password-form-modal.tsx # Create/Edit form
│   │   ├── password-detail-modal.tsx # View details + show/hide
│   │   ├── delete-confirm-dialog.tsx # Confirmation
│   │   ├── *.css.ts               # Vanilla-extract styles
│   │   └── index.ts               # Barrel export
│   └── ...
├── routes/
│   ├── __root.tsx                 # Root layout + HTTP context provider
│   ├── auth.tsx                   # Login route without locale
│   ├── $locale/
│   │   ├── auth.tsx               # Localized auth
│   │   ├── dashboard.tsx          # Auth guard + outlet
│   │   └── dashboard/
│   │       └── index.tsx          # Dashboard page
│   └── ...
├── shared/
│   ├── auth/
│   │   ├── api.ts                 # login(), fetchMe(), logout()
│   │   ├── guard.ts               # checkAuth()
│   │   └── index.ts
│   ├── passwords/
│   │   ├── api.ts                 # CRUD functions
│   │   └── index.ts
│   ├── http-client-instance.ts    # Singleton httpClient
│   ├── i18n/
│   │   ├── i18n.ts                # i18next config
│   │   ├── default.ts             # Language settings
│   │   └── resources.ts           # NS mapping
│   └── ...
├── locales/
│   ├── ru/
│   │   ├── auth.json              # Auth translations
│   │   ├── dashboard.json         # Dashboard translations
│   │   └── common.json
│   └── en/
│       └── ...
└── __tests__/
    ├── auth-api.test.ts           # 4 тестов
    └── passwords-api.test.ts      # 9 тестов
```

### 2. Application Layer (API Client)

**Файл**: `src/shared/passwords/api.ts` и `src/shared/auth/api.ts`

Функции для взаимодействия с бэкенд API:

```typescript
// Auth
login(client, { username, password })
fetchMe(client)
logout(client)

// Passwords
listPasswords(client)
createPassword(client, { name, username, password, domain, notes })
getPassword(client, id)
updatePassword(client, id, { name, username, password, domain, notes })
deletePassword(client, id)
```

Все методы:
- Используют `IHttpClient` интерфейс для инъекции зависимостей
- Проверяют HTTP response через ZOD-схемы
- Выбрасывают `HttpError` при ошибке

### 3. HTTP Client Layer

**Пакет**: `@ruftech/http-client`

**Архитектура плагинов**:

```typescript
const client = DefaultHttpClient
  .create(fetch)
  .applyPlugin(withBaseURL('/api'))
  .applyPlugin(withLogging(logger))
  .applyPlugin(withCredentials())
```

**Плагины**:

- `withBaseURL(url)` — добавляет префикс к каждому запросу
- `withLogging(logger)` — логирует запросы/ответы
- `withCredentials()` — отправляет JWT в Authorization header (или credentials: 'include' для cookies)

### 4. Business Logic Layer (Dashboard State Machine)

**Компонент**: `DashboardPage`

Управление состояниями через TypeScript union типы:

```typescript
type PageView
  = | { view: 'list' }
    | { view: 'detail', id: number }
    | { view: 'create' }
    | { view: 'edit', id: number, initial: IPasswordDetail }
    | { view: 'delete-confirm', id: number, name: string }
```

**Переходы состояний**:

```
[list] ─── click item ──→ [detail]
              │                │
              ├── click create ─┤
              │                │
              └─ click edit ───→ [edit]

[detail] ─── click edit ──→ [edit]
             │
             ├── click delete ──→ [delete-confirm]
             │
             └── click back ──→ [list]

[edit] ─── save ──→ [list] (reload)
         └── cancel ──→ [list]

[delete-confirm] ─── confirm ──→ [list] (reload)
                  └── cancel ──→ [list]
```

## Данные и модели

### API Request/Response Types

**Из `@ruftech/api`** (shared types между фронтом и бэком):

```typescript
interface IUserMe {
  id: number
  username: string
  email: string
}

interface IPasswordPublic {
  id: number
  name: string
  username: string
  domain: string | null
  created_at: string
  updated_at: string
}

interface IPasswordDetail extends IPasswordPublic {
  password: string
  notes: string | null
}

interface IPasswordCreate {
  name: string
  username: string
  password: string
  domain?: string | null
  notes?: string | null
}

interface IPasswordUpdate {
  name?: string
  username?: string
  password?: string
  domain?: string | null
  notes?: string | null
}

interface TokenInfo {
  access_token: string
  token_type: 'bearer'
}
```

### ZOD Schemas (Frontend Validation)

```typescript
// Для listPasswords
z.array(PasswordPublic)

// Для createPassword
PasswordDetail

// Для getPassword
PasswordDetail

// Для updatePassword
PasswordDetail

// Для deletePassword
z.object({ message: z.string() })
```

## Аутентификация и авторизация

### Поток аутентификации

1. **Login**:
   - Пользователь вводит username + password на auth-page
   - `login(client, credentials)` отправляет POST `/v1/jwt/login/`
   - Бэкенд возвращает `{ access_token, token_type: 'bearer' }`
   - Frontend сохраняет токен (в localStorage или cookie)

2. **Protected Routes**:
   - Route `/$locale/dashboard` имеет `beforeLoad` хук
   - `checkAuth(httpClient)` вызывает GET `/v1/jwt/me/`
   - Если ответ 200 — пользователь аутентифицирован
   - Если ошибка — редирект на `/$locale/auth`

3. **Dev Mode Bypass**:
   - `checkAuth()` в `import.meta.env.DEV` всегда возвращает `null` (пропускает проверку)

4. **Logout**:
   - `logout(client)` отправляет POST `/v1/jwt/logout/`
   - Frontend удаляет локально сохранённый токен
   - Редирект на login

### HTTP Client Credentials

Плагин `withCredentials()` отправляет JWT в header:

```typescript
Authorization: Bearer {access_token}
```

Либо может использовать `credentials: 'include'` для cookies.

## Интернационализация

### Маршрутизация по локали

TanStack Router использует `$locale` параметр:

```
/ru/dashboard          → locale = 'ru'
/en/dashboard          → locale = 'en'
```

### Пространства имён (Namespaces)

```
locales/
├── ru/
│   ├── common.json        # Общие UI элементы
│   ├── auth.json          # Login форма, ошибки
│   └── dashboard.json     # Password CRUD UI
└── en/
    └── ...
```

### Использование в компонентах

```typescript
const { t } = useTranslation('dashboard')
// t('errors.network')
// t('list.title')
// t('form.placeholders.name')
```

## Стилизация и Design Tokens

### Vanilla Extract CSS

Все компоненты используют vanilla-extract вместо CSS-in-JS:

```typescript
// password-list.css.ts
export const styles = styleVariants({
  root: {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
  },
  header: {
    backgroundColor: vars.color.background,
    borderBottom: `1px solid ${vars.color.border}`,
  },
})
```

### Design Tokens (`@ruftech/tokens`)

Единая система токенов для всего проекта:

```typescript
import { vars, media, fontFamily, fontWeight } from '@ruftech/tokens'

// Colors (semantic)
vars.color.primary      // Main brand color
vars.color.text         // Text on light/dark background
vars.color.background   // Page/component background
vars.color.border       // Border color
vars.color.warning      // Warning/error color

// Spacing
vars.spacing.s          // Small gap
vars.spacing.m          // Medium gap
vars.spacing.l          // Large gap

// Typography
vars.font.size.body     // Body text size
vars.font.size.heading  // Heading size

// Breakpoints & Media Queries
media.mobile            // < tablet
media.tablet            // 768px+
media.desktop           // 1280px+
```

## Тестирование

### Unit Tests (Vitest)

**Покрытие**:

- `auth-api.test.ts` — 4 теста для login, fetchMe, logout
- `passwords-api.test.ts` — 9 тестов для CRUD операций

**Запуск**:

```bash
pnpm turbo test
pnpm turbo test:coverage
```

### E2E Tests (Playwright)

**Файл**: `packages/e2e/src/auth.spec.ts`

Тесты для основных сценариев:
- Login с валидными/невалидными данными
- Доступ к protected routes
- Logout

**Запуск**:

```bash
pnpm test:e2e
```

## Развёртывание

### Build процесс

```bash
# Frontend
pnpm turbo build                 # Собрать все пакеты
pnpm --filter ruftech-pass build # Собрать только приложение

# Результат
dist/                            # Static files для Nginx/CDN
```

### Docker

**Dockerfile** (`apps/pass/Dockerfile`):

- Stage 1: Node 24-alpine — установка зависимостей, build
- Stage 2: Nginx stable-alpine — serve статики

```dockerfile
FROM node:24-alpine AS builder
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm turbo build

FROM nginx:stable-alpine
COPY --from=builder /app/apps/pass/dist /usr/share/nginx/html
EXPOSE 80
```

### Environment Variables

**Frontend** (`.env` или `import.meta.env`):

```
VITE_API_URL=http://localhost:8000    # Backend API base URL
VITE_DEFAULT_LOCALE=ru                # Default i18n locale
```

**Backend**:

```
DATABASE_URL=postgresql://...
JWT_SECRET=...
ALLOWED_ORIGINS=http://localhost:5173,https://app.ruftech.com
```

## Безопасность

### Защита маршрутов

Все маршруты dashboard имеют auth guard:

```typescript
beforeLoad: async ({ params }) => {
  const user = await checkAuth(httpClient)
  if (!user && !import.meta.env.DEV) {
    throw redirect({ to: '/$locale/auth' })
  }
  return { user }
}
```

### CORS и Same-Origin Policy

- Бэкенд должен иметь правильную CORS конфигурацию
- Frontend отправляет credentials (`withCredentials` плагин)

### Хранение JWT

- Рекомендуется в httpOnly cookie (при использовании `credentials: 'include'`)
- Или в sessionStorage (в текущей реализации — в памяти или localStorage)

### Валидация данных

- Frontend: ZOD-схемы для всех API ответов
- Backend: Pydantic/FastAPI валидация request body

## Масштабируемость

### Модульная архитектура

Монорепозиторий Turborepo позволяет:
- Независимо тестировать пакеты
- Переиспользовать HTTP client и tokens в других приложениях
- Быстро добавлять новые приложения (мобильная версия, dashboard, etc.)

### Будущие расширения

- **Мобильная версия** (React Native, переиспользует API клиент)
- **Desktop версия** (Tauri, переиспользует React/Vite)
- **Browser Extension** (переиспользует HTTP client и shared services)

