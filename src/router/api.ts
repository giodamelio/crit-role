import Koa from 'koa';
import Router from '@koa/router';

import db from '../database';

const router = new Router({ prefix: '/api' });

router.get('/ping', (ctx: Koa.ParameterizedContext) => {
  ctx.body = { response: 'pong' };
});

router.get('/people', async (ctx: Koa.ParameterizedContext) => {
  const people = await db.select('*').from('people');
  ctx.body = { people };
});

export default router;
