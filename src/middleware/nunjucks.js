const nunjucks = require('nunjucks');

const nj = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));

// Convert the render function to return a promise
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

// The actual middleware
module.exports = async (ctx, next) => {
  // Add a render function for the routes to use
  ctx.render = async (templatePath, data) => {
    const rendered = await asyncRender(templatePath, data);
    ctx.type = 'html';
    ctx.body = rendered;
  }

  await next();
}