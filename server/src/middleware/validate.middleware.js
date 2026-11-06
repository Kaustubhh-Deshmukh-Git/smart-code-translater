import { z } from "zod";
import mongoose from "mongoose";
import { isSupportedLanguage } from "../constants/languages.js";

const extractErrorMessages = (error) => {
  const issues = error.issues || error.errors || [];
  return issues.map((err) => {
    const field = err.path.join(".");
    return field ? `${field}: ${err.message}` : err.message;
  });
};

export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errorMessages = extractErrorMessages(result.error);
    return res.status(400).json({
      success: false,
      message: errorMessages.join(", "),
      errors: result.error.issues || result.error.errors,
    });
  }
  req.body = result.data;
  next();
};

export const validateQuery = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    const errorMessages = extractErrorMessages(result.error);
    return res.status(400).json({
      success: false,
      message: errorMessages.join(", "),
      errors: result.error.issues || result.error.errors,
    });
  }
  req.query = result.data;
  next();
};

export const validateParams = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.params);
  if (!result.success) {
    const errorMessages = extractErrorMessages(result.error);
    return res.status(400).json({
      success: false,
      message: errorMessages.join(", "),
      errors: result.error.issues || result.error.errors,
    });
  }
  req.params = result.data;
  next();
};

// Schemas
export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80, "Name cannot exceed 80 characters"),
  email: z.string().trim().email("Invalid email address").toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password cannot exceed 128 characters"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export const googleSchema = z.object({
  credential: z.string().min(1, "Credential is required"),
});

export const translateSchema = z.object({
  code: z.string().min(1, "Code is required").max(20000, "Code cannot exceed 20000 characters"),
  sourceLanguage: z
    .string()
    .refine(isSupportedLanguage, { message: "Unsupported source language" }),
  targetLanguage: z
    .string()
    .refine(isSupportedLanguage, { message: "Unsupported target language" }),
});

export const codeActionSchema = z.object({
  code: z.string().min(1, "Code is required").max(20000, "Code cannot exceed 20000 characters"),
  language: z.string().refine(isSupportedLanguage, { message: "Unsupported language" }),
});

export const historyQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => !isNaN(val) && val >= 1, {
      message: "Page must be a positive integer",
    }),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 50, {
      message: "Limit must be between 1 and 50",
    }),
});

export const objectIdParamSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ID format",
  }),
});
