import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/auth.types";
import { env } from "process";

export const signAccessToken = (payload: AuthPayload) => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  });
};
