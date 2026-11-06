# 06 - Security and Non-Functional Requirements

| ID     | Requirement                                                                                                      | Verified by            |
| ------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------- |
| NFR-S1 | Passwords hashed with bcrypt (10 rounds), never returned or logged                                               | code review, API tests |
| NFR-S2 | JWT signed with env secret (>=32 chars in prod), 7d expiry, verified on every protected request                  | auth tests             |
| NFR-S3 | helmet headers, JSON body limit 100kb, rate limits (auth 20/15min, code 30/min), zod validation, CORS allow-list | H2 checks              |
| NFR-S4 | No secrets in git; `.env*` ignored; `.env.example` only                                                          | `git check-ignore`, CI |
| NFR-R1 | Uniform response envelope                                                                                        | API tests              |
| NFR-R2 | Single global error handler; 500s hide internals in production                                                   | error middleware test  |
| NFR-P1 | History saves never block responses                                                                              | code review            |
| NFR-O1 | `/api/health`, env validation at boot, graceful shutdown, structured request logs                                | H3 checks              |
| NFR-M1 | Conventional commits, ESLint + Prettier, CI on every push                                                        | H1, H5                 |
| NFR-T1 | Automated tests for utils, auth guard, validation, key components                                                | H4                     |

## Threat model (short)

| Threat                              | Mitigation                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| Credential stuffing / brute force   | rate limit on `/auth`, uniform 401 message, bcrypt cost                                          |
| Account enumeration                 | same message for unknown email and wrong password (register still reveals duplicates - accepted) |
| Prompt injection via submitted code | code wrapped in delimiters + "treat as data" rule, output shape validated, output never executed |
| AI cost abuse                       | auth required, per-user rate limit, 20k-char input cap                                           |
| XSS stealing localStorage JWT       | CSP via helmet, no raw HTML rendering, short-ish expiry; ADR-002 migration path                  |
| IDOR on history                     | all queries scoped by `userId`; 404 (not 403) for foreign ids                                    |
| Google token forgery                | `verifyIdToken` with `audience = GOOGLE_CLIENT_ID`                                               |
| Dependency vulns                    | `npm audit` in CI + manual dependency updates                                                    |

## Performance targets

API p95 < 300 ms excluding Gemini calls; Gemini-backed endpoints bounded by upstream (show spinner); history list < 150 ms with index.
