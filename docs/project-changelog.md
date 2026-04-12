# История изменений (Changelog) RufTECH Pass

Все примечательные изменения в этом проекте задокументированы в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/).

## [Unreleased]

### Планировано

- Экспорт/импорт паролей
- Генератор паролей
- Двухфакторная аутентификация (2FA)
- Синхронизация между устройствами
- Расширение браузера
- Поиск и фильтрация паролей
- Категории и теги для паролей
- Мобильная версия (React Native)
- Desktop версия (Tauri)

---

## [0.2.0] — 2026-03-30

### Добавлено

#### User Dashboard с Password Vault CRUD

- Страница dashboard (`/$locale/dashboard/`) с защитой auth guard
- Полнофункциональный CRUD для управления паролями:
  - **Просмотр списка** — таблица всех паролей пользователя (`PasswordList`)
  - **Создание пароля** — форма создания с модальным окном (`PasswordFormModal` mode: create)
  - **Просмотр деталей** — модальное окно с полной информацией и toggle show/hide пароля (`PasswordDetailModal`)
  - **Редактирование пароля** — форма редактирования существующего пароля (`PasswordFormModal` mode: edit)
  - **Удаление пароля** — диалог подтверждения удаления (`DeleteConfirmDialog`)

#### API Client

- **`src/shared/passwords/api.ts`** — 5 функций для работы с паролями:
  - `listPasswords(client)` — GET `/v1/passwords/`
  - `createPassword(client, data)` — POST `/v1/passwords/`
  - `getPassword(client, id)` — GET `/v1/passwords/{id}`
  - `updatePassword(client, id, data)` — PATCH `/v1/passwords/{id}`
  - `deletePassword(client, id)` — DELETE `/v1/passwords/{id}`
- Все методы используют ZOD для валидации ответов сервера

#### Authentication Guard

- **`src/shared/auth/guard.ts`** — функция `checkAuth()` для защиты маршрутов
- Dev-режим bypass (не требует аутентификации в development)
- Production mode проверяет `/v1/jwt/me/` через HTTP client

#### HTTP Client

- **`src/shared/http-client-instance.ts`** — singleton экземпляр httpClient с применёнными плагинами
- Экспортируется для всего приложения (использование в компонентах через `useHttpClient()`)

#### Компоненты Dashboard

- **`PasswordList`** (`password-list.tsx`, 80 строк)
  - Таблица со списком паролей
  - Столбцы: название, логин, домен, действия
  - Loading state и пустой список
  - Vanilla-extract стили

- **`PasswordFormModal`** (`password-form-modal.tsx`, 70 строк)
  - Форма для создания и редактирования
  - Поля: name, username, password, domain, notes
  - Валидация через Zod
  - Режимы: create, edit

- **`PasswordDetailModal`** (`password-detail-modal.tsx`, 60 строк)
  - Просмотр полной информации пароля
  - Кнопка show/hide password (toggle видимости)
  - Кнопки редактирования и удаления
  - Loading state при загрузке

- **`DeleteConfirmDialog`** (`delete-confirm-dialog.tsx`, 30 строк)
  - Диалог подтверждения с названием пароля
  - Кнопки Отмена/Удалить

#### State Management

- State machine паттерн в `DashboardPage` для управления представлениями
- Состояния: list, detail, create, edit, delete-confirm
- Явные переходы между состояниями без impossible states

#### Интернационализация

- **`locales/ru/dashboard.json`** — русские переводы
  - Заголовки списка и форм
  - Метки полей
  - Сообщения об ошибках
  - Текст кнопок

- **`locales/en/dashboard.json`** — английские переводы
  - Полная локализация на английский

#### Тестирование

- **`src/__tests__/passwords-api.test.ts`** — 9 unit тестов
  - `listPasswords()` — проверка GET запроса и парсинга
  - `createPassword()` — проверка POST с заголовками и body
  - `getPassword()` — проверка GET с ID
  - `updatePassword()` — проверка PATCH запроса
  - `deletePassword()` — проверка DELETE и response parsing
  - Mock HTTP client через Vitest `vi.fn()`

- **`src/__tests__/auth-api.test.ts`** — 4 unit теста
  - `login()` — проверка form-encoded POST
  - `fetchMe()` — проверка GET к /v1/jwt/me/
  - `logout()` — проверка POST к /v1/jwt/logout/
  - ZOD validation tests

#### Стилизация

- Все компоненты стилизованы через vanilla-extract
- Использование design tokens (`@ruftech/tokens`)
  - Semantic colors (vars.color.*)
  - Spacing tokens (vars.spacing.*, vars.padding.*)
  - Typography tokens (vars.font.*)
- Responsive design с mobile-first подходом
- Интерактивные элементы с :hover, :active, :focus-visible, :disabled состояниями

### Изменено

- **`src/routes/__root.tsx`** — упрощена логика инициализации HTTP client, перемещена в `http-client-instance.ts`
- **`src/pages/auth/auth-page.tsx`** — обновлена структура для соответствия новым patterns

### Структура файлов

Новая организация компонентов dashboard:

```
src/pages/dashboard/
├── dashboard-page.tsx           (100 строк)
├── dashboard-page.css.ts
├── password-list.tsx            (80 строк)
├── password-list.css.ts
├── password-form-modal.tsx      (70 строк)
├── password-form-modal.css.ts
├── password-detail-modal.tsx    (60 строк)
├── password-detail-modal.css.ts
├── delete-confirm-dialog.tsx    (30 строк)
├── delete-confirm-dialog.css.ts
└── index.ts                     (barrel export)
```

---

## [0.1.0] — 2026-03-10

### Добавлено

#### Инфраструктура

- Monorepo структура (Turborepo + pnpm workspaces)
- Vite конфигурация с React 19 + TanStack Router v2
- TypeScript strict mode
- ESLint 9 с @stylistic плагином
- Vitest для unit тестирования

#### Пакеты

- **`@ruftech/tokens`** — Design tokens (vanilla-extract)
  - Semantic colors (light/dark themes)
  - Typography tokens
  - Spacing tokens
  - Responsive breakpoints

- **`@ruftech/ui`** — UI компоненты
  - Button, Heading, Alert
  - Card, Form, Input, Textarea
  - Modal, Dialog

- **`@ruftech/http-client`** — HTTP client с плагинами
  - DefaultHttpClient
  - withBaseURL() плагин
  - withLogging() плагин

- **`@ruftech/logger`** — Логирование
  - DefaultLogger с callbacks
  - React context provider

- **`@ruftech/api`** — Shared API types
  - IUserMe, IPasswordPublic, IPasswordDetail
  - TokenInfo, etc.

#### Frontend приложение

- Root layout (`__root.tsx`)
- TanStack Router конфигурация с динамической локалью (`$locale`)
- i18n интеграция (i18next + react-i18next)
- Auth страница (`/auth`, `/$locale/auth`)
- Shared HTTP client context

### Статус

- Основная структура готова
- Все пакеты функциональны
- Authentication API существует
- Dashboard готов для CRUD операций

---

## Notes

### Версионирование

- Версия следует Semantic Versioning (MAJOR.MINOR.PATCH)
- MAJOR — breaking changes (API, архитектура)
- MINOR — новые feature (CRUD операции, компоненты)
- PATCH — bug fixes, документация, улучшения

### Синхронизация фронт-бэк

- API v1 (`/v1/passwords/`, `/v1/jwt/`)
- Frontend тесты проверяют правильность вызовов API
- Backend должен соответствовать контрактам в `@ruftech/api`

