import { Router } from "express";
import { translate, analyze, optimize, explain } from "../controllers/code.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import { codeLimiter } from "../middleware/rateLimit.middleware.js";
import {
  validateBody,
  translateSchema,
  codeActionSchema,
} from "../middleware/validate.middleware.js";

const router = Router();

// All code operation routes require authentication
router.use(authenticate);

// Rate limiting: 30 req / min per user
router.use(codeLimiter);

router.post("/translate", validateBody(translateSchema), translate);
router.post("/analyze", validateBody(codeActionSchema), analyze);
router.post("/optimize", validateBody(codeActionSchema), optimize);
router.post("/explain", validateBody(codeActionSchema), explain);

export default router;
