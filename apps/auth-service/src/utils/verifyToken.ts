import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/auth.types";
import { env } from "../../../analytics-api/src/config/env";

export const verifyToken = (token: string): AuthPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET!) as AuthPayload;
};
