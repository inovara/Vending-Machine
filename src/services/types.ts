// Service Types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  validation?: string[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  code?: number;
  validation?: string[];
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  created_at: string;
  updated_at: string;
}

// UserState moved to store/types.ts to avoid conflicts

// Cart Types - moved to store/types.ts to avoid conflicts

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expires_at: string;
}

// Query Client Types
export interface QueryClientConfig {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: boolean;
      retry: number | boolean;
      networkMode: 'online' | 'always' | 'offlineFirst';
      onSuccess?: (data: unknown) => void;
      onError?: (error: ApiError) => void;
    };
    mutations: {
      onSuccess?: (data: unknown) => void;
      onError?: (error: ApiError) => void;
      networkMode?: 'online' | 'always' | 'offlineFirst';
    };
  };
}

// Storage Types
export interface StorageService {
  getItem: <T>(key: string) => T | null;
  setItem: <T>(key: string, value: T) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

// Axios Types
export interface AxiosConfig {
  baseURL: string;
  headers: {
    'Content-Type': string;
    withCredentials: boolean;
  };
}

export interface RequestInterceptor {
  onFulfilled: (config: any) => any;
  onRejected?: (error: any) => any;
}

export interface ResponseInterceptor {
  onFulfilled: (response: any) => any;
  onRejected: (error: any) => any;
}

// Error Types
export interface ErrorHandler {
  handle: (error: ApiError) => void;
  log: (error: ApiError) => void;
}

// Service Configuration
export interface ServiceConfig {
  api: {
    baseURL: string;
    timeout: number;
    retries: number;
  };
  storage: {
    userKey: string;
    tokenKey: string;
  };
  query: {
    staleTime: number;
    cacheTime: number;
    refetchOnWindowFocus: boolean;
  };
}
