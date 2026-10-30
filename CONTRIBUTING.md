# Contributing

1. Read `docs/sdd/09-GIT-WORKFLOW.md` (trunk-based: commits go to `main`; branches only for optional/experimental work).
2. Commits follow **Conventional Commits**: `type(scope): subject` - types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert.
3. One logical change per commit. Never mix feature code with formatting.
4. Before pushing: `npm run lint` and `npm test` in the package you touched.
5. Spec first: if behaviour changes, update `docs/sdd/*` in the SAME commit.
