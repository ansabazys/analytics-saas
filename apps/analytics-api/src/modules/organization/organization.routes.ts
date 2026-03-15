import express from "express";
import {
  createOrganizationController,
  deleteOrganizationController,
  getOrganizationController,
  getOrganizationsController,
  updateOrganizationController,
} from "./organization.controller";

import { authenticate } from "@repo/auth";
import { requireOrganizationMember } from "../../middleware/organization-access.middleware";
import { requireOrganizationAdmin } from "../../middleware/role.middleware";
import { validate } from "../../middleware/validate.middleware";

import {
  createOrganizationSchema,
  updateOrganizationSchema,
  organizationIdParamSchema,
} from "../../validators/organization.schema";

const router = express.Router();

/*
Create organization
Authenticated user creates their own organization
*/
router.post(
  "/",
  authenticate,
  validate(createOrganizationSchema),
  createOrganizationController
);

/*
Get all organizations of current user
*/
router.get("/", authenticate, getOrganizationsController);

/*
Get single organization
User must belong to organization
*/
router.get(
  "/:id",
  authenticate,
  validate(organizationIdParamSchema, "params"),
  requireOrganizationMember,
  getOrganizationController
);

/*
Update organization
Only admin / owner allowed
*/
router.patch(
  "/:id",
  authenticate,
  validate(organizationIdParamSchema, "params"),
  validate(updateOrganizationSchema),
  requireOrganizationMember,
  requireOrganizationAdmin,
  updateOrganizationController
);

/*
Delete organization
Only owner/admin allowed
*/
router.delete(
  "/:id",
  authenticate,
  validate(organizationIdParamSchema, "params"),
  requireOrganizationMember,
  requireOrganizationAdmin,
  deleteOrganizationController
);

export default router;