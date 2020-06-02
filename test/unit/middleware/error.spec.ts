import { createMockContext } from '@shopify/jest-koa-mocks';

// Test subject
import { error } from '../../../src/middleware';

describe('middleware', () => {
  describe('error', () => {
    it('should catch an error', async () => {
      expect.assertions(4);

      // Setup mocks for context and children middleware
      const mockContext = createMockContext();
      const errorEventHandler = jest.fn();
      const testError = new Error('Hello World');
      mockContext.app.on('error', errorEventHandler);
      const failingMiddleware = jest.fn(() => {
        throw testError;
      });

      await error(mockContext, failingMiddleware);

      expect(failingMiddleware).toHaveBeenCalledWith();
      expect(errorEventHandler).toHaveBeenCalledWith(testError, mockContext);
      expect(mockContext.status).toBe(500);
      expect(mockContext.body).toBe('Internal Server Error');
    });

    it('should pass silently with no errors', async () => {
      expect.assertions(3);

      // Setup mocks for context and children middleware
      const mockContext = createMockContext();
      const errorEventHandler = jest.fn();
      mockContext.app.on('error', errorEventHandler);
      const failingMiddleware = jest.fn(async () => {
        // Do nothing
      });

      await error(mockContext, failingMiddleware);

      expect(failingMiddleware).toHaveBeenCalledWith();
      expect(errorEventHandler).not.toHaveBeenCalled();
      expect(mockContext.status).toBe(404);
    });
  });
});
