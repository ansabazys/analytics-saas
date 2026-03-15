import { Router } from "express";
import {
  addMemberController,
  getMembersController,
  removeMemberController,
  updateMemberRoleController,
} from "./membership.controller";

import { authenticate } from "@repo/auth";
import { requireOrganizationMember } from "../../middleware/organization-access.middleware";
import { requireOrganizationAdmin } from "../../middleware/role.middleware";
import { validate } from "../../middleware/validate.middleware";

import {
  addMemberSchema,
  updateMemberRoleSchema,
  membershipParamSchema,
} from "../../validators/membership.schema";

const router = Router();

/*
Get all members of an organization
*/
router.get(
  "/:id/members",
  authenticate,
  validate(membershipParamSchema, "params"),
  requireOrganizationMember,
  getMembersController,
);

/*
Add a member to organization
Only admin/owner allowed
*/
router.post(
  "/:id/members",
  authenticate,
  validate(addMemberSchema),
  requireOrganizationMember,
  requireOrganizationAdmin,
  addMemberController,
);

/*
Update member role
Only admin/owner allowed
*/
router.patch(
  "/:id/members/:userId",
  authenticate,
  validate(membershipParamSchema, "params"),
  validate(updateMemberRoleSchema),
  requireOrganizationMember,
  requireOrganizationAdmin,
  updateMemberRoleController,
);

/*
Remove member from organization
Only admin/owner allowed
*/
router.delete(
  "/:id/members/:userId",
  authenticate,
  validate(membershipParamSchema, "params"),
  requireOrganizationMember,
  requireOrganizationAdmin,
  removeMemberController,
);

export default router;
