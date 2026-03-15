import { z } from "zod";

export const eventSchema = z.object({
  siteId: z.string(),
  visitorId: z.string(),
  sessionId: z.string(),
  event: z.string(),
  url: z.string().url(),
  timestamp: z.number(),
  data: z.record(z.string(), z.unknown()).optional()
})

export type EventSchema = z.infer<typeof eventSchema>;
