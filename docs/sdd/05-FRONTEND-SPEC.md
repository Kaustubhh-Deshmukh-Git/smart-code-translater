# 05 - Frontend Specification

## Routes

| Path       | Access                                 | Renders              |
| ---------- | -------------------------------------- | -------------------- |
| `/login`   | public (redirects to `/` if logged in) | LoginPage            |
| `/`        | protected                              | Navbar + HomePage    |
| `/history` | protected                              | Navbar + HistoryPage |
| `*`        | -                                      | redirect to `/`      |

## Global state

`AuthContext` -> `{ user, loading, login(token,user), logout() }`. Token in `localStorage["token"]`.
`loading` is true until the session check finishes; `ProtectedRoute` shows a spinner meanwhile.

## HomePage behaviour

- 4 action tabs: translate | analyze | optimize | explain (switching clears result)
- Source language selector + Monaco editor (starter code loads on language change)
- Translate only: target selector + swap button (moves translated code into the editor)
- Run -> calls the matching service; spinner while loading; errors as toasts
- Copy output with 2-second "Copied!" state

## OutputPanel rendering

| action    | rendering                          |
| --------- | ---------------------------------- |
| none      | empty-state hint                   |
| translate | read-only editor (target language) |
| analyze   | Time card, Space card, explanation |
| optimize  | read-only editor + suggestions     |
| explain   | readable text                      |

## HistoryPage behaviour

Sidebar list (8/page, newest first) + detail panel. Delete (no confirm), Clear all (confirm dialog), pagination only if >1 page.

## UX / quality rules

- Every async action has loading + error state; buttons disabled while loading
- Toasts for success/failure (react-hot-toast), position top-right
- Responsive down to 360px; semantic HTML; labels on inputs/selects; visible focus states
- No inline secrets; env via `import.meta.env.VITE_*`
- No `dangerouslySetInnerHTML` anywhere
