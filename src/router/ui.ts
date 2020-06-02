import Koa from 'koa';
import Router from '@koa/router';

const router = new Router({ prefix: '/' });

router.get('/', (ctx: Koa.ParameterizedContext) => {
  ctx.body = 'Hello World';
});

export default router;
