import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiError } from './types';

// Create axios instance with proper typing
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.inovara.net/api/v1/client",
  timeout: 10000,
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
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with proper error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>): AxiosResponse<ApiResponse> => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log(`API Success [${response.config.method?.toUpperCase()}] ${response.config.url}:`, response.data);
    }
    return response;
  },
  (error: AxiosError<ApiResponse>): Promise<AxiosError<ApiResponse>> => {
    const apiError: ApiError = {
      message: error.message || 'An unexpected error occurred',
      status: error.response?.status,
      code: error.code,
      validation: error.response?.data?.validation || error.response?.data?.errors,
    };

    // Log errors
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: apiError.message,
      validation: apiError.validation,
    });

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
