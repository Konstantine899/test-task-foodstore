import webpack from "webpack";
import { BuildOptions } from "../types/config";
import { buildBabelLoader } from "./buildBabelLoader";
import { buildCssLoader } from "./buildCssLoader";
import { buildSvgLoader } from "./buildSvgLoader";
import { buildFileLoader } from "./buildFileLoader";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = buildSvgLoader();
  const fileLoader = buildFileLoader();
  const tsBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxBabelLoader = buildBabelLoader({ ...options, isTsx: true });
  const cssLoader = buildCssLoader(options);

  return [tsBabelLoader, tsxBabelLoader, svgLoader, fileLoader, cssLoader];
}
