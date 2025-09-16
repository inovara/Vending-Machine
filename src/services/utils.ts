import { ApiError, ApiResponse } from '../types/api';

// Error handling utilities
export class ServiceError extends Error {
  public status?: number;
  public code?: string;
  public validation?: string[];

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'ServiceError';
    this.status = error.status;
    this.code = error.code;
    this.validation = error.validation;
  }
}

// Response validation
export const validateApiResponse = <T>(response: ApiResponse<T>): T => {
  if (!response.success) {
    throw new ServiceError({
      message: response.message || 'API request failed',
      validation: response.errors || response.validation,
    });
  }
  return response.data;
};

// Retry utility
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }

      // Don't retry on client errors (4xx)
      if (error instanceof ServiceError && error.status && error.status >= 400 && error.status < 500) {
        throw error;
      }

      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
};

// Cache utilities
export const createCacheKey = (prefix: string, ...params: (string | number | boolean)[]): string => {
  return [prefix, ...params.map(String)].join(':');
};

// Debounce utility
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Format error message
export const formatErrorMessage = (error: ApiError): string => {
  if (error.validation && error.validation.length > 0) {
    return error.validation.join(', ');
  }
  return error.message || 'An unexpected error occurred';
};

// Check if error is network error
export const isNetworkError = (error: ApiError): boolean => {
  return !error.status && error.message?.includes('Network Error');
};

// Check if error is timeout
export const isTimeoutError = (error: ApiError): boolean => {
  return error.code === 'ECONNABORTED' || error.message?.includes('timeout');
};

// Service health check
export const checkServiceHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch('/health', { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Performance monitoring
export const measurePerformance = async <T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> => {
  const start = performance.now();
  
  try {
    const result = await fn();
    const end = performance.now();
    
    if (import.meta.env.DEV) {
      console.log(`Performance [${name}]: ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  } catch (error) {
    const end = performance.now();
    
    if (import.meta.env.DEV) {
      console.error(`Performance [${name}] failed after ${(end - start).toFixed(2)}ms:`, error);
    }
    
    throw error;
  }
};
