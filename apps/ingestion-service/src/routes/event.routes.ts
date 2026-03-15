import { Router } from "express";
import { collectEvent } from "../controllers/event.controller";

const router = Router();

router.post("/collect", collectEvent);

export default router;
