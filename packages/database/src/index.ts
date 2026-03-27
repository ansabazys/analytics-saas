import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

export { and, desc, eq, sql } from "drizzle-orm";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL missing");
}

/**
 * 🔥 Neon HTTP client (NO TLS issues)
 */
const sql = neon(DATABASE_URL);

/**
 * ✅ Drizzle instance
 */
export const db = drizzle(sql, { schema });

/**
 * ✅ Test connection
 */
(async () => {
  try {
    const result = await sql`SELECT 1`;
    console.log("🟢 DB connected (Neon HTTP)");
  } catch (err) {
    console.error("🔴 DB connection failed:", err);
  }
})();

export * from "./schema";