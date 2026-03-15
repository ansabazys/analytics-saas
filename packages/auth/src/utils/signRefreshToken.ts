import jwt from "jsonwebtoken"
import { env } from "@repo/config"
import { AuthPayload } from "../types/auth.types"

export const signRefreshToken = (payload: AuthPayload) => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  })
}