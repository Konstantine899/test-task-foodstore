import webpack from 'webpack';
import { BuildOptions } from '../types/config';
import { buildBabelLoader } from './buildBabelLoader';
import { buildSvgLoader } from './buildSvgLoader';
import { buildFileLoader } from './buildFileLoader';

export function buildDevLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = buildSvgLoader();
  const fileLoader = buildFileLoader();
  const tsBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxBabelLoader = buildBabelLoader({ ...options, isTsx: true });

  // ✅ CSS лоадер для dev - только style-loader
  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      'style-loader', // ✅ Встраивает CSS в JS для HMR
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resourcePath: string) => resourcePath.includes('.module.'),
            localIdentName: '[path][name]__[local]--[hash:base64:5]', // ✅ Читаемые имена
          },
          sourceMap: true, // ✅ Source maps для CSS
        },
      },
      'sass-loader',
    ],
  };

  return [tsBabelLoader, tsxBabelLoader, svgLoader, fileLoader, cssLoader];
}