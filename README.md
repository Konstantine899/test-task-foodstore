# Test Task Nilsen

React приложение с настройкой Webpack, TypeScript и современными инструментами разработки.

## Описание проекта

Современное React приложение с кастомной конфигурацией Webpack, поддержкой TypeScript, SCSS модулей и полным набором инструментов для разработки.

## Технологический стек

### Основные технологии
- **React 19.0.0** - UI библиотека
- **TypeScript 5.7.3** - типизация
- **Webpack 5.98.0** - сборщик модулей
- **SCSS** - препроцессор CSS

### Инструменты разработки
- **Babel** - транспиляция JavaScript/TypeScript
- **ESLint** - линтер для JavaScript/TypeScript
- **Stylelint** - линтер для SCSS
- **Webpack Dev Server** - сервер разработки
- **Fork TS Checker** - проверка типов TypeScript

## Структура проекта

```
├── config/                    # Конфигурация сборки
│   └── build/
│       ├── loaders/          # Webpack лоадеры
│       ├── plugins/          # Webpack плагины
│       ├── types/            # Типы конфигурации
│       ├── buildDevServer.ts # Настройка dev сервера
│       ├── buildLoaders.ts   # Сборка лоадеров
│       ├── buildPlugins.ts   # Сборка плагинов
│       ├── buildResolvers.ts # Настройка резолверов
│       └── buildWebpackConfig.ts # Основная конфигурация
├── public/                   # Статические файлы
│   └── index.html
├── src/                      # Исходный код
│   ├── App/                  # Главный компонент
│   │   ├── App.tsx
│   │   └── App.module.scss
│   ├── global.d.ts          # Глобальные типы
│   └── index.tsx            # Точка входа
├── build/                    # Собранное приложение
├── babel.config.json        # Конфигурация Babel
├── eslint.config.mjs        # Конфигурация ESLint
├── tsconfig.json            # Конфигурация TypeScript
├── webpack.config.ts        # Конфигурация Webpack
└── package.json             # Зависимости и скрипты
```

## Конфигурация

### Webpack
- **Режимы сборки**: development/production
- **Лоадеры**: TypeScript, SCSS, файлы, SVG
- **Плагины**: HTML, CSS извлечение, HMR, прогресс
- **Dev Server**: настройка порта и HMR

### TypeScript
- **Target**: ES5
- **Module**: ESNext
- **JSX**: react-jsx (автоматический runtime)
- **Строгая типизация**: включена

### Babel
- **Presets**: env, react, typescript
- **React runtime**: automatic
- **Поддержка**: современный JavaScript и TypeScript

### ESLint
- **Конфигурация**: flat config
- **Плагины**: React, React Hooks, TypeScript
- **Правила**: рекомендуемые для React и TypeScript

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build:prod

# Сборка в режиме разработки
npm run start:dev

# Проверка SCSS
npm run lint:scss

# Исправление SCSS
npm run lint:scss:fix
```

## Особенности конфигурации

### Webpack Loaders
- **ts-loader** - компиляция TypeScript
- **babel-loader** - транспиляция с Babel
- **sass-loader** - обработка SCSS
- **css-loader** - обработка CSS
- **file-loader** - обработка файлов
- **@svgr/webpack** - обработка SVG как React компонентов

### Webpack Plugins
- **HtmlWebpackPlugin** - генерация HTML
- **MiniCssExtractPlugin** - извлечение CSS
- **HotModuleReplacementPlugin** - HMR
- **ForkTsCheckerWebpackPlugin** - проверка типов
- **ProgressPlugin** - прогресс сборки

### Типизация
- **Глобальные типы**: SCSS модули, SVG, изображения
- **Строгая типизация**: noImplicitAny
- **Модульная система**: ESNext с CommonJS для ts-node

## Структура сборки

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

## Зависимости

### Production
- **react**: ^19.0.0
- **react-dom**: ^19.0.0

### Development
- **@babel/core**: ^7.26.9
- **@types/react**: ^19.0.9
- **@types/react-dom**: ^19.0.3
- **eslint**: ^9.20.1
- **sass**: ^1.85.0
- **typescript**: ^5.7.3
- **webpack**: ^5.98.0

## Настройка окружения

### Переменные окружения
- **mode**: development/production
- **port**: порт для dev сервера (по умолчанию 3000)

### Пути
- **entry**: src/index.tsx
- **build**: build/
- **html**: public/index.html

## Рекомендации по разработке

1. **Структура компонентов**: используйте SCSS модули
2. **Типизация**: строгая типизация TypeScript
3. **Линтинг**: регулярно проверяйте код ESLint и Stylelint
4. **SVG**: используйте как React компоненты через @svgr
5. **Стили**: SCSS модули для изоляции стилей

## Возможные улучшения

- Добавление тестов (Jest, React Testing Library)
- Настройка Storybook для компонентов
- Добавление PWA функциональности
- Интеграция с API
- Настройка CI/CD
- Добавление Docker конфигурации
