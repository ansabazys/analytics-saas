import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/verifyToken"
import { AuthPayload } from "../types/auth.types"

export const authenticate = (
  req: Request & { user?: AuthPayload },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized",
    })
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      message: "Token is required",
    })
  }

  try {
    const decoded = verifyToken(token)

    req.user = decoded

    next()
  } catch {
    return res.status(403).json({
      message: "Invalid token",
    })
  }
}