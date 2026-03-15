import { z } from "zod";

export const eventSchema = z.object({
  siteId: z.string().min(1),
  event: z.string().min(1),
  url: z.string().url(),
  timestamp: z.number(),
  data: z.record(z.string(), z.unknown()).optional(),
});

export type EventSchema = z.infer<typeof eventSchema>;