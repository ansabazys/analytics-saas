import express from "express";
import cors from "cors";
import { env } from "@repo/config";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "auth-service",
  });
});

app.use("/auth", authRoutes);

app.listen(env.PORT, () => {
  console.log(`Auth service running on port ${env.PORT}`);
});
