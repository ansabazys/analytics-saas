import { Router } from "express";
import { getPageViews, getPageViewsByPage, getUniqueVisitors } from "./analytics.controller";

const router = Router();

router.get("/pageviews/:websiteId", getPageViews);
router.get("/pages/:websiteId", getPageViewsByPage);
router.get("/visitors/:websiteId", getUniqueVisitors);

export default router;
