# 09 - Git Workflow

## Model: trunk-based, solo-friendly
- `main` is always working and deployable. **Every chunk is committed and pushed to `main`.**
- Branches are created ONLY when truly needed:
  1. optional/experimental extensions (`E1-E4`) -> `feat/<name>`
  2. a risky change you may abandon -> `spike/<name>`
  3. an emergency fix while `main` is mid-chunk -> `hotfix/<name>`
- Branch lifetime: hours to a couple of days. Merge with **squash**, delete the branch.
- No long-lived `develop` branch. No force-push to `main`.

## Commit convention (Conventional Commits, enforced by commitlint from H1)
`<type>(<scope>): <imperative subject, <= 72 chars>`
types: feat fix docs style refactor perf test build ci chore revert - scopes: server, client, security, deps (or none)

## Per-chunk loop
```
git pull --rebase origin main
# ...work + verify...
git status
git add <specific paths> CONTEXT.md
git commit -m "feat(server): ..."
git push origin main
```

## Releases (SemVer, annotated tags)
| Tag | Meaning |
|---|---|
| v0.1.0 | Part 1 - authentication |
| v0.2.0 | Part 2 - AI features + history |
| v1.0.0 | hardened baseline (security, tests, CI, Docker) |
Patch fixes after release: `v1.0.1`, ... Create GitHub releases with `gh release create`.

## Branch protection (after H5)
`main`: require status checks `server` + `client`; admin bypass enabled so solo pushes keep working; no force pushes; no deletions.

## Never commit
`.env*` (except `.env.example`), `node_modules`, `dist`, coverage, logs, API keys, personal data.
