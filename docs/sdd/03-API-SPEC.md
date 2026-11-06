# 03 - API Specification

Base URL: `/api`. All bodies JSON. Success: `{ "success": true, "data": ... }`. Error: `{ "success": false, "message": "..." }`.
Protected = header `Authorization: Bearer <jwt>`.

## Auth

| Method & path         | Auth | Body                    | Success                                           | Errors                                |
| --------------------- | ---- | ----------------------- | ------------------------------------------------- | ------------------------------------- |
| POST `/auth/register` | no   | `{name,email,password}` | 201 `{token,user}`                                | 400 missing fields, 409 email exists  |
| POST `/auth/login`    | no   | `{email,password}`      | 200 `{token,user}`                                | 400 missing, 401 invalid credentials  |
| POST `/auth/google`   | no   | `{credential}`          | 200 `{token,user}`                                | 400 missing, 401 invalid Google token |
| GET `/auth/me`        | yes  | -                       | 200 `{id,email,name,picture,lastLogin,createdAt}` | 401                                   |
| POST `/auth/logout`   | yes  | -                       | 200 `{message:"Logged out successfully"}`         | 401                                   |

`user` = `{ id, email, name, picture }`. Passwords and `googleId` are never returned.
Token payload: `{ id, email }`, expiry `JWT_EXPIRES_IN` (default 7d).

## Code operations (all protected)

| Endpoint               | Body                                     | `data`                                           |
| ---------------------- | ---------------------------------------- | ------------------------------------------------ |
| POST `/code/translate` | `{code, sourceLanguage, targetLanguage}` | `{translatedCode}`                               |
| POST `/code/analyze`   | `{code, language}`                       | `{timeComplexity, spaceComplexity, explanation}` |
| POST `/code/optimize`  | `{code, language}`                       | `{optimizedCode, suggestions}`                   |
| POST `/code/explain`   | `{code, language}`                       | `{explanation}`                                  |

Language ids: `c`, `cpp`, `csharp`, `java`, `python`.
Errors: 400 missing fields (translate: "code, sourceLanguage and targetLanguage are required."; others: "code and language are required."), 401, 502 AI failure / malformed AI output, 429 rate limit (H2).

## History (all protected, always scoped to the caller)

| Method & path                  | Notes                                | `data`                                               |
| ------------------------------ | ------------------------------------ | ---------------------------------------------------- |
| GET `/history?page=1&limit=10` | newest first, limit max 50           | `{entries[], totalEntries, totalPages, currentPage}` |
| DELETE `/history/clear`        | **must be registered before `/:id`** | `{deletedCount}`                                     |
| GET `/history/:id`             | 404 if not owner's                   | entry                                                |
| DELETE `/history/:id`          | 404 if not owner's                   | `{message:"Deleted"}`                                |

Entry: `{ _id, userId, type, inputCode, sourceLanguage, targetLanguage, output, createdAt, updatedAt }`.

## Ops (H3)

| GET `/health` | public | `{status:"ok", uptime, mongo:boolean}` |
| ------------- | ------ | -------------------------------------- |

## Status code policy

200 OK - 201 created - 400 validation - 401 unauthenticated/invalid credentials - 404 not found - 409 conflict - 422 semantic (E3) - 429 rate limited - 500 unexpected - 502 upstream AI failure.
