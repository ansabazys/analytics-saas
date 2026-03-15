import express from "express";
import {
  createWebsiteController,
  deleteWebsiteController,
  getWebsiteController,
  getWebsitesController,
  regenerateWebsiteKeysController,
  updateWebsiteController,
} from "../controllers/website.controller";

const router = express.Router();

router.post("/", createWebsiteController);

router.get("/", getWebsitesController);
router.get("/:id", getWebsiteController);

router.patch("/:id", updateWebsiteController);

router.delete("/:id", deleteWebsiteController);

router.post("/:id/regenerate-key", regenerateWebsiteKeysController);

export default router;
