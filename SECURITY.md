# Security Policy

## Reporting a vulnerability

Do not open a public issue. Use GitHub **Security -> Report a vulnerability** on this repository.
You will get an acknowledgement within 72 hours.

## Secrets

Never commit `.env` files, API keys, JWT secrets or database URIs. If a secret leaks: rotate it immediately,
then purge it from git history.

## Known accepted trade-offs

- JWT is stored in `localStorage` (as taught in the source guide). Mitigations: strict CSP via helmet, no
  `dangerouslySetInnerHTML`, 7-day expiry. Migration path: httpOnly cookie + CSRF token (see ADR-002).
