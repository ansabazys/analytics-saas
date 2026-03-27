import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import PinoHttp from "pino-http";
import { logger } from "./utils/logger";
import eventRoutes from "./routes/event.routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(PinoHttp({ logger }));
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", service: "ingestion-service" });
});

/* EVENT ROUTES */
app.use("/events", eventRoutes);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error(err);

  res.status(500).json({
    error: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Ingestion running on port ${PORT}`);
});
