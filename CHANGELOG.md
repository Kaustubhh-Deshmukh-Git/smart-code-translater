# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) - Versioning: [SemVer](https://semver.org/).

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
