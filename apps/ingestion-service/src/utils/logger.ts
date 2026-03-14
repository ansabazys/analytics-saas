import pino from "pino";
import { env } from "@repo/config";

export const logger = pino({
  level: env.LOG_LEVEL || "info",
  base: {
    service: "ingestion-api",
  },
  transport:
    env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: { colorize: true },
        }
      : undefined,
});
