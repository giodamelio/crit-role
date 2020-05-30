import nunjucks from 'nunjucks';
import Koa from 'koa';

const nj = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));

// Convert the render function to return a promise
const asyncRender = (templatePath: string, data: any) => {
  return new Promise((resolve, reject) => {
    nj.render(templatePath, data, (err, rendered) => {
      if (err) {
        return reject(err);
      }
      return resolve(rendered);
    });
  });
};

// The actual middleware
export default async (ctx: Koa.ParameterizedContext, next: any) => {
  // Add a render function for the routes to use
  ctx.render = async (templatePath: string, data: any) => {
    const rendered = await asyncRender(templatePath, data);
    ctx.type = 'html';
    ctx.body = rendered;
  };

  await next();
};
