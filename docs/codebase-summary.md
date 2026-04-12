# Сводка по кодовой базе RufTECH Pass

## Обзор

RufTECH Pass — это менеджер паролей, разделённый на:
- **Frontend**: Vite + React 19 + TanStack Router v2 (монорепозиторий Turborepo)
- **Backend**: FastAPI + SQLAlchemy ORM + JWT

## Структура проекта

```
/home/r/common/code/itmo-devops-project/
├── frontend/                          # Фронтенд приложение (основной фокус)
│   ├── apps/pass/                     # Основное React приложение
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── auth/              # Login страница
│   │   │   │   │   ├── auth-page.tsx
│   │   │   │   │   ├── auth-page.css.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── dashboard/         # Dashboard с CRUD паролей
│   │   │   │       ├── dashboard-page.tsx (100 строк) — контейнер со state machine
│   │   │   │       ├── password-list.tsx (80 строк) — таблица паролей
│   │   │   │       ├── password-form-modal.tsx (70 строк) — create/edit форма
│   │   │   │       ├── password-detail-modal.tsx (60 строк) — просмотр деталей
│   │   │   │       ├── delete-confirm-dialog.tsx (30 строк) — подтверждение удаления
│   │   │   │       └── *.css.ts — vanilla-extract стили
│   │   │   ├── routes/                # TanStack Router
│   │   │   │   ├── __root.tsx         # Root layout + HTTP context provider
│   │   │   │   ├── auth.tsx           # /auth (без локали)
│   │   │   │   └── $locale/           # Динамический параметр локали
│   │   │   │       ├── auth.tsx       # /$locale/auth
│   │   │   │       ├── dashboard.tsx  # /$locale/dashboard (auth guard)
│   │   │   │       └── dashboard/
│   │   │   │           └── index.tsx  # /$locale/dashboard/ (контент)
│   │   │   ├── shared/                # Общий код
│   │   │   │   ├── auth/              # Аутентификация
│   │   │   │   │   ├── api.ts         # login(), fetchMe(), logout()
│   │   │   │   │   ├── guard.ts       # checkAuth() для защиты маршрутов
│   │   │   │   │   └── index.ts
│   │   │   │   ├── passwords/         # Password CRUD API
│   │   │   │   │   ├── api.ts         # listPasswords, createPassword, getPassword, updatePassword, deletePassword
│   │   │   │   │   └── index.ts
│   │   │   │   ├── http-client-instance.ts   # Singleton httpClient с плагинами
│   │   │   │   ├── i18n/              # i18next конфигурация
│   │   │   │   │   ├── i18n.ts
│   │   │   │   │   ├── default.ts
│   │   │   │   │   └── resources.ts
│   │   │   │   └── ...
│   │   │   ├── locales/               # Переводы
│   │   │   │   ├── ru/
│   │   │   │   │   ├── auth.json      # Переводы для auth (username, password, errors)
│   │   │   │   │   ├── dashboard.json # Переводы для dashboard (список, форма, ошибки)
│   │   │   │   │   └── common.json    # Общие UI элементы (кнопки, заголовки)
│   │   │   │   └── en/
│   │   │   │       └── ... (английские переводы)
│   │   │   └── __tests__/             # Unit тесты
│   │   │       ├── auth-api.test.ts   # 4 теста для login, fetchMe, logout
│   │   │       └── passwords-api.test.ts # 9 тестов для CRUD
│   │   ├── vite.config.ts             # Vite конфиг + Vitest
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── eslint.config.mjs
│   │   └── Dockerfile                 # Multi-stage сборка
│   │
│   ├── packages/                      # Общие пакеты (переиспользуются)
│   │   ├── ui/                        # Компоненты: Button, Heading, Alert, etc.
│   │   │   ├── src/components/
│   │   │   │   ├── button/            # Button.tsx + Button.css.ts + Button.stories.tsx
│   │   │   │   ├── heading/
│   │   │   │   ├── alert/
│   │   │   │   └── ...
│   │   │   ├── src/components/index.ts # Barrel export
│   │   │   ├── src/types.ts           # IBaseProps, IBaseWithChildrenProps
│   │   │   └── ...
│   │   │
│   │   ├── tokens/                    # Design tokens (vanilla-extract)
│   │   │   ├── src/
│   │   │   │   ├── contract.css.ts    # Token contract
│   │   │   │   ├── themes/
│   │   │   │   │   ├── colors.css.ts  # Semantic colors (light/dark)
│   │   │   │   │   ├── typography.css.ts
│   │   │   │   │   ├── spacing.css.ts
│   │   │   │   │   └── index.css.ts   # Export all
│   │   │   │   ├── fonts.ts           # fontFamily constants
│   │   │   │   ├── breakpoints.ts     # Responsive breakpoints
│   │   │   │   ├── reset.css.ts       # CSS reset
│   │   │   │   └── ...
│   │   │   └── ...
│   │   │
│   │   ├── http-client/               # HTTP клиент с плагинами
│   │   │   ├── src/
│   │   │   │   ├── client.ts          # IHttpClient интерфейс
│   │   │   │   ├── default.ts         # DefaultHttpClient реализация
│   │   │   │   ├── with-base-url.ts   # withBaseURL() плагин
│   │   │   │   ├── with-logging.ts    # withLogging() плагин
│   │   │   │   ├── with-credentials.ts # withCredentials() плагин
│   │   │   │   ├── react.tsx          # useHttpClient() hook + context provider
│   │   │   │   └── index.ts
│   │   │   └── ...
│   │   │
│   │   ├── logger/                    # Логирование
│   │   │   ├── src/
│   │   │   │   ├── logger.ts          # ILogger интерфейс
│   │   │   │   ├── default.ts         # DefaultLogger реализация
│   │   │   │   ├── react.tsx          # useLogger() hook
│   │   │   │   └── index.ts
│   │   │   └── ...
│   │   │
│   │   ├── fonts/                     # @font-face declarations only
│   │   ├── api/                       # Shared API types (пакет с интерфейсами)
│   │   ├── e2e/                       # Playwright E2E тесты
│   │   ├── ssg/                       # Static site generation
│   │   ├── svg-generator/             # Text-to-SVG CLI
│   │   ├── eslint-config/             # Shared ESLint config
│   │   ├── typescript-config/         # Shared TypeScript presets
│   │   └── ...
│   │
│   ├── node_modules/                  # Dependencies (не коммитим)
│   ├── pnpm-lock.yaml                 # Lock file для pnpm
│   ├── turbo.json                     # Turborepo конфигурация
│   ├── pnpm-workspace.yaml            # pnpm workspaces конфигурация
│   ├── package.json                   # Root package.json
│   ├── CLAUDE.md                      # Инструкции для Claude Code
│   └── ...
│
├── backend/                           # Бэкенд приложение (FastAPI)
│   ├── app/
│   │   ├── main.py                    # FastAPI приложение
│   │   ├── models/                    # SQLAlchemy ORM модели
│   │   ├── routes/                    # API маршруты
│   │   │   ├── auth.py                # /v1/jwt/login, /v1/jwt/logout, /v1/jwt/me
│   │   │   ├── passwords.py           # /v1/passwords/* (CRUD)
│   │   │   └── ...
│   │   ├── schemas/                   # Pydantic модели для валидации
│   │   └── ...
│   └── ...
│
├── docs/                              # Документация (НОВОЕ)
│   ├── project-overview-pdr.md        # Обзор продукта и PDR
│   ├── system-architecture.md         # Архитектура системы
│   ├── code-standards.md              # Стандарты кода
│   ├── codebase-summary.md            # Эта сводка
│   ├── development-roadmap.md         # Дорожная карта развития
│   ├── project-changelog.md           # История изменений
│   └── ...
│
├── .claude/                           # Claude Code инструменты
│   ├── rules/                         # Правила разработки
│   ├── skills/                        # Python skills
│   ├── hooks/                         # MCP hooks
│   └── ...
│
├── plans/                             # Планы реализации
│   └── [текущие планы]/
│
├── .git/                              # Git репозиторий
├── .github/                           # GitHub Actions CI/CD
├── CLAUDE.md                          # Общие инструкции
├── README.md                          # Описание проекта
└── ruftech.code-workspace             # VSCode workspace
```

## Ключевые файлы для понимания

### 1. Frontend архитектура

- **`frontend/apps/pass/src/pages/dashboard/dashboard-page.tsx`** — главный контейнер с state machine для управления представлениями
- **`frontend/apps/pass/src/shared/passwords/api.ts`** — API функции для CRUD операций
- **`frontend/apps/pass/src/shared/auth/guard.ts`** — защита маршрутов (auth guard)
- **`frontend/apps/pass/src/routes/$locale/dashboard.tsx`** — маршрут dashboard с auth guard
- **`frontend/packages/http-client/src/index.ts`** — интерфейс IHttpClient и плагины

### 2. Компоненты dashboard

- **`password-list.tsx`** — таблица паролей (GET /v1/passwords/)
- **`password-form-modal.tsx`** — форма create/edit (POST/PATCH)
- **`password-detail-modal.tsx`** — просмотр с show/hide password
- **`delete-confirm-dialog.tsx`** — подтверждение удаления (DELETE)

### 3. Интернационализация

- **`frontend/apps/pass/src/locales/ru/dashboard.json`** — русские переводы dashboard
- **`frontend/apps/pass/src/locales/en/dashboard.json`** — английские переводы dashboard

### 4. Тесты

- **`frontend/apps/pass/src/__tests__/auth-api.test.ts`** — 4 теста (login, fetchMe, logout)
- **`frontend/apps/pass/src/__tests__/passwords-api.test.ts`** — 9 тестов (CRUD операции)

## API Endpoints

### Аутентификация

```
POST   /v1/jwt/login/        { username, password } → { access_token, token_type }
GET    /v1/jwt/me/           → { id, username, email }
POST   /v1/jwt/logout/       → { message: "Logged out" }
```

### Пароли

```
GET    /v1/passwords/        → [{ id, name, username, domain, created_at, updated_at }]
POST   /v1/passwords/        { name, username, password, domain?, notes? } → { id, ... + password, notes }
GET    /v1/passwords/{id}    → { id, name, username, password, domain, notes, created_at, updated_at }
PATCH  /v1/passwords/{id}    { name?, username?, password?, domain?, notes? } → full password
DELETE /v1/passwords/{id}    → { message: "Deleted" }
```

## Типы данных (Frontend)

### Из пакета `@ruftech/api`

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

## Состояния (State Machine)

### DashboardPage PageView

```typescript
type PageView
  = | { view: 'list' }
    | { view: 'detail'; id: number }
    | { view: 'create' }
    | { view: 'edit'; id: number; initial: IPasswordDetail }
    | { view: 'delete-confirm'; id: number; name: string }
```

## Design Tokens

### Цвета (Semantic)

```
vars.color.text           — текст (светлый/тёмный фон)
vars.color.background    — фон страницы
vars.color.primary       — основной цвет
vars.color.border        — границы
vars.color.warning       — предупреждения/ошибки
```

### Spacing & Padding

```
vars.spacing.xs, s, m, l, xl     — gaps между элементами
vars.padding.xs, s, m, l, xl     — внутренние отступы компонентов
```

### Typography

```
vars.font.size.body              — размер текста
vars.font.size.heading           — размер заголовков
vars.font.weight.mono            — для моноширинного шрифта (mono/regular/medium/bold)
```

## Технологический стек (Frontend)

| Компонент | Технология | Версия |
|-----------|-----------|--------|
| Build Tool | Vite | 6.x |
| Runtime | React | 19.2.4 |
| Router | TanStack Router | 2.x |
| State Mgmt | React hooks | - |
| Styling | Vanilla Extract | 1.15.x |
| Design System | Custom tokens + vanilla-extract | - |
| Forms | React hooks + ZOD validation | - |
| i18n | i18next | 24.x |
| HTTP Client | Custom with plugins | - |
| Testing | Vitest | 4.0.18+ |
| E2E Testing | Playwright | 1.48.x |
| Package Manager | pnpm | 10.29.1 |
| Monorepo | Turborepo | - |
| Linting | ESLint 9 + @stylistic | - |
| Type Safety | TypeScript 5.8+ (strict) | - |

## Запуск и разработка

### Установка

```bash
cd /home/r/common/code/itmo-devops-project/frontend
pnpm install
```

### Разработка

```bash
# Dev сервер (Vite на localhost:5173)
pnpm --filter ruftech-pass dev

# Вся монорепозиторий
pnpm turbo dev

# Storybook UI компоненты
pnpm dev:ui
```

### Тестирование

```bash
# Все unit тесты
pnpm turbo test

# С покрытием
pnpm turbo test:coverage

# E2E тесты
pnpm test:e2e

# Тесты пакета
pnpm --filter @ruftech/http-client test
```

### Linting & Build

```bash
# Lint all
pnpm turbo lint

# Build all
pnpm turbo build

# Build only app
pnpm --filter ruftech-pass build
```

### Docker

```bash
# Build image
docker build -f apps/pass/Dockerfile -t ruftech-pass:latest .

# Run
docker run -p 80:80 ruftech-pass:latest
```

## Текущий статус разработки

### Реализовано

- [x] Структура монорепозиториума (Turborepo + pnpm)
- [x] Фронтенд приложение (React 19 + Vite + TanStack Router)
- [x] Design tokens (vanilla-extract)
- [x] UI компоненты (Button, Heading, Alert, Form, etc.)
- [x] Authentication API (login, fetchMe, logout)
- [x] Dashboard страница с CRUD для паролей
- [x] Auth guard для защиты маршрутов
- [x] i18n поддержка (русский + английский)
- [x] Unit тесты (9 для passwords API, 4 для auth API)
- [x] Vanilla-extract CSS с design tokens
- [x] HTTP client с плагинами (baseURL, logging, credentials)

### В разработке

- Интеграция с бэкенд API (готовность зависит от бэкенда)
- E2E тесты (Playwright)

### Планируется

- Поиск и фильтрация паролей
- Экспорт/импорт паролей
- Генератор паролей
- 2FA поддержка
- Мобильная версия (React Native)
- Desktop версия (Tauri)
- Browser extension

