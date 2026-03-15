import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../errors/ForbiddenError";

export const requireOrganizationAdmin = (req: Request, res: Response, next: NextFunction) => {
  const membership = req.membership;

  if (!membership) {
    throw new ForbiddenError("Membership not found");
  }

  const allowedRoles = ["owner", "admin"];

  if (!allowedRoles.includes(membership.role)) {
    throw new ForbiddenError("Admin access required");
  }

  next();
};
