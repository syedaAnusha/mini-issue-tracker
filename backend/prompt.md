# Backend Development Rulebook

> Before implementing or modifying backend code, read and follow this file.

## Purpose and Scope

The Mini Issue Tracker backend is a portfolio-quality Node.js service. This backend is a modular monolith: one deployable Express application with explicit domain boundaries. Business features are added incrementally; the current foundation intentionally exposes only health and API documentation.

## Stack

- Node.js and strict TypeScript
- Express 5
- PostgreSQL through Prisma
- Zod for external input and environment validation
- Argon2 reserved for password hashing when authentication is implemented
- HTTP-only, server-managed cookies planned for browser sessions
- OpenAPI and Swagger UI
- Vitest and Supertest
- ESLint and Prettier

Do not add alternative frameworks, ORMs, databases, JWT authentication, queues, caches, or dependency-injection frameworks without a demonstrated requirement.

## Architecture

The request flow is `middleware -> routes -> controllers -> services -> repositories/data access -> Prisma`. Routes define HTTP composition, controllers translate HTTP, services own business rules, and repositories encapsulate database access when an explicit boundary is useful. Shared infrastructure belongs in `config`, `lib`, `middleware`, or `utils`; `utils` is for genuinely reusable pure helpers.

Modules own their domain logic. Avoid route-to-route, service-to-route, repository-to-controller, and database-to-HTTP dependencies. Avoid circular imports, giant services, generic repository frameworks, and abstractions that do not remove real complexity.

`src/app.ts` creates and configures the Express application and exports it for tests. `src/server.ts` starts the listener and owns graceful shutdown. Do not call `listen()` from `app.ts`.

## Naming and Files

Use predictable lowercase dotted names such as `user.service.ts`, `issue.routes.ts`, and `auth.schema.ts`. Create feature files only when that feature exists. Do not scaffold empty business modules.

## Configuration and Security

Read environment variables through the Zod-validated central config. Never scatter `process.env` access through application code. Never commit `.env`, credentials, tokens, or private keys. Use Helmet, configured CORS, bounded JSON bodies, safe error responses, and structured logs that exclude secrets and credentials.

Authentication will use Argon2 and secure HTTP-only server-managed cookies, with environment-aware `Secure`, `SameSite`, expiry, and path settings. Before implementing cookie-authenticated state-changing endpoints, choose and document CSRF protection. Apply rate limiting specifically to registration, login, password, and other sensitive operations when those features are added. Authorization remains a backend responsibility.

## API Conventions

Use REST under `/api`. Use standard HTTP methods and status codes. Single resources use `{ "data": ... }`; collections use `{ "data": [], "meta": { "page": 1, "pageSize": 20, "total": 0 } }` where pagination applies. Errors use `{ "error": { "code": "...", "message": "...", "details": {} } }`. Unknown routes and unexpected errors are handled centrally. Validate bodies, params, and queries with Zod.

Use `page` and `pageSize` for future collections, with bounded defaults and maximums. Future issue lists may add search, status, priority, assignee, and sort parameters without changing the response envelope.

## Database

PostgreSQL is the production database and Prisma is the only ORM/data-access integration. Evolve `prisma/schema.prisma` through reviewed `prisma migrate` migrations. Do not use `db push` as the normal workflow. Keep development and test databases separate. Add explicit relations, constraints, timestamps, and indexes as features require them; use transactions for multi-write invariants and avoid N+1 queries.

## Testing and Workflow

`app.ts` must remain importable without starting a server. Use Supertest for HTTP behavior and Vitest for unit and integration tests. Test behavior and contracts, not implementation details. Every significant bug gets a regression test where practical.

For a feature: read this file and the relevant skill, inspect existing infrastructure, define the API and validation contract, make database changes, implement service/data access/controller/routes, document OpenAPI, add tests, run typecheck, lint, format check, tests, and build, then review security and documentation.

For a bug: reproduce it, identify the root cause, make the smallest correct change, add a regression test, run typecheck/lint/tests/build, and update documentation if a reusable rule was learned.

## Definition of Done

Code is complete when it is strict, tested, documented, formatted, linted, buildable, secure by default, and limited to the requested behavior. No business feature is complete without its API contract, validation, data boundary, error behavior, OpenAPI entry, tests, and security review.
