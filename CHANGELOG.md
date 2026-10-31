# Changelog

All notable changes to this project are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) - Versioning: [SemVer](https://semver.org/).

## [0.1.0] - 2026-10-31

### Added
- **User Registration & Bcrypt Hashing:** Secure account creation with hashed passwords, duplicate email conflict detection, and JWT generation (`/api/auth/register`).
- **Email/Password Authentication:** Credential validation, secure comparison, `lastLogin` timestamp tracking, and sanitized user session return (`/api/auth/login`).
- **Google SSO Integration:** Token verification using `google-auth-library`, user upsertion, and OAuth profile mapping (`/api/auth/google`).
- **React Frontend Auth Flow:** Single-page authentication interface (`LoginPage`) supporting both email and Google sign-in, global `AuthContext` with session restore, and `ProtectedRoute` routing guard.

## [Unreleased]
- Repository bootstrapped with spec-driven development docs.
