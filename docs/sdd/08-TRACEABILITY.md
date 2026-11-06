# 08 - Traceability Matrix

Requirement -> implementing chunk(s). Fill the commit column with the short hash after each push.

| Chunk | Title | Guide step | Requirements | Commit |
|---|---|---|---|---|
| C01 | Server project + environment | Part 1 / Backend / Step 1 | NFR-S4 | `fd51c8b` |
| C02 | User model | Part 1 / Backend / Step 2 | FR-A1, FR-A2, FR-A3 | `05789ca` |
| C03 | JWT utilities | Part 1 / Backend / Step 3 | FR-A1, NFR-S2 | `a39b0f3` |
| C04 | Registration service | Part 1 / Backend / Step 4 | FR-A1, NFR-S1 | `6744379` |
| C05 | Email/password login service | Part 1 / Backend / Step 5 | FR-A2 | `64a540b` |
| C06 | Google SSO + profile service | Part 1 / Backend / Step 6 | FR-A3, FR-A5 | `13a8ef2` |
| C07 | Auth controller | Part 1 / Backend / Step 7 | FR-A1..A6, NFR-R1 | `6bffd6f` |
| C08 | Auth + error middleware | Part 1 / Backend / Step 8 | FR-A4, NFR-R2 | `56c9419` |
| C09 | Auth routes + route registry | Part 1 / Backend / Step 9 | FR-A1..A6 | `faf7c16` |
| C10 | Express app, MongoDB, server start | Part 1 / Backend / Step 10 | FR-A1..A6, NFR-R2 | `c6e2541` |
| C11 | React + Vite client setup | Part 1 / Frontend / Step 1 | FR-A4 | `266f6c7` |
| C12 | Axios instance + JWT interceptor | Part 1 / Frontend / Step 2 | FR-A4 | `65831d7` |
| C13 | Auth service functions | Part 1 / Frontend / Step 3 | FR-A1..A6 | `1d28ac2` |
| C14 | AuthContext (global auth state) | Part 1 / Frontend / Step 4 | FR-A4, FR-A5 | `db490bf` |
| C15 | ProtectedRoute | Part 1 / Frontend / Step 5 | FR-A4 | `fa416c9` |
| C16 | Login page (email + Google SSO) | Part 1 / Frontend / Step 6 | FR-A1, FR-A2, FR-A3 | `498aea3` |
| C17 | App routing + entry point | Part 1 / Frontend / Steps 7-8 | FR-A4 | `8d0da13` |
| C18 | Navbar | Part 1 / Frontend / Step 9 | FR-A6 | `93496bd` |
| C19 | Part 1 verification + release v0.1.0 | Part 1 / Summary | FR-A1..A6 | `a77b602` |
| C20 | Gemini AI setup | Part 2 / Backend / Step 1 | FR-C1..C4 | `db505d0` |
| C21 | Supported languages + prompt templates | Part 2 / Backend / Step 2 | FR-C1..C4 | `dcc468e` |
| C22 | Response utilities | Part 2 / Backend / Step 3 | FR-C1..C4 | `84bb902` |
| C23 | Four code services | Part 2 / Backend / Step 4 | FR-C1, FR-C2, FR-C3, FR-C4 | `3e602e1` |
| C24 | History model + service | Part 2 / Backend / Step 5 | FR-H1..H5 | `386502b` |
| C25 | Code controller | Part 2 / Backend / Step 6 | FR-C1..C4, FR-H1, NFR-P1 | `1551246` |
| C26 | History controller | Part 2 / Backend / Step 7 | FR-H2..H5 | `bef0bb9` |
| C27 | Code + history routes, registry update | Part 2 / Backend / Step 8 | FR-C1..C4, FR-H2..H5 | `cfe9d3f` |
| C28 | Frontend language constants | Part 2 / Frontend / Step 1 | FR-C5 | `7c54158` |
| C29 | Code + history service functions | Part 2 / Frontend / Step 2 | FR-C1..C4, FR-H2..H5 | `f3f67ed` |
| C30 | CodeEditor + LanguageSelector | Part 2 / Frontend / Steps 3-4 | FR-C5 | `20a9c55` |
| C31 | OutputPanel | Part 2 / Frontend / Step 5 | FR-C1..C4 | `b665147` |
| C32 | HomePage workspace | Part 2 / Frontend / Step 6 | FR-C1..C5 | `b2e134c` |
| C33 | HistoryList + HistoryPage | Part 2 / Frontend / Steps 7-8 | FR-H2..H5 | `95384f3` |
| C34 | Final routing update + release v0.2.0 | Part 2 / Frontend / Step 9 + Summary | FR-C1..C5, FR-H1..H5 | `ab1c669` |
| H1 | Lint, format, commit hooks | Industry practice (not in guide) | NFR-M1 | `6c1cfe3` |
| H2 | Security hardening | Industry practice (not in guide) | NFR-S1..S4, FR-A3 | `c3b2297` |
| H3 | Observability and ops basics | Industry practice (not in guide) | NFR-O1 | `bf663b4` |
| H4 | Automated tests | Industry practice (not in guide) | NFR-T1 | `bc4e216` |
| H5 | CI/CD and repo governance | Industry practice (not in guide) | NFR-M1 | `fcea648` |
| H6 | Containerization | Industry practice (not in guide) | NFR-O1 | `82c3736` |
| H7 | Final documentation + release v1.0.0 | Industry practice (not in guide) | NFR-M1 | `pending` |
