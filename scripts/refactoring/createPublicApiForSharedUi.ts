// scripts/refactoring/createPublicApiForSharedUi.ts

import { Project } from 'ts-morph';
import path from 'path';

const project = new Project({});

// добавляю файлы исходного кода с которыми работаю
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// получаю все файлы проекта
const files = project.getSourceFiles();

const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui'); // путь выношу в отдельную переменную
const sharedUiDirectory = project.getDirectory(uiPath); // получаю директорию shared
const componentsDirs = sharedUiDirectory?.getDirectories(); // получаю массив директорий компонентов из shared/ui

componentsDirs?.forEach((directory) => {
  const indexFilePath = `${directory.getPath()}/index.ts`; // Получаю путь до index.ts
  const indexFile = directory.getSourceFile(indexFilePath); // получаю сам файл index.ts
  if (!indexFile) {
    const sourceCode = `export * from './${directory.getBaseName()}';`;
    const file = directory.createSourceFile(indexFilePath, sourceCode, {
      overwrite: true,
    });
    file.save(); // создаю файл в операционной системе
  }
});

function isAbsolute(value: string): boolean {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
  return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations(); // получаю массив imports
  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue(); // Получаю value из ImportDeclaration
    const valueWithoutAlias = value.replace('@/', ''); // избавляемся от alias

    const segments = valueWithoutAlias.split('/'); // получаю массив сегментов пути
    const isSharedLayer = segments?.[0] === 'shared'; // проверка на shared слой
    const isUiSlice = segments?.[1] === 'ui'; // проверка на ui

    if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
      const result = valueWithoutAlias.split('/').slice(0, 3).join('/'); // удаляю все после 3 индекса
      importDeclaration.setModuleSpecifier(`@/${result}`);
    }
  });
});

project.save();
