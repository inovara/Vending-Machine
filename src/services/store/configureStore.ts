import { configureStore, Middleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import { RootState } from './types';

// Persist configuration
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user'], // Only persist cart and user data
  blacklist: [], // Don't persist any specific reducers
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Custom middleware for logging (development only)
const loggerMiddleware: Middleware = () => (next) => (action: unknown) => {
  if (import.meta.env.DEV) {
    const typedAction = action as { type: string; payload?: unknown };
    console.log('Redux Action:', typedAction.type, typedAction.payload);
  }
  return next(action);
};

// Configure store with proper typing
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: unknown) => {
    // @ts-expect-error - Redux Toolkit middleware typing is complex
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['_persist'],
      },
    }).concat(loggerMiddleware);
  },
  devTools: import.meta.env.DEV,
});

// Create persistor
export const persistor = persistStore(store);

export default store;

// Export types for use in components
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
