import { z } from "zod";

export const addMemberSchema = z.object({
  userId: z.string(),

  role: z.enum(["owner", "admin", "member"]),
});

export const updateMemberRoleSchema = z.object({
  role: z.enum(["owner", "admin", "member"]),
});

export const membershipParamSchema = z.object({
  id: z.uuid("Invalid organization id"),
  userId: z.string(),
});
