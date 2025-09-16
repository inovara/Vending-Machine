// Service exports
export { default as axiosInstance } from './axiosInstance';
export { default as queryClient } from './react-query/queryClient';
export { default as QueryProvider } from './react-query/index';

// Query keys
export { queryKeys } from './react-query/queryKeys';

// Service configuration
export const serviceConfig = {
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.inovara.net/api/v1/client",
    timeout: 10000,
    retries: 3,
  },
  query: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  },
} as const;
