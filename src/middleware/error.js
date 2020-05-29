module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Internal Server Error';

    ctx.app.emit('error', error, ctx);
  }
};
