import * as dotenv from "dotenv";
import path from "path";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export { and, desc, eq, sql } from "drizzle-orm";

/**
 * ✅ Load env (monorepo safe)
 */
dotenv.config({
  path: path.resolve(process.cwd(), "../../.env"),
});

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined");
}

/**
 * ✅ Detect environment
 */
const isProduction = process.env.NODE_ENV === "production";

/**
 * ✅ Global caching (for dev hot reload)
 */
const globalForDatabase = globalThis as typeof globalThis & {
  __tracpy_db__?: ReturnType<typeof drizzle<typeof schema>>;
  __tracpy_pool__?: Pool;
};

/**
 * ✅ Create pool
 */
export const pool =
  globalForDatabase.__tracpy_pool__ ??
  new Pool({
    connectionString: process.env.DATABASE_URL,

    // 🔥 FIX: Only enable SSL in production
    ...(isProduction && {
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  });

/**
 * ✅ Create drizzle instance
 */
export const db =
  globalForDatabase.__tracpy_db__ ??
  drizzle(pool, {
    schema,
  });

/**
 * ✅ Cache in dev
 */
if (!isProduction) {
  globalForDatabase.__tracpy_pool__ = pool;
  globalForDatabase.__tracpy_db__ = db;
}

/**
 * ✅ Test connection
 */
pool
  .query("select 1")
  .then(() => {
    console.log("🟢 DB connected");
  })
  .catch((err) => {
    console.error("🔴 DB connection failed:", err);
  });

export * from "./schema";
