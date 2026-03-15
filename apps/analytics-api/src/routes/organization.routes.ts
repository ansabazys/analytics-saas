import express from "express";
import { createOrganizationController } from "../controllers/organization.controller";

const router = express.Router();

router.post("/", createOrganizationController);

export default router;