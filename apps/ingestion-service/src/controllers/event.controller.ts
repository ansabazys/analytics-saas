import { Request, Response, NextFunction } from "express";
import { db } from "@repo/database";
import { logger } from "../utils/logger";
import { eventSchema } from "../validators/event.validator";
import { detectDevice } from "../utils/device";

export const collectEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = eventSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid event payload",
      });
    }

    const event = parsed.data;

    const userAgent = req.headers["user-agent"];
    const referrer = req.headers["referer"];

    const device = detectDevice(userAgent);

    await db.event.create({
      data: {
        websiteId: event.siteId,
        visitorId: event.visitorId,
        sessionId: event.sessionId,
        event: event.event,
        path: new URL(event.url).pathname,
        referrer: referrer ?? null,
        device,
      },
    });

    logger.info("Event stored in database");

    res.status(202).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
