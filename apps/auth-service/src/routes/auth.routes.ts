import { Router } from "express";
import { login, logout, me, refreshToken, register } from "../controllers/auth.controller";
import { authenticate } from "@repo/sdk";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", authenticate, logout);

router.get("/me", authenticate, me);

export default router;
