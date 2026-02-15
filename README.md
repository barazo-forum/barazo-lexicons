# Barazo Lexicons

AT Protocol lexicon schemas and generated TypeScript types for the Barazo forum platform.

![Status: Alpha](https://img.shields.io/badge/status-alpha-orange)

## What is this?

[Lexicons](https://atproto.com/specs/lexicon) are the schema language of the AT Protocol. They define how data is structured, validated, and exchanged across the decentralized network. Every record stored on a user's PDS (Personal Data Server) must conform to a lexicon schema.

This package defines the `forum.barazo.*` namespace -- the data contract between a user's PDS and any Barazo AppView. Because the schemas live on the protocol layer, all forum data (topics, replies, reactions, preferences) is portable: users own their data and can move between AppViews without loss.

The package provides:

- JSON lexicon schema files (the source of truth)
- Generated TypeScript types with type guards and validators
- Zod validation schemas for runtime input validation
- Lexicon ID constants

## Lexicon Schemas

| Lexicon ID | Description | Key |
|---|---|---|
| `forum.barazo.topic.post` | Forum topic with title, markdown content, community, category, tags, and optional self-labels | `tid` |
| `forum.barazo.topic.reply` | Threaded reply to a topic or another reply, with root and parent references | `tid` |
| `forum.barazo.interaction.reaction` | Reaction to a topic or reply (e.g., like, heart), scoped to a community's configured set | `tid` |
| `forum.barazo.actor.preferences` | User-level moderation and safety preferences: maturity filter, muted words, blocked/muted accounts, cross-post defaults | `literal:self` |
| `forum.barazo.authForumAccess` | OAuth permission set granting repo access to all Barazo record collections | -- |
| `forum.barazo.defs` | Shared type definitions (reserved for future reusable types) | -- |

## Package Exports

### Generated Types

```typescript
import {
  ForumBarazoTopicPost,
  ForumBarazoTopicReply,
  ForumBarazoInteractionReaction,
  ForumBarazoActorPreferences,
} from "@barazo-forum/lexicons";

// Record type
type Post = ForumBarazoTopicPost.Record;

// Type guard
if (ForumBarazoTopicPost.isRecord(record)) {
  console.log(record.title);
}

// Lexicon validation
const result = ForumBarazoTopicPost.validateRecord(record);
```

### Zod Validation Schemas

```typescript
import {
  topicPostSchema,
  topicReplySchema,
  reactionSchema,
  actorPreferencesSchema,
} from "@barazo-forum/lexicons";

const result = topicPostSchema.safeParse(input);
if (result.success) {
  // result.data is typed as TopicPostInput
}
```

### Lexicon ID Constants

```typescript
import { LEXICON_IDS, ids } from "@barazo-forum/lexicons";

LEXICON_IDS.TopicPost       // "forum.barazo.topic.post"
LEXICON_IDS.TopicReply      // "forum.barazo.topic.reply"
LEXICON_IDS.Reaction        // "forum.barazo.interaction.reaction"
LEXICON_IDS.ActorPreferences // "forum.barazo.actor.preferences"
LEXICON_IDS.AuthForumAccess // "forum.barazo.authForumAccess"
```

### Raw Lexicon Schemas

```typescript
import { schemas } from "@barazo-forum/lexicons";
// Array of LexiconDoc objects for all forum.barazo.* schemas
```

## Installation

Configure GitHub Packages access in `.npmrc`:

```
@barazo-forum:registry=https://npm.pkg.github.com
```

Then install:

```bash
pnpm add @barazo-forum/lexicons
```

Workspace consumers (`barazo-api`, `barazo-web`) are already linked via pnpm workspace.

## Development

```bash
pnpm install
pnpm test          # Run tests (74 tests across 3 suites)
pnpm build         # Compile TypeScript
pnpm generate      # Regenerate types from lexicon JSON
pnpm lint          # Lint
pnpm typecheck     # Type check
```

## Related Repositories

- [barazo-api](https://github.com/barazo-forum/barazo-api) -- AppView backend (AGPL-3.0)
- [barazo-web](https://github.com/barazo-forum/barazo-web) -- Forum frontend (MIT)
- [barazo-deploy](https://github.com/barazo-forum/barazo-deploy) -- Docker Compose deployment templates (MIT)
- [barazo-forum](https://github.com/barazo-forum) -- GitHub organization

## License

MIT
