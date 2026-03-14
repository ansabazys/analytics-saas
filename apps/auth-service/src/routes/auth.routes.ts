import { Router } from "express";
import { login, logout, refreshToken, register } from "../controllers/auth.controller";
import {authenticate} from '@repo/sdk'

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", authenticate, logout);

export default router;
