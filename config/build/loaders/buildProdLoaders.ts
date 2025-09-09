import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from '../types/config';
import { buildBabelLoader } from './buildBabelLoader';
import { buildSvgLoader } from './buildSvgLoader';
import { buildFileLoader } from './buildFileLoader';

export function buildProdLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = buildSvgLoader();
  const fileLoader = buildFileLoader();
  const tsBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxBabelLoader = buildBabelLoader({ ...options, isTsx: true });

  //  CSS лоадер для prod - с MiniCssExtractPlugin
  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      MiniCssExtractPlugin.loader, //  Извлекает CSS в отдельные файлы
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resourcePath: string) => resourcePath.includes('.module.'),
            localIdentName: '[hash:base64:8]', //  Короткие имена для prod
          },
          sourceMap: false, //  Без source maps для CSS в prod
        },
      },
      'sass-loader',
    ],
  };

  return [tsBabelLoader, tsxBabelLoader, svgLoader, fileLoader, cssLoader];
}