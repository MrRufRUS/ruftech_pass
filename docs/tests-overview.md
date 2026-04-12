# Обзор тестов

Монорепо: `frontend/` (Turborepo + pnpm workspaces)  
Фреймворк: Vitest 4.0.18 · Playwright (E2E)  
Итого: **306 тестов** — 40 файлов

---

## Легенда

| Тип             | Определение                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Unit**        | Одна функция/класс в изоляции — без I/O, рендеринга и реальных внешних зависимостей                                            |
| **Integration** | Несколько модулей совместно; внешний I/O мокируется (fetch, fs, clipboard, i18n-ресурсы)                                       |
| **Component**   | React-компонент рендерится через RTL — проверяется поведение UI и взаимодействия пользователя; API мокируется на уровне модуля |
| **E2E**         | Полный браузер против реального dev-сервера + бэкенда (Playwright)                                                             |


![](./assets/пирамида%20тестирования.png)
---

## По типам

| Тип              | Файлов | Тестов |
| ---------------- | ------ | ------ |
| Unit             | 14     | 86     |
| Integration      | 9      | 64     |
| Component (RTL)  | 15     | 147    |
| E2E (Playwright) | 2      | 9      |

---

## apps/pass

React-приложение. Тесты в `src/__tests__/`. Окружение: `happy-dom`. Сетап: `src/test-setup.ts`.

### `auth-api.test.ts` — 14 тестов · **Integration**
HTTP API-слой аутентификации. Мокирует HTTP-клиент; проверяет URL, метод, тело запроса и подключение parse-функций.

- **login** — form-encoded POST на `/v1/jwt/login/`; `TokenInfo.parse`
- **fetchMe** — GET `/v1/jwt/me/`; `UserMe.parse`
- **logout** — POST `/v1/jwt/logout/`; `MessageResponse.parse`
- **signup** — form-encoded POST; необязательный email (включение/исключение); `MessageResponse.parse`
- **updateMe** — PATCH JSON `/v1/jwt/me/`; `UserMe.parse`
- **deleteAccount** — DELETE `/v1/jwt/delete/`; `MessageResponse.parse`

### `auth-guard.test.ts` — 4 теста · **Integration**
Роутовый guard `checkAuth`. Мокирует `fetchMe`; тестирует обход в dev-режиме и обработку ошибок в production.

- Возвращает `null` в dev-режиме (без вызова `fetchMe`)
- Возвращает пользователя при успешном `fetchMe`
- Возвращает `null` при ошибке `fetchMe` / сетевой ошибке

### `auth-header.test.tsx` — 5 тестов · **Component**
Компонент `AuthHeader`.

- Рендерит название бренда и ссылку; кнопку переключения темы
- Переключает тему по клику; сохраняет в `localStorage`

### `auth-page.test.tsx` — 6 тестов · **Component**
`AuthPage` (переключатель форм логин ↔ регистрация). Мокирует навигацию роутера.

- По умолчанию рендерит форму логина + `AuthHeader`
- Переключается на регистрацию и обратно
- Переходит на `/dashboard` после логина; учитывает параметр `redirect`

### `dashboard-header.test.tsx` — 8 тестов · **Component**
`DashboardHeader`. Мокирует API логаута и роутер.

- Рендерит название бренда, кнопку профиля, кнопку выхода, переключатель темы
- Колбэк `onOpenProfile`; вызов API логаута; навигация даже при ошибке API
- Переключение темы

### `dashboard-page.test.tsx` — 18 тестов · **Component**
`DashboardPage` — главная страница авторизованного пользователя. Мокирует API паролей и роутер.

- **Загрузка** — начальный спиннер
- **Загружено** — список, пустое состояние, заголовок, кнопка добавления
- **Ошибка** — алерт при ошибке загрузки; закрытие алерта
- **Модал создания** — открывается по кнопке добавления
- **Выбор (детали)** — открытие модала; контент; удаление при 404; сетевая ошибка
- **Колбэк создания** — перезагрузка списка
- **Модал профиля** — открытие/закрытие
- **Удаление** — диалог подтверждения; удаление; ошибка

### `default-i18n.test.ts` — 6 тестов · **Integration**
Фабрика `DefaultI18n.create()`. Создаёт реальные экземпляры `i18next` с бандлированными ресурсами.

- Создаёт экземпляр для `ru`/`en`; загружает namespace `common`; содержит все namespaces
- Переводит ключ из namespace `home`; создаёт независимые экземпляры при каждом вызове

### `home-page.test.tsx` — 7 тестов · **Component**
`HomePage` (лендинг).

- Рендерит секции: hero, features, CTA, about
- Модал регистрации скрыт по умолчанию; открывается по клику на CTA; закрывается

### `i18n.test.ts` — 9 тестов · **Unit**
Чистые i18n-утилиты — `isLocale`, `detectLocale`, константы. Без побочных эффектов.

- Константы локалей; `ru` по умолчанию
- `isLocale` — поддерживаемая / неподдерживаемая
- `detectLocale` — корень, `/en/…`, `/ru/…` (редиректы), неизвестный, пустая строка

### `landing-header.test.tsx` — 9 тестов · **Component**
`LandingHeader`. Мокирует состояние авторизации и `scrollIntoView`.

- Рендерит бренд, навигацию, переключатель темы
- Ссылка логина vs. my-passwords в зависимости от авторизации
- Переключение темы (aria-label + localStorage); кнопки scroll-навигации

### `locale-route.test.ts` — 3 теста · **Unit**
Логика guard-а маршрута `$locale` — чистая функция, без I/O.

- Отклоняет неизвестную локаль; дефолтная локаль инициирует редирект; корректная не-дефолтная проходит

### `login-form.test.tsx` — 14 тестов · **Component**
`LoginForm`. Мокирует HTTP API аутентификации.

- **Рендер** — заголовок, поля, кнопка отправки, ссылка переключения
- **Валидация** — нет вызова API при пустых полях (всех/username/password)
- **Успех** — `onSuccess`; корректный endpoint
- **Ошибки** — 401, не-401 `ApiError`, generic `Error`, закрытие алерта
- **Переключение режима** — `onSwitchMode`

### `password-detail-modal.test.tsx` — 14 тестов · **Component**
`PasswordDetailModal`.

- **Закрыт** — ничего не рендерится
- **Загрузка / null** — нет кнопок в футере
- **Открыт** — название сервиса, URL (есть/нет), логин, маскировка пароля, переключатель показа, кнопки edit/delete, колбэки
- **Закрытие** — колбэк `onClose`

### `password-form-modal.test.tsx` — 13 тестов · **Component**
`PasswordFormModal` (создание/редактирование).

- **Закрыт** — ничего не рендерится
- **Создание** — заголовок, поля, кнопки, `onSubmit` с данными / пустыми строками
- **Редактирование** — заголовок, предзаполненные поля
- **Закрытие** — отмена, закрытие диалога
- **Валидация** — нет submit при невалидном URL
- **Ошибка submit** — алерт показан и закрыт

### `password-list.test.tsx` — 12 тестов · **Component**
`PasswordList`.

- **Загрузка** — спиннер, нет поиска/сетки
- **Пусто** — заголовок, описание, `onAdd`
- **С паролями** — карточки, `onSelect`, поле поиска
- **Поиск** — фильтрация, сообщение «нет результатов», автодополнение, клик по подсказке

### `passwords-api.test.ts` — 10 тестов · **Integration**
HTTP API-слой паролей. Мокирует HTTP-клиент; проверяет URL, метод, тело, parse-функции.

- `listPasswords` — GET `/v1/passwords/`
- `createPassword` — POST JSON
- `getPassword` — GET по id
- `updatePassword` — PATCH JSON
- `deletePassword` — DELETE

### `profile-modal.test.tsx` — 18 тестов · **Component**
`ProfileModal`. Мокирует API обновления/удаления и роутер.

- **Закрыт** — ничего не рендерится
- **Открыт** — секции: email, пароль, danger zone, кнопка удаления
- **Обновление email** — отправка; сообщение об успехе; алерт ошибки + закрытие
- **Закрытие** — кнопка в заголовке
- **Удаление аккаунта** — диалог подтверждения; отмена скрывает; успех — навигация; ошибка скрывает подтверждение
- **Обновление пароля** — успех — навигация; алерт ошибки + закрытие

### `provider.test.tsx` — 3 теста · **Component**
`I18nProvider` / хук `useLocale`.

- Возвращает локаль из провайдера; выбрасывает исключение вне провайдера; рендерит children

### `signup-form.test.tsx` — 16 тестов · **Component**
`SignupForm`. Мокирует API аутентификации.

- **Рендер** — заголовок, поля, кнопки, ссылка переключения
- **Валидация** — пустые обязательные поля / пустой username; невалидный email (Zod)
- **Успех** — `onSuccess`; последовательность signup → login
- **Ошибки** — конфликт username, конфликт email, сетевая ошибка, raw detail, невалидное тело, закрытие алерта
- **Переключение режима** — `onSwitchMode`

### `useDocumentMeta.test.ts` — 5 тестов · **Integration**
Хук `useDocumentMeta`. Реальный экземпляр i18n + мутация meta-тегов в DOM; без рендеринга компонентов.

- Устанавливает `document.title`, `meta[description]`, OG-теги, Twitter-теги
- Резолвится без ошибок в SSR-контексте

---

## packages/api

Zod-схемы для типов API. Без HTTP-вызовов — чистый парсинг схем.

### `errors.test.ts` — 14 тестов · **Unit**
- **`ApiError`** — string `detail`; `safeParse` валидный/невалидный (отсутствует, неверный тип, пустой)
- **`ValidationErrorItem`** — строковый/числовой/смешанный `loc`; отсутствует `msg`/`type`
- **`ValidationError`** — с элементами; пустой массив; `detail` как строка (fail); отсутствует (fail)

### `passwords.test.ts` — 12 тестов · **Unit**
- **`PasswordCreate`** — все поля; без URL; `null` URL; невалидный URL; отсутствуют обязательные поля
- **`PasswordPublic`** — элемент списка; нецелочисленный `id` (fail)
- **`PasswordDetail`** — полный; без URL
- **`PasswordUpdate`** — пустой; частичный; невалидный URL

### `users.test.ts` — 16 тестов · **Unit**
- **`LoginRequest`** — валидный; отсутствует `username`/`password`
- **`SignupRequest`** — все поля; без email; `null`; невалидный email
- **`TokenInfo`** — валидный
- **`UserMe`** — полный; без email; `null`; нецелочисленный `id`
- **`UserUpdate`** — пустой; частичный; невалидный email
- **`MessageResponse`** — парсинг сообщения

---

## packages/http-client

HTTP-клиент на основе плагинов.

### `client.test.ts` — 2 теста · **Unit**
- Делегирует вызов к исходной функции; `applyPlugin` оборачивает и возвращает новый клиент

### `default.test.ts` — 6 тестов · **Integration**
Использует мокированный `fetch`; проверяет полный цикл request → response → parse.

- **`HttpError`** — хранит `status` и `response`
- **`DefaultHttpClient`** — парсит успешный ответ; выбрасывает `HttpError` при non-ok; передаёт init; цепочка плагинов; ошибка `json()`

### `provider.test.tsx` — 2 теста · **Component**
- `useHttpClient` возвращает клиент из провайдера; выбрасывает исключение вне провайдера

### `withBaseURL.test.ts` — 4 теста · **Unit**
Чистое преобразование URL — без I/O.

- Добавляет base; добавляет разделитель `/`; убирает завершающий `/`; path-сегменты

### `withCredentials.test.ts` — 2 теста · **Unit**
Чистое слияние опций.

- Добавляет `credentials: include`; сохраняет существующие опции

### `withLogging.test.ts` — 6 тестов · **Unit**
Плагин с мокированной inner-функцией и логгером.

- **Успех** — логирует информацию; дефолтный метод GET; возвращает результат
- **Ошибка** — логирует и пробрасывает
- **Санитизация** — маскирует чувствительные параметры; кастомный санитайзер

### `withUnauthorizedHandler.test.ts` — 7 тестов · **Unit**
Плагин с мокированной inner-функцией.

- Вызывает `onUnauthorized` при 401; пробрасывает; пропускает при 403/500/generic error; пропускает при успехе; передаёт url/options

---

## packages/helpers

DOM-утилиты. Окружение: `happy-dom`.

### `copy-current-url.test.ts` — 8 тестов · **Integration**
Мокирует `navigator.clipboard` и `document.execCommand`; тестирует полный flow копирования с колбэками.

- **Clipboard** — копирует URL; `onSuccess`; нет `onError`; `onError` + `false` при ошибке; нет `onSuccess` при ошибке
- **Fallback** — textarea + `execCommand`; `onSuccess`; без опций

### `navigate-to.test.ts` — 5 тестов · **Unit**
Мокирует `window.location.assign` и `window.open`.

- `_self` — `location.assign`; явный `_self`; нет `window.open`
- `_blank` — `window.open` с `noopener,noreferrer`; нет `assign`

### `on-click-outside.test.ts` — 6 тестов · **Integration**
Использует реальную систему событий happy-dom с реальными DOM-узлами.

- Клик снаружи → колбэк; внутри → нет; по самому элементу → нет
- Отписка удаляет слушатель
- **CSS-селектор** — клик снаружи → колбэк; внутри → нет

---

## packages/ssg

Server-side generation.

### `meta.test.ts` — 3 теста · **Unit**
`injectMeta` — чистое regex-преобразование строки.

- Заменяет `lang`, `title`, description, canonical, OG/Twitter теги, `hreflang`
- Вставляет `appHtml` + `data-server-rendered`
- Нет `data-server-rendered` без `appHtml`

### `prerender.test.ts` — 5 тестов · **Integration**
Мокирует `node:fs` и динамический импорт server entry; тестирует полный SSG-пайплайн.

- SPA fallback `200.html`; рендеринг маршрутов по локалям; маппинг pageKey
- Очистка директории server; вставка `data-server-rendered`

---

## packages/logger

### `logger.test.ts` — 2 теста · **Unit**
- `createLogger` делегирует вызовы к handler; кастомные log levels

### `default.test.ts` — 1 тест · **Unit**
- `DefaultLogger` маппирует `debug`/`info`/`warn`/`error` → методы `console`

### `provider.test.tsx` — 2 теста · **Component**
- `useLogger` возвращает логгер из провайдера; выбрасывает исключение вне провайдера

---

## packages/e2e

Playwright против полного стека (dev-сервер + бэкенд).

### `auth.spec.ts` — 6 тестов · **E2E**
- Форма логина рендерится; корректный заголовок документа; валидация пустой формы
- `/en/auth` — английский заголовок; алерт закрывается; успешный логин → редирект на dashboard

### `smoke.spec.ts` — 3 теста · **E2E**
- `/` — русский заголовок; `/en/` — английский; `/ru/` → редирект на `/`

---

## Запуск тестов

```bash
pnpm turbo test              # все unit/integration/component
pnpm turbo test:coverage     # с покрытием
pnpm --filter @ruftech/helpers test  # один пакет
pnpm --filter ruftech-pass test
pnpm test:e2e                # E2E
pnpm coverage:all            # сводный отчёт покрытия
```
