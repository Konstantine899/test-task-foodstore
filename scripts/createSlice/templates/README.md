[componentTemplate.js](componentTemplate.js)


```js
const interfaceConst = 'interface';

module.exports = (componentName) => `import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './${componentName}.module.scss';
import { memo } from 'react';

${interfaceConst} ${componentName}Props {
    className?: string;
}

export const ${componentName} = memo((props: ${componentName}Props) => {
    const { className } = props;
    const { t } = useTranslation();
    
    return (
        <div className={classNames(cls.${componentName}, {}, [className])}>
           
        </div>
    );
});`;

```

Содержит шаблон создаваемого компонента. Название компонента содержится в переменной `componentName`

<br/>
<hr/>

[createModel.js](createModel.js)

```js
const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const reduxSliceTemplate = require('./reduxSliceTemplate');
const schemaTypeTemplate = require('./schemaTypeTemplate');

module.exports = async (layer, sliceName) => {
    const resolveModelPath = (...segments) => resolveRoot('src', layer, sliceName, 'model', ...segments);

    const createModelStructure = async () => {
        try {
            await fs.mkdir(resolveModelPath());
            await fs.mkdir(resolveModelPath('types'));
            await fs.mkdir(resolveModelPath('slices'));
            await fs.mkdir(resolveModelPath('selectors'));
            await fs.mkdir(resolveModelPath('services'));
        } catch (e) {
            console.log(`Не удалось создать model сегмент для слайса ${sliceName}`, e);
        }
    };

    const createReduxSlice = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('slices', `${sliceName}Slice.ts`),
                reduxSliceTemplate(sliceName),
            );
        } catch (e) {
            console.log('Не удалось создать редакс слайс', e);
        }
    };

    const createSchemaType = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('types', `${sliceName}Schema.ts`),
                schemaTypeTemplate(sliceName),
            );
        } catch (e) {
            console.log('Не удалось создать тип схемы стейта', e);
        }
    };

    await createModelStructure();
    await createReduxSlice();
    await createSchemaType();
};

```
Данная функция первым аргументом принимает layer слой т.е. `'features', 'entities', 'pages'`.

Вторым аргументом принимает название директории т.е. `Article` и т.д.

Далее в переменной `resolveModelPath` с помощью `helper` `resolveRoot` указываю путь. Т.е. то место где будут генерироваться директории с файлами.

Далее в функции `createModelStructure` генерирую структуру директорий. Вызываем модуль `fs` и его метод `mkdir` с помощью которого мы и создаем директорию. Если мы просто вызываем функцию `resolveModelPath` без передачи в него `segments`, то мы сгенерируем структуру директорий. А именно `slice` который мы передали т.е. `'features', 'entities', 'pages'`. Далее название самого `slice` и в ней уже директорию `model`. Если какая-то из директорий существует, то создаваться новая не будет. Главное в первую очередь сгенерировать структуру директорий. Если мы начнем сразу передавать `segments`, то будут ошибки. Далее по очереди создаем сегменты т.е. вложенные директории `types` `slices` `selectors` `services`.

Только после создания структуры директорий создаю необходимые файлы в этих директориях. С помощью функции `createReduxSlice` создаю `redux` `slice`. С помощью модуля `fs` и его метода `writeFile` создаю файл. Первым аргументом указываю функцию `resolveModelPath`. В функции `resolveModelPath` первым аргументом передаю сегмент, т.е. та директория в которой нужно создать файл, а вторым аргументом название и расширение файла. Вторым аргументом `writeFile` принимает содержимое файла которым нужно заполнить созданный файл. Содержимое `redux` `slice` содержится в функции `reduxSliceTemplate`, в которую аргументом нужно передать название `slice`.

Далее по аналогии с `createReduxSlice`, в `createSchemaType` создаю схему.

Далее в строгом порядке вызываю функции `createModelStructure` `createReduxSlice` `createSchemaType`. Сначала создаю структуру директорий, потом необходимые файлы в директориях.

<br/>
<hr/>



[createPublicApi.js](createPublicApi.js)


```js
const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = async (layer, sliceName) => {
    const componentName = firstCharUpperCase(sliceName);
    const schemaName = `${sliceName}Schema`;

    try {
        await fs.writeFile(
            resolveRoot('src', layer, sliceName, 'sort.ts'),
            `export { ${componentName} } from './ui/${componentName}/${componentName}';
export { ${firstCharUpperCase(schemaName)} } from './model/types/${schemaName}';`,
        );
    } catch (e) {
        console.log('Не удалось создать PUBLIC API');
    }
};

```



Создается `public api` и экспортируются сам главный компонент и `schema` которая будет подключаться к глобальному `state`.

<br/>
<hr/>

[createTemplate.js](createTemplate.js)

```js
const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const createModel = require('./createModel');
const createUI = require('./createUI');
const createPublicApi = require('./createPublicApi');

module.exports = async (layer, sliceName) => {
    try {
        await fs.mkdir(resolveRoot('src', layer, sliceName));
    } catch (e) {
        console.log(`не удалось создать директорию для слайса${sliceName}`);
    }

    await createModel(layer, sliceName);
    await createUI(layer, sliceName);
    await createPublicApi(layer, sliceName);
};

```

Создаем слой. И с помощью функций `createModel` `createUI` `createPublicApi` заполняю содержимым директориями и файлами.

<br/>
<hr/>


[createUI.js](createUI.js)

```js
const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const firstCharUpperCase = require('../firstCharUpperCase');
const componentTemplate = require('./componentTemplate');
const storyTemplate = require('./storyTemplate');
const styleTemplate = require('./styleTemplate');

module.exports = async (layer, sliceName) => {
    const resolveUIPath = (...segments) => resolveRoot('src', layer, sliceName, 'ui', ...segments);

    const createUIDir = async () => {
        try {
            await fs.mkdir(resolveUIPath());
        } catch (e) {
            console.log('Не удалось создать UI директорию');
        }
    };

    const createComponent = async () => {
        try {
            const componentName = firstCharUpperCase(sliceName);
            await fs.mkdir(resolveUIPath(componentName));
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.tsx`),
                componentTemplate(componentName),
            );
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.stories.tsx`),
                storyTemplate(layer, componentName),
            );
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.module.scss`),
                styleTemplate(componentName),
            );
        } catch (e) {
            console.log('Не удалось создать компонент');
        }
    };

    await createUIDir();
    await createComponent();
};

```

Функцией `createUIDir` создаю `ui` директорию и далее в `createComponent` заполняю ее файлами с нужным содержимым.

<br/>
<hr/>


[reduxSliceTemplate.js](reduxSliceTemplate.js)

```js
const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = (sliceName) => {
    const typeName = `${firstCharUpperCase(sliceName)}Schema`;

    return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ${typeName} } from '../types/${sliceName}Schema';

const initialState: ${typeName} = {
    
};

export const ${sliceName}Slice = createSlice({
    name: '${sliceName}',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {
           
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: ${sliceName}Actions } = ${sliceName}Slice;
export const { reducer: ${sliceName}Reducer } = ${sliceName}Slice;`;
};

```

Шаблон `redux` `slice`.

<br/>
<hr/>


[schemaTypeTemplate.js](schemaTypeTemplate.js)

```js
const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = (sliceName) => `export interface ${firstCharUpperCase(sliceName)}Schema {
    
}`;

```

<br/>
<hr/>


[storyTemplate.js](storyTemplate.js)

```js
module.exports = (layer, componentName) => `import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ${componentName} } from './${componentName}';

export default {
    title: '${layer}/${componentName}',
    component: ${componentName},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ${componentName}>;

const Template: ComponentStory<typeof ${componentName}> = (args) => <${componentName} {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   
};`;

```

<br/>
<hr/>


[styleTemplate.js](styleTemplate.js)

```js
module.exports = (componentName) => `.${componentName} {

}`;

```

