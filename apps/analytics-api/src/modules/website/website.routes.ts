import express from "express";
import {
  createWebsiteController,
  deleteWebsiteController,
  getWebsiteController,
  getWebsitesController,
  regenerateWebsiteKeysController,
  updateWebsiteController,
} from "./website.controller";

import { authenticate } from "@repo/auth";
import { requireOrganizationMember } from "../../middleware/organization-access.middleware";
import { requireOrganizationAdmin } from "../../middleware/role.middleware";
import { validate } from "../../middleware/validate.middleware";

import {
  createWebsiteSchema,
  updateWebsiteSchema,
  websiteIdParamSchema,
} from "../../validators/website.schema";

const router = express.Router();

/*
Create website
*/
router.post(
  "/",
  authenticate,
  validate(createWebsiteSchema),
  requireOrganizationMember,
  createWebsiteController,
);

/*
Get all websites in organization
Requires ?organizationId query
*/
router.get("/", authenticate, requireOrganizationMember, getWebsitesController);

/*
Get single website
*/
router.get(
  "/:id",
  authenticate,
  validate(websiteIdParamSchema, "params"),
  requireOrganizationMember,
  getWebsiteController,
);

/*
Update website
*/
router.patch(
  "/:id",
  authenticate,
  validate(websiteIdParamSchema, "params"),
  validate(updateWebsiteSchema),
  requireOrganizationMember,
  requireOrganizationAdmin,
  updateWebsiteController,
);

/*
Delete website
*/
router.delete(
  "/:id",
  authenticate,
  validate(websiteIdParamSchema, "params"),
  requireOrganizationMember,
  requireOrganizationAdmin,
  deleteWebsiteController,
);

/*
Regenerate API keys
*/
router.post(
  "/:id/regenerate-key",
  authenticate,
  validate(websiteIdParamSchema, "params"),
  requireOrganizationMember,
  requireOrganizationAdmin,
  regenerateWebsiteKeysController,
);

export default router;
