/**
 * Baseline records representing the current schema version.
 *
 * Each record type has:
 * - A minimal record (only required fields)
 * - A full record (all optional fields populated)
 *
 * Updated for v0.3.0: content union, publishedAt, site field.
 */

const VALID_DID = 'did:plc:abc123def456'
const VALID_DATETIME = '2026-02-12T10:00:00.000Z'
const VALID_STRONG_REF = {
  uri: 'at://did:plc:abc123/forum.barazo.topic.post/3jzfcijpj2z2a',
  cid: 'bafyreibouvacvqhc2vkwwtdkfynpcaoatmkde7uhrw47ne4gu63cnzc7yq',
}

const MARKDOWN_CONTENT = {
  $type: 'forum.barazo.richtext#markdown' as const,
  value: 'Hello, this is the body of my first topic post.',
}

// ── topic.post ──────────────────────────────────────────────────────

export const topicPostMinimal = {
  title: 'My First Topic',
  content: MARKDOWN_CONTENT,
  community: VALID_DID,
  category: 'general',
  publishedAt: VALID_DATETIME,
}

export const topicPostFull = {
  title: 'Full Featured Topic',
  content: {
    $type: 'forum.barazo.richtext#markdown' as const,
    value: 'This topic includes every optional field.',
  },
  community: VALID_DID,
  category: 'announcements',
  site: 'at://did:plc:abc123/site.standard.publication/3lwafzkjqm25s',
  tags: ['release', 'v1'],
  labels: {
    $type: 'com.atproto.label.defs#selfLabels',
    values: [{ val: 'nudity' }],
  },
  publishedAt: VALID_DATETIME,
}

// ── topic.reply ─────────────────────────────────────────────────────

export const topicReplyMinimal = {
  content: MARKDOWN_CONTENT,
  root: VALID_STRONG_REF,
  parent: VALID_STRONG_REF,
  community: VALID_DID,
  createdAt: VALID_DATETIME,
}

export const topicReplyFull = {
  content: {
    $type: 'forum.barazo.richtext#markdown' as const,
    value: 'This reply uses all optional fields.',
  },
  root: VALID_STRONG_REF,
  parent: VALID_STRONG_REF,
  community: VALID_DID,
  labels: {
    $type: 'com.atproto.label.defs#selfLabels',
    values: [{ val: 'graphic-media' }],
  },
  createdAt: VALID_DATETIME,
}

// ── interaction.reaction ────────────────────────────────────────────

export const reactionMinimal = {
  subject: VALID_STRONG_REF,
  type: 'like',
  community: VALID_DID,
  createdAt: VALID_DATETIME,
}

// Reaction has no optional fields beyond the required ones
export const reactionFull = { ...reactionMinimal }

// ── interaction.vote ───────────────────────────────────────────

export const voteMinimal = {
  subject: VALID_STRONG_REF,
  direction: 'up',
  community: VALID_DID,
  createdAt: VALID_DATETIME,
}

// Vote has no optional fields beyond the required ones
export const voteFull = { ...voteMinimal }

// ── actor.preferences ───────────────────────────────────────────────

export const actorPreferencesMinimal = {
  maturityLevel: 'safe' as const,
  updatedAt: VALID_DATETIME,
}

export const actorPreferencesFull = {
  maturityLevel: 'all' as const,
  mutedWords: ['spam', 'crypto-scam'],
  blockedDids: ['did:plc:blocked1', 'did:plc:blocked2'],
  mutedDids: ['did:plc:muted1'],
  crossPostDefaults: {
    bluesky: true,
    frontpage: false,
  },
  updatedAt: VALID_DATETIME,
}
