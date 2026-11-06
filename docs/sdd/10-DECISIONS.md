# 10 - Decisions and Deviations (ADR log)

The build follows the source guide strictly. Everything below is an intentional, documented difference.

| ID      | Decision                                                                                    | Why                                                                                                                             |
| ------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ADR-001 | Plain JavaScript (ESM), no TypeScript                                                       | the guide is JavaScript; keeps parity with its code                                                                             |
| ADR-002 | JWT in `localStorage` (as in guide)                                                         | simplicity/teaching parity. Risk: XSS. Mitigate with CSP; future: httpOnly cookie + CSRF                                        |
| ADR-003 | `GEMINI_MODEL` env var, default `gemini-2.5-flash`                                          | guide hard-codes the model; models get retired, env swap needs no code change                                                   |
| ADR-004 | Google login links to an existing email account instead of a pure upsert on `googleId` (H2) | the guide's upsert throws a duplicate-email error when an email/password user later signs in with Google                        |
| ADR-005 | zod validation + rate limiting + helmet added in H2                                         | guide has only presence checks; no abuse protection on a paid AI endpoint                                                       |
| ADR-006 | History queries and `getHistoryEntry` always scoped by `userId`                             | prevents IDOR                                                                                                                   |
| ADR-007 | `DELETE /history/clear` (method fixed by us)                                                | guide specifies the path, not the verb                                                                                          |
| ADR-008 | Register returns 201                                                                        | guide does not state it; REST convention                                                                                        |
| ADR-009 | 502 for upstream AI failures                                                                | distinguishes our bugs (500) from Gemini failures                                                                               |
| ADR-010 | CSS files regenerated if the course starter styles are not available                        | the guide says styles are "provided"; they are not part of this pack                                                            |
| ADR-011 | Override DOMPurify to ^3.4.17 in client package.json                                        | Monaco Editor bundle pulled DOMPurify <= 3.4.16 with GHSA-p98j-92pf-mc4p vulnerability; npm override forces the patched version |

Add new rows here whenever implementation diverges from the spec.

## ADR-004: Account Linking on Google SSO

- **Context:** If a user registers with email/password, a later sign-in with Google carrying the same verified email would fail with a MongoDB duplicate key error (`E11000`) under a naive `googleId` upsert.
- **Decision:** Implement multi-step account resolution:
  1. Check for an existing account matching `googleId`.
  2. If absent, check for an existing account matching `email` and link `googleId` and `picture`.
  3. If neither exists, create a new user document.
  4. In the event of a concurrent creation race condition (`E11000`), retry the lookup by `googleId` or `email` and safely link.
- **Consequence:** Seamless sign-in experience across authentication providers without account collision or duplicate registration failures.
