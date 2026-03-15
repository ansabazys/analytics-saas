import express from "express";
import cors from "cors";

import websiteRoutes from "./routes/websites.routes";
import organizationRoutes from "./routes/organization.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "analytics-api",
  });
});

app.use("/websites", websiteRoutes);
app.use("/organizations", organizationRoutes);

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`Analytics API running on port ${PORT}`);
});