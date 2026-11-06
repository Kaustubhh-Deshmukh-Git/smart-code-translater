const REQUIRED_ENV_VARS = [
  "MONGODB_URI",
  "JWT_SECRET",
  "GOOGLE_CLIENT_ID",
  "GEMINI_API_KEY",
  "CLIENT_URL",
];

export const validateEnv = () => {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key] || !process.env[key].trim());

  if (missing.length > 0) {
    console.error("FATAL: Missing required environment variables:");
    missing.forEach((key) => console.error(`  - ${key}`));
    process.exit(1);
  }
};

export default validateEnv;
