import Koa from 'koa';
import Router from '@koa/router';

const router = new Router({ prefix: '/' });

router.get('/', async (ctx: Koa.ParameterizedContext) => {
  await ctx.render('index.njk');
});

export default router;
