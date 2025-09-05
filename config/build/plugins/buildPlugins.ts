import webpack from "webpack";
import { BuildOptions } from "../types/config";
import { buildHtmlWebpackPlugin } from "./buildHtmlWebpackPlugin";
import { buildProgressPlugin } from "./buildProgressPlugin";
import { buildMiniCssExtractPlugin } from "./buildMiniCssExtractPlugin";
import { buildHotModuleReplacementPlugin } from "./buildHotModuleReplacementPlugin";
import { buildForkTsCheckerWebpackPlugin } from "./buildForkTsCheckerWebpackPlugin";
import { buildCopyWebpackPlugin } from "./buildCopyWebpackPlugin";

export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {
  return [
    buildProgressPlugin(),
    buildHtmlWebpackPlugin(options),
    buildMiniCssExtractPlugin(),
    buildHotModuleReplacementPlugin(),
    buildForkTsCheckerWebpackPlugin(),
    buildCopyWebpackPlugin(options),
  ];
}
