# Описание работы скрипта

[resolveRoot.js](resolveRoot.js)

```js
const path = require('path');

module.exports = (...segments) => path.resolve(__dirname, '..', '..', ...segments);

```
Функция `resolveRoot` это `helper` с помощью которого мы первым аргументом получаем имя директории. Далее мы выходим на верхний уровень нашего проекта. И разворачиваем сегменты.

<hr/>

[index.js](index.js)

```js
const createTemplate = require('./templates/createTemplate');

const layer = process.argv[2];
const sliceName = process.argv[3];

const layers = ['features', 'entities', 'pages'];

if (!layer || !layers.includes(layer)) {
    throw new Error(`Укажите слой ${layers.join(' или ')}`);
}

if (!sliceName) {
    throw new Error('Укажите название слайса');
}

createTemplate(layer, sliceName);

```

В `layer` - получаю название переданного аргумента под индексом 2. Там содержится название слоя в котором я хочу сгенерировать директорию
В `sliceName` - получаю название переданного аргумента под индексом 3. В нем содержится название слоя который я хочу сгенерировать.

В массиве `layers` указываю названия слоев с которыми я буду работать.

Далее в условии проверяю. Если не передан слой или слой не содержится в массиве `layers`, то выбрасываю ошибку.

В следующем условии проверяю, передал ли пользователь название `slice` который нужно сгенерировать.

Если проверки пройдены передаю значения в функцию `createTemplate`.

<hr/>

[firstCharUpperCase.js](firstCharUpperCase.js)

```js
module.exports = (str) => str[0].toUpperCase() + str.slice(1);
```
Функция `firstCharUpperCase` так-же является `helper`, который возводит каждый первый символ в верхний регистр.
