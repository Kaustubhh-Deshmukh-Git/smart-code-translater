import { Router } from "express";
import {
  getHistory,
  getHistoryItem,
  deleteHistoryItem,
  clearHistory,
} from "../controllers/history.controller.js";
import authenticate from "../middleware/auth.middleware.js";
import {
  validateQuery,
  validateParams,
  historyQuerySchema,
  objectIdParamSchema,
} from "../middleware/validate.middleware.js";

const router = Router();

// All history routes require authentication
router.use(authenticate);

router.get("/", validateQuery(historyQuerySchema), getHistory);

// DELETE /clear MUST precede /:id so Express does not match literal "clear" to the dynamic :id parameter
router.delete("/clear", clearHistory);

router.get("/:id", validateParams(objectIdParamSchema), getHistoryItem);
router.delete("/:id", validateParams(objectIdParamSchema), deleteHistoryItem);

export default router;
