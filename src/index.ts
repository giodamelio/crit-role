import Koa from 'koa';
import Router from '@koa/router';
import helmet from 'koa-helmet';
import koaPinoLogger from 'koa-pino-logger';

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

router.get('/random', async (ctx: Koa.ParameterizedContext) => {
  await ctx.render('random_number.njk', { number: Math.random() });
});

app.use(errorMiddleware);
app.use(koaPinoLogger({ logger }));
app.use(helmet());
app.use(nunjucks('views'));

app.use(router.routes()).use(router.allowedMethods());

// Log when errors happen
app.on('error', (error: Error) => {
  logger.info(error);
});

app.listen(3141);
logger.info('App running on port: 3141');
