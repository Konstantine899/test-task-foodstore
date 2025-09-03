import webpack from "webpack";

export function buildProgressPlugin() {
  return new webpack.ProgressPlugin();
}
