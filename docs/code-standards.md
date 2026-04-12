# Стандарты кода RufTECH Pass

## Общие принципы

- **YAGNI** — не реализуем то, что не нужно сейчас
- **KISS** — код должен быть простым и понятным
- **DRY** — не повторяем код, создаём общие модули
- **Функциональность прежде всего** — качество оформления вторично

## Структура проекта

### Поименование файлов

Используется **kebab-case** для всех файлов (кроме компонентов React):

```
frontend/apps/pass/src/
├── pages/
│   ├── auth/
│   │   ├── auth-page.tsx          ✓ (компонент)
│   │   ├── auth-page.css.ts       ✓ (стили)
│   │   └── index.ts               ✓ (экспорт)
│   └── dashboard/
│       ├── dashboard-page.tsx     ✓
│       ├── password-list.tsx      ✓
│       ├── password-form-modal.tsx ✓
│       ├── password-detail-modal.tsx
│       ├── delete-confirm-dialog.tsx
│       └── *.css.ts
├── shared/
│   ├── auth/
│   │   ├── api.ts                 ✓ (логика)
│   │   ├── guard.ts               ✓ (логика)
│   │   └── index.ts               ✓ (barrel)
│   ├── passwords/
│   │   ├── api.ts                 ✓
│   │   └── index.ts
│   ├── http-client-instance.ts    ✓ (singleton)
│   └── i18n/
├── locales/
│   ├── ru/
│   │   ├── auth.json
│   │   ├── dashboard.json
│   │   └── common.json
│   └── en/
└── __tests__/
    ├── auth-api.test.ts
    └── passwords-api.test.ts
```

### Размер файлов

- **Цель**: < 200 строк кода на файл
- **Компоненты**: разбиваем на более мелкие при превышении 150 строк
- **Логика**: переносим в отдельные модули (api.ts, utils.ts, etc.)

**Пример рефакторинга**:

```
Было:
  dashboard.tsx (300 строк)

Стало:
  dashboard-page.tsx (100 строк — контейнер)
  password-list.tsx (80 строк)
  password-form-modal.tsx (70 строк)
  password-detail-modal.tsx (60 строк)
  delete-confirm-dialog.tsx (30 строк)
```

## TypeScript

### Строгий режим

Все `tsconfig.json` используют strict mode:

```json
{
  "compilerOptions": {
    "strict": true,
    "verbatimModuleSyntax": true,
    "erasableSyntaxOnly": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Type-only imports

**Правильно**:

```typescript
import type { IPasswordPublic } from '@ruftech/api'
import { z } from 'zod'

const schema = z.object({ /* ... */ })
```

**Неправильно**:

```typescript
import { type IPasswordPublic, z } from '@ruftech/api'
```

### Интерфейсы vs Types

- **Interfaces** — для публичных контрактов (API, компоненты)
- **Types** — для internal логики, union типов, generics

```typescript
// API контракт
interface IPasswordCreate {
  name: string
  username: string
  password: string
}

// Internal state machine
type PageView
  = | { view: 'list' }
    | { view: 'detail'; id: number }
    | { view: 'create' }
```

### Префикс `I` для интерфейсов

Все публичные интерфейсы начинаются с `I`:

```typescript
interface IHttpClient { /* ... */ }
interface IPasswordPublic { /* ... */ }
interface IUserMe { /* ... */ }
```

## React компоненты

### Функциональные компоненты

Используем только FC (Function Component):

```typescript
import type { FC } from 'react'

interface IPasswordListProps {
  passwords: IPasswordPublic[]
  onSelect: (id: number) => void
  loading?: boolean
}

export const PasswordList: FC<IPasswordListProps> = ({
  passwords,
  onSelect,
  loading = false,
}) => {
  return <div>/* ... */</div>
}
```

### Пропсы

- Всегда типизируем через интерфейс
- Интерфейс пропсов заканчивается на `Props`
- Используем optional props с default значениями

```typescript
interface IDashboardPageProps {
  initialView?: PageView
  onError?: (error: string) => void
}

export const DashboardPage: FC<IDashboardPageProps> = ({
  initialView = { view: 'list' },
  onError,
}) => {
  // ...
}
```

### Hooks использование

**Правильно**:

```typescript
const { t } = useTranslation('dashboard')
const client = useHttpClient()
const [passwords, setPasswords] = useState<IPasswordPublic[]>([])
const [loading, setLoading] = useState(false)

useEffect(() => {
  loadPasswords()
}, [loadPasswords])
```

**Неправильно**:

```typescript
// ❌ Много состояний в одном useState
const [state, setState] = useState({
  passwords: [],
  loading: false,
  error: ''
})

// ❌ Без dependencies
useEffect(() => {
  loadPasswords()
})
```

### State Machine паттерн

Для компонентов с несколькими представлениями используем union type:

```typescript
type State
  = | { type: 'idle' }
    | { type: 'loading' }
    | { type: 'success'; data: T }
    | { type: 'error'; message: string }

const [state, setState] = useState<State>({ type: 'idle' })

// Переходы
setState({ type: 'loading' })
setState({ type: 'success', data: result })
setState({ type: 'error', message: error.message })
```

## Vanilla Extract CSS

### Структура стилей

**Файл**: `component-name.css.ts`

```typescript
import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const styles = {
  root: style({
    display: 'flex',
    flexDirection: 'column',
    padding: vars.padding.m,
    gap: vars.spacing.s,
  }),

  header: style({
    fontSize: vars.font.size.heading,
    fontWeight: vars.font.weight.bold,
    color: vars.color.text,
  }),

  variants: styleVariants({
    primary: {
      backgroundColor: vars.color.primary,
      color: vars.color.background,
    },
    secondary: {
      backgroundColor: vars.color.background,
      color: vars.color.text,
    },
  }),
}
```

### Использование в компоненте

```typescript
import { clsx } from 'clsx'
import * as s from './component-name.css'

export const Component: FC<IProps> = ({ variant = 'primary' }) => {
  return (
    <div className={s.root}>
      <header className={s.header}>Title</header>
      <section className={clsx(s.root, s.variants[variant])}>
        Content
      </section>
    </div>
  )
}
```

### Правила использования токенов

- **Цвета**: всегда используем `vars.color.*` (semantic), не `vars.palette.*`
- **Spacing**: `vars.spacing.*` для gaps, `vars.padding.*` для внутренних отступов
- **Typography**: `vars.font.size.*`, `vars.font.weight.*`
- **Никогда** не hardcode px/rem значений

```typescript
// ✓ Правильно
padding: vars.padding.m,
gap: vars.spacing.s,
color: vars.color.primary,

// ✗ Неправильно
padding: '16px',
gap: '8px',
color: '#007bff',
```

### Интерактивные элементы

Все интерактивные элементы должны иметь состояния:

```typescript
const buttonStyles = style({
  backgroundColor: vars.color.primary,
  cursor: 'pointer',
  transitionProperty: 'background-color, transform',
  transitionDuration: '0.2s',

  ':hover': {
    backgroundColor: vars.color.primaryHover,
  },

  ':active': {
    transform: 'scale(0.98)',
  },

  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: '2px',
  },

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
})
```

## API/HTTP Client

### Функции API

Все API функции живут в `src/shared/{domain}/api.ts`:

```typescript
import type { IHttpClient } from '@ruftech/http-client'
import type { IPasswordCreate } from '@ruftech/api'
import { PasswordDetail } from '@ruftech/api'
import { z } from 'zod'

const API = '/v1/passwords'

export function listPasswords(client: IHttpClient) {
  return client.request(`${API}/`, {
    method: 'GET',
    parse: (d) => z.array(PasswordPublic).parse(d),
  })
}

export function createPassword(
  client: IHttpClient,
  data: IPasswordCreate
) {
  return client.request(`${API}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    parse: (d) => PasswordDetail.parse(d),
  })
}
```

### Ошибки

Используем `HttpError` для обработки HTTP ошибок:

```typescript
import { HttpError } from '@ruftech/http-client'

try {
  await deletePassword(client, id)
} catch (err) {
  if (err instanceof HttpError && err.status === 404) {
    // Пароль не найден
  } else {
    // Сетевая ошибка
  }
}
```

### Валидация ответов

Всегда используем ZOD для валидации:

```typescript
const schema = z.object({
  id: z.number(),
  name: z.string(),
  password: z.string(),
})

const data = await client.request('/v1/passwords/1', {
  parse: (d) => schema.parse(d),
})
```

## Тестирование

### Структура тестов

```
src/__tests__/
├── auth-api.test.ts      # API функции
├── passwords-api.test.ts # Password CRUD
└── components/
    ├── button.test.ts
    └── form.test.ts
```

### Unit тесты с Vitest

```typescript
import { describe, it, expect, vi } from 'vitest'
import { login } from '@/shared/auth'

describe('auth API', () => {
  describe('login', () => {
    it('sends POST to /v1/jwt/login/', async () => {
      const client = {
        request: vi.fn().mockResolvedValue({
          access_token: 'token',
          token_type: 'bearer',
        }),
      } as unknown as IHttpClient

      const result = await login(client, {
        username: 'john',
        password: 'qwerty',
      })

      expect(client.request).toHaveBeenCalledWith(
        '/v1/jwt/login/',
        expect.any(Object)
      )
      expect(result).toEqual({
        access_token: 'token',
        token_type: 'bearer',
      })
    })
  })
})
```

### Тестирование компонентов

Для React компонентов используем `renderToString` (нет jsdom):

```typescript
import { renderToString } from 'react-dom/server'
import { PasswordList } from '@/pages/dashboard/password-list'

it('renders password list', () => {
  const html = renderToString(
    <PasswordList
      passwords={[
        { id: 1, name: 'GitHub', username: 'john' }
      ]}
      onSelect={() => {}}
    />
  )

  expect(html).toContain('GitHub')
})
```

### Покрытие тестами

- **Цель**: ≥ 80% покрытие для критичного кода
- **Исключения**: компоненты, стили, types
- Отметить исключения: `/* c8 ignore file */`

## ESLint & Форматирование

### ESLint правила

Используем `@stylistic/eslint-plugin` вместо Prettier:

```javascript
// eslint.config.mjs
import { defineConfig } from 'eslint/config'
import { baseConfig, reactConfig } from '@ruftech/eslint-config'

export default defineConfig([
  ...baseConfig,
  ...reactConfig,
])
```

### Стиль кода

- **Кавычки**: single (`'`)
- **Точки с запятой**: нет
- **Trailing commas**: ES5 (в массивах и объектах)
- **Indent**: 2 пробела
- **JSX indent**: 2 пробела

```typescript
// Правильно
const obj = {
  name: 'John',
  age: 30,
}

const array = [
  'item1',
  'item2',
]

// Неправильно
const obj = {
  name: "John",
  age: 30
};
```

## Интернационализация (i18n)

### Структура переводов

```
locales/
├── ru/
│   ├── common.json         # Общие UI элементы
│   │   {
│   │     "button": {
│   │       "create": "Создать",
│   │       "save": "Сохранить",
│   │       "cancel": "Отмена"
│   │     }
│   │   }
│   ├── auth.json           # Аутентификация
│   │   {
│   │     "form": {
│   │       "username": "Имя пользователя",
│   │       "password": "Пароль"
│   │     },
│   │     "errors": {
│   │       "invalidCredentials": "Неверное имя или пароль"
│   │     }
│   │   }
│   └── dashboard.json      # Панель управления
│       {
│         "list": {
│           "title": "Мои пароли",
│           "empty": "Нет сохранённых паролей"
│         },
│         "errors": {
│           "network": "Ошибка сети"
│         }
│       }
└── en/
    └── ...
```

### Использование в компонентах

```typescript
import { useTranslation } from 'react-i18next'

export const DashboardPage: FC = () => {
  const { t } = useTranslation('dashboard')

  return (
    <div>
      <h1>{t('list.title')}</h1>
      <button>{t('button.create')}</button>
    </div>
  )
}
```

### Добавление новых ключей

1. Добавить ключ в `ru/` файл
2. Добавить перевод в `en/` файл
3. Использовать `t('namespace.key')` в компоненте

## Commit сообщения

Используем Conventional Commits:

```
feat: add password list component
fix: fix auth guard redirect on 401
docs: update dashboard architecture
test: add password-api tests
refactor: extract password list to separate component
style: format password form modal
```

**Типы**:

- `feat:` — новая функция
- `fix:` — исправление ошибки
- `docs:` — документация
- `test:` — добавление/изменение тестов
- `refactor:` — рефакторинг кода
- `style:` — изменения стиля (форматирование, пробелы)
- `chore:` — обновление зависимостей, конфигурация

## Безопасность

### Защита от инъекций

- **XSS**: используем React (автоматически экранирует)
- **SQL Injection**: backend отвечает за подготовленные запросы
- **CSRF**: backend использует CSRF tokens (если требуется)

### Чувствительные данные

- **Никогда** не коммитим `.env` файлы
- **Никогда** не логируем пароли/токены
- Используем environment variables для всех secrets

```typescript
// ✗ Неправильно
console.log('Token:', token)
api.setHeader('Authorization', token)

// ✓ Правильно
// логируем только информационные сообщения
console.log('Login successful')
// token хранится в protected cookies или sessionStorage
```

## Performance

### Оптимизация re-renders

```typescript
// ✗ Неправильно — функция пересоздаётся при каждом render
const handleClick = () => { /* ... */ }

// ✓ Правильно — функция мемоизирована
const handleClick = useCallback(() => {
  // ...
}, [dependencies])
```

### Ленивая загрузка

Для больших компонентов используем `React.lazy` + `Suspense`:

```typescript
const DashboardPage = lazy(() =>
  import('./dashboard-page').then(m => ({ default: m.DashboardPage }))
)

export const Route = createFileRoute('/$locale/dashboard')({
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardPage />
    </Suspense>
  ),
})
```

