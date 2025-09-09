import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';
import { buildDevPlugins } from './plugins/buildDevPlugins';
import { buildDevLoaders } from './loaders/buildDevLoaders';

export function buildWebpackDevConfig(options: BuildOptions): webpack.Configuration {
  const { paths } = options;

  return {
    mode: 'development',
    entry: paths.entry,
    output: {
      filename: '[name].js',
      path: paths.build,
      clean: true,
      publicPath: '/',
    },
    plugins: buildDevPlugins(options),
    module: {
      rules: buildDevLoaders(options),
    },
    resolve: buildResolvers(),
    devtool: 'eval-cheap-module-source-map',
    devServer: buildDevServer(options),
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  };
}



