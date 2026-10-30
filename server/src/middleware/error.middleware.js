export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  let message = err.message;
  if (isProduction && statusCode === 500) {
    message = "Internal server error";
  }

  const response = {
    success: false,
    message,
  };

  if (!isProduction && err.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
