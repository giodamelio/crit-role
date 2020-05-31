import Koa from 'koa';

export default async (
  ctx: Koa.ParameterizedContext,
  next: Koa.Next
): Promise<void> => {
  try {
    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Internal Server Error';

    ctx.app.emit('error', error, ctx);
  }
};
