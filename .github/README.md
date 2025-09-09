# GitHub Actions Workflows

Этот репозиторий использует GitHub Actions для автоматизации CI/CD процессов.

## Workflows

### 1. CI (Continuous Integration) - `.github/workflows/ci.yml`
- **Триггер:** Push и Pull Request в main/develop ветки
- **Задачи:**
  - Проверка TypeScript типов
  - Линтинг ESLint и Stylelint
  - Сборка для development и production

### 2. Deploy - `.github/workflows/deploy.yml`
- **Триггер:** Push в main ветку
- **Задачи:**
  - Проверка кода (lint + test)
  - Сборка для production
  - Деплой на GitHub Pages

## Настройка

### 1. Включить GitHub Pages
1. Перейти в Settings → Pages
2. Source: GitHub Actions
3. Сохранить настройки

### 2. Проверить права доступа
- Убедиться что у Actions есть права на запись в репозиторий
- Settings → Actions → General → Workflow permissions → Read and write permissions

### 3. Тестирование
- Создать Pull Request для тестирования CI
- Сделать push в main для тестирования деплоя

## Команды

```bash
# Ручной деплой (если нужно)
npm run deploy:manual

# Проверка локально
npm run lint:check
npm run build:prod
```

## Troubleshooting

### Проблема: Deploy не работает
- Проверить настройки GitHub Pages
- Убедиться что workflow файлы в правильной директории
- Проверить логи в Actions tab

### Проблема: Linting fails
- Запустить `npm run lint:all:fix` локально
- Проверить конфигурацию ESLint/Stylelint
