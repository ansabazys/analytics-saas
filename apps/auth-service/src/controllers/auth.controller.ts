import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import {
  db,
  emailVerificationToken,
  membership,
  organization,
  passwordResetToken,
  eq,
  session,
  user,
} from "@repo/database";
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

    const [existingUser] = await db.select().from(user).where(eq(user.email, email)).limit(1);

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.transaction(async (tx) => {
      const [createdUser] = await tx
        .insert(user)
        .values({
          name,
          email,
          passwordHash,
          updatedAt: new Date(),
        })
        .returning();

      const orgName = name ? `${name}'s Workspace` : "My Workspace";
      const slug = `${slugify(orgName)}-${nanoid(4)}`;

      const [createdOrganization] = await tx
        .insert(organization)
        .values({
          name: orgName,
          slug,
          ownerId: createdUser.id,
          updatedAt: new Date(),
        })
        .returning();

      await tx.insert(membership).values({
        userId: createdUser.id,
        organizationId: createdOrganization.id,
        role: "owner",
      });

      const token = generateEmailToken();

      await tx.insert(emailVerificationToken).values({
        userId: createdUser.id,
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });

      return { user: createdUser, organization: createdOrganization, token };
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

    const [currentUser] = await db.select().from(user).where(eq(user.email, email)).limit(1);

    if (!currentUser) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const validPassword = await bcrypt.compare(password, currentUser.passwordHash);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken({
      userId: currentUser.id,
    });

    const refreshToken = generateRefreshToken({
      userId: currentUser.id,
    });

    await db.insert(session).values({
      userId: currentUser.id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_EXPIRES_MS),
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

    const [currentSession] = await db
      .select()
      .from(session)
      .where(eq(session.refreshToken, token))
      .limit(1);

    if (!currentSession || currentSession.expiresAt < new Date()) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const payload = verifyRefreshToken(token);

    await db.delete(session).where(eq(session.refreshToken, token));

    const newRefreshToken = generateRefreshToken({
      userId: payload.userId,
    });

    await db.insert(session).values({
      userId: payload.userId,
      refreshToken: newRefreshToken,
      expiresAt: new Date(Date.now() + REFRESH_EXPIRES_MS),
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
      await db.delete(session).where(eq(session.refreshToken, token));
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

    await db.delete(session).where(eq(session.userId, userId));

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

    const [currentUser] = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
      })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(currentUser);
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

    const [record] = await db
      .select()
      .from(emailVerificationToken)
      .where(eq(emailVerificationToken.token, token))
      .limit(1);

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({
        message: "Token expired or invalid",
      });
    }

    await db
      .update(user)
      .set({
        emailVerified: true,
        updatedAt: new Date(),
      })
      .where(eq(user.id, record.userId));

    await db.delete(emailVerificationToken).where(eq(emailVerificationToken.token, token));

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

    const [currentUser] = await db.select().from(user).where(eq(user.email, email)).limit(1);

    if (!currentUser) {
      return res.json({
        message: "If the email exists, a reset link has been sent",
      });
    }

    const token = generatePasswordResetToken();

    await db.insert(passwordResetToken).values({
      userId: currentUser.id,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
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

    const [record] = await db
      .select()
      .from(passwordResetToken)
      .where(eq(passwordResetToken.token, token))
      .limit(1);

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db
      .update(user)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(user.id, record.userId));

    await db.delete(passwordResetToken).where(eq(passwordResetToken.token, token));

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
