import { Router } from "express";
import mongoose from "mongoose";
import authRoutes from "./auth.routes.js";
import codeRoutes from "./code.routes.js";
import historyRoutes from "./history.routes.js";

const router = Router();

// -> /api/health (public)
router.get("/health", (req, res) => {
  res.json({
    success: true,
    data: {
      status: "ok",
      uptime: process.uptime(),
      mongo: mongoose.connection.readyState === 1,
    },
  });
});

// -> /api/auth/...
router.use("/auth", authRoutes);
// -> /api/code/...
router.use("/code", codeRoutes);
// -> /api/history/...
router.use("/history", historyRoutes);

export default router;
