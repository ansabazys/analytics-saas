import { z } from "zod";

export const createWebsiteSchema = z.object({
  name: z.string().min(2, "Website name must be at least 2 characters"),

  domain: z
    .string()
    .min(3, "Domain must be valid")
    .regex(/^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/, "Invalid domain format"),

  organizationId: z.string().uuid("Invalid organization id"),
});

export const updateWebsiteSchema = z.object({
  name: z.string().min(2).optional(),

  domain: z
    .string()
    .regex(/^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/, "Invalid domain format")
    .optional(),
});

export const websiteIdParamSchema = z.object({
  id: z.uuid("Invalid website id"),
});
