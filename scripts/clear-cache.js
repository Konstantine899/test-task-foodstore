const path = require("path");
const { rm, existsSync } = require("fs");

const dirCache = path.resolve(__dirname, "..", "node_modules", ".cache");
if (!existsSync(dirCache)) {
  console.log(`Директории .cache не существует`);
}
if (existsSync(dirCache)) {
  rm(dirCache, { recursive: true, force: true }, (error) => {
    if (error) {
      console.log(`При удалении директории .cache возникла ошибка: ${error}`);
    }
    console.log(`Директория .cache удалена успешно`);
  });
}
