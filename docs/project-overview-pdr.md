# RufTECH Pass — Обзор проекта и PDR

## Описание продукта

RufTECH Pass — это менеджер паролей, предназначенный для безопасного хранения и управления учётными данными пользователя. Приложение разделено на фронтенд (React 19 + TanStack Router) и бэкенд (FastAPI).

## Архитектура

### Структура

- **Фронтенд**: Vite + React 19 + TanStack Router v2, монорепозиторий Turborepo с пакетами
  - `apps/pass/` — основное приложение
  - `packages/` — общие библиотеки (UI, tokens, http-client, логирование, etc.)
- **Бэкенд**: FastAPI с SQLAlchemy ORM и JWT-аутентификацией

### Стек технологий

| Слой | Технология | Версия |
|------|-----------|--------|
| Frontend Build | Vite | 6.x |
| UI Framework | React | 19.2.4 |
| Routing | TanStack Router | 2.x |
| HTTP Client | Custom HTTP client plugin architecture | - |
| Styling | Vanilla Extract | 1.15.x |
| i18n | i18next | 24.x |
| Тестирование | Vitest | 4.0.18+ |
| E2E | Playwright | 1.48.x |
| Backend | FastAPI | - |
| ORM | SQLAlchemy | - |
| Auth | JWT (PyJWT) | - |

## Ключевые компоненты

### 1. Аутентификация (Authentication)

**Файлы**: `frontend/apps/pass/src/shared/auth/`

- **`api.ts`** — функции для взаимодействия с API аутентификации:
  - `login(client, credentials)` — POST `/v1/jwt/login/` с form-encoded телом
  - `fetchMe(client)` — GET `/v1/jwt/me/` для получения текущего пользователя
  - `logout(client)` — POST `/v1/jwt/logout/` для выхода

- **`guard.ts`** — защита маршрутов:
  - `checkAuth(client)` — проверка наличия активной сессии
  - В dev-режиме пропускает проверку (возвращает `null`)
  - В production проверяет `/v1/jwt/me/` через HTTP-клиент

### 2. Панель управления (Dashboard)

**Файлы**: `frontend/apps/pass/src/pages/dashboard/`

Полнофункциональная CRUD-панель для управления паролями.

#### Маршруты

- `/$locale/dashboard` — защищённый маршрут с auth guard
- `/$locale/dashboard/` — страница со списком паролей

#### Компоненты

1. **`DashboardPage`** (`dashboard-page.tsx`)
   - Главный контейнер со state-машиной для управления представлениями
   - Состояния: `list` (список) → `detail` (просмотр) → `create` / `edit` / `delete-confirm`
   - Загрузка списка паролей при монтировании
   - Обработка ошибок сети

2. **`PasswordList`** (`password-list.tsx`)
   - Таблица со списком всех паролей пользователя
   - Поля: название, логин, домен, действия (просмотр, редактирование, удаление)
   - Состояния загрузки и пустого списка

3. **`PasswordFormModal`** (`password-form-modal.tsx`)
   - Форма создания/редактирования пароля
   - Поля: name, username, password, domain, notes
   - Валидация через Zod-схемы
   - Режимы: create, edit

4. **`PasswordDetailModal`** (`password-detail-modal.tsx`)
   - Просмотр полных деталей пароля
   - Кнопка "показать/скрыть пароль" (toggle)
   - Кнопки редактирования и удаления
   - Loading state при загрузке с сервера

5. **`DeleteConfirmDialog`** (`delete-confirm-dialog.tsx`)
   - Диалог подтверждения удаления
   - Показывает название пароля для подтверждения
   - Кнопки Отмена/Удалить

#### API методы

**Файл**: `frontend/apps/pass/src/shared/passwords/api.ts`

```typescript
listPasswords(client)           // GET /v1/passwords/
createPassword(client, data)    // POST /v1/passwords/
getPassword(client, id)         // GET /v1/passwords/{id}
updatePassword(client, id, data) // PATCH /v1/passwords/{id}
deletePassword(client, id)      // DELETE /v1/passwords/{id}
```

Все методы используют ZOD для валидации ответов сервера.

### 3. HTTP-клиент

**Файл**: `frontend/packages/http-client/src/index.ts`

- Интерфейс `IHttpClient` с методом `request()`
- Плагины для расширения функциональности:
  - `withBaseURL()` — префикс базового URL
  - `withLogging()` — логирование запросов/ответов
  - `withCredentials()` — отправка cookies с запросами (для JWT в headers или cookies)

**Экземпляр**: `frontend/apps/pass/src/shared/http-client-instance.ts`

- Единый экземпляр `httpClient` с применёнными плагинами
- Экспортируется для всего приложения

### 4. Интернационализация (i18n)

**Файлы**: `frontend/apps/pass/src/locales/{ru,en}/`

Пространства имён:
- `common.json` — общие строки (меню, кнопки)
- `auth.json` — аутентификация
- `dashboard.json` — панель управления (ошибки, метки, подсказки)
- `meta.json` — заголовки страниц

**Язык по умолчанию**: русский (`ru`)

## Требования к функциональности

### Обязательные (MVP)

- [x] Аутентификация пользователя (логин/выход)
- [x] Просмотр списка сохранённых паролей
- [x] Создание нового пароля
- [x] Редактирование существующего пароля
- [x] Удаление пароля
- [x] Защита маршрутов auth guard
- [x] I18n поддержка (русский + английский)
- [x] Vanilla Extract CSS с design tokens
- [x] Unit-тесты (Vitest)

### Будущие возможности

- [ ] Экспорт/импорт паролей
- [ ] Генератор паролей
- [ ] Двухфакторная аутентификация (2FA)
- [ ] Синхронизация между устройствами
- [ ] Расширение браузера
- [ ] Поиск и фильтрация паролей
- [ ] Категории/теги для паролей

## Требования к инфраструктуре

### Non-functional Requirements

| Требование | Цель | Реализация |
|-----------|------|-----------|
| Безопасность | JWT в Authorization header | withCredentials плагин |
| Производительность | Кеширование списка паролей | State управление + React |
| Доступность | i18n для многоязычности | i18next + react-i18next |
| Тестируемость | Высокий % покрытия | Unit + E2E тесты |
| Масштабируемость | Модульная архитектура | Turborepo + пакеты |

## Критерии успеха

1. ✓ Все CRUD операции работают через API
2. ✓ Аутентификация защищает dashboard
3. ✓ UI полностью локализован
4. ✓ Все компоненты стилизованы через vanilla-extract
5. ✓ Есть покрытие unit-тестами для API и guard
6. ✓ E2E тесты проходят для основных сценариев

## Версионирование

- **Фронтенд**: версия отслеживается через `package.json`
- **API**: v1 (`/v1/passwords/`, `/v1/jwt/`)
- **Бэкенд**: версия синхронизируется с фронтенд версией

## Дальнейшие этапы

1. Интеграция с бэкенд API (готово)
2. Расширение функционала (поиск, фильтры, категории)
3. Мобильная версия (React Native)
4. Desktop версия (Tauri)
5. Расширение браузера

