const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/', async ctx => {
  ctx.body = 'Hello World';
});

router.post('/ping', async ctx => {
  ctx.body = { response: 'pong' };
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3141);
console.log('App running on port: 3141');
