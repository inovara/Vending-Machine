// Service exports
export { default as axiosInstance } from './axiosInstance';
export { default as queryClient } from './react-query/queryClient';
export { default as QueryProvider } from './react-query/index';
export { default as store, persistor } from './store/configureStore';
export { default as rootReducer } from './store/rootReducer';

// Store actions
export * from './store/slices/cartSlice';
export * from './store/slices/userSlice';

// User storage (explicit exports to avoid conflicts)
export { 
  getUser, 
  setUser, 
  getToken, 
  setToken,
  clearUser as clearStoredUser,
  clearToken as clearStoredToken,
  clearAuth as clearAllStoredData,
  isAuthenticated,
  isTokenValid,
  getSessionInfo
} from './user-storage/index';

// Types (explicit exports to avoid conflicts)
export * from './types';
export type { 
  CartItem,
  CartState,
  UserState,
  RootState,
  AppDispatch,
  Action,
  CartActions,
  UserActions
} from './store/types';

// Query keys
export { queryKeys } from './react-query/queryKeys';

// Service configuration
export const serviceConfig = {
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.inovara.net/api/v1/client",
    timeout: 10000,
    retries: 3,
  },
  storage: {
    userKey: "user-data",
    tokenKey: "access-token",
    refreshTokenKey: "refresh-token",
  },
  query: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  },
  redux: {
    persistKey: 'root',
    whitelist: ['cart', 'user'],
  },
} as const;
