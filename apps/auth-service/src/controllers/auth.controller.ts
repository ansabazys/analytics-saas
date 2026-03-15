import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { db } from "@repo/database";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/token";
import { generateEmailToken } from "../utils/email-token";
import { generatePasswordResetToken } from "../utils/password-reset-token";
import { slugify } from "../utils/slugify";
import { nanoid } from "nanoid";

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

    const result = await db.$transaction(async (tx) => {
      // create user
      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      });

      // default organization
      const orgName = name ? `${name}'s Workspace` : "My Workspace";

      const slug = `${slugify(orgName)}-${nanoid(4)}`;

      const organization = await tx.organization.create({
        data: {
          name: orgName,
          slug,

          owner: {
            connect: { id: user.id },
          },

          memberships: {
            create: {
              userId: user.id,
              role: "owner",
            },
          },
        },
      });

      // email verification
      const token = generateEmailToken();

      await tx.emailVerificationToken.create({
        data: {
          userId: user.id,
          token,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });

      return { user, organization, token };
    });

    const verifyUrl = `http://localhost:3000/verify-email?token=${result.token}`;
    console.log("Verify email:", verifyUrl);

    res.status(201).json({
      message: "User created",
      userId: result.user.id,
      organizationId: result.organization.id,
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
      return res.status(401).json({ message: "Unauthorized" });
    }

    const session = await db.session.findUnique({
      where: { refreshToken: token },
    });

    if (!session || session.expiresAt < new Date()) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const payload = verifyRefreshToken(token);

    // 🔴 delete old session
    await db.session.delete({
      where: { refreshToken: token },
    });

    // 🟢 create new refresh token
    const newRefreshToken = generateRefreshToken({
      userId: payload.userId,
    });

    await db.session.create({
      data: {
        userId: payload.userId,
        refreshToken: newRefreshToken,
        expiresAt: new Date(Date.now() + REFRESH_EXPIRES_MS),
      },
    });

    const accessToken = generateAccessToken({
      userId: payload.userId,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/auth/refresh",
      maxAge: REFRESH_EXPIRES_MS,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Invalid refresh token" });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      await db.session.delete({
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

export async function logoutAll(req: Request & { user?: { userId: string } }, res: Response) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await db.session.deleteMany({
      where: { userId },
    });

    res.clearCookie("refreshToken", {
      path: "/auth/refresh",
    });

    res.json({
      message: "Logged out from all devices",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function me(req: Request & { user?: { userId: string } }, res: Response) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function verifyEmail(req: Request, res: Response) {
  try {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      return res.status(400).json({
        message: "Invalid token",
      });
    }

    const record = await db.emailVerificationToken.findUnique({
      where: { token },
    });

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({
        message: "Token expired or invalid",
      });
    }

    await db.user.update({
      where: { id: record.userId },
      data: {
        emailVerified: true,
      },
    });

    await db.emailVerificationToken.delete({
      where: { token },
    });

    res.json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.json({
        message: "If the email exists, a reset link has been sent",
      });
    }

    const token = generatePasswordResetToken();

    await db.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
      },
    });

    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

    console.log("Reset password link:", resetUrl);

    res.json({
      message: "Password reset link sent",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { token, password } = req.body;

    const record = await db.passwordResetToken.findUnique({
      where: { token },
    });

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: record.userId },
      data: { passwordHash },
    });

    await db.passwordResetToken.delete({
      where: { token },
    });

    res.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}
