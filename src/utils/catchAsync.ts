import { ApiError } from '../services/types';

// Generic async function type
type AsyncFunction<T extends any[], R> = (...args: T) => Promise<R>;

// Enhanced catchAsync with proper typing and error handling
const catchAsync = <T extends any[], R>(
  callback: AsyncFunction<T, R>
): AsyncFunction<T, R> => {
  return async (...args: T): Promise<R> => {
    try {
      return await callback(...args);
    } catch (error) {
      // Enhanced error logging
      console.error('Async function error:', {
        function: callback.name || 'anonymous',
        args: args.length > 0 ? args : 'no arguments',
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });

      // Re-throw with proper typing
      throw error;
    }
  };
};

export default catchAsync;
