# ANTIGRAVITY.md - Agent operating rules

You are building **Smart Code Translator** inside this repository. Work ONE chunk at a time from `PROMPTS.md`.

## Before every chunk
1. Read `CONTEXT.md`, then the spec files named in the chunk's "Spec" line (`docs/sdd/*`).
2. Run `git pull --rebase origin main` and confirm a clean working tree (`git status`).
3. Confirm the chunk's prerequisites are done (checked in `CONTEXT.md`).

## While coding
- Implement ONLY what the chunk lists. Do not refactor unrelated files. Do not add packages that the chunk does not name.
- Follow the guide's naming exactly (e.g. `User.model.js`, `auth.service.js`, `emailLogin`, `STARTER_CODE`).
- ESM only, `.js` extensions on relative imports, async/await, no callbacks, no `var`.
- Never hard-code secrets; read from `process.env` / `import.meta.env`.
- Never log passwords, tokens, API keys or user code bodies.
- Keep functions small and single-purpose; comment the WHY, not the WHAT.
- If the spec and the prompt disagree, STOP and ask; do not guess.

## Verification (mandatory)
Run every command under the chunk's "Verify" block. If anything fails, fix it before committing. Report the actual output.

## Git protocol (mandatory, after EVERY chunk)
```
git pull --rebase origin main
git status                       # review: only expected files changed
git add <paths listed in the chunk> CONTEXT.md
git commit -m "<exact message from the chunk>"
git push origin main
```
- Update `CONTEXT.md` (tick the chunk, move "Current chunk") in the same commit.
- Never `git add .` blindly, never `--force`, never commit `.env`, `node_modules`, `dist`.
- If the push is rejected: `git pull --rebase origin main`, resolve, re-run Verify, push again.
- A fix to an earlier chunk is its own `fix(scope): ...` commit.

## Branches
Only for chunks `E1-E4` (optional extensions): `git switch -c <branch>` -> commit -> `git push -u origin <branch>` ->
`gh pr create --fill --base main` -> `gh pr merge --squash --delete-branch`. Everything else goes straight to `main`.

## Definition of done (per chunk)
Code works - Verify passes - lint clean (once H1 exists) - docs/spec updated if behaviour changed - committed - pushed - CONTEXT.md ticked.

## Stop and report
End each chunk with: files changed, verify output summary, commit hash, next chunk ID. Then WAIT for the next prompt.
