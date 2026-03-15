import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  logoutAll,
  me,
  refreshToken,
  register,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller";
import { authenticate, authLimiter } from "@repo/sdk";

const router = Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/refresh", refreshToken);
router.post("/logout", authenticate, logout);
router.post("/logout-all", authenticate, logoutAll);

router.get("/me", authenticate, me);

router.get("/verify-email", verifyEmail);

router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
