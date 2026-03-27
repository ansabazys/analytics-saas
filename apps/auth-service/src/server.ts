import * as dotenv from "dotenv";

// ✅ Load env from SAME folder (auth-service)
dotenv.config();

console.log("ENV:", process.env.DATABASE_URL ? "✔️ loaded" : "❌ missing");

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});