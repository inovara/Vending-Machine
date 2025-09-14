import { QueryClient, QueryClientConfig } from '@tanstack/react-query';
import { ApiError, ApiResponse } from '../types';

// Enhanced error handler with proper typing
const onErrorHandler = (error: unknown): void => {
  const apiError = error as ApiError;
  console.error('Query Error:', apiError);
  
  const status = apiError.status;
  
  // Handle authentication errors
  if (status === 401) {
    // Clear invalid token
    localStorage.removeItem("token");
    // Optionally show login prompt
    console.warn('Authentication required. Please login again.');
    return;
  }

  // Handle validation errors
  if (apiError.validation && apiError.validation.length > 0) {
    console.error('Validation errors:', apiError.validation);
    return;
  }

  // Handle client errors (4xx)
  if (status && status >= 400 && status < 500) {
    console.error('Client error:', apiError.message);
    return;
  }

  // Handle server errors (5xx)
  if (status && status >= 500) {
    console.error('Server error:', apiError.message);
    return;
  }

  // Handle network errors
  if (!status) {
    console.error('Network error:', apiError.message);
    return;
  }
};

// Enhanced success handler
const onSuccessHandler = (data: unknown): void => {
  const apiResponse = data as ApiResponse;
  if (import.meta.env.DEV) {
    console.log('Query Success:', apiResponse);
  }

  // Handle validation errors in success response
  if (apiResponse.validation && apiResponse.validation.length > 0) {
    console.warn('Validation warnings:', apiResponse.validation);
  }
};

// Mutation success handler
const onMutationSuccessHandler = (data: unknown): void => {
  const apiResponse = data as ApiResponse;
  if (import.meta.env.DEV) {
    console.log('Mutation Success:', apiResponse);
  }

  // Show success message if available
  if (apiResponse.message && apiResponse.code === 200) {
    // You can integrate with your notification system here
    console.log('Success:', apiResponse.message);
  }

  // Handle validation errors
  if (apiResponse.validation && apiResponse.validation.length > 0) {
    console.error('Validation errors:', apiResponse.validation);
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
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
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
