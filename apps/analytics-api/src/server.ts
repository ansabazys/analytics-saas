import express from "express";
import cors from "cors";

import websiteRoutes from "./modules/website/website.routes";
import organizationRoutes from "./modules/organization/organization.routes";
import membershipRoutes from "./modules/membership/membership.routes";
import analyticsRoutes from "./modules/analytics/analytics.routes";

import { errorHandler } from "./middleware/error.middleware";

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
app.use("/organizations", membershipRoutes);
app.use("/analytics", analyticsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`Analytics API running on port ${PORT}`);
});
