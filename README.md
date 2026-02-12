# @atgora-forum/lexicons

AT Protocol lexicon schemas and generated TypeScript types for the ATgora forum platform. Defines the `forum.atgora.*` namespace with record types for topics, replies, reactions, and user preferences.

## Installation

For npm consumers outside the workspace, configure GitHub Packages access in `.npmrc`:

```
@atgora-forum:registry=https://npm.pkg.github.com
```

Then install:

```bash
pnpm add @atgora-forum/lexicons
```

For workspace consumers (`atgora-api`, `atgora-web`): already linked via pnpm workspace.

## Usage

### Generated Types

```typescript
import { ForumAtgoraTopicPost } from "@atgora-forum/lexicons";

// Type for a topic post record
type Post = ForumAtgoraTopicPost.Record;

// Type guard
if (ForumAtgoraTopicPost.isRecord(record)) {
  console.log(record.title);
}

// Validate against lexicon schema
const result = ForumAtgoraTopicPost.validateRecord(record);
```

### Zod Validation

```typescript
import { topicPostSchema } from "@atgora-forum/lexicons";

const result = topicPostSchema.safeParse(input);
if (result.success) {
  // result.data is typed as TopicPostInput
}
```

### Lexicon IDs

```typescript
import { LEXICON_IDS, ids } from "@atgora-forum/lexicons";

LEXICON_IDS.TopicPost // "forum.atgora.topic.post"
ids.ForumAtgoraTopicPost // "forum.atgora.topic.post"
```

### Raw Lexicon Schemas

```typescript
import { schemas } from "@atgora-forum/lexicons";
// Array of LexiconDoc objects for all forum.atgora.* schemas
```

## Record Types

| Lexicon ID | Description | Key Type |
|------------|-------------|----------|
| `forum.atgora.topic.post` | Forum topic/thread (title, content, community, category, tags, labels) | `tid` |
| `forum.atgora.topic.reply` | Reply to a topic (content, root ref, parent ref, community) | `tid` |
| `forum.atgora.interaction.reaction` | Reaction to content (subject ref, type, community) | `tid` |
| `forum.atgora.actor.preferences` | User preferences singleton (maturity level, muted words, blocked DIDs, cross-post defaults) | `literal:self` |

## Development

```bash
pnpm install
pnpm test          # Run tests
pnpm build         # Compile TypeScript
pnpm generate      # Regenerate types from lexicon JSON
pnpm lint          # Lint
pnpm typecheck     # Type check
```

## License

MIT
