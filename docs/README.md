# Документация RufTECH Pass

## Для разработчика

| Документ | Описание |
|----------|----------|
| [frontend/README.md](./frontend/README.md) | Монорепо: структура, команды, архитектура, TypeScript, компоненты |
| [backend/README.md](./backend/README.md) | FastAPI: структура, эндпоинты, модели, миграции, запуск |
| [ci-cd-guide.md](./ci-cd-guide.md) | CI-этапы, релиз (release-please), Docker Hub, проверка локально |
| [testing-guide.md](./testing-guide.md) | Как писать тесты: pytest (backend), Vitest + RTL + Playwright (frontend) |
| [tests-overview.md](./tests-overview.md) | Справочник существующих тестов (306 тестов, 40 файлов) |

## Вся документация

### 📋 [project-overview-pdr.md](./project-overview-pdr.md) (188 строк)

Обзор продукта и Product Development Requirements (PDR).

**Содержит**:
- Описание продукта и архитектуры
- Ключевые компоненты (Auth, Dashboard, HTTP Client, i18n)
- API методы для паролей (CRUD)
- Требования к функциональности (MVP + будущие)
- Требования к инфраструктуре (Non-functional)
- Критерии успеха
- Дорожная карта фаз

**Для кого**: Product managers, stakeholders, архитекторы

---

### 🏗️ [system-architecture.md](./system-architecture.md) (518 строк)

Детальная архитектура системы с диаграммами.

**Содержит**:
- Диаграмма архитектуры (ASCII)
- Описание всех слоёв (Presentation, Application, HTTP, Business Logic)
- Data моделей и API контрактов
- Аутентификация и авторизация flow
- Интернационализация (i18n)
- Стилизация (Vanilla Extract + Design Tokens)
- Тестирование (Unit + E2E)
- Развёртывание и Docker
- Безопасность
- Масштабируемость

**Для кого**: Архитекторы, senior разработчики, техлиды

---

### 💻 [code-standards.md](./code-standards.md) (663 строк)

Стандарты и нормы разработки кода.

**Содержит**:
- Принципы (YAGNI, KISS, DRY)
- Структура проекта и поименование файлов
- Размер файлов и рефакторинг
- TypeScript strict mode правила
- React компоненты (FC, props, hooks, state machine)
- Vanilla Extract CSS конвенции
- API/HTTP client паттерны
- Unit и E2E тестирование
- ESLint и форматирование
- i18n структура
- Commit сообщения (Conventional Commits)
- Безопасность
- Performance оптимизация

**Для кого**: Разработчики, code reviewers, новички в проекте

---

### 📦 [codebase-summary.md](./codebase-summary.md) (409 строк)

Сводка по структуре кодовой базы.

**Содержит**:
- Полная структура директорий проекта
- Описание ключевых файлов
- API endpoints (auth + passwords)
- Типы данных (TypeScript interfaces)
- State machine типы (PageView)
- Design tokens
- Технологический стек
- Команды для разработки (dev, test, build, docker)
- Текущий статус разработки (реализовано, в разработке, планируется)

**Для кого**: Новички в проекте, разработчики для быстрого ознакомления

---

### 📝 [project-changelog.md](./project-changelog.md) (220 строк)

История всех изменений и версий.

**Содержит**:
- v0.2.0 (2026-03-30) — User Dashboard с Password Vault CRUD
  - API Client для паролей (5 функций)
  - Auth guard
  - 5 компонентов dashboard
  - 13 unit тестов
  - i18n поддержка (ru + en)
  - Vanilla-extract стилизация

- v0.1.0 (2026-03-10) — Foundation
  - Monorepo структура
  - Пакеты (tokens, ui, http-client, logger)
  - Auth API
  - Frontend приложение

**Для кого**: Team members для отслеживания изменений, product managers для releases

---

### 🗺️ [development-roadmap.md](./development-roadmap.md) (350 строк)

Живой документ дорожной карты развития.

**Содержит**:
- 7 фаз проекта (Phase 1: Foundation до Phase 7: Mobile & Desktop)
- Текущий статус: Phase 3 (Testing & Quality) — 40% выполнена
- Завершённые: Phase 1-2 (100%)
- Критический путь (dependencies)
- Timeline с датами
- Риски и зависимости
- KPI и метрики успеха

**Для кого**: Project managers, stakeholders, архитекторы для планирования

---

## Быстрый старт для новичков

1. **Начните с**: [codebase-summary.md](./codebase-summary.md) — общий обзор структуры
2. **Затем**: [code-standards.md](./code-standards.md) — разберитесь со стандартами
3. **Затем**: [system-architecture.md](./system-architecture.md) — поймите архитектуру
4. **Опционально**: [project-overview-pdr.md](./project-overview-pdr.md) — для контекста продукта

## Для разных ролей

### Разработчик Frontend

1. [codebase-summary.md](./codebase-summary.md) — структура
2. [code-standards.md](./code-standards.md) — как писать код
3. [system-architecture.md](./system-architecture.md#presentation-layer-фронтенд) — frontend слой
4. [project-changelog.md](./project-changelog.md) — что сделано

### Backend разработчик

1. [project-overview-pdr.md](./project-overview-pdr.md#ключевые-компоненты) — API контракты
2. [system-architecture.md](./system-architecture.md#api-requestresponse-types) — API types
3. [codebase-summary.md](./codebase-summary.md#api-endpoints) — endpoints

### Product Manager

1. [project-overview-pdr.md](./project-overview-pdr.md) — полный обзор
2. [development-roadmap.md](./development-roadmap.md) — дорожная карта
3. [project-changelog.md](./project-changelog.md) — releases

### Tech Lead / Architect

1. [system-architecture.md](./system-architecture.md) — полная архитектура
2. [code-standards.md](./code-standards.md) — стандарты
3. [development-roadmap.md](./development-roadmap.md) — планирование
4. [project-overview-pdr.md](./project-overview-pdr.md) — требования

---

## Ключевые факты

### Реализовано (Phase 2 ✅)

- ✅ Authentication (login, fetchMe, logout)
- ✅ User Dashboard с защитой auth guard
- ✅ Password CRUD (create, read, update, delete)
- ✅ 5 компонентов dashboard
- ✅ 13 unit тестов
- ✅ i18n поддержка (русский + английский)
- ✅ Vanilla-extract CSS + Design tokens

### В разработке (Phase 3 ⏳ 40%)

- ⏳ E2E тесты (Playwright)
- ⏳ Повышение unit test coverage до 80%
- ⏳ Performance audit
- ⏳ Accessibility проверки

### Технологический стек

| Компонент | Технология |
|-----------|-----------|
| Frontend | React 19 + Vite + TanStack Router v2 |
| Styling | Vanilla Extract |
| Testing | Vitest + Playwright |
| Package Manager | pnpm |
| Monorepo | Turborepo |
| Language | TypeScript (strict) |

---

## Как обновлять документацию

1. **Проверьте** какой документ нужно обновить
2. **Читайте** соответствующий файл
3. **Обновляйте** релевантные секции
4. **Убедитесь** что все ссылки рабочие
5. **Обновите** [project-changelog.md](./project-changelog.md) если что-то существенное изменилось

## Ссылки

- GitHub: [itmo-devops-project](https://github.com/...)
- Backend API docs: `/docs` (Swagger/OpenAPI после Phase 4)
- Storybook UI Components: `pnpm dev:ui` (port 6006)

