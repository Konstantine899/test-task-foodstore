import { ResolveOptions } from "webpack";
import path from "path";

export function buildResolvers(): ResolveOptions {
  return {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "..", "..", "src"),
      "@/shared": path.resolve(__dirname, "..", "..", "src", "shared"),
      "@/entities": path.resolve(__dirname, "..", "..", "src", "entities"),
      "@/features": path.resolve(__dirname, "..", "..", "src", "features"),
      "@/widgets": path.resolve(__dirname, "..", "..", "src", "widgets"),
      "@/app": path.resolve(__dirname, "..", "..", "src", "app"),
      "@/pages": path.resolve(__dirname, "..", "..", "src", "pages"),
    }
  };
}
