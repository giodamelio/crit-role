import { createMockContext } from '@shopify/jest-koa-mocks';

// Test subject
import { error } from '../../../src/middleware';

describe('Middleware', () => {
  describe('error', () => {
    it('Should catch an error', async () => {
      expect.assertions(4);

      // Setup mocks for context and children middleware
      const mockContext = createMockContext();
      const errorEventHandler = jest.fn();
      mockContext.app.on('error', errorEventHandler);
      const failingMiddleware = jest.fn(async () => {
        throw new Error('Hello World');
      });

      await error(mockContext, failingMiddleware);

      expect(failingMiddleware).toHaveBeenCalled();
      expect(errorEventHandler).toHaveBeenCalled();
      expect(mockContext.status).toBe(500);
      expect(mockContext.body).toBe('Internal Server Error');
    });

    it('Should pass silently with no errors', async () => {
      expect.assertions(3);

      // Setup mocks for context and children middleware
      const mockContext = createMockContext();
      const errorEventHandler = jest.fn();
      mockContext.app.on('error', errorEventHandler);
      const failingMiddleware = jest.fn(async () => {
        // Do nothing
      });

      await error(mockContext, failingMiddleware);

      expect(failingMiddleware).toHaveBeenCalled();
      expect(errorEventHandler).not.toHaveBeenCalled();
      expect(mockContext.status).toBe(404);
    });
  });
});
