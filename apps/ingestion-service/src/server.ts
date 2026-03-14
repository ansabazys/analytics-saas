import express from "express";
import { env } from "@repo/config";
import PinoHttp from "pino-http";
import { logger } from "./utils/logger";

const app = express();

app.use(PinoHttp({ logger }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(env.PORT, () => {
  console.log(`Ingestion running on port ${env.PORT}`);
});
