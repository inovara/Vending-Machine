/**
 * Environment Configuration
 * Centralized environment variable management with type safety
 */

// Environment types
type Environment = 'development' | 'production' | 'staging' | 'test';

// Environment configuration interface
interface EnvConfig {
  NODE_ENV: Environment;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;
  API_BASE_URL: string;
  API_TIMEOUT: number;
  APP_NAME: string;
  APP_VERSION: string;
  ENABLE_ANALYTICS: boolean;
  ENABLE_DEBUG_LOGS: boolean;
  CACHE_TIME: number;
  STALE_TIME: number;
  ENABLE_CSRF_PROTECTION: boolean;
  SESSION_TIMEOUT: number;
}

// Get current environment
const getEnvironment = (): Environment => {
  const env = import.meta.env.MODE as Environment;
  return ['development', 'production', 'staging', 'test'].includes(env) ? env : 'production';
};

// Environment-specific configurations
const configs: Record<Environment, Partial<EnvConfig>> = {
  development: {
    API_BASE_URL: 'https://api.inovara.net/api/v1/client',
    API_TIMEOUT: 15000,
    APP_NAME: 'Inovara Vending Machine (Dev)',
    ENABLE_ANALYTICS: false,
    ENABLE_DEBUG_LOGS: true,
    CACHE_TIME: 300000, // 5 minutes
    STALE_TIME: 60000, // 1 minute
    ENABLE_CSRF_PROTECTION: false,
    SESSION_TIMEOUT: 7200000, // 2 hours
  },
  staging: {
    API_BASE_URL: 'https://staging-api.inovara.net/api/v1/client',
    API_TIMEOUT: 12000,
    APP_NAME: 'Inovara Vending Machine (Staging)',
    ENABLE_ANALYTICS: true,
    ENABLE_DEBUG_LOGS: true,
    CACHE_TIME: 600000, // 10 minutes
    STALE_TIME: 300000, // 5 minutes
    ENABLE_CSRF_PROTECTION: true,
    SESSION_TIMEOUT: 3600000, // 1 hour
  },
  production: {
    API_BASE_URL: 'https://api.inovara.net/api/v1/client',
    API_TIMEOUT: 10000,
    APP_NAME: 'Inovara Vending Machine',
    ENABLE_ANALYTICS: true,
    ENABLE_DEBUG_LOGS: false,
    CACHE_TIME: 600000, // 10 minutes
    STALE_TIME: 300000, // 5 minutes
    ENABLE_CSRF_PROTECTION: true,
    SESSION_TIMEOUT: 3600000, // 1 hour
  },
  test: {
    API_BASE_URL: 'http://localhost:3001/api/v1/client',
    API_TIMEOUT: 5000,
    APP_NAME: 'Inovara Vending Machine (Test)',
    ENABLE_ANALYTICS: false,
    ENABLE_DEBUG_LOGS: false,
    CACHE_TIME: 0,
    STALE_TIME: 0,
    ENABLE_CSRF_PROTECTION: false,
    SESSION_TIMEOUT: 300000, // 5 minutes
  },
};

// Create environment configuration
const createEnvConfig = (): EnvConfig => {
  const env = getEnvironment();
  const envConfig = configs[env] || configs.production;
  
  return {
    NODE_ENV: env,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
    SSR: import.meta.env.SSR,
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || envConfig.API_BASE_URL!,
    API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || envConfig.API_TIMEOUT!,
    APP_NAME: import.meta.env.VITE_APP_NAME || envConfig.APP_NAME!,
    APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
    ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true' || envConfig.ENABLE_ANALYTICS!,
    ENABLE_DEBUG_LOGS: import.meta.env.VITE_ENABLE_DEBUG_LOGS === 'true' || envConfig.ENABLE_DEBUG_LOGS!,
    CACHE_TIME: Number(import.meta.env.VITE_CACHE_TIME) || envConfig.CACHE_TIME!,
    STALE_TIME: Number(import.meta.env.VITE_STALE_TIME) || envConfig.STALE_TIME!,
    ENABLE_CSRF_PROTECTION: import.meta.env.VITE_ENABLE_CSRF_PROTECTION === 'true' || envConfig.ENABLE_CSRF_PROTECTION!,
    SESSION_TIMEOUT: Number(import.meta.env.VITE_SESSION_TIMEOUT) || envConfig.SESSION_TIMEOUT!,
  };
};

// Export the environment configuration
export const env = createEnvConfig();

// Export individual environment checks for convenience
export const isDevelopment = env.DEV;
export const isProduction = env.PROD;
export const isStaging = env.NODE_ENV === 'staging';
export const isTest = env.NODE_ENV === 'test';

// Export commonly used environment variables
export const {
  API_BASE_URL,
  API_TIMEOUT,
  APP_NAME,
  APP_VERSION,
  ENABLE_ANALYTICS,
  ENABLE_DEBUG_LOGS,
  CACHE_TIME,
  STALE_TIME,
  ENABLE_CSRF_PROTECTION,
  SESSION_TIMEOUT,
} = env;

// Environment validation
export const validateEnvironment = (): void => {
  const requiredVars = ['API_BASE_URL', 'APP_NAME'];
  const missingVars = requiredVars.filter(varName => !env[varName as keyof EnvConfig]);
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};

// Initialize environment validation in development
if (isDevelopment) {
  validateEnvironment();
}
