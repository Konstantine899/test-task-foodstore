import webpack from 'webpack';
import { BuildOptions } from '../types/config';
import { buildHtmlWebpackPlugin } from './buildHtmlWebpackPlugin';
import { buildProgressPlugin } from './buildProgressPlugin';
import { buildHotModuleReplacementPlugin } from './buildHotModuleReplacementPlugin';
import { buildForkTsCheckerWebpackPlugin } from './buildForkTsCheckerWebpackPlugin';
import { buildCopyWebpackPlugin } from './buildCopyWebpackPlugin';

export function buildDevPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {
  return [
    buildProgressPlugin(), //  Прогресс сборки
    buildHtmlWebpackPlugin(options), //  HTML плагин
    buildHotModuleReplacementPlugin(), //  HMR для быстрой разработки
    buildForkTsCheckerWebpackPlugin(), //  Проверка типов в отдельном процессе
    buildCopyWebpackPlugin(options), //  Копирование статических файлов
    //  Dev-специфичные плагины
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(true), //  Глобальная переменная для dev
    }),
  ];
}