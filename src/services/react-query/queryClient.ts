import { QueryClient, QueryClientConfig } from '@tanstack/react-query';
import { ApiError, ApiResponse } from '../../types/api';
import { ENABLE_DEBUG_LOGS, CACHE_TIME, STALE_TIME } from '../../config/env';

// Enhanced error handler with proper typing
const onErrorHandler = (error: unknown): void => {
  const apiError = error as ApiError;
  const status = apiError.status;
  
  // Handle authentication errors
  if (status === 401) {
    // Clear invalid token
    localStorage.removeItem("token");
    return;
  }

  // Log critical errors only in development
  if (ENABLE_DEBUG_LOGS) {
    if (apiError.validation && apiError.validation.length > 0) {
      console.error('Validation errors:', apiError.validation);
    } else if (status && status >= 500) {
      console.error('Server error:', apiError.message);
    } else if (!status) {
      console.error('Network error:', apiError.message);
    }
  }
};

// Enhanced success handler
const onSuccessHandler = (data: unknown): void => {
  const apiResponse = data as ApiResponse;
  
  // Handle validation errors in success response
  if (ENABLE_DEBUG_LOGS && (apiResponse as any).validation && (apiResponse as any).validation.length > 0) {
    console.warn('Validation warnings:', (apiResponse as any).validation);
  }
};

// Mutation success handler
const onMutationSuccessHandler = (data: unknown): void => {
  const apiResponse = data as ApiResponse;

  // Handle validation errors
  if (ENABLE_DEBUG_LOGS && (apiResponse as any).validation && (apiResponse as any).validation.length > 0) {
    console.error('Validation errors:', (apiResponse as any).validation);
  }
};

// Query client configuration with proper typing
const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const apiError = error as ApiError;
        // Don't retry on 4xx errors
        if (apiError.status && apiError.status >= 400 && apiError.status < 500) {
          return false;
        }
        // Retry up to 2 times for other errors
        return failureCount < 2;
      },
      onSuccess: onSuccessHandler,
      onError: onErrorHandler,
      networkMode: 'online',
      staleTime: STALE_TIME,
      cacheTime: CACHE_TIME,
    },
    mutations: {
      onSuccess: onMutationSuccessHandler,
      onError: onErrorHandler,
      networkMode: 'online',
      retry: false, // Don't retry mutations by default
    },
  },
};

// Create query client with configuration
const queryClient = new QueryClient(queryClientConfig);

export default queryClient;
