import { User } from '../types';

// Storage keys
const USER_LOCALSTORAGE_KEY = "user-data";
const TOKEN_LOCALSTORAGE_KEY = "access-token";
const REFRESH_TOKEN_KEY = "refresh-token";

// Storage service interface
interface StorageService {
  getItem: <T>(key: string) => T | null;
  setItem: <T>(key: string, value: T) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

// Local storage implementation
const localStorageService: StorageService = {
  getItem: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item from localStorage for key "${key}":`, error);
      return null;
    }
  },

  setItem: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item in localStorage for key "${key}":`, error);
    }
  },

  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from localStorage for key "${key}":`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

// User storage functions with proper typing and error handling
export const getUser = (): User | null => {
  return localStorageService.getItem<User>(USER_LOCALSTORAGE_KEY);
};

export const setUser = (user: User): void => {
  localStorageService.setItem(USER_LOCALSTORAGE_KEY, user);
};

export const clearUser = (): void => {
  localStorageService.removeItem(USER_LOCALSTORAGE_KEY);
};

// Token storage functions
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token);
};

export const clearToken = (): void => {
  localStorageService.removeItem(TOKEN_LOCALSTORAGE_KEY);
};

// Refresh token functions
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const clearRefreshToken = (): void => {
  localStorageService.removeItem(REFRESH_TOKEN_KEY);
};

// Auth state management
export const isAuthenticated = (): boolean => {
  const token = getToken();
  const user = getUser();
  return !!(token && user);
};

export const clearAuth = (): void => {
  clearUser();
  clearToken();
  clearRefreshToken();
};

// Token validation
export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    // Decode JWT token (basic validation)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

// Session management
export const getSessionInfo = (): { user: User | null; token: string | null; isValid: boolean } => {
  const user = getUser();
  const token = getToken();
  const isValid = isTokenValid();

  return { user, token, isValid };
};

// Storage utilities
export const getStorageSize = (): number => {
  let total = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
};

export const clearExpiredData = (): void => {
  // Clear data if token is expired
  if (!isTokenValid()) {
    clearAuth();
  }
};

// Export storage service for testing
export { localStorageService };