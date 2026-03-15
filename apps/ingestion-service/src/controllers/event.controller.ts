import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { eventSchema } from "../validators/event.validator";

export const collectEvent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = eventSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid event payload",
        details: parsed.error.flatten(),
      });
    }

    const event = parsed.data;

    logger.info(
      {
        siteId: event.siteId,
        event: event.event,
        url: event.url,
      },
      "Event received"
    );

    res.status(202).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};