import { randomBytes } from 'crypto';
import { promisify } from 'util';

import Koa from 'koa';
import Router from '@koa/router';
import helmet from 'koa-helmet';
import koaPinoLogger from 'koa-pino-logger';
import bodyparser from 'koa-bodyparser';

import logger from './logger';
import { error as errorMiddleware, nunjucks } from './middleware';

const app = new Koa();
const router = new Router();

router.get('/', (ctx: Koa.ParameterizedContext) => {
  ctx.body = 'Hello World';
});

router.post('/ping', (ctx: Koa.ParameterizedContext) => {
  ctx.body = { response: 'pong' };
});

const randomBytesPromise = promisify(randomBytes);
router.get('/random', async (ctx: Koa.ParameterizedContext) => {
  const len = Number(ctx.request.query.len || 16);
  const number = (await randomBytesPromise(len)).toString('hex');
  await ctx.render('random_number.njk', { number });
});

app.use(errorMiddleware);
app.use(koaPinoLogger({ logger }));
app.use(helmet());
app.use(bodyparser());
app.use(nunjucks('views'));

app.use(router.routes()).use(router.allowedMethods());

// Log when errors happen
app.on('error', (error: Error) => {
  logger.info(error);
});

app.listen(3141);
logger.info('App running on port: 3141');
