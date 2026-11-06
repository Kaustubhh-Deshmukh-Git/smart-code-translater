import { Router } from "express";
import {
  registerUser,
  loginUser,
  googleAuth,
  getMe,
  logout,
} from "../controllers/auth.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";
import {
  validateBody,
  registerSchema,
  loginSchema,
  googleSchema,
} from "../middleware/validate.middleware.js";

const router = Router();

// Rate limiting: 20 req / 15 min per IP on /auth/*
router.use(authLimiter);

// Public routes
router.post("/register", validateBody(registerSchema), registerUser);
router.post("/login", validateBody(loginSchema), loginUser);
router.post("/google", validateBody(googleSchema), googleAuth);

// Protected routes
router.get("/me", authenticate, getMe);
router.post("/logout", authenticate, logout);

export default router;
