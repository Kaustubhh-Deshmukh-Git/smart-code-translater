# Smart Code Translator

[![CI](https://github.com/Kaustubhh-Deshmukh-Git/smart-code-translater/actions/workflows/ci.yml/badge.svg)](https://github.com/Kaustubhh-Deshmukh-Git/smart-code-translater/actions/workflows/ci.yml)

AI-powered full-stack app to **translate**, **analyze (Big-O)**, **optimize** and **explain** code across C, C++, C#, Java and Python.
Stack: React + Vite - Express - MongoDB (Mongoose) - JWT + Google SSO - Google Gemini - Monaco Editor.

> Built spec-first. Start with [`docs/sdd/00-INDEX.md`](docs/sdd/00-INDEX.md).

## Features
- Email/password auth + Google one-click sign-in, JWT sessions, protected routes
- Code translation, complexity analysis, optimization, plain-English explanation
- Monaco editor, language swap, copy output
- Paginated operation history (view, delete, clear)

## Quick start
```bash
git clone https://github.com/Kaustubhh-Deshmukh-Git/smart-code-translater.git && cd smart-code-translater
cp server/.env.example server/.env   # fill values
cp client/.env.example client/.env   # fill values
npm --prefix server install && npm --prefix client install
npm --prefix server run dev          # http://localhost:5000
npm --prefix client run dev          # http://localhost:5173
```

## Environment
| File | Variable | Purpose |
|---|---|---|
| server/.env | PORT, CLIENT_URL | server port, allowed CORS origin |
| server/.env | MONGODB_URI | MongoDB Atlas connection string |
| server/.env | JWT_SECRET, JWT_EXPIRES_IN | token signing (use 64+ random chars) |
| server/.env | GOOGLE_CLIENT_ID | Google OAuth client |
| server/.env | GEMINI_API_KEY, GEMINI_MODEL | Gemini access (model default `gemini-2.5-flash`) |
| client/.env | VITE_API_URL, VITE_GOOGLE_CLIENT_ID | API base URL, Google client |

## Repository layout
```
client/   React + Vite frontend
server/   Express + MongoDB backend
docs/sdd/ Spec-driven development documents
templates/ CI + Docker files copied in during hardening (H5, H6)
```

## Workflow
Trunk-based. Every chunk in [`PROMPTS.md`](PROMPTS.md) ends in a Conventional Commit pushed to `main`.
See [`docs/sdd/09-GIT-WORKFLOW.md`](docs/sdd/09-GIT-WORKFLOW.md).

## License
MIT
