/**
 * Client-side Environment Variables Configuration
 *
 * This module provides type-safe access to client-side environment variables.
 * All variables MUST have the NEXT_PUBLIC_ prefix to be accessible in the browser.
 *
 * Safe to import in any component, hook, or client-side code.
 */

/**
 * Client-side environment variable interface
 * All variables are prefixed with NEXT_PUBLIC_ for Next.js client-side access
 */
export interface ClientEnv {
  // XRPL Xaman wallet credentials
  XAMAN_API_KEY?: string;
  XAMAN_API_SECRET?: string;
}

/**
 * Optional client-side environment variables
 */
const OPTIONAL_CLIENT_ENV_VARS = [
  "NEXT_PUBLIC_XAMAN_API_KEY",
  "NEXT_PUBLIC_XAMAN_API_SECRET",
] as const;

/**
 * Validates and returns typed client-side environment variables
 *
 * @returns {ClientEnv} Validated and typed environment object
 */
function validateClientEnv(): ClientEnv {
  const warnings: string[] = [];

  // Check optional variables and warn if missing (only in development)
  if (process.env.NODE_ENV === "development") {
    for (const varName of OPTIONAL_CLIENT_ENV_VARS) {
      if (!process.env[varName]) {
        warnings.push(`${varName} is not set (optional)`);
      }
    }

    // Log warnings in development
    if (warnings.length > 0) {
      console.warn("\n⚠️  Client Environment Variable Warnings:");
      warnings.forEach((warning) => console.warn(`   - ${warning}`));
      console.warn("");
    }
  }

  // Return typed environment object (without NEXT_PUBLIC_ prefix in keys)
  return {
    XAMAN_API_KEY: process.env.NEXT_PUBLIC_XAMAN_API_KEY,
    XAMAN_API_SECRET: process.env.NEXT_PUBLIC_XAMAN_API_SECRET,
  };
}

/**
 * Validated and typed client-side environment variables
 *
 * Import this object to access client-side environment variables with type safety:
 * @example
 * import { clientEnv } from '@/config/env.client';
 * const apiKey = clientEnv.XAMAN_API_KEY;
 */
export const clientEnv = validateClientEnv();
