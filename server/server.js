import "dotenv/config";
import mongoose from "mongoose";
import app from "./src/app.js";
import connectDB from "./src/config/db.config.js";
import validateEnv from "./src/config/env.config.js";

// Fail fast on missing environment variables
validateEnv();

const PORT = process.env.PORT || 5000;
let server;

const gracefulShutdown = async (signal, exitCode = 0) => {
  console.log(`\nReceived ${signal}. Initiating graceful shutdown...`);

  // Force shutdown after 10 seconds
  const forceTimer = setTimeout(() => {
    console.error("Graceful shutdown timed out after 10s. Exiting forcefully.");
    process.exit(1);
  }, 10000);
  forceTimer.unref();

  if (server) {
    await new Promise((resolve) => {
      server.close((err) => {
        if (err) {
          console.error("Error closing HTTP server:", err.message);
        } else {
          console.log("HTTP server closed.");
        }
        resolve();
      });
    });
  }

  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (err) {
    console.error("Error closing MongoDB connection:", err.message);
  }

  process.exit(exitCode);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM", 0));
process.on("SIGINT", () => gracefulShutdown("SIGINT", 0));

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("unhandledRejection", 1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  gracefulShutdown("uncaughtException", 1);
});

const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
