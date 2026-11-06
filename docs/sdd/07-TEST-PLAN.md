# 07 - Test Plan

## Part 1 acceptance (manual, run in C19)

- [x] Visit `/` logged out -> redirected to `/login`
- [x] Register new user -> lands on `/`, name visible
- [x] Register same email again -> error toast "Email already registered."
- [x] Password < 6 chars -> blocked with toast
- [x] Logout -> `/login`; login with same credentials works
- [x] Wrong password -> "Invalid email or password."
- [x] Google sign-in works for a new and a returning account
- [x] Refresh while logged in -> still logged in
- [x] Delete token in DevTools -> next protected action sends you to `/login`
- [x] `GET /api/auth/me` without token -> 401; unknown route -> 404 envelope

## Part 2 acceptance (manual, run in C34)

- [x] Translate Python -> Java returns plain Java (no markdown fences)
- [x] Swap moves translated code into the editor and swaps languages
- [x] Analyze `for i in range(n): pass` -> Time O(n), Space O(1)
- [x] Optimize shows optimized code + suggestions
- [x] Explain shows beginner-friendly text
- [x] Copy button copies the right text per action and shows "Copied!" for 2 s
- [x] Each operation appears in History within a second, newest first
- [x] Pagination appears only with > 8 entries; Prev/Next bounds respected
- [x] Delete one removes it and closes its detail; Clear all asks for confirmation
- [x] User B cannot read/delete User A's entry by id (404)
- [x] `DELETE /api/history/clear` does not get captured by `/:id`
- [x] Gemini failure -> friendly toast, app stays usable

## Automated (H4)

| Layer                          | Tests                                                                           | Status          |
| ------------------------------ | ------------------------------------------------------------------------------- | --------------- |
| server unit                    | prompts.utils (fenced/plain/invalid), jwt.utils (round trip, tamper), languages | PASS (15 tests) |
| server integration (supertest) | health 200, 404 envelope, 401 without token, register validation 400            | PASS (4 tests)  |
| client unit                    | ProtectedRoute redirect/render, OutputPanel all five states                     | PASS (8 tests)  |

CI runs lint + tests + build on every push and PR. Coverage target >= 70% on touched utils/services.
