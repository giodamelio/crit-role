import nunjucks from 'nunjucks';
import Koa from 'koa';

// Convert the render function to return a promise
export function asyncRender(
  nunjucksEnvironment: nunjucks.Environment,
  templatePath: string,
  data: any
): Promise<string> {
  return new Promise((resolve, reject) => {
    nunjucksEnvironment.render(templatePath, data, (err, rendered) => {
      if (err) {
        return reject(err);
      }
      // Using Typescript non-null assertion operator (!) because
      // `rendered` will never be null if we get past the error check
      return resolve(rendered!);
    });
  });
}

export default function (viewsLocation: string) {
  const nj = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(viewsLocation)
  );

  // The actual middleware
  return async (ctx: Koa.ParameterizedContext, next: any) => {
    // Add a render function for the routes to use
    ctx.render = async (templatePath: string, data: any) => {
      const rendered = await asyncRender(nj, templatePath, data);
      ctx.type = 'html';
      ctx.body = rendered;
    };

    await next();
  };
}
