/**
 * Baseline records representing data already stored on user PDSes.
 *
 * These fixtures simulate records created with the current schema version.
 * When schemas evolve (new optional fields, description changes, etc.),
 * these records MUST continue to validate. If any baseline record fails
 * validation after a schema change, the change is backward-incompatible
 * and must be reverted or handled via a new lexicon ID.
 *
 * Each record type has:
 * - A minimal record (only required fields)
 * - A full record (all optional fields populated)
 *
 * DO NOT modify existing records in this file when adding new optional fields
 * to schemas. Instead, create new fixture variants that include the new fields.
 * The existing fixtures must remain unchanged to prove backward compatibility.
 */

const VALID_DID = 'did:plc:abc123def456'
const VALID_DATETIME = '2026-02-12T10:00:00.000Z'
const VALID_STRONG_REF = {
  uri: 'at://did:plc:abc123/forum.barazo.topic.post/3jzfcijpj2z2a',
  cid: 'bafyreibouvacvqhc2vkwwtdkfynpcaoatmkde7uhrw47ne4gu63cnzc7yq',
}

// ── topic.post ──────────────────────────────────────────────────────

export const topicPostMinimal = {
  title: 'My First Topic',
  content: 'Hello, this is the body of my first topic post.',
  community: VALID_DID,
  category: 'general',
  createdAt: VALID_DATETIME,
}

export const topicPostFull = {
  title: 'Full Featured Topic',
  content: 'This topic includes every optional field available at v0.1.0.',
  contentFormat: 'markdown' as const,
  community: VALID_DID,
  category: 'announcements',
  tags: ['release', 'v1'],
  labels: {
    $type: 'com.atproto.label.defs#selfLabels',
    values: [{ val: 'nudity' }],
  },
  createdAt: VALID_DATETIME,
}

// ── topic.reply ─────────────────────────────────────────────────────

export const topicReplyMinimal = {
  content: 'Great post, thanks for sharing!',
  root: VALID_STRONG_REF,
  parent: VALID_STRONG_REF,
  community: VALID_DID,
  createdAt: VALID_DATETIME,
}

export const topicReplyFull = {
  content: 'This reply uses all optional fields available at v0.1.0.',
  contentFormat: 'markdown' as const,
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
