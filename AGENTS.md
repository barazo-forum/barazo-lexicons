# Barazo Lexicons -- Schema Definitions

<!-- Auto-generated from barazo-workspace. To propose changes, edit the source:
     https://github.com/barazo-forum/barazo-workspace/tree/main/agents-md -->

MIT | Part of [github.com/barazo-forum](https://github.com/barazo-forum)

Lexicon schemas for the Barazo forum platform. Defines all `forum.barazo.*` record types and generates TypeScript types consumed by barazo-api and barazo-web.

## Namespace

`forum.barazo.*`

## What This Repo Does

- Defines AT Protocol lexicon schemas (JSON files) for all forum record types
- Generates TypeScript types from lexicon schemas
- Published as an npm package consumed by barazo-api and barazo-web
- Schemas are the contract between users' PDSs, the AppView, and any frontend

## Core Record Types (MVP)

- `forum.barazo.topic.post` -- main thread posts
- `forum.barazo.topic.reply` -- replies to threads
- `forum.barazo.interaction.reaction` -- reactions (configurable per forum)

Categories are AppView-only (admin-managed, stored in PostgreSQL), not PDS records.

## Lexicon-Specific Standards

- Schema-first -- lexicon JSON files are the source of truth; TypeScript types are generated, never hand-written
- Backwards compatibility -- once published, fields can be added but never removed or changed
- Follow AT Protocol lexicon conventions (see [AT Protocol Lexicon spec](https://atproto.com/specs/lexicon))
- Strict TypeScript -- `strict: true`, no `any`, no `@ts-ignore`

---

## Project-Wide Standards

### About Barazo

Federated forum built on the [AT Protocol](https://atproto.com/). Portable identity, user-owned data, cross-community reputation.

- **Organization:** [github.com/barazo-forum](https://github.com/barazo-forum)
- **License:** AGPL-3.0 (backend) / MIT (frontend, lexicons, deploy, website)
- **Contributing:** See [CONTRIBUTING.md](https://github.com/barazo-forum/.github/blob/main/CONTRIBUTING.md)

### Coding Standards

1. **Test-Driven Development** -- write tests before implementation (Vitest).
2. **Strict TypeScript** -- `strict: true`, no `any`, no `@ts-ignore`.
3. **Conventional commits** -- `type(scope): description`.
4. **CI must pass** -- lint, typecheck, tests, security scan on every PR.
5. **Input validation** -- Zod schemas on all API inputs and firehose records.
6. **Output sanitization** -- DOMPurify on all user-generated content.
7. **No raw SQL** -- Drizzle ORM with parameterized queries only.
8. **Structured logging** -- Pino logger, never `console.log`.
9. **Accessibility** -- WCAG 2.2 AA, semantic HTML, keyboard navigable.

### Git Workflow

All changes go through Pull Requests -- never commit directly to `main`. Branch naming: `type/short-description` (e.g., `feat/add-reactions`, `fix/xss-sanitization`).

### AT Protocol Context

- Users own their data (stored on their Personal Data Server)
- The AppView (barazo-api) indexes data from the AT Protocol firehose
- Lexicons (`forum.barazo.*`) define the data schema contract
- Identity is portable via DIDs -- no vendor lock-in
- All record types are validated against lexicon schemas
