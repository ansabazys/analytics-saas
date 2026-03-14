import jwt from "jsonwebtoken";
import { env } from "@repo/config";
import { Request, Response, NextFunction } from "express";

interface AuthPayload {
  userId: string;
  email?: string;
  role?: string;
}

export const authenticate = (
  req: Request & { user?: AuthPayload },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token is required",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      env.JWT_ACCESS_SECRET!
    ) as unknown as AuthPayload;

    req.user = decoded;

    next();
  } catch {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
};