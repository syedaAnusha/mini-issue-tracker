# Mini Issue Tracker Backend

The backend is a TypeScript Express modular monolith that provides the foundation for the Mini Issue Tracker. The current API intentionally contains no business features: it exposes `GET /api/health` and Swagger UI at `/api/docs`.

## Stack

Node.js, Express, PostgreSQL, Prisma, Zod, Argon2, HTTP-only cookie session architecture, OpenAPI/Swagger UI, Vitest, Supertest, ESLint, and Prettier.

## Setup

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Set `DATABASE_URL`, `SESSION_SECRET`, and `CORS_ORIGIN` in `.env`. `SESSION_SECRET` must be at least 32 characters. The current empty Prisma schema only establishes the PostgreSQL integration; migrations are added with features.

## Commands

| Command                | Purpose                                    |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Run the development server with watch mode |
| `npm run build`        | Compile strict TypeScript to `dist/`       |
| `npm run start`        | Start the compiled server                  |
| `npm run lint`         | Run ESLint                                 |
| `npm run format`       | Format tracked project files               |
| `npm run format:check` | Verify Prettier formatting                 |
| `npm run typecheck`    | Run TypeScript without emitting            |
| `npm run test:run`     | Run the test suite once                    |
| `npm run test`         | Run Vitest in watch mode                   |
| `npm run db:generate`  | Generate Prisma Client                     |
| `npm run db:migrate`   | Create/apply a development migration       |
| `npm run db:studio`    | Open Prisma Studio                         |

## Architecture

`src/app.ts` creates the testable Express app and registers security middleware, bounded JSON parsing, cookies, CORS, routes, Swagger UI, 404 handling, and centralized errors. `src/server.ts` owns listening and graceful Prisma shutdown. Future domain modules belong under `src/modules/` and follow routes, controllers, services, and explicit data-access boundaries.

## Database

PostgreSQL is configured through Prisma. Change `prisma/schema.prisma`, run `npm run db:migrate`, review the generated migration, and commit migrations. Do not use `db push` as the normal workflow. Keep the test database separate from development.

## Security

Environment variables are validated by Zod. Helmet, explicit CORS, request limits, safe error formatting, structured logs, and one Prisma client are configured. Argon2 and secure HTTP-only, server-managed cookies are reserved for the authentication phase; registration, login, sessions, CSRF protection, authorization, and rate limiting are not implemented yet.

## Documentation

- `prompt.md` is the authoritative backend rulebook.
- `skills/` contains focused architecture, API, database, security, testing, and feature workflow guides.
- `/api/docs` documents only the endpoint that currently exists.
