import jwt from "jsonwebtoken";
import { env } from "process";


interface JwtPayload {
  userId: string;
  email?: string;
  role?: string;
}

export function generateAccessToken(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET!, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES as jwt.SignOptions["expiresIn"],
  });
}

export function generateRefreshToken(payload: { userId: string }) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET!, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES as jwt.SignOptions["expiresIn"],
  });
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET!) as { userId: string };
}
