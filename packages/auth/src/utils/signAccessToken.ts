import jwt from "jsonwebtoken"
import { env } from "@repo/config"
import { AuthPayload } from "../types/auth.types"

export const signAccessToken = (payload: AuthPayload) => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  })
}