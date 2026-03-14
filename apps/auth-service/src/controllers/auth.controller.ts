import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { db } from "@repo/database";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token";

const REFRESH_EXPIRES_MS = 7 * 24 * 60 * 60 * 1000;

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    res.status(201).json({
      message: "User created",
      userId: user.id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken({
      userId: user.id,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
    });

    await db.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + REFRESH_EXPIRES_MS),
      },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/auth/refresh",
      maxAge: REFRESH_EXPIRES_MS,
    });

    res.json({
      accessToken,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function refreshToken(req: Request, res: Response) {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const session = await db.session.findUnique({
      where: { refreshToken: token },
    });

    if (!session || session.expiresAt < new Date()) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    const payload = verifyRefreshToken(token);

    const accessToken = generateAccessToken({
      userId: payload.userId,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error(error);

    res.status(403).json({
      message: "Invalid refresh token",
    });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      await db.session.deleteMany({
        where: { refreshToken: token },
      });
    }

    res.clearCookie("refreshToken", {
      path: "/auth/refresh",
    });

    res.json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}