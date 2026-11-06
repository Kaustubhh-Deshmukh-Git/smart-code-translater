# Smart Code Translator

[![CI](https://github.com/Kaustubhh-Deshmukh-Git/smart-code-translater/actions/workflows/ci.yml/badge.svg)](https://github.com/Kaustubhh-Deshmukh-Git/smart-code-translater/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/Kaustubhh-Deshmukh-Git/smart-code-translater/actions/workflows/deploy-pages.yml/badge.svg)](https://kaustubhh-deshmukh-git.github.io/smart-code-translater/)

🌐 **Live Demo:** [https://kaustubhh-deshmukh-git.github.io/smart-code-translater/](https://kaustubhh-deshmukh-git.github.io/smart-code-translater/)

AI-powered full-stack application to **translate**, **analyze (Big-O)**, **optimize**, and **explain** code across C, C++, C#, Java, and Python.
Built with React 18, Vite, Express (ESM), MongoDB (Mongoose), Google OAuth 2.0 / JWT, Google Gemini AI, and Monaco Editor.

> Built spec-first. Start with [`docs/sdd/00-INDEX.md`](docs/sdd/00-INDEX.md).

---

## Architecture Overview

```mermaid
graph TD
    Client["React 18 + Vite (Monaco Editor, React Router)"]
    API["Express 4 REST API (ESM, Helmet, Rate Limiter, Zod)"]
    DB[("MongoDB Atlas (Users, History)")]
    Gemini["Google Gemini API (gemini-2.5-flash)"]
    GoogleAuth["Google Identity Services (OAuth 2.0)"]

    Client -->|JWT Bearer / JSON REST| API
    Client -->|Google OAuth credential| GoogleAuth
    API -->|Verify token| GoogleAuth
    API -->|Mongoose ODM| DB
    API -->|@google/genai SDK| Gemini
```

---

## Features

- **Authentication & Security:** Email/password registration with bcrypt password hashing, Google one-click SSO with conflict-free account linking, signed JWT session verification, and client-side 401 token expiry interceptor.
- **AI-Powered Code Operations:**
  - **Translate:** Cross-language translation preserving logic and idioms without markdown fence leakage.
  - **Analyze:** Algorithmic time and space complexity breakdown with plain-language explanations.
  - **Optimize:** Code refactoring for performance and idiomatic best practices with optimization notes.
  - **Explain:** Beginner-friendly line-by-line explanation of code structure and behavior.
- **Interactive Dual-Panel Workspace:** Monaco Editor with syntax highlighting, language selector with starter templates, language swap utility, and action-specific formatted output displays.
- **User-Scoped Operation History:** Paginated history dashboard with compound indexing (`userId`, `createdAt`), background fire-and-forget logging, item deletion, and batch history clearing.
- **Hardened Architecture:** Security headers via `helmet`, tiered IP rate limits, Zod schema validation, Morgan logging, `GET /api/health` monitoring, fail-fast startup env validation, graceful process shutdown handlers, and comprehensive Vitest unit and integration test suites.

---

## Screenshots & UI Walkthrough

|        Login & Authentication         |                  Workspace & Monaco Editor                  |
| :-----------------------------------: | :---------------------------------------------------------: |
| _(Email/password & Google SSO login)_ | _(Dual-panel workspace with language selector and actions)_ |

|        Output Panel (Analysis / Optimization)         |                  Paginated History Page                   |
| :---------------------------------------------------: | :-------------------------------------------------------: |
| _(Formatted Big-O badges, syntax highlighted output)_ | _(Searchable history items, detail preview, batch clear)_ |

---

## Quick Start

### Prerequisites

- Node.js >= 22
- MongoDB Atlas cluster or local MongoDB instance
- Google Gemini API key
- Google Cloud OAuth Client ID (optional for Google SSO)

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/Kaustubhh-Deshmukh-Git/smart-code-translater.git && cd smart-code-translater

# 2. Configure environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env

# 3. Install dependencies
npm --prefix server install
npm --prefix client install
npm install # dev tools (husky, prettier, commitlint)

# 4. Start backend and frontend development servers
npm --prefix server run dev   # Runs on http://localhost:5000
npm --prefix client run dev   # Runs on http://localhost:5173
```

---

## Docker Quickstart

Run the complete multi-container stack (MongoDB, Express API, and Nginx-served Vite client) locally via Docker Compose:

```bash
# 1. Ensure server/.env has required credentials (GEMINI_API_KEY, JWT_SECRET, etc.)
# 2. Build and start containers in detached mode
docker compose up --build -d

# 3. Verify server health check endpoint
curl -s http://localhost:5000/api/health

# 4. Follow container logs
docker compose logs -f

# 5. Stop and teardown containers and volumes
docker compose down
```

---

## Available Scripts

| Scope  | Script                          | Description                                       |
| ------ | ------------------------------- | ------------------------------------------------- |
| Root   | `npm run format`                | Format entire repository with Prettier            |
| Root   | `npm run lint`                  | Run ESLint checks across both server and client   |
| Server | `npm --prefix server run dev`   | Start Express server with nodemon                 |
| Server | `npm --prefix server run start` | Start Express server in production mode           |
| Server | `npm --prefix server run test`  | Run Vitest unit and integration tests             |
| Server | `npm --prefix server run lint`  | Run ESLint with flat config                       |
| Client | `npm --prefix client run dev`   | Start Vite dev server with HMR                    |
| Client | `npm --prefix client run build` | Build production client bundle into `client/dist` |
| Client | `npm --prefix client run test`  | Run client unit tests with Vitest and JSDOM       |
| Client | `npm --prefix client run lint`  | Run ESLint on client codebase                     |

---

## Environment Variables

### Server (`server/.env`)

| Variable           | Required | Default                 | Purpose                                                |
| ------------------ | -------- | ----------------------- | ------------------------------------------------------ |
| `PORT`             | No       | `5000`                  | Port for the Express server                            |
| `NODE_ENV`         | No       | `development`           | Environment mode (`development`, `production`, `test`) |
| `CLIENT_URL`       | Yes      | `http://localhost:5173` | Allowed CORS origin                                    |
| `MONGODB_URI`      | Yes      | -                       | MongoDB connection string                              |
| `JWT_SECRET`       | Yes      | -                       | Secret key for signing session tokens (64+ chars)      |
| `JWT_EXPIRES_IN`   | No       | `7d`                    | Token expiry duration                                  |
| `GOOGLE_CLIENT_ID` | Yes      | -                       | Google OAuth 2.0 Web Client ID                         |
| `GEMINI_API_KEY`   | Yes      | -                       | Google Gemini AI API key                               |
| `GEMINI_MODEL`     | No       | `gemini-2.5-flash`      | Gemini model identifier                                |

### Client (`client/.env`)

| Variable                | Required | Default                     | Purpose                               |
| ----------------------- | -------- | --------------------------- | ------------------------------------- |
| `VITE_API_URL`          | Yes      | `http://localhost:5000/api` | Backend API base URL                  |
| `VITE_GOOGLE_CLIENT_ID` | Yes      | -                           | Google OAuth Client ID for GIS button |

---

## Repository Layout

```
smart-code-translater/
├── .github/
│   ├── workflows/ci.yml       # Dual-matrix CI workflow
│   ├── CODEOWNERS             # Governance code ownership
│   └── ISSUE_TEMPLATE/        # Bug reports and PR templates
├── client/
│   ├── src/
│   │   ├── components/        # Navbar, CodeEditor, LanguageSelector, OutputPanel
│   │   ├── context/           # AuthContext
│   │   ├── pages/             # LoginPage, HomePage, HistoryPage
│   │   ├── services/          # api.js, authService, codeService, historyService
│   │   └── constants/         # languages.js, starter snippets
│   ├── Dockerfile             # Multi-stage Nginx production build
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/            # db.config.js, env.config.js, gemini.config.js
│   │   ├── controllers/       # auth, code, and history controllers
│   │   ├── middleware/        # auth, error, rateLimit, and validate middlewares
│   │   ├── models/            # User.model.js, History.model.js
│   │   ├── routes/            # auth, code, history, and health routes
│   │   ├── services/          # auth, gemini, code, and history services
│   │   └── utils/             # jwt.utils.js, prompts.utils.js, languages.js
│   ├── Dockerfile             # Hardened Alpine Node.js production image
│   └── server.js              # Application entry with graceful shutdown
├── docs/sdd/                  # Spec-Driven Development documentation pack
├── templates/                 # Reference configuration templates
├── docker-compose.yml         # Container stack orchestration
└── README.md
```

---

## Testing & CI/CD

- **Server Tests:** Unit tests for prompt parsers, language constants, and JWT utilities; Integration tests using Supertest verifying `GET /api/health`, 404 handler, bearer route guard, and Zod body validation.
- **Client Tests:** Unit tests with Vitest, `@testing-library/react`, and JSDOM verifying route protection redirects and `OutputPanel` states across translation, complexity, optimization, and explanation.
- **CI Pipeline:** Automated GitHub Actions pipeline (`.github/workflows/ci.yml`) runs on every push and PR to `main`:
  1. `npm ci` clean dependency installation
  2. ESLint code analysis
  3. Vitest test runner
  4. Production client build
  5. Security audit (`npm audit --omit=dev --audit-level=high`)

---

## Workflow & Contributing

Trunk-based development on `main`. Every chunk in [`PROMPTS.md`](PROMPTS.md) concludes with a Conventional Commit pushed to `main`.
Branch protection rules and PR guidelines are detailed in [`docs/sdd/09-GIT-WORKFLOW.md`](docs/sdd/09-GIT-WORKFLOW.md).

---

## License

[MIT](LICENSE)
