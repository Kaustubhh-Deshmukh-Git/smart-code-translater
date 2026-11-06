# CONTEXT.md - Living project state (read this FIRST every session)

**Project:** Smart Code Translator (repo folder: `smart-code-translater`)
**Source of truth:** `docs/sdd/*` (spec) -> `PROMPTS.md` (execution order) -> this file (progress).
**Stack:** React 18 + Vite (JavaScript), Express (ESM), MongoDB/Mongoose, JWT, Google OAuth, Gemini (`@google/genai`), Monaco.
**Branching:** trunk-based, commit + push to `main` after EVERY chunk. Branches only for `E*` optional chunks.

## Rules that never change
1. Follow the guide's file names, folder structure, response envelope and step order exactly.
2. JavaScript with ES modules (`"type": "module"`, `.js` extensions in imports). No TypeScript.
3. Response envelope: `{ success: true, data }` / `{ success: false, message }`.
4. Every history/db query is scoped by `userId`.
5. No secrets in git. `.env` is local only.
6. After each chunk: tick the box below, commit with the message given in PROMPTS.md, push.

## Progress

### Part 1 - Backend (Authentication)
- [x] C01 - Server project + environment
- [x] C02 - User model
- [x] C03 - JWT utilities
- [x] C04 - Registration service
- [x] C05 - Email/password login service
- [x] C06 - Google SSO + profile service
- [x] C07 - Auth controller
- [x] C08 - Auth + error middleware
- [x] C09 - Auth routes + route registry
- [x] C10 - Express app, MongoDB, server start

### Part 1 - Frontend (Auth Flow)
- [x] C11 - React + Vite client setup
- [x] C12 - Axios instance + JWT interceptor
- [x] C13 - Auth service functions
- [x] C14 - AuthContext (global auth state)
- [x] C15 - ProtectedRoute
- [x] C16 - Login page (email + Google SSO)
- [x] C17 - App routing + entry point
- [x] C18 - Navbar
- [x] C19 - Part 1 verification + release v0.1.0

### Part 2 - Backend (AI Features + History)
- [x] C20 - Gemini AI setup
- [x] C21 - Supported languages + prompt templates
- [x] C22 - Response utilities
- [x] C23 - Four code services
- [x] C24 - History model + service
- [x] C25 - Code controller
- [x] C26 - History controller
- [x] C27 - Code + history routes, registry update

### Part 2 - Frontend (Editor, Output, History)
- [x] C28 - Frontend language constants
- [x] C29 - Code + history service functions
- [ ] C30 - CodeEditor + LanguageSelector
- [ ] C31 - OutputPanel
- [ ] C32 - HomePage workspace
- [ ] C33 - HistoryList + HistoryPage
- [ ] C34 - Final routing update + release v0.2.0

### Part 3 - Industry Hardening (added on top of the guide)
- [ ] H1 - Lint, format, commit hooks
- [ ] H2 - Security hardening
- [ ] H3 - Observability and ops basics
- [ ] H4 - Automated tests
- [ ] H5 - CI/CD and repo governance
- [ ] H6 - Containerization
- [ ] H7 - Final documentation + release v1.0.0

## Current chunk
`C30`

## Decisions / deviations
See `docs/sdd/10-DECISIONS.md`.
