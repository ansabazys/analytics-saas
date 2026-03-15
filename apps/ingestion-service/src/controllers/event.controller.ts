import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { eventSchema } from "../validators/event.validator";
import { detectDevice } from "../utils/device";
import { EnrichedEvent } from "../types/event";

export const collectEvent = (req: Request, res: Response, next: NextFunction) => {
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

    const enrichedEvent: EnrichedEvent = {
      ...event,
      ip: req.ip,
      userAgent,
      referrer,
      device: detectDevice(userAgent),
      receivedAt: Date.now(),
    };

    logger.info(enrichedEvent, "Analytics event received");

    res.status(202).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
