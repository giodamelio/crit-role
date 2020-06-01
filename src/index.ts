import { randomBytes } from 'crypto';
import { promisify } from 'util';

import Koa from 'koa';
import Router from '@koa/router';
import helmet from 'koa-helmet';
import koaPinoLogger from 'koa-pino-logger';
import bodyparser from 'koa-bodyparser';

import rootLogger from './logger';
import { error as errorMiddleware, nunjucks } from './middleware';
import db, { setupDatabase } from './database';

async function main(): Promise<void> {
  // Setup the database
  await setupDatabase();

  const app = new Koa();
  const router = new Router();

  router.get('/', (ctx: Koa.ParameterizedContext) => {
    ctx.body = 'Hello World';
  });

  router.post('/ping', (ctx: Koa.ParameterizedContext) => {
    ctx.body = { response: 'pong' };
  });

  router.get('/tables', async (ctx: Koa.ParameterizedContext) => {
    const tables = await db.raw(
      "SELECT * FROM sqlite_master WHERE type = 'table'",
    );
    ctx.body = { tables };
  });

  router.get('/people', async (ctx: Koa.ParameterizedContext) => {
    const people = await db.select('*').from('people');
    ctx.body = { people };
  });

  const randomBytesPromise = promisify(randomBytes);
  router.get('/random', async (ctx: Koa.ParameterizedContext) => {
    const len = Number(ctx.request.query.len || 16);
    const number = (await randomBytesPromise(len)).toString('hex');
    await ctx.render('random_number.njk', { number });
  });

  app.use(errorMiddleware);
  app.use(koaPinoLogger({ logger: rootLogger.child({ step: 'request' }) }));
  app.use(helmet());
  app.use(bodyparser());
  app.use(nunjucks('views'));

  app.use(router.routes()).use(router.allowedMethods());

  // Log when errors happen
  app.on('error', (error: Error) => {
    rootLogger.info({ step: 'koa-error', error });
  });

  app.listen(3141);
  rootLogger.info('App running on port: 3141');
}

main().catch((error) => {
  rootLogger.fatal(
    { step: 'unhandled-error', error },
    'Unhandled error: %s',
    error.message,
  );
  process.exit(1);
});
