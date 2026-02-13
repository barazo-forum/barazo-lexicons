# @barazo-forum/lexicons

AT Protocol lexicon schemas and generated TypeScript types for the Barazo forum platform. Defines the `forum.barazo.*` namespace with record types for topics, replies, reactions, and user preferences.

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

## Record Types

| Lexicon ID | Description | Key Type |
|------------|-------------|----------|
| `forum.barazo.topic.post` | Forum topic/thread (title, content, community, category, tags, labels) | `tid` |
| `forum.barazo.topic.reply` | Reply to a topic (content, root ref, parent ref, community) | `tid` |
| `forum.barazo.interaction.reaction` | Reaction to content (subject ref, type, community) | `tid` |
| `forum.barazo.actor.preferences` | User preferences singleton (maturity level, muted words, blocked DIDs, cross-post defaults) | `literal:self` |

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
