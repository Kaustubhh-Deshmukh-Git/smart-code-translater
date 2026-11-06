import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middleware/error.middleware.js";

const app = express();

// Security headers and settings
app.use(helmet());
app.disable("x-powered-by");

// Trust proxy configuration
if (process.env.TRUST_PROXY) {
  const trustValue =
    process.env.TRUST_PROXY === "true"
      ? true
      : !isNaN(Number(process.env.TRUST_PROXY))
        ? Number(process.env.TRUST_PROXY)
        : process.env.TRUST_PROXY;
  app.set("trust proxy", trustValue);
} else {
  app.set("trust proxy", 1);
}

// CORS allow-list
const clientUrlEnv = process.env.CLIENT_URL || "http://localhost:5173";
const allowedOrigins = clientUrlEnv.split(",").map((url) => url.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// Body parser with 100kb payload limit
app.use(express.json({ limit: "100kb" }));

// Routes
app.use("/api", routes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
