const Koa = require('koa');
const Router = require('@koa/router');

const { nunjucks } = require('./middleware');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello World';
});

router.post('/ping', async (ctx) => {
  ctx.body = { response: 'pong' };
});

router.get('/random', async (ctx) => {
  ctx.render('random_number.njk', { number: Math.random() });
});

app.use(nunjucks);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3141);
console.log('App running on port: 3141');
