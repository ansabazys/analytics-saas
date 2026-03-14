import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "@repo/config";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const adapter = new PrismaPg(pool);

console.log(process.env.DATABASE_URL);

export const db = new PrismaClient({
  adapter,
});
