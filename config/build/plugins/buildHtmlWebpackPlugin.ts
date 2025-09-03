import HTMLWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "../types/config";

export function buildHtmlWebpackPlugin(options: BuildOptions) {
  const { paths } = options;
  return new HTMLWebpackPlugin({
    template: paths.html,
  });
}
