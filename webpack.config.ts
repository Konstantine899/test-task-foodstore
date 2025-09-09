
import { BuildEnv, BuildPath } from './config/build/types/config';
import path from 'path';
import { buildWebpackProdConfig } from './config/build/webpack.prod.config';
import { buildWebpackDevConfig } from './config/build/webpack.dev.config';

export default (env: BuildEnv) => {
  const paths: BuildPath = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
  };

  const mode = env.mode || 'development';
  const isDev = mode === 'development';
  const PORT = env.port || 3000;

  if (isDev) {
    return buildWebpackDevConfig({
      mode: 'development',
      paths,
      isDev: true,
      port: PORT,
    });
  }

  return buildWebpackProdConfig({
    mode: 'production',
    paths,
    isDev: false,
    port: PORT,
  });
};
