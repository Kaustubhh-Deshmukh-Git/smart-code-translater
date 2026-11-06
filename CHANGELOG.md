# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) - Versioning: [SemVer](https://semver.org/).

## [1.0.0] - 2026-11-06

### Added
- **Production Code Quality & Standards (H1):** ESLint flat config across monorepo packages, Prettier code style formatting, Husky Git pre-commit and commit-msg hooks, and Commitlint conventional commit enforcement.
- **Security Hardening (H2):** HTTP security headers via `helmet`, tiered rate limiting (`authLimiter` 20 req/15m, `codeLimiter` 30 req/1m), strict 100kb payload size limit, CORS allow-listing, Zod schema validation middleware across all input endpoints, automatic Google OAuth account linking with conflict resolution, and client-side 401 token expiry interceptor.
- **Observability & Operational Resilience (H3):** Morgan HTTP access logging, `GET /api/health` monitoring endpoint reporting uptime and MongoDB connection state, startup fail-fast environment validation (`env.config.js`), and graceful process shutdown handlers (`SIGTERM`, `SIGINT`, uncaught exceptions, and unhandled rejections).
- **Automated Testing Suite (H4):** Server unit and integration tests using Vitest and Supertest covering utilities, route protection, input validation, and health checks (19 passing tests); React frontend component tests using Vitest, Testing Library, and JSDOM (`ProtectedRoute`, `OutputPanel` - 8 passing tests).
- **Continuous Integration & Governance (H5):** GitHub Actions dual-matrix CI pipeline validating linting, tests, client production build, and security vulnerability audits on every push and pull request; repository governance files including `CODEOWNERS`, issue templates, PR template, and documented branch protection rules.
- **Containerization (H6):** Multi-stage Dockerfiles for backend (`server/Dockerfile` with non-root user execution and health check) and frontend (`client/Dockerfile` with Nginx reverse proxy and SPA routing fallback); `docker-compose.yml` for unified one-command local orchestration with containerized MongoDB.

## [0.2.0] - 2026-11-06

### Added
- **Gemini AI Integration:** Configured `@google/genai` client and backend AI service (`gemini.service.js`) with structured prompt templates and response sanitizers.
- **Four Core Code Operations:** Translation (`/api/code/translate`), complexity analysis (`/api/code/analyze`), code optimization (`/api/code/optimize`), and conceptual explanation (`/api/code/explain`) across C, C++, C#, Java, and Python.
- **User-Scoped History Engine:** Mongoose `History` model with compound indexing (`userId`, `createdAt`), background fire-and-forget query logging, paginated history retrieval, single entry deletion, and batch clear (`/api/history`).
- **Interactive Dual-Panel Workspace:** Monaco-powered code editor with syntax highlighting, language selector, quick starter snippets, live action toolbar, copy utilities, and action-specific output displays (`OutputPanel`).
- **Paginated History Dashboard:** Two-pane history viewer with operation type badges, code input/output inspection, individual item deletion, and pagination controls.

## [0.1.0] - 2026-10-31

### Added
- **User Registration & Bcrypt Hashing:** Secure account creation with hashed passwords, duplicate email conflict detection, and JWT generation (`/api/auth/register`).
- **Email/Password Authentication:** Credential validation, secure comparison, `lastLogin` timestamp tracking, and sanitized user session return (`/api/auth/login`).
- **Google SSO Integration:** Token verification using `google-auth-library`, user upsertion, and OAuth profile mapping (`/api/auth/google`).
- **React Frontend Auth Flow:** Single-page authentication interface (`LoginPage`) supporting both email and Google sign-in, global `AuthContext` with session restore, and `ProtectedRoute` routing guard.

## [Unreleased]
- Repository bootstrapped with spec-driven development docs.
