<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/atgora-forum/.github/main/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/atgora-forum/.github/main/assets/logo-light.svg">
  <img alt="ATgora Logo" src="https://raw.githubusercontent.com/atgora-forum/.github/main/assets/logo-dark.svg" width="120">
</picture>

# atgora-lexicons

**AT Protocol schemas for ATgora forums**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/badge/npm-%40atgora--forum%2Flexicons-blue)](https://github.com/atgora-forum/atgora-lexicons/packages)

</div>

---

## 🚧 Status: Pre-Alpha Development

AT Protocol lexicon schemas for the ATgora forum platform.

**Current phase:** Planning complete, schema design starting Q1 2026

---

## What is this?

The atgora-lexicons repo defines the **data format** for forum content on the AT Protocol. It produces:

1. **Lexicon JSON schemas** - AT Protocol record definitions
2. **TypeScript types** - Generated from schemas
3. **Zod validation schemas** - Runtime validation
4. **npm package** - `@atgora-forum/lexicons` used by atgora-api and atgora-web

**This is the source of truth** for all `forum.atgora.*` record types.

---

## Record Types (MVP)

**Core records:**
- `forum.atgora.topic.post` - Forum topics
- `forum.atgora.topic.reply` - Replies to topics
- `forum.atgora.interaction.reaction` - Reactions (likes, etc.)
- `forum.atgora.actor.preferences` - User moderation preferences (stored on user's PDS)

**Archive records (Phase 5):**
- `forum.atgora.archivedPost` - Migrated content from legacy forums

---

## Installation

```bash
# From GitHub Packages
npm config set @atgora-forum:registry https://npm.pkg.github.com
pnpm add @atgora-forum/lexicons
```

---

## Usage

```typescript
import { TopicPost, topicPostSchema } from '@atgora-forum/lexicons'

// TypeScript type
const post: TopicPost = {
  $type: 'forum.atgora.topic.post',
  title: 'Hello World',
  content: 'This is a forum topic',
  forum: 'did:plc:abc123',
  category: 'general',
  createdAt: new Date().toISOString()
}

// Runtime validation
const validated = topicPostSchema.parse(post)
```

---

## Development

**Prerequisites:**
- Node.js 24 LTS
- pnpm

**Setup:**
```bash
git clone https://github.com/atgora-forum/atgora-lexicons.git
cd atgora-lexicons
pnpm install
```

**Commands:**
```bash
pnpm test           # Validate schemas + run tests
pnpm test:schemas   # Validate lexicon JSON files
pnpm test:types     # Verify TypeScript generation
pnpm build          # Generate TypeScript types
```

---

## Versioning

**Independent semver** - Lexicons version separately from API/Web.

- **MAJOR:** Breaking schema changes (rare - create new record type instead)
- **MINOR:** Add optional fields
- **PATCH:** Documentation, no schema changes

**Breaking changes:** Create new lexicon ID (e.g., `forum.atgora.topic.postV2`)

See [standards/shared.md](https://github.com/atgora-forum/atgora-forum/blob/main/standards/shared.md#versioning--release-strategy) for full versioning strategy.

---

## License

**MIT** - Maximum adoption. We want the `forum.atgora.*` namespace to become a true open standard.

---

## Related Repositories

- **[atgora-api](https://github.com/atgora-forum/atgora-api)** - Consumes these types for validation
- **[atgora-web](https://github.com/atgora-forum/atgora-web)** - Uses types for API responses
- **[Organization](https://github.com/atgora-forum)** - All repos

---

## Community

- 🌐 **Website:** [atgora.forum](https://atgora.forum) (coming soon)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/orgs/atgora-forum/discussions)
- 📖 **AT Protocol Docs:** [atproto.com](https://atproto.com/)

---

© 2026 ATgora. Licensed under MIT.
