import { Router } from "express";
import authRoutes from "./auth.routes.js";
import codeRoutes from "./code.routes.js";
import historyRoutes from "./history.routes.js";

const router = Router();

// -> /api/auth/...
router.use("/auth", authRoutes);
// -> /api/code/...
router.use("/code", codeRoutes);
// -> /api/history/...
router.use("/history", historyRoutes);

export default router;
