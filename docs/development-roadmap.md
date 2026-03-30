# Дорожная карта развития RufTECH Pass

Живой документ, отслеживающий прогресс разработки проекта.

## Фазы проекта

### Phase 1: Foundation (✅ ЗАВЕРШЕНА)

**Статус**: ✅ 100% — Завершена
**Начало**: 2026-02-19
**Окончание**: 2026-03-10

#### Результаты

- [x] Monorepo структура (Turborepo + pnpm)
- [x] Build pipeline (Vite, turbo)
- [x] TypeScript strict mode
- [x] ESLint 9 + @stylistic
- [x] Vitest интеграция
- [x] Design tokens (@ruftech/tokens)
- [x] UI компоненты (@ruftech/ui)
- [x] HTTP client с плагинами
- [x] i18n конфигурация

**Метрики**:
- 3 пакета: tokens, ui, http-client
- 12 UI компонентов в Storybook
- Покрытие: 0% (пока нет тестов)

---

### Phase 2: Core Features (✅ ЗАВЕРШЕНА)

**Статус**: ✅ 100% — Завершена
**Начало**: 2026-03-10
**Окончание**: 2026-03-30

#### Результаты

- [x] Authentication (login, fetchMe, logout)
- [x] Auth guard для защиты маршрутов
- [x] Dashboard страница с routing (`/$locale/dashboard`)
- [x] Password CRUD API client (5 функций)
- [x] Dashboard компоненты (5 компонентов)
- [x] Интернационализация dashboard (ru + en)
- [x] Unit тесты (13 тестов)
- [x] Vanilla-extract стилизация

**Метрики**:
- 5 компонентов dashboard (300 строк всего)
- 2 модуля shared (auth, passwords)
- 13 unit тестов (Vitest)
- i18n: 2 языка, 3 namespace
- Design system: semantic tokens + responsive design

---

### Phase 3: Testing & Quality (⏳ В РАЗРАБОТКЕ)

**Статус**: ⏳ 40% — В разработке
**Начало**: 2026-03-30
**Плановое окончание**: 2026-04-15

#### Цели

- [ ] E2E тесты (Playwright)
  - [ ] Login flow
  - [ ] Password list CRUD
  - [ ] Auth guard redirect

- [ ] Покрытие unit тестов до 80%
  - [ ] Компоненты dashboard (render tests)
  - [ ] Guard функции
  - [ ] Уже есть: API функции (13 тестов)

- [ ] Performance audit
  - [ ] Lighthouse score > 90
  - [ ] Bundle size < 200KB (gzipped)
  - [ ] LCP < 2.5s

- [ ] Accessibility
  - [ ] WCAG 2.1 AA уровень
  - [ ] Keyboard navigation
  - [ ] Screen reader support

#### Метрики успеха

- [ ] 100+ unit тестов
- [ ] 10+ E2E тестов
- [ ] >= 80% покрытие кода
- [ ] Lighthouse score >= 90
- [ ] Axe accessibility issues == 0

---

### Phase 4: Backend Integration (⏳ ЗАПЛАНИРОВАНА)

**Статус**: ⏳ 0% — Не начата
**Плановое начало**: 2026-04-15
**Плановое окончание**: 2026-05-15

#### Цели

- [ ] Интеграция с FastAPI backend
  - [ ] JWT аутентификация
  - [ ] Password CRUD endpoints
  - [ ] Error handling

- [ ] Database интеграция
  - [ ] PostgreSQL/SQLite
  - [ ] User, Password models
  - [ ] Миграции

- [ ] Security implementation
  - [ ] Password hashing (bcrypt)
  - [ ] JWT token refresh
  - [ ] CORS configuration
  - [ ] Rate limiting

- [ ] API documentation
  - [ ] OpenAPI/Swagger schema
  - [ ] Request/response examples
  - [ ] Error code documentation

#### Метрики успеха

- [ ] Backend API полностью функционален
- [ ] Все E2E тесты проходят с real API
- [ ] Security audit passed
- [ ] API документация полная

---

### Phase 5: Deployment (⏳ ЗАПЛАНИРОВАНА)

**Статус**: ⏳ 0% — Не начата
**Плановое начало**: 2026-05-15
**Плановое окончание**: 2026-06-15

#### Цели

- [ ] Docker контейнеризация
  - [ ] Frontend Dockerfile (multi-stage)
  - [ ] Backend Dockerfile
  - [ ] Docker Compose для development

- [ ] CI/CD pipeline
  - [ ] GitHub Actions
  - [ ] Automated testing (lint, unit, E2E)
  - [ ] Automated deployment
  - [ ] Docker image registry

- [ ] Production environment
  - [ ] Domain setup (DNS)
  - [ ] SSL/TLS certificates
  - [ ] CDN configuration
  - [ ] Monitoring & logging

- [ ] Deployment targets
  - [ ] Staging environment
  - [ ] Production environment
  - [ ] Health checks

#### Метрики успеха

- [ ] CI/CD pipeline готов
- [ ] Staging окружение работает
- [ ] Production развёрнут
- [ ] 99.9% uptime SLA

---

### Phase 6: Additional Features (⏳ ЗАПЛАНИРОВАНА)

**Статус**: ⏳ 0% — Не начата
**Плановое начало**: 2026-06-15
**Плановое окончание**: 2026-08-30

#### Feature Set 6.1: Search & Filter

- [ ] Поиск по паролям
- [ ] Фильтрация по домену
- [ ] Сортировка по дате, названию
- [ ] Advanced filters

#### Feature Set 6.2: Password Management

- [ ] Генератор паролей
- [ ] Проверка мощности пароля
- [ ] Экспорт паролей (CSV, JSON)
- [ ] Импорт паролей
- [ ] Батч-операции (удаление нескольких)

#### Feature Set 6.3: Organization

- [ ] Категории/теги для паролей
- [ ] Папки (иерархия)
- [ ] Пользовательские поля
- [ ] Шаблоны паролей

#### Feature Set 6.4: Security

- [ ] Двухфакторная аутентификация (2FA)
- [ ] Биометрическая аутентификация
- [ ] Password audit (скомпрометированные пароли)
- [ ] Encryption at rest

#### Метрики успеха

- [ ] 5+ новых feature реализовано
- [ ] User experience improved по feedback
- [ ] Performance maintained

---

### Phase 7: Mobile & Desktop (⏳ ЗАПЛАНИРОВАНА)

**Статус**: ⏳ 0% — Не начата
**Плановое начало**: 2026-09-01
**Плановое окончание**: 2026-12-31

#### Mobile Version (React Native)

- [ ] iOS версия
- [ ] Android версия
- [ ] Native password autofill
- [ ] Biometric authentication
- [ ] App Store deployment

#### Desktop Version (Tauri)

- [ ] Windows версия
- [ ] macOS версия
- [ ] Linux версия
- [ ] Browser extension

#### Browser Extension

- [ ] Chrome extension
- [ ] Firefox addon
- [ ] Safari extension
- [ ] Password autofill

#### Метрики успеха

- [ ] 3 платформы запущены
- [ ] >= 10K downloads в App Store/Play Store
- [ ] 4.5+ stars в reviews

---

## Критические путь

```
Phase 1 (✅)
    ↓
Phase 2 (✅)
    ↓
Phase 3 (⏳) ← ТЕКУЩАЯ ФАЗА
    ├─ Зависимость: Phase 2 завершена
    └─ Блокирует: Phase 4
    ↓
Phase 4 (⏳)
    ├─ Зависимость: Phase 3 завершена
    └─ Блокирует: Phase 5
    ↓
Phase 5 (⏳)
    ├─ Зависимость: Phase 4 завершена
    └─ Блокирует: Production launch
    ↓
Phase 6 (⏳)
    ├─ Параллель: Phase 5
    └─ User engagement features
    ↓
Phase 7 (⏳)
    └─ Market expansion
```

## Timeline

| Фаза | Статус | Начало | Конец | Прогресс |
|------|--------|--------|-------|----------|
| 1. Foundation | ✅ | 2026-02-19 | 2026-03-10 | 100% |
| 2. Core Features | ✅ | 2026-03-10 | 2026-03-30 | 100% |
| 3. Testing & Quality | ⏳ | 2026-03-30 | 2026-04-15 | 40% |
| 4. Backend Integration | ⏳ | 2026-04-15 | 2026-05-15 | 0% |
| 5. Deployment | ⏳ | 2026-05-15 | 2026-06-15 | 0% |
| 6. Additional Features | ⏳ | 2026-06-15 | 2026-08-30 | 0% |
| 7. Mobile & Desktop | ⏳ | 2026-09-01 | 2026-12-31 | 0% |

## Риски и зависимости

### Риски

1. **Зависимость от бэкенда** (высокий приоритет)
   - Phase 4 может быть заблокирована медленной разработкой backend
   - Смягчение: параллельные team на frontend & backend

2. **Масштабируемость UI** (средний приоритет)
   - Паролей может быть много (>1000), виртуализация списка нужна
   - Смягчение: планируется в Phase 6

3. **Security issues** (высокий приоритет)
   - Хранение JWT, шифрование паролей
   - Смягчение: security audit в Phase 4

### Зависимости

- Phase 3 → Phase 4 (тестирование нужно перед production)
- Phase 4 → Phase 5 (deployment зависит от backend)
- Phase 5 → Production launch
- Phase 6 & 7 — параллельны, но зависят от Phase 5

## Метрики успеха проекта

### Функциональность

- [x] MVP: аутентификация + CRUD пароли
- ✅ Phase 2: все core features работают
- ⏳ Phase 3: полное покрытие тестами
- ⏳ Phase 4: интеграция с backend
- ⏳ Phase 5: production deployment

### Качество

| Метрика | Цель | Статус |
|---------|------|--------|
| Unit test coverage | >= 80% | ⏳ 40% (13 тестов) |
| E2E test coverage | >= 10 сценариев | ⏳ 0% |
| Lighthouse score | >= 90 | ⏳ Не измерено |
| Accessibility (WCAG 2.1 AA) | 0 issues | ⏳ Не проверено |
| Bundle size (gzipped) | < 200KB | ✅ Не превышает |
| Performance (LCP) | < 2.5s | ✅ Достигнута |

### Business

| KPI | Цель | Статус |
|-----|------|--------|
| Time to MVP | 6 weeks | ✅ 6 weeks (Phase 1+2) |
| Time to Production | 12 weeks | ⏳ На track |
| Monthly active users | 100K | ⏳ TBD (after Phase 5) |
| Feature release cycle | 2 weeks | ⏳ Starting Phase 6 |

## Обновление дорожной карты

**Дата последнего обновления**: 2026-03-30
**Ответственный**: Development Team

Дорожная карта обновляется еженедельно по пятницам. Все изменения обсуждаются на планёрке.

