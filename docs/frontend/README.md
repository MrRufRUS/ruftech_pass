# Frontend — Руководство разработчика

Turborepo-монорепозиторий на pnpm workspaces. Основное приложение — `apps/pass` (React 19 + Vite + TanStack Router).

---

## Требования

- Node 24 (`cat frontend/.nvmrc`)
- pnpm 10.29.1

```bash
cd frontend
pnpm install
```

## Структура монорепо

```
frontend/
├── apps/
│   └── pass/              — Основное React-приложение (Vite, порт 5173)
└── packages/
    ├── ui/                — Библиотека компонентов (Storybook 10)
    ├── tokens/            — Design tokens (Vanilla Extract)
    ├── http-client/       — Plugin-based HTTP клиент
    ├── logger/            — Callback-based логгер
    ├── api/               — API-клиент (auth + passwords, Zod-схемы)
    ├── helpers/           — DOM-утилиты
    ├── icons/             — Иконки
    ├── fonts/             — @font-face декларации
    ├── ssg/               — Static site generation (prerender)
    ├── e2e/               — Playwright E2E тесты
    ├── eslint-config/     — Shared ESLint flat config
    ├── svg-generator/     — Text → SVG CLI
    └── typescript-config/ — Shared tsconfig presets
```

## Основные команды

```bash
# Разработка
pnpm turbo dev                        # все пакеты
pnpm --filter ruftech-pass dev        # только приложение (порт 5173)
pnpm dev:ui                           # Storybook (порт 6006)

# Сборка
pnpm turbo build                      # полная сборка
pnpm --filter ruftech-pass build      # только приложение → apps/pass/dist/

# Линтинг
pnpm turbo lint
pnpm format                           # eslint --fix

# Тесты
pnpm turbo test                       # все unit/integration/component
pnpm turbo test:coverage              # с покрытием
pnpm test:e2e                         # E2E (Playwright)
pnpm coverage:all                     # сводный отчёт покрытия

# Scaffolding
pnpm --filter @ruftech/ui new         # создать новый UI-компонент
```

## Переменные окружения

Файл: `frontend/apps/pass/.env`

```env
VITE_API_URL=http://localhost:8000    # базовый URL бэкенда
```

При Docker-сборке передаётся как build arg:
```bash
VITE_API_URL=https://api.example.com docker compose up --build
```

## Архитектура приложения

### Роутинг

TanStack Router с file-based routing. Ключевые маршруты:

```
/               → редирект на /:locale/
/:locale/       → HomePage
/:locale/auth   → AuthPage (логин/регистрация)
/dashboard      → DashboardPage (защищён auth guard)
```

`checkAuth` — guard, который вызывает `fetchMe` при загрузке маршрута `/dashboard`. Возвращает `null` в dev-режиме.

### HTTP-клиент

Plugin-based паттерн. Инициализируется в `apps/pass/src/shared/http/`:

```typescript
const client = DefaultHttpClient
  .create(globalThis.fetch.bind(globalThis))
  .applyPlugin(withBaseURL(import.meta.env.VITE_API_URL))
  .applyPlugin(withCredentials())
  .applyPlugin(withLogging(logger))
  .applyPlugin(withUnauthorizedHandler(() => navigate('/auth')))
```

Клиент доступен через `useHttpClient()` (React Context).

### i18n

i18next с TanStack Router. Локаль читается из URL-сегмента `/:locale/`. Поддерживаются `ru` (по умолчанию) и `en`. Переводы: `src/locales/{ru,en}/{common,home,meta}.json`.

### Design tokens

Все цвета, отступы и типографика — через `@ruftech/tokens`. Светлая/тёмная тема через `prefers-color-scheme`.

```typescript
import { vars, media } from '@ruftech/tokens'

// Используй vars.color.*, vars.padding.*, vars.spacing.*
// НЕ используй hardcoded px/hex значения
```

## UI-компоненты

Компоненты в `packages/ui/src/components/<kebab-name>/`. Каждый компонент — 4 файла:

| Файл | Содержимое |
|------|------------|
| `<name>.tsx` | React-компонент |
| `<name>.css.ts` | Vanilla Extract стили |
| `<name>.stories.tsx` | Storybook story |
| `index.ts` | Re-export |

Scaffold: `pnpm --filter @ruftech/ui new`

## TypeScript

Strict mode: `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noUnusedLocals`. Подробности — в `packages/typescript-config/`.

- `import type { Foo }` для type-only импортов
- Не использовать `enum` — только `const` объекты или union types

## Тестирование

Руководство по написанию тестов: [../testing-guide.md](../testing-guide.md)  
Справочник существующих тестов: [../tests-overview.md](../tests-overview.md)

Тесты для каждого пакета — в `src/__tests__/`. Vitest конфиг встроен в `vite.config.ts` для `apps/pass` и в отдельный `vitest.config.ts` для пакетов.

## Production-сборка (Docker)

```bash
# Из корня репозитория
docker compose up --build

# Frontend доступен на: http://localhost:8080
```

Dockerfile: `frontend/apps/pass/Dockerfile` (multi-stage: node:24-alpine → nginx:stable-alpine).  
Nginx конфиг: `frontend/apps/pass/nginx.conf` — SPA-режим с fallback на `index.html`.
