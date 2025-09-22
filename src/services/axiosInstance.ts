import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiError } from '../types/api';
import { API_BASE_URL, API_TIMEOUT, ENABLE_DEBUG_LOGS } from '../config/env';

// Create axios instance with proper typing
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

// Request interceptor with proper typing
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");
    const currentLanguage = localStorage.getItem('inovara-language') || 'en';

    if (config.headers) {
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      config.headers["Accept-Language"] = currentLanguage;
      config.headers["content-language"] = currentLanguage;
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Response interceptor with proper error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>): AxiosResponse<ApiResponse> => {
    // Log successful responses in development
    if (ENABLE_DEBUG_LOGS) {
      console.log(`API Success [${response.config.method?.toUpperCase()}] ${response.config.url}:`, response.data);
    }
    return response;
  },
  (error: AxiosError<ApiResponse>): Promise<AxiosError<ApiResponse>> => {
    const apiError: ApiError = {
      message: error.message || 'An unexpected error occurred',
      status: error.response?.status,
      code: error.code,
      validation: error.response?.data?.errors,
    };

    // Log critical errors only in development
    if (ENABLE_DEBUG_LOGS && error.response?.status && error.response.status >= 500) {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response.status,
        message: apiError.message,
      });
    }

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem("token");
      // Optionally redirect to login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(apiError);
  }
);

// Export typed axios instance
export default axiosInstance;
