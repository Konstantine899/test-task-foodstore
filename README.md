# Test Task Foodstore

Современное React приложение для интернет-магазина еды с кастомной конфигурацией Webpack, TypeScript и полным набором инструментов для разработки. Проект использует архитектуру Feature-Sliced Design и реализует требования тестового задания по созданию адаптивной шапки с корзиной.

## 🚀 Технологический стек

### Основные технологии
- **React 19.0.0** - UI библиотека с новейшими возможностями
- **TypeScript 5.7.3** - строгая типизация
- **Webpack 5.98.0** - кастомная конфигурация сборки
- **SCSS** - препроцессор CSS с модулями

### Инструменты разработки
- **Babel** - транспиляция с поддержкой React 19
- **ESLint** - линтер с flat config и TypeScript поддержкой
- **Stylelint** - линтер для SCSS
- **Webpack Dev Server** - сервер разработки с HMR
- **Fork TS Checker** - проверка типов в отдельном процессе
- **GitHub Actions** - CI/CD пайплайн с автоматическим деплоем

## 🎯 Реализованные требования тестового задания

### ✅ Основные функции
- **Адаптивная шапка** с максимальной шириной 1300px и сужением до 1140px
- **Корзина с фиксированной шириной 375px** и плавным выезжанием справа
- **Анимация увеличения суммы** в корзине с 0 до 14500 тенге
- **Скролл-эффект шапки** при прокрутке на 200px
- **Выпадающие окна** для поиска и выбора языка
- **Адаптивность** для широких и узких экранов
- **Правильные иконки** корзины, поиска и меню

### 🎨 UI компоненты
- **Header** - адаптивная шапка с кнопками действий
- **CartSidebar** - боковая панель корзины с анимацией
- **SearchDropdown** - выпадающий поиск с автодополнением
- **LanguageToggle** - переключатель языков
- **ActionButton** - универсальная кнопка с поддержкой иконок

## 📁 Архитектура проекта

Проект следует принципам **Feature-Sliced Design**:

```
src/
├── app/                    # Инициализация приложения
│   ├── App.tsx            # Корневой компонент
│   └── store/             # Redux store
├── pages/                 # Страницы приложения
│   └── MainPage/          # Главная страница
├── widgets/               # Крупные UI блоки
│   ├── header/            # Шапка сайта
│   ├── CartSidebar/       # Боковая панель корзины
│   ├── ProductGrid/       # Сетка товаров
│   └── ProductSection/    # Секция товаров
├── entities/              # Бизнес-сущности
│   ├── cart/              # Корзина
│   ├── product/           # Товары
│   └── category/          # Категории
├── shared/                # Переиспользуемые ресурсы
│   ├── ui/               # UI компоненты
│   ├── lib/              # Утилиты и хуки
│   └── assets/           # Статические ресурсы
├── global.d.ts           # Глобальные типы
└── index.tsx             # Точка входа
```

## ⚙️ Конфигурация

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

## 🛠️ Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build:prod
```
## 🚀 Деплой и CI/CD

### GitHub Actions
Проект настроен для автоматического деплоя через GitHub Actions:

- **Автоматическая сборка** при push в main ветку
- **Проверка кода** - ESLint, TypeScript, SCSS линтеры
- **Деплой на GitHub Pages** - автоматическая публикация
- **Кеширование зависимостей** - ускорение сборки

### Ручной деплой
```bash
# Сборка проекта
npm run build:prod

# Деплой на GitHub Pages
npm run deploy

# Или через GitHub Actions
git push origin main
```

### Environment Variables
Для продакшена настройте переменные окружения:
- `NODE_ENV=production`
- `PUBLIC_URL` - базовый URL приложения

## 🔧 Вспомогательные скрипты

### Утилиты разработки

#### `clear-cache.js`
Очищает кеш Webpack из `node_modules/.cache`. Использует Node.js API для рекурсивного удаления.

```bash
node scripts/clear-cache.js
```

#### `generate-visual-json-report.js`
Генерирует JSON отчет для визуального тестирования Loki. Анализирует `.loki/difference` и создает структурированный отчет.

### Генератор слайсов (`createSlice/`)

Мощный инструмент для автоматизации создания новых слайсов в архитектуре Feature-Sliced Design.

#### Использование
```bash
node scripts/createSlice/index.js <layer> <sliceName>
=======

## 🔧 Автоматизация разработки

### Генератор слайсов
Проект включает мощный инструмент для автоматического создания новых слайсов в архитектуре Feature-Sliced Design:

```bash
# Генерация нового слайса
npm run generate:slice <layer> <sliceName>

# Примеры:
npm run generate:slice features userProfile
npm run generate:slice entities order
npm run generate:slice pages checkout
>>>>>>> 83018e3011bee26e75b817b5d13ca6396798886c
```

**Параметры:**
- `layer` - слой архитектуры: `features`, `entities`, `pages`
- `sliceName` - название слайса в camelCase

**Генерируемая структура:**
```
src/<layer>/<sliceName>/
├── model/
│   ├── types/
│   │   └── <sliceName>Schema.ts      # TypeScript интерфейс
│   ├── slices/
│   │   └── <sliceName>Slice.ts       # Redux Toolkit slice
│   ├── selectors/                    # Селекторы
│   └── services/                     # API сервисы
├── ui/
│   └── <ComponentName>/
│       ├── <ComponentName>.tsx       # React компонент
│       ├── <ComponentName>.stories.tsx # Storybook story
│       └── <ComponentName>.module.scss # SCSS модуль
└── index.ts                          # Public API
```

### Дополнительные скрипты

```bash
# Очистка кеша Webpack
node scripts/clear-cache.js

# Обновление импортов на алиасы @/
npx ts-node scripts/refactoring/updateImports.ts

# Создание public API для shared/ui
npx ts-node scripts/refactoring/createPublicApiForSharedUi.ts
```

## 📦 Основные зависимости

- **React 19.0.0** - UI библиотека
- **TypeScript 5.7.3** - строгая типизация
- **Redux Toolkit** - управление состоянием
- **SCSS** - препроцессор CSS
- **Webpack 5** - сборщик модулей

## 🎯 Особенности реализации

### Анимации и эффекты
- **Плавная анимация корзины** с cubic-bezier easing
- **Анимированный счетчик** для отображения суммы в корзине
- **Скролл-эффект шапки** с изменением отступов
- **Hover-эффекты** для всех интерактивных элементов

### Адаптивность
- **Desktop**: корзина справа, контент сдвигается влево
- **Mobile**: корзина на весь экран, контент не сдвигается
- **Breakpoints**: 1300px → 1140px → 768px

### Технические решения
- **Redux Toolkit** для управления состоянием корзины
- **Custom hooks** для анимации счетчика
- **SCSS модули** для изолированных стилей
- **TypeScript** для строгой типизации
- **Headless UI** для доступных выпадающих списков

## 💡 Демонстрация навыков

### 🏗️ Архитектура и паттерны
- **Feature-Sliced Design** - современная архитектура для масштабируемых приложений
- **Custom Webpack конфигурация** - полный контроль над сборкой
- **Модульная система** - разделение на слои (app, pages, widgets, entities, shared)
- **Public API паттерн** - изолированные интерфейсы для каждого модуля

### ⚡ Производительность и оптимизация
- **React.memo** - предотвращение лишних ререндеров
- **useCallback/useMemo** - оптимизация функций и вычислений
- **Lazy loading** - асинхронная загрузка компонентов
- **Code splitting** - разделение кода на чанки
- **SCSS модули** - изолированные стили без конфликтов

### 🎨 UX/UI и доступность
- **Плавные анимации** с правильными easing функциями
- **Адаптивный дизайн** с мобильным подходом
- **Accessibility** - ARIA атрибуты, семантическая разметка
- **Keyboard navigation** - поддержка навигации с клавиатуры
- **Focus management** - правильное управление фокусом

### 🔧 Инструменты разработки
- **TypeScript** - строгая типизация с zero any
- **ESLint + Stylelint** - автоматическая проверка кода
- **Custom scripts** - автоматизация рутинных задач
- **Path aliases** - удобные импорты через @/
- **Hot Module Replacement** - быстрая разработка

### 📱 Современные технологии
- **React 19** - новейшие возможности React
- **Redux Toolkit** - современное управление состоянием
- **Headless UI** - доступные компоненты
- **SVG как React компоненты** - через @svgr/webpack
- **CSS-in-JS альтернатива** - SCSS модули с TypeScript

### 🚀 DevOps и автоматизация
- **Webpack 5** - современный сборщик с оптимизациями
- **Babel** - транспиляция с поддержкой новых стандартов
- **Fork TS Checker** - проверка типов в отдельном процессе
- **Content hashing** - эффективное кеширование
- **Source maps** - удобная отладка

## 💻 Примеры кода

### Custom Hook для анимации
```typescript
// useAnimatedCounter - плавная анимация числовых значений
const { currentValue, isAnimating } = useAnimatedCounter(14500, {
  duration: 2000,
  easing: (t) => t * t * (3 - 2 * t), // easeInOutQuad
});
```

### Redux Toolkit Slice
```typescript
// Современное управление состоянием
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});
```

### SCSS модули с TypeScript
```scss
// Изолированные стили с поддержкой TypeScript
.sidebar {
  position: fixed;
  width: 375px;
  transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.open {
    right: 0;
  }
}
```

### Адаптивный дизайн
```scss
// Mobile-first подход с четкими breakpoints
.container {
  max-width: 1300px;
  
  @media (width <= 1200px) {
    max-width: 1140px;
  }
  
  @media (width <= 768px) {
    padding: 16px 12px;
  }
}
```

## 🚀 Деплой и CI/CD

### GitHub Actions
Проект настроен для автоматического деплоя через GitHub Actions:

- **Автоматическая сборка** при push в main ветку
- **Проверка кода** - ESLint, TypeScript, SCSS линтеры
- **Деплой на GitHub Pages** - автоматическая публикация
- **Кеширование зависимостей** - ускорение сборки

### Ручной деплой
```bash
# Сборка проекта
npm run build:prod

# Деплой на GitHub Pages
npm run deploy

# Или через GitHub Actions
git push origin main
```

## 🔮 Возможные улучшения

- Добавление тестов (Jest, React Testing Library)
- Настройка Storybook для компонентов
- Добавление PWA функциональности
- Интеграция с API
- Добавление Docker конфигурации
- Интеграция с Redux Toolkit Query
- Добавление интернационализации (i18n)

## 📄 Лицензия

ISC

## 👥 Автор

Проект создан в рамках тестового задания для foodstore.