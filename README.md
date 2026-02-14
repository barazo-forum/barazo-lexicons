# @barazo-forum/lexicons

AT Protocol lexicon schemas and generated TypeScript types for the Barazo forum platform. Defines the `forum.barazo.*` namespace with record types for topics, replies, reactions, and user preferences.

**Status:** Alpha -- All MVP lexicon schemas defined, published to GitHub Packages

## What is this?

Lexicons are AT Protocol schemas that define the data model for Barazo forums. They specify what a topic, reply, reaction, and user preferences record looks like in the AT Protocol ecosystem. These schemas are the contract between the user's PDS (Personal Data Server) and the Barazo AppView, ensuring all forum data is portable and interoperable.

This package provides:
- JSON lexicon schema files (the source of truth)
- Generated TypeScript types with type guards and validators
- Zod validation schemas for runtime input validation
- Lexicon IDs as constants

## Installation

For npm consumers outside the workspace, configure GitHub Packages access in `.npmrc`:

```
@barazo-forum:registry=https://npm.pkg.github.com
```

Then install:

```bash
pnpm add @barazo-forum/lexicons
```

For workspace consumers (`barazo-api`, `barazo-web`): already linked via pnpm workspace.

## Usage

### Generated Types

```typescript
import { ForumBarazoTopicPost } from "@barazo-forum/lexicons";

// Type for a topic post record
type Post = ForumBarazoTopicPost.Record;

// Type guard
if (ForumBarazoTopicPost.isRecord(record)) {
  console.log(record.title);
}

// Validate against lexicon schema
const result = ForumBarazoTopicPost.validateRecord(record);
```

### Zod Validation

```typescript
import { topicPostSchema } from "@barazo-forum/lexicons";

const result = topicPostSchema.safeParse(input);
if (result.success) {
  // result.data is typed as TopicPostInput
}
```

### Lexicon IDs

```typescript
import { LEXICON_IDS, ids } from "@barazo-forum/lexicons";

LEXICON_IDS.TopicPost // "forum.barazo.topic.post"
ids.ForumBarazoTopicPost // "forum.barazo.topic.post"
```

### Raw Lexicon Schemas

```typescript
import { schemas } from "@barazo-forum/lexicons";
// Array of LexiconDoc objects for all forum.barazo.* schemas
```

### Permission Set (OAuth Scopes)

The package includes a permission set lexicon for AT Protocol OAuth. When the protocol's permission set system is fully deployed, clients will request `include:forum.barazo.authForumAccess` as an OAuth scope instead of `transition:generic`.

```typescript
import { LEXICON_IDS } from "@barazo-forum/lexicons";

LEXICON_IDS.AuthForumAccess // "forum.barazo.authForumAccess"
```

The permission set declares `repo` access for all four record collections. Blob permissions (for future media attachments) must be requested separately per the AT Protocol spec.

## Record Types

| Lexicon ID | Description | Key Type |
|------------|-------------|----------|
| `forum.barazo.topic.post` | Forum topic/thread (title, content, community, category, tags, labels) | `tid` |
| `forum.barazo.topic.reply` | Reply to a topic (content, root ref, parent ref, community) | `tid` |
| `forum.barazo.interaction.reaction` | Reaction to content (subject ref, type, community) | `tid` |
| `forum.barazo.actor.preferences` | User preferences singleton (maturity level, muted words, blocked DIDs, cross-post defaults) | `literal:self` |

## Permission Set

| Lexicon ID | Description |
|------------|-------------|
| `forum.barazo.authForumAccess` | OAuth permission set granting repo access to all Barazo record collections |

## Development

```bash
pnpm install
pnpm test          # Run tests
pnpm build         # Compile TypeScript
pnpm generate      # Regenerate types from lexicon JSON
pnpm lint          # Lint
pnpm typecheck     # Type check
```

## Related Repositories

- **[barazo-api](https://github.com/barazo-forum/barazo-api)** -- Backend (AGPL-3.0)
- **[barazo-web](https://github.com/barazo-forum/barazo-web)** -- Frontend (MIT)
- **[barazo-deploy](https://github.com/barazo-forum/barazo-deploy)** -- Deployment templates (MIT)
- **[Organization](https://github.com/barazo-forum)** -- All repos

## License

MIT
