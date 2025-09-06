import CopyPlugin from "copy-webpack-plugin";
import { BuildOptions } from "../types/config";

export function buildCopyWebpackPlugin(options: BuildOptions): CopyPlugin {
  return new CopyPlugin({
    patterns: [
      {
        from: options.paths.public,
        to: options.paths.build,
        globOptions: {
          ignore: ['**/index.html'],
        },
        noErrorOnMissing: true,
      },
    ],
  });
}
