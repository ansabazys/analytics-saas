import { z } from "zod";

/**
 * ❌ DO NOT load dotenv here
 * Env is already loaded in server.ts
 */

/**
 * Schema
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  REDIS_URL: z.string().optional(),
  API_SECRET: z.string().optional(),

  SERVICE_NAME: z.string().default("tracpy-service"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),

  // 🔐 JWT
  JWT_ACCESS_SECRET: z.string().min(1, "JWT_ACCESS_SECRET is required"),
  JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),

  ACCESS_TOKEN_EXPIRES: z.string().default("15m"),
  REFRESH_TOKEN_EXPIRES: z.string().default("7d"),
});

/**
 * Validate
 */
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;