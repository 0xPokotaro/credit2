/**
 * Server-side Environment Variables Configuration
 *
 * This module provides type-safe access to server-side only environment variables.
 * These variables do NOT have the NEXT_PUBLIC_ prefix and are only available on the server.
 *
 * IMPORTANT: Never import this file in client-side code (components, hooks, etc.)
 */

/**
 * Server-side environment variable interface
 */
export interface ServerEnv {
  // Node environment
  NODE_ENV: 'development' | 'production' | 'test';

  // Avalanche API configuration (server-side only)
  AVALANCHE_API_KEY?: string;
  NEXT_PUBLIC_SNOW_TRACE_API_KEY?: string;
}

/**
 * Optional server-side environment variables
 */
const OPTIONAL_SERVER_ENV_VARS = [
  'AVALANCHE_API_KEY',
  'NEXT_PUBLIC_SNOW_TRACE_API_KEY',
] as const;

/**
 * Validates and returns typed server-side environment variables
 *
 * @returns {ServerEnv} Validated and typed environment object
 */
function validateServerEnv(): ServerEnv {
  const warnings: string[] = [];

  // Validate NODE_ENV
  const nodeEnv = process.env.NODE_ENV;
  if (!nodeEnv || !['development', 'production', 'test'].includes(nodeEnv)) {
    throw new Error('NODE_ENV must be one of: development, production, test');
  }

  // Check optional variables and warn if missing
  for (const varName of OPTIONAL_SERVER_ENV_VARS) {
    if (!process.env[varName]) {
      warnings.push(`${varName} is not set (optional)`);
    }
  }

  // Log warnings in development
  if (warnings.length > 0 && nodeEnv === 'development') {
    console.warn('\n⚠️  Server Environment Variable Warnings:');
    warnings.forEach(warning => console.warn(`   - ${warning}`));
    console.warn('');
  }

  // Return typed environment object
  return {
    NODE_ENV: nodeEnv as 'development' | 'production' | 'test',
    AVALANCHE_API_KEY: process.env.AVALANCHE_API_KEY,
    NEXT_PUBLIC_SNOW_TRACE_API_KEY: process.env.NEXT_PUBLIC_SNOW_TRACE_API_KEY,
  };
}

/**
 * Validated and typed server-side environment variables
 *
 * Import this object to access server-side environment variables with type safety:
 * @example
 * import { serverEnv } from '@/config/env.server';
 * const apiKey = serverEnv.AVALANCHE_API_KEY;
 */
export const serverEnv = validateServerEnv();

/**
 * Utility function to check if running in production
 */
export const isProduction = () => serverEnv.NODE_ENV === 'production';

/**
 * Utility function to check if running in development
 */
export const isDevelopment = () => serverEnv.NODE_ENV === 'development';

/**
 * Utility function to check if running in test
 */
export const isTest = () => serverEnv.NODE_ENV === 'test';
