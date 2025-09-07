# Test Task Nilsen

Современное React приложение с кастомной конфигурацией Webpack, TypeScript и полным набором инструментов для разработки. Проект использует архитектуру Feature-Sliced Design и включает мощные скрипты автоматизации.

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

## 📁 Архитектура проекта

Проект следует принципам **Feature-Sliced Design**:

```
src/
├── app/                    # Инициализация приложения
│   ├── App.tsx            # Корневой компонент
│   └── App.module.scss    # Глобальные стили
├── pages/                 # Страницы приложения
├── widgets/               # Крупные UI блоки
├── features/              # Бизнес-функциональность
├── entities/              # Бизнес-сущности
├── shared/                # Переиспользуемые ресурсы
│   ├── ui/               # UI компоненты
│   ├── lib/              # Утилиты
│   └── api/              # API слой
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
```

**Параметры:**
- `layer` - слой архитектуры: `features`, `entities`, `pages`
- `sliceName` - название слайса в camelCase (например: `article`, `userProfile`)

**Пример:**
```bash
node scripts/createSlice/index.js features article
```

#### Генерируемая структура
```
src/<layer>/<sliceName>/
├── model/
│   ├── types/
│   │   └── <sliceName>Schema.ts      # TypeScript интерфейс состояния
│   ├── slices/
│   │   └── <sliceName>Slice.ts       # Redux Toolkit slice
│   ├── selectors/                    # Селекторы (пустая директория)
│   └── services/                     # API сервисы (пустая директория)
├── ui/
│   └── <ComponentName>/              # Компонент с заглавной буквы
│       ├── <ComponentName>.tsx       # React компонент
│       ├── <ComponentName>.stories.tsx # Storybook story
│       └── <ComponentName>.module.scss # SCSS модуль
└── index.ts                          # Public API экспорты
```

#### Особенности шаблонов

**React компонент:**
- TypeScript интерфейс с `className?: string`
- Использует `memo` для оптимизации
- Интегрирован с `classNames` утилитой
- Поддержка i18n через `useTranslation`
- SCSS модули для стилизации

**Redux slice:**
- Redux Toolkit с типизированным состоянием
- Готовый шаблон reducer с PayloadAction
- Закомментированные extraReducers для async actions
- Экспорт actions и reducer

**Storybook story:**
- Настроенный для текущего слоя архитектуры
- TypeScript типизация
- Готовый шаблон с контролами

### Скрипты рефакторинга (`refactoring/`)

#### `updateImports.ts`
Автоматически обновляет импорты, добавляя алиас `@/` для абсолютных путей. Использует `ts-morph` для безопасного рефакторинга.

```bash
npx ts-node scripts/refactoring/updateImports.ts
```

#### `createPublicApiForSharedUi.ts`
Создает файлы `index.ts` для всех компонентов в `shared/ui` и обновляет импорты для использования public API.

```bash
npx ts-node scripts/refactoring/createPublicApiForSharedUi.ts
```

## 🎯 Workflow разработки

### Создание нового функционала
1. **Создание слайса**: `npm run generate:slice features newFeature`
2. **Разработка компонентов** в сгенерированной структуре
3. **Рефакторинг импортов**: `npx ts-node scripts/refactoring/updateImports.ts`

### Поддержка проекта
1. **Очистка кеша** при проблемах: `node scripts/clear-cache.js`
2. **Создание public API** для shared компонентов: `npx ts-node scripts/refactoring/createPublicApiForSharedUi.ts`
3. **Генерация отчетов** для визуального тестирования: `node scripts/generate-visual-json-report.js`

## 📦 Зависимости

### Production
- **react**: ^19.0.0
- **react-dom**: ^19.0.0

### Development
- **@babel/core**: ^7.26.9 - транспиляция
- **@types/react**: ^19.0.9 - типы React
- **@types/react-dom**: ^19.0.3 - типы React DOM
- **eslint**: ^9.20.1 - линтер
- **sass**: ^1.85.0 - препроцессор CSS
- **typescript**: ^5.7.3 - компилятор TypeScript
- **webpack**: ^5.98.0 - сборщик модулей
- **ts-morph**: используется в скриптах рефакторинга

## 🔍 Особенности конфигурации

### Webpack Loaders
- **ts-loader** - компиляция TypeScript
- **babel-loader** - транспиляция с Babel
- **sass-loader** - обработка SCSS
- **css-loader** - обработка CSS
- **file-loader** - обработка файлов
- **@svgr/webpack** - SVG как React компоненты

### Webpack Plugins
- **HtmlWebpackPlugin** - генерация HTML
- **MiniCssExtractPlugin** - извлечение CSS
- **HotModuleReplacementPlugin** - HMR
- **ForkTsCheckerWebpackPlugin** - проверка типов
- **ProgressPlugin** - прогресс сборки

### Типизация
- **Глобальные типы**: SCSS модули, SVG, изображения
- **Строгая типизация**: noImplicitAny
- **Path mapping**: алиасы для всех слоев архитектуры
- **Модульная система**: ESNext с CommonJS для ts-node

## 🚀 Режимы сборки

### Development
- **Source maps**: inline-source-map
- **HMR**: включен
- **Dev Server**: порт 3000
- **Оптимизация**: отключена

### Production
- **Source maps**: отключены
- **Минификация**: включена
- **Хеширование**: contenthash для кеширования
- **Очистка**: clean: true

## 📋 Рекомендации по разработке

1. **Архитектура**: следуйте принципам Feature-Sliced Design
2. **Структура компонентов**: используйте SCSS модули
3. **Типизация**: строгая типизация TypeScript
4. **Линтинг**: регулярно проверяйте код ESLint и Stylelint
5. **SVG**: используйте как React компоненты через @svgr
6. **Генерация кода**: используйте `generate:slice` для создания новых слайсов
7. **Рефакторинг**: применяйте скрипты рефакторинга для поддержания чистоты кода
8. **Импорты**: используйте алиасы `@/` для абсолютных путей

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

Проект создан в рамках тестового задания для Nilsen.