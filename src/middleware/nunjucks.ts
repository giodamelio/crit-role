import nunjucks from 'nunjucks';
import Koa from 'koa';

// Convert the render function to return a promise
export function asyncRender(
  nunjucksEnvironment: nunjucks.Environment,
  templatePath: string,
  // Ok to skip this lint because we don't need to assert any of the child keys
  // See: https://github.com/microsoft/TypeScript/issues/21732
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: object | undefined,
): Promise<string> {
  return new Promise((resolve, reject) => {
    nunjucksEnvironment.render(templatePath, data, (err, rendered) => {
      if (err) {
        return reject(err);
      }

      if (rendered === null) {
        return reject(new Error('Empty template'));
      }

      return resolve(rendered);
    });
  });
}

type KoaMiddleware = (
  ctx: Koa.ParameterizedContext,
  next: Koa.Next,
) => Promise<void>;

export default function nunjucksMiddlewareFactory(
  viewsLocation: string,
): KoaMiddleware {
  const nj = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(viewsLocation),
  );

  // The actual middleware
  return async (
    ctx: Koa.ParameterizedContext,
    next: Koa.Next,
  ): Promise<void> => {
    // Add a render function for the routes to use
    // Ok to skip this lint because we don't need to assert any of the child keys
    // See: https://github.com/microsoft/TypeScript/issues/21732
    // eslint-disable-next-line @typescript-eslint/ban-types
    ctx.render = async (
      templatePath: string,
      data: object | undefined,
    ): Promise<void> => {
      const rendered = await asyncRender(nj, templatePath, data);
      ctx.type = 'html';
      ctx.body = rendered;
    };

    await next();
  };
}
