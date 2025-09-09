import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildProdPlugins } from './plugins/buildProdPlugins';
import { buildProdLoaders } from './loaders/buildProdLoaders';
import { buildResolvers } from './buildResolvers';

export function buildWebpackProdConfig(options: BuildOptions): webpack.Configuration {
  const { paths } = options;

  return {
    mode: 'production',
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash:8].js', //  Хеши для кеширования
      path: paths.build,
      clean: true,
      publicPath: '/test-task-foodstore/', //  Для GitHub Pages
      assetModuleFilename: 'assets/[hash][ext][query]', //  Оптимизация ассетов
    },
    plugins: buildProdPlugins(options),
    module: {
      rules: buildProdLoaders(options),
    },
    resolve: buildResolvers(),
    devtool: 'source-map', //  Отдельные source maps
    optimization: {
      //  Полная оптимизация для prod
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
      usedExports: true, //  Tree shaking
      sideEffects: false, //  Tree shaking для CSS
    },
    performance: {
      // Настройки производительности
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
}