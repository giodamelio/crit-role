import { createMockContext } from '@shopify/jest-koa-mocks';
import nj from 'nunjucks';

// Test subject
import nunjucks, { asyncRender } from '../../../src/middleware/nunjucks';

describe('Middleware', () => {
  describe('nunjucks', () => {
    it('Should render a simple template', async () => {
      expect.assertions(3);

      // Setup mocks for context and children middleware
      const mockContext = createMockContext();
      const noopMiddleware = jest.fn();

      // Run the middleware to add the `render` function to the context
      const nunjucksMiddleware = nunjucks('test/unit/middleware/views');
      await nunjucksMiddleware(mockContext, noopMiddleware);

      await mockContext.render('test.njk', { name: 'Roy Choi' });

      expect(noopMiddleware).toHaveBeenCalled();
      expect(mockContext.type).toBe('text/html');
      expect(mockContext.body).toBe('Hello Roy Choi!\n');
    });

    describe('asyncRender()', () => {
      it('Render a template', async () => {
        expect.assertions(2);

        const njMock = {
          render: jest.fn((_templatePath, _data, callback) => {
            callback(null, 'Hello!');
          }),
        };

        const rendered = await asyncRender(
          (njMock as unknown) as nj.Environment,
          'not_a_real_file.njk',
          {},
        );

        expect(rendered).toBe('Hello!');
        expect(njMock.render).toHaveBeenCalled();
      });

      it('Error during rendering', async () => {
        expect.assertions(2);

        const njMock = {
          render: jest.fn((_templatePath, _data, callback) => {
            callback(new Error('Cannot render'), null);
          }),
        };

        const renderPromise = asyncRender(
          (njMock as unknown) as nj.Environment,
          'not_a_real_file.njk',
          {},
        );

        await expect(renderPromise).rejects.toThrowError('Cannot render');
        expect(njMock.render).toHaveBeenCalled();
      });

      it('Empty template', async () => {
        expect.assertions(2);

        const njMock = {
          render: jest.fn((_templatePath, _data, callback) => {
            callback(null, null);
          }),
        };

        const renderPromise = asyncRender(
          (njMock as unknown) as nj.Environment,
          'not_a_real_file.njk',
          {},
        );

        await expect(renderPromise).rejects.toThrowError('Empty template');
        expect(njMock.render).toHaveBeenCalled();
      });
    });
  });
});
