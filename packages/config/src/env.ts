import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  PORT: z
    .string()
    .transform((val) => Number(val))
    .default(4000),

  DATABASE_URL: z.string().optional(),

  REDIS_URL: z.string().optional(),

  API_SECRET: z.string().optional(),

  SERVICE_NAME: z.string().default("tracpy-service"),

  LOG_LEVEL: z
    .enum(["debug", "info", "warn", "error"])
    .default("info"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;