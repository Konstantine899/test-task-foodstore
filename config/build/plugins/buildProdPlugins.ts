import webpack from 'webpack';
import { BuildOptions } from '../types/config';
import { buildHtmlWebpackPlugin } from './buildHtmlWebpackPlugin';
import { buildProgressPlugin } from './buildProgressPlugin';
import { buildMiniCssExtractPlugin } from './buildMiniCssExtractPlugin';
import { buildForkTsCheckerWebpackPlugin } from './buildForkTsCheckerWebpackPlugin';
import { buildCopyWebpackPlugin } from './buildCopyWebpackPlugin';

export function buildProdPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {
  return [
    buildProgressPlugin(), // Прогресс сборки
    buildHtmlWebpackPlugin(options), // HTML плагин с оптимизацией
    buildMiniCssExtractPlugin(), // Извлечение CSS в отдельные файлы
    buildForkTsCheckerWebpackPlugin(), // Проверка типов
    buildCopyWebpackPlugin(options), // Копирование статических файлов
    // Prod-специфичные плагины
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(false), // Глобальная переменная для prod
    }),
    new webpack.BannerPlugin({
      banner: `Build time: ${new Date().toLocaleString()}`, // Время сборки
    }),
  ];
}