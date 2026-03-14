import express from "express";
import { env } from "@repo/config";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(env.PORT, () => {
  console.log(`Ingestion running on port ${env.PORT}`);
});