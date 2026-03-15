import { Request, Response, NextFunction } from "express";
import { db } from "@repo/database";
import { ForbiddenError } from "../errors/ForbiddenError";

export const requireOrganizationMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.userId;

  const organizationId =
    req.params.id || req.body.organizationId || (req.query.organizationId as string);

  if (!userId || !organizationId) {
    throw new ForbiddenError("Invalid organization access");
  }

  const membership = await db.membership.findFirst({
    where: {
      userId,
      organizationId,
    },
  });

  if (!membership) {
    throw new ForbiddenError("Access denied to this organization");
  }

  req.membership = membership;

  next();
};
