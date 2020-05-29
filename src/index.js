const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3141);
console.log('App running on port: 3141');
