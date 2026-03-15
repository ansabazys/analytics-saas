import { Router } from "express";
import {
  getPageViews,
  getPageViewsByPage,
} from "./analytics.controller";

const router = Router();

router.get("/pageviews/:websiteId", getPageViews);
router.get("/pages/:websiteId", getPageViewsByPage);

export default router;