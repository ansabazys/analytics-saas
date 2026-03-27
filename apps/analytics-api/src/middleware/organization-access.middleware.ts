import { Request, Response, NextFunction } from "express";
import { and, db, eq, membership } from "@repo/database";
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

  const [currentMembership] = await db
    .select()
    .from(membership)
    .where(and(eq(membership.userId, userId), eq(membership.organizationId, organizationId)))
    .limit(1);

  if (!currentMembership) {
    throw new ForbiddenError("Access denied to this organization");
  }

  req.membership = currentMembership;

  next();
};
