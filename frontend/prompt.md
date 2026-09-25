# Frontend rulebook

Before implementing or modifying frontend code, read and follow this file.

## Purpose and boundaries

This is a maintainable React/TypeScript frontend foundation for Mini Issue Tracker. Do not add business features until requested. Keep backend, docs outside this folder, and `.github/` untouched.

## Architecture

Use feature-oriented folders: routes compose features, features own domain logic, shared components and hooks remain generic, and `lib/` contains infrastructure. TanStack Router is the only router and its generated route tree must be produced by the Vite plugin. TanStack Query owns server state and cache invalidation. Use one Axios client in `src/lib/axios.ts`; UI components never call Axios directly.

## UI and accessibility

Use local shadcn/Radix primitives in `src/components/ui/` as they are added. Use semantic tokens from `src/index.css`, Tailwind utilities, responsive composition, visible focus, labels, keyboard support, and meaningful loading/error/empty states. Do not use arbitrary colors or build feature logic into generic primitives.

## Forms, testing, and security

Use React Hook Form with Zod schemas. Test behavior with Vitest and Testing Library. Never put secrets in Vite variables; frontend authorization is only a UX concern and the backend remains authoritative.

## Workflow and Definition of Done

Read this file and the relevant skill guide, inspect existing reusable code, make the smallest feature-oriented change, cover loading/error/empty behavior, check accessibility and responsive behavior, add behavior tests, update documentation for meaningful patterns, and run lint, build, and test. A change is done when it is typed, tested where useful, documented when needed, and introduces no duplicate architecture.
