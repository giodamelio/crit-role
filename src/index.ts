import Koa from 'koa';
import helmet from 'koa-helmet';
import koaPinoLogger from 'koa-pino-logger';
import bodyparser from 'koa-bodyparser';

import rootLogger from './logger';
import { error as errorMiddleware, nunjucks } from './middleware';
import { setupDatabase } from './database';
import { api, ui, debug } from './router';

export default async function setupServer(): Promise<Koa> {
  // Setup the database
  await setupDatabase();

  const app = new Koa();

  app.use(errorMiddleware);
  app.use(koaPinoLogger({ logger: rootLogger.child({ step: 'request' }) }));
  app.use(helmet());
  app.use(bodyparser());
  app.use(nunjucks('views'));

  app.use(api.routes()).use(api.allowedMethods());
  app.use(ui.routes()).use(ui.allowedMethods());
  app.use(debug.routes()).use(debug.allowedMethods());

  // Log when errors happen
  app.on('error', (error: Error) => {
    rootLogger.info({ step: 'koa-error', error });
  });

  return app;
}
