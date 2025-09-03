import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export function buildForkTsCheckerWebpackPlugin() {
  return new ForkTsCheckerWebpackPlugin({
    typescript: {
      diagnosticOptions: {
        semantic: true,
        syntactic: true,
      },
      mode: "write-references",
    },
  });
}
