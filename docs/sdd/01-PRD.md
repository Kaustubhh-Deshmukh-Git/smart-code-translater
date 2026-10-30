# 01 - Product Requirements

## Problem
Knowing one language does not make you productive in another. Manual rewrites are slow and error-prone; searching syntax
fragments context; docs have a steep curve; colleagues are not always available.

## Solution
A 24/7 AI assistant that translates code between languages, analyzes complexity, suggests optimizations and explains code in plain English.

## Users
- **Developer switching stacks** - needs fast, idiomatic translation.
- **Student** - needs beginner-friendly explanations and Big-O analysis.

## Scope
In: auth, 4 AI operations, history, 5 languages (C, C++, C#, Java, Python).
Out (v1): teams/sharing, billing, running code, file uploads, languages beyond the 5 (see optional E1).

## Functional requirements

### Authentication (Part 1)
| ID | Requirement | Acceptance criteria |
|---|---|---|
| FR-A1 | Register with name, email, password | 201 + `{token,user}`; duplicate email -> 409; missing fields -> 400; password stored as bcrypt hash (10 rounds); user auto-logged-in on the client |
| FR-A2 | Login with email/password | 200 + `{token,user}`; wrong email OR password -> identical 401 message; Google-only accounts cannot use password login |
| FR-A3 | Google sign-in | Valid Google ID token -> 200 + `{token,user}`; new users created, returning users updated; invalid token -> 401 |
| FR-A4 | Protected access | Unauthenticated visit to `/` or `/history` redirects to `/login`; protected API without token -> 401 |
| FR-A5 | Session restore | On page refresh the stored token is validated via `GET /api/auth/me`; invalid token is cleared |
| FR-A6 | Logout | Token removed client-side; `POST /api/auth/logout` returns success; user lands on `/login` |

### Code operations (Part 2)
| ID | Requirement | Acceptance criteria |
|---|---|---|
| FR-C1 | Translate between the 5 languages | Returns `{translatedCode}` as plain code (no markdown fences), includes needed imports/headers |
| FR-C2 | Complexity analysis | Returns `{timeComplexity,spaceComplexity,explanation}` in Big-O notation |
| FR-C3 | Optimization | Returns `{optimizedCode,suggestions}`, functionality preserved |
| FR-C4 | Explanation | Returns `{explanation}` in beginner-friendly language |
| FR-C5 | Editor UX | Monaco editor with syntax highlighting; starter code per language; source/target selectors; swap (translate only); copy output with 2s feedback |

### History (Part 2)
| ID | Requirement | Acceptance criteria |
|---|---|---|
| FR-H1 | Auto-save operations | Every successful operation is stored without delaying the response (fire-and-forget) |
| FR-H2 | Paginated list | Newest first, 8 per page in UI (API default 10, max 50); pagination only when >1 page |
| FR-H3 | View detail | Shows input code and output formatted per operation type |
| FR-H4 | Delete one | Removes entry; closes detail if open; list refreshes |
| FR-H5 | Clear all | Requires confirmation dialog; removes only the current user's entries |

## Non-functional requirements
See [06-SECURITY-NFR](06-SECURITY-NFR.md).

## Definition of done (project)
All FR acceptance criteria pass - CI green - lint clean - tests passing - README complete - v1.0.0 tagged.
