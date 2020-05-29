const Koa = require('koa');
const Router = require('@koa/router');
const nunjucks = require('nunjucks');

const app = new Koa();
const router = new Router();

router.get('/', async ctx => {
  ctx.body = 'Hello World';
});

router.post('/ping', async ctx => {
  ctx.body = { response: 'pong' };
});

router.get('/random', async ctx => {
  ctx.render('random_number.njk', { number: Math.random() })
})

// Setup Nunjucks rendering
const nj = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));
const asyncRender = (templatePath, data) => {
  return new Promise((resolve, reject) => {
    nj.render(templatePath, data, (err, rendered) => {
      if (err) {
        return reject(err);
      }
      return resolve(rendered);
    })
  })
}
app.use(async (ctx, next) => {
  // Add a render function for the routes to use
  ctx.render = async (templatePath, data) => {
    const rendered = await asyncRender(templatePath, data);
    ctx.type = 'html';
    ctx.body = rendered;
  }

  await next();
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3141);
console.log('App running on port: 3141');
