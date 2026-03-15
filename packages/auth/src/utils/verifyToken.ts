import jwt from "jsonwebtoken"
import { env } from "@repo/config"
import { AuthPayload } from "../types/auth.types"

export const verifyToken = (token: string): AuthPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET!) as AuthPayload
}