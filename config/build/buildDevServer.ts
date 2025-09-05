import { BuildOptions } from "./types/config";
import { Configuration } from "webpack-dev-server";

export function buildDevServer(options: BuildOptions): Configuration {
  return {
    port: options.port,
    open: true,
    hot: true,
    setupMiddlewares: (middlewares, devServer) => {
      // Middleware для задержки всех запросов
      devServer.app.use('*', (req, res, next) => {
        const startTime = Date.now();
        console.log(`[${new Date().toISOString()}] Запрос: ${req.method} ${req.url}`);
        console.log('Задержка 2 секунд...');
        
        setTimeout(() => {
          const duration = Date.now() - startTime;
          console.log(`Запрос обработан за ${duration}ms`);
          next();
        }, 2000);
      });
      
      return middlewares;
    }
  };
}
