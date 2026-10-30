# 10 - Decisions and Deviations (ADR log)

The build follows the source guide strictly. Everything below is an intentional, documented difference.

| ID | Decision | Why |
|---|---|---|
| ADR-001 | Plain JavaScript (ESM), no TypeScript | the guide is JavaScript; keeps parity with its code |
| ADR-002 | JWT in `localStorage` (as in guide) | simplicity/teaching parity. Risk: XSS. Mitigate with CSP; future: httpOnly cookie + CSRF |
| ADR-003 | `GEMINI_MODEL` env var, default `gemini-2.5-flash` | guide hard-codes the model; models get retired, env swap needs no code change |
| ADR-004 | Google login links to an existing email account instead of a pure upsert on `googleId` (H2) | the guide's upsert throws a duplicate-email error when an email/password user later signs in with Google |
| ADR-005 | zod validation + rate limiting + helmet added in H2 | guide has only presence checks; no abuse protection on a paid AI endpoint |
| ADR-006 | History queries and `getHistoryEntry` always scoped by `userId` | prevents IDOR |
| ADR-007 | `DELETE /history/clear` (method fixed by us) | guide specifies the path, not the verb |
| ADR-008 | Register returns 201 | guide does not state it; REST convention |
| ADR-009 | 502 for upstream AI failures | distinguishes our bugs (500) from Gemini failures |
| ADR-010 | CSS files regenerated if the course starter styles are not available | the guide says styles are "provided"; they are not part of this pack |

Add new rows here whenever implementation diverges from the spec.
