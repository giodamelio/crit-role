import Koa from 'koa';
import Router from '@koa/router';

import db from '../database';

const router = new Router({ prefix: '/debug' });

router.get('/tables', async (ctx: Koa.ParameterizedContext) => {
  const tables = await db.raw(
    "SELECT * FROM sqlite_master WHERE type = 'table'",
  );
  ctx.body = { tables };
});

export default router;
