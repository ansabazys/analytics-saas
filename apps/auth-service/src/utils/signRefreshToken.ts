import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/auth.types";
import { env } from "process";

export const signRefreshToken = (payload: AuthPayload) => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};
