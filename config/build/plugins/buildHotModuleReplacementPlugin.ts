import webpack from "webpack";

export function buildHotModuleReplacementPlugin() {
  return new webpack.HotModuleReplacementPlugin();
}
