# 07 - Test Plan

## Part 1 acceptance (manual, run in C19)
- [ ] Visit `/` logged out -> redirected to `/login`
- [ ] Register new user -> lands on `/`, name visible
- [ ] Register same email again -> error toast "Email already registered."
- [ ] Password < 6 chars -> blocked with toast
- [ ] Logout -> `/login`; login with same credentials works
- [ ] Wrong password -> "Invalid email or password."
- [ ] Google sign-in works for a new and a returning account
- [ ] Refresh while logged in -> still logged in
- [ ] Delete token in DevTools -> next protected action sends you to `/login`
- [ ] `GET /api/auth/me` without token -> 401; unknown route -> 404 envelope

## Part 2 acceptance (manual, run in C34)
- [ ] Translate Python -> Java returns plain Java (no markdown fences)
- [ ] Swap moves translated code into the editor and swaps languages
- [ ] Analyze `for i in range(n): pass` -> Time O(n), Space O(1)
- [ ] Optimize shows optimized code + suggestions
- [ ] Explain shows beginner-friendly text
- [ ] Copy button copies the right text per action and shows "Copied!" for 2 s
- [ ] Each operation appears in History within a second, newest first
- [ ] Pagination appears only with > 8 entries; Prev/Next bounds respected
- [ ] Delete one removes it and closes its detail; Clear all asks for confirmation
- [ ] User B cannot read/delete User A's entry by id (404)
- [ ] `DELETE /api/history/clear` does not get captured by `/:id`
- [ ] Gemini failure -> friendly toast, app stays usable

## Automated (H4)
| Layer | Tests |
|---|---|
| server unit | prompts.utils (fenced/plain/invalid), jwt.utils (round trip, tamper), languages |
| server integration (supertest, AI mocked) | health 200, 404 envelope, 401 without token, register validation 400, history isolation |
| client unit | ProtectedRoute redirect/render, OutputPanel all five states |

CI runs lint + tests + build on every push and PR. Coverage target >= 70% on touched utils/services.
