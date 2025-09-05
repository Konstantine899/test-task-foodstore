# 🍣 Food Store - React приложение

Современное React приложение для интернет-магазина еды с кастомной конфигурацией Webpack, TypeScript и полным набором инструментов для разработки. Проект использует архитектуру Feature-Sliced Design и включает мощные скрипты автоматизации.

## 🚀 Технологический стек

### Основные технологии
- **React 19.0.0** - UI библиотека с новейшими возможностями
- **TypeScript 5.7.3** - строгая типизация
- **Webpack 5.98.0** - кастомная конфигурация сборки
- **SCSS** - препроцессор CSS с модулями
- **Redux Toolkit** - управление состоянием
- **i18next** - интернационализация

### Инструменты разработки
- **Babel** - транспиляция с поддержкой React 19
- **ESLint** - линтер с flat config и TypeScript поддержкой
- **Stylelint** - линтер для SCSS
- **Webpack Dev Server** - сервер разработки с HMR
- **Fork TS Checker** - проверка типов в отдельном процессе

---

## 1. 🚀 Запуск проекта

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm start
```
Приложение будет доступно по адресу: `http://localhost:3000`

### Сборка для продакшена
```bash
npm run build:prod
```

### Сборка в режиме разработки
```bash
npm run build:dev
```

---

## 2. 📜 Скрипты

### Основные команды
```bash
# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build:prod

# Сборка в режиме разработки
npm run build:dev

# Проверка SCSS
npm run lint:scss

# Исправление SCSS
npm run lint:scss:fix

# Генерация нового слайса
npm run generate:slice <layer> <sliceName>
```

### Вспомогательные скрипты

#### Очистка кеша
```bash
node scripts/clear-cache.js
```

#### Рефакторинг импортов
```bash
npx ts-node scripts/refactoring/updateImports.ts
```

#### Создание public API для shared/ui
```bash
npx ts-node scripts/refactoring/createPublicApiForSharedUi.ts
```

---

## 3. 🏗️ Архитектура проекта

Проект следует принципам **Feature-Sliced Design**.

📖 **Подробная документация**: [Feature-Sliced Design](https://feature-sliced.design/)

### Структура проекта
```
src/
├── app/                    # Инициализация приложения
│   ├── App.tsx            # Корневой компонент
│   ├── App.module.scss    # Глобальные стили
│   └── store/             # Redux store
├── pages/                 # Страницы приложения
│   ├── MainPage/          # Главная страница
│   └── PageLoader/        # Лоадер страниц
├── widgets/               # Крупные UI блоки
│   ├── header/            # Хедер приложения
│   ├── ProductSection/    # Секция продуктов
│   ├── ProductGrid/       # Сетка продуктов
│   ├── CartSidebar/       # Боковая панель корзины
│   └── CategoryNavigation/ # Навигация по категориям
├── entities/              # Бизнес-сущности
│   ├── product/           # Продукты
│   ├── cart/              # Корзина
│   └── category/          # Категории
├── shared/                # Переиспользуемые ресурсы
│   ├── ui/               # UI компоненты
│   ├── lib/              # Утилиты и хуки
│   ├── assets/           # Статические ресурсы
│   └── lib/i18n/         # Переводы
└── global.d.ts           # Глобальные типы
```

---

## 4. 🌍 Работа с переводами

Проект поддерживает многоязычность через **i18next**.

### Поддерживаемые языки
- 🇷🇺 Русский (ru)
- 🇺🇸 Английский (en)  
- 🇰🇿 Казахский (kz)

### Файлы переводов
```
src/shared/lib/i18n/resources/
├── ru.json    # Русские переводы
├── en.json    # Английские переводы
└── kz.json    # Казахские переводы
```

### Использование в компонентах
```tsx
import { useTranslation } from '@/shared/lib';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <h1>{t('common.title')}</h1>
  );
};
```

### Добавление новых переводов
1. Откройте файл `src/shared/lib/i18n/resources/ru.json`
2. Добавьте новый ключ:
```json
{
  "common": {
    "newKey": "Новый перевод"
  }
}
```
3. Добавьте переводы в остальные языки
4. Используйте в компоненте: `t('common.newKey')`

---

## 5. ⚙️ Конфигурация проекта

### TypeScript
- **Target**: ES5 для совместимости
- **Module**: ESNext с CommonJS для ts-node
- **JSX**: react-jsx (автоматический runtime)
- **Строгая типизация**: noImplicitAny
- **Path mapping**: алиасы для всех слоев архитектуры

### Webpack
- **Модульная конфигурация** в `config/build/`
- **Лоадеры**: TypeScript, SCSS, файлы, SVG как React компоненты
- **Плагины**: HTML, CSS извлечение, HMR, прогресс сборки
- **Dev Server**: настройка порта и HMR
- **Оптимизация**: contenthash для кеширования

### Babel
- **Presets**: env, react (automatic runtime), typescript
- **Поддержка**: современный JavaScript и TypeScript
- **React 19**: автоматический JSX runtime

### ESLint
- **Конфигурация**: flat config (ESLint 9+)
- **Плагины**: React, React Hooks, TypeScript, Import
- **Правила**: рекомендуемые для React и TypeScript

---

## 6. 📊 Работа с данными

### Redux Store
Приложение использует **Redux Toolkit** для управления состоянием.

#### Структура store
```typescript
interface RootState {
  product: ProductState;    // Состояние продуктов
  cart: CartState;         // Состояние корзины
  category: CategoryState; // Состояние категорий
}
```

#### Основные слайсы
- **productSlice** - управление продуктами, поиск, фильтрация
- **cartSlice** - управление корзиной, добавление/удаление товаров
- **categorySlice** - управление категориями, активная категория

### Данные продуктов
Продукты хранятся в `src/entities/product/data/products.ts`:
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badges: ProductBadge[];
}
```

### Локальное хранилище
- Категории сохраняются в `localStorage`
- Корзина может быть сохранена в `localStorage` (опционально)

---

## 7. 🔮 Рекомендации по улучшению проекта

### 🧪 Тестирование
- [ ] Добавить **Jest** и **React Testing Library**
- [ ] Написать unit тесты для компонентов
- [ ] Добавить интеграционные тесты
- [ ] Настроить **Storybook** для визуального тестирования

### 🚀 Производительность
- [ ] Добавить **React.lazy()** для ленивой загрузки страниц
- [ ] Настроить **Code Splitting** по маршрутам
- [ ] Оптимизировать изображения (WebP, lazy loading)
- [ ] Добавить **Service Worker** для кеширования

### 🔧 Разработка
- [ ] Настроить **Prettier** для форматирования кода
- [ ] Добавить **Husky** для pre-commit хуков
- [ ] Настроить **GitHub Actions** для CI/CD
- [ ] Добавить **Docker** конфигурацию

### 📱 UX/UI
- [ ] Добавить **PWA** функциональность
- [ ] Улучшить адаптивность для мобильных устройств
- [ ] Добавить **анимации** и **переходы**
- [ ] Реализовать **темную тему**

### 🔌 API и данные
- [ ] Интегрировать с **реальным API**
- [ ] Добавить **Redux Toolkit Query** для кеширования
- [ ] Реализовать **офлайн режим**
- [ ] Добавить **пагинацию** для продуктов

### 🛡️ Безопасность
- [ ] Добавить **валидацию** форм
- [ ] Настроить **CSP** заголовки
- [ ] Добавить **rate limiting**
- [ ] Реализовать **аутентификацию**

### 📈 Мониторинг
- [ ] Добавить **Sentry** для отслеживания ошибок
- [ ] Настроить **Google Analytics**
- [ ] Добавить **метрики производительности**
- [ ] Реализовать **логирование**

---

## 📦 Зависимости

### Production
- **react**: ^19.0.0
- **react-dom**: ^19.0.0
- **react-redux**: ^9.1.2
- **@reduxjs/toolkit**: ^2.2.7
- **i18next**: ^23.15.1

### Development
- **@babel/core**: ^7.26.9
- **@types/react**: ^19.0.9
- **@types/react-dom**: ^19.0.3
- **eslint**: ^9.20.1
- **sass**: ^1.85.0
- **typescript**: ^5.7.3
- **webpack**: ^5.98.0

---

## 📄 Лицензия

ISC

## 👥 Автор

Проект создан в рамках тестового задания для Nilsen.