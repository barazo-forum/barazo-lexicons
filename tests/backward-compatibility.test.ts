/**
 * Backward Compatibility Test Suite
 *
 * Ensures that schema changes never break records already stored on user PDSes.
 * This test suite enforces the rules from PRD section 9 (Backwards Compatibility Rules):
 *
 * - Fields can be added (optional only)
 * - Fields cannot be removed
 * - Field types cannot change
 * - Required fields cannot become optional (or vice versa)
 * - Breaking changes require a new lexicon ID
 *
 * How it works:
 * 1. Baseline records (fixtures) represent data already on PDSes
 * 2. Schema snapshots capture structural invariants (required fields, property names)
 * 3. Tests validate baseline records against BOTH Zod schemas and lexicon validators
 * 4. If any test fails after a schema change, the change is backward-incompatible
 */

import { describe, it, expect } from 'vitest'
import * as fs from 'node:fs'
import * as path from 'node:path'
import {
  topicPostSchema,
  topicReplySchema,
  reactionSchema,
  voteSchema,
  actorPreferencesSchema,
} from '../src/validation/index.js'
import {
  ForumBarazoTopicPost,
  ForumBarazoTopicReply,
  ForumBarazoInteractionReaction,
  ForumBarazoInteractionVote,
  ForumBarazoActorPreferences,
} from '../src/generated/index.js'
import {
  topicPostMinimal,
  topicPostFull,
  topicReplyMinimal,
  topicReplyFull,
  reactionMinimal,
  reactionFull,
  voteMinimal,
  voteFull,
  actorPreferencesMinimal,
  actorPreferencesFull,
} from './fixtures/baseline-records.js'

// ── Helpers ─────────────────────────────────────────────────────────

function loadLexiconJson(lexiconPath: string): Record<string, unknown> {
  const fullPath = path.resolve(import.meta.dirname, '..', 'lexicons', lexiconPath)
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8')) as Record<string, unknown>
}

function getRecordProperties(lexicon: Record<string, unknown>): Record<string, unknown> {
  const defs = lexicon['defs'] as Record<string, unknown>
  const main = defs['main'] as Record<string, unknown>
  const record = main['record'] as Record<string, unknown>
  return record['properties'] as Record<string, unknown>
}

function getRequiredFields(lexicon: Record<string, unknown>): string[] {
  const defs = lexicon['defs'] as Record<string, unknown>
  const main = defs['main'] as Record<string, unknown>
  const record = main['record'] as Record<string, unknown>
  return record['required'] as string[]
}

// Adds $type to a record for lexicon validator (which requires it)
function withType<T extends Record<string, unknown>>(
  record: T,
  type: string
): T & { $type: string } {
  return { ...record, $type: type }
}

// ── Schema Structural Snapshots ─────────────────────────────────────
// These capture the contract. If any of these change, a test will fail,
// forcing the developer to consider backward compatibility implications.

const SCHEMA_SNAPSHOTS = {
  'forum.barazo.topic.post': {
    requiredFields: ['title', 'content', 'community', 'category', 'createdAt'],
    allProperties: [
      'title',
      'content',
      'contentFormat',
      'community',
      'category',
      'tags',
      'facets',
      'langs',
      'labels',
      'createdAt',
    ],
  },
  'forum.barazo.topic.reply': {
    requiredFields: ['content', 'root', 'parent', 'community', 'createdAt'],
    allProperties: [
      'content',
      'contentFormat',
      'root',
      'parent',
      'community',
      'facets',
      'langs',
      'labels',
      'createdAt',
    ],
  },
  'forum.barazo.interaction.reaction': {
    requiredFields: ['subject', 'type', 'community', 'createdAt'],
    allProperties: ['subject', 'type', 'community', 'createdAt'],
  },
  'forum.barazo.interaction.vote': {
    requiredFields: ['subject', 'direction', 'community', 'createdAt'],
    allProperties: ['subject', 'direction', 'community', 'createdAt'],
  },
  'forum.barazo.actor.preferences': {
    requiredFields: ['maturityLevel', 'updatedAt'],
    allProperties: [
      'maturityLevel',
      'mutedWords',
      'blockedDids',
      'mutedDids',
      'crossPostDefaults',
      'updatedAt',
    ],
  },
} as const

// ── Baseline Record Validation (Zod) ────────────────────────────────

describe('backward compatibility: Zod validation of baseline records', () => {
  describe('forum.barazo.topic.post', () => {
    it('validates minimal baseline record', () => {
      const result = topicPostSchema.safeParse(topicPostMinimal)
      expect(result.success).toBe(true)
    })

    it('validates full baseline record', () => {
      const result = topicPostSchema.safeParse(topicPostFull)
      expect(result.success).toBe(true)
    })
  })

  describe('forum.barazo.topic.reply', () => {
    it('validates minimal baseline record', () => {
      const result = topicReplySchema.safeParse(topicReplyMinimal)
      expect(result.success).toBe(true)
    })

    it('validates full baseline record', () => {
      const result = topicReplySchema.safeParse(topicReplyFull)
      expect(result.success).toBe(true)
    })
  })

  describe('forum.barazo.interaction.reaction', () => {
    it('validates minimal baseline record', () => {
      const result = reactionSchema.safeParse(reactionMinimal)
      expect(result.success).toBe(true)
    })

    it('validates full baseline record', () => {
      const result = reactionSchema.safeParse(reactionFull)
      expect(result.success).toBe(true)
    })
  })

  describe('forum.barazo.interaction.vote', () => {
    it('validates minimal baseline record', () => {
      const result = voteSchema.safeParse(voteMinimal)
      expect(result.success).toBe(true)
    })

    it('validates full baseline record', () => {
      const result = voteSchema.safeParse(voteFull)
      expect(result.success).toBe(true)
    })
  })

  describe('forum.barazo.actor.preferences', () => {
    it('validates minimal baseline record', () => {
      const result = actorPreferencesSchema.safeParse(actorPreferencesMinimal)
      expect(result.success).toBe(true)
    })

    it('validates full baseline record', () => {
      const result = actorPreferencesSchema.safeParse(actorPreferencesFull)
      expect(result.success).toBe(true)
    })
  })
})

// ── Baseline Record Validation (Lexicon/AT Protocol) ────────────────

describe('backward compatibility: lexicon validation of baseline records', () => {
  describe('forum.barazo.topic.post', () => {
    it('validates minimal baseline record', () => {
      const result = ForumBarazoTopicPost.validateRecord(
        withType(topicPostMinimal, 'forum.barazo.topic.post')
      )
      expect(result.success).toBe(true)
    })

    it('validates full baseline record', () => {
      const result = ForumBarazoTopicPost.validateRecord(
        withType(topicPostFull, 'forum.barazo.topic.post')
      )
      expect(result.success).toBe(true)
    })
  })

  describe('forum.barazo.topic.reply', () => {
    it('validates minimal baseline record', () => {
      const result = ForumBarazoTopicReply.validateRecord(
        withType(topicReplyMinimal, 'forum.barazo.topic.reply')
      )
      expect(result.success).toBe(true)
    })

    it('validates full baseline record', () => {
      const result = ForumBarazoTopicReply.validateRecord(
        withType(topicReplyFull, 'forum.barazo.topic.reply')
      )
      expect(result.success).toBe(true)
    })
  })

  describe('forum.barazo.interaction.reaction', () => {
    it('validates minimal baseline record', () => {
      const result = ForumBarazoInteractionReaction.validateRecord(
        withType(reactionMinimal, 'forum.barazo.interaction.reaction')
      )
      expect(result.success).toBe(true)
    })

    it('validates full baseline record', () => {
      const result = ForumBarazoInteractionReaction.validateRecord(
        withType(reactionFull, 'forum.barazo.interaction.reaction')
      )
      expect(result.success).toBe(true)
    })
  })

  describe('forum.barazo.interaction.vote', () => {
    it('validates minimal baseline record', () => {
      const result = ForumBarazoInteractionVote.validateRecord(
        withType(voteMinimal, 'forum.barazo.interaction.vote')
      )
      expect(result.success).toBe(true)
    })

    it('validates full baseline record', () => {
      const result = ForumBarazoInteractionVote.validateRecord(
        withType(voteFull, 'forum.barazo.interaction.vote')
      )
      expect(result.success).toBe(true)
    })
  })

  describe('forum.barazo.actor.preferences', () => {
    it('validates minimal baseline record', () => {
      const result = ForumBarazoActorPreferences.validateRecord(
        withType(actorPreferencesMinimal, 'forum.barazo.actor.preferences')
      )
      expect(result.success).toBe(true)
    })

    it('validates full baseline record', () => {
      const result = ForumBarazoActorPreferences.validateRecord(
        withType(actorPreferencesFull, 'forum.barazo.actor.preferences')
      )
      expect(result.success).toBe(true)
    })
  })
})

// ── Schema Structural Invariants ────────────────────────────────────
// These tests catch accidental changes to required fields, removed
// properties, or changed field types.

describe('backward compatibility: schema structural invariants', () => {
  const lexiconFiles: Array<{
    name: string
    path: string
    snapshot: (typeof SCHEMA_SNAPSHOTS)[keyof typeof SCHEMA_SNAPSHOTS]
  }> = [
    {
      name: 'forum.barazo.topic.post',
      path: 'forum/barazo/topic/post.json',
      snapshot: SCHEMA_SNAPSHOTS['forum.barazo.topic.post'],
    },
    {
      name: 'forum.barazo.topic.reply',
      path: 'forum/barazo/topic/reply.json',
      snapshot: SCHEMA_SNAPSHOTS['forum.barazo.topic.reply'],
    },
    {
      name: 'forum.barazo.interaction.reaction',
      path: 'forum/barazo/interaction/reaction.json',
      snapshot: SCHEMA_SNAPSHOTS['forum.barazo.interaction.reaction'],
    },
    {
      name: 'forum.barazo.interaction.vote',
      path: 'forum/barazo/interaction/vote.json',
      snapshot: SCHEMA_SNAPSHOTS['forum.barazo.interaction.vote'],
    },
    {
      name: 'forum.barazo.actor.preferences',
      path: 'forum/barazo/actor/preferences.json',
      snapshot: SCHEMA_SNAPSHOTS['forum.barazo.actor.preferences'],
    },
  ]

  for (const { name, path: lexPath, snapshot } of lexiconFiles) {
    describe(name, () => {
      const lexicon = loadLexiconJson(lexPath)

      it('has not removed any required fields', () => {
        const currentRequired = getRequiredFields(lexicon)
        for (const field of snapshot.requiredFields) {
          expect(
            currentRequired,
            `Required field "${field}" was removed from ${name}. ` +
              'This breaks existing records that rely on this field being required. ' +
              'Use a new lexicon ID for breaking changes.'
          ).toContain(field)
        }
      })

      it('has not added new required fields', () => {
        const currentRequired = getRequiredFields(lexicon)
        for (const field of currentRequired) {
          expect(
            snapshot.requiredFields,
            `New required field "${field}" was added to ${name}. ` +
              "Existing records on PDSes don't have this field. " +
              'New fields must be optional, or use a new lexicon ID.'
          ).toContain(field)
        }
      })

      it('has not removed any properties', () => {
        const currentProperties = Object.keys(getRecordProperties(lexicon))
        for (const prop of snapshot.allProperties) {
          expect(
            currentProperties,
            `Property "${prop}" was removed from ${name}. ` +
              'Existing records on PDSes may contain this field. ' +
              'Fields cannot be removed from published schemas.'
          ).toContain(prop)
        }
      })

      it('may have added new optional properties (allowed)', () => {
        // This test documents that new properties were added.
        // New properties are allowed as long as they are optional (not in required[]).
        const currentProperties = Object.keys(getRecordProperties(lexicon))
        const currentRequired = getRequiredFields(lexicon)
        const newProperties = currentProperties.filter((p) => !snapshot.allProperties.includes(p))

        for (const prop of newProperties) {
          expect(
            currentRequired,
            `New property "${prop}" in ${name} is required. ` +
              'New properties must be optional to maintain backward compatibility.'
          ).not.toContain(prop)
        }
      })
    })
  }
})

// ── Forward Compatibility (extra fields) ────────────────────────────
// AT Protocol records may contain extra fields (from future schema versions).
// The lexicon validator must not reject records with unknown properties.

describe('backward compatibility: records with extra unknown fields', () => {
  it('lexicon validator accepts topic.post with extra fields', () => {
    const record = withType(
      { ...topicPostMinimal, futureField: 'some-value', anotherNew: 42 },
      'forum.barazo.topic.post'
    )
    const result = ForumBarazoTopicPost.validateRecord(record)
    expect(result.success).toBe(true)
  })

  it('lexicon validator accepts topic.reply with extra fields', () => {
    const record = withType({ ...topicReplyMinimal, futureField: true }, 'forum.barazo.topic.reply')
    const result = ForumBarazoTopicReply.validateRecord(record)
    expect(result.success).toBe(true)
  })

  it('lexicon validator accepts reaction with extra fields', () => {
    const record = withType(
      { ...reactionMinimal, futureField: ['a', 'b'] },
      'forum.barazo.interaction.reaction'
    )
    const result = ForumBarazoInteractionReaction.validateRecord(record)
    expect(result.success).toBe(true)
  })

  it('lexicon validator accepts vote with extra fields', () => {
    const record = withType({ ...voteMinimal, futureField: 'new' }, 'forum.barazo.interaction.vote')
    const result = ForumBarazoInteractionVote.validateRecord(record)
    expect(result.success).toBe(true)
  })

  it('lexicon validator accepts actor.preferences with extra fields', () => {
    const record = withType(
      { ...actorPreferencesMinimal, futureField: { nested: true } },
      'forum.barazo.actor.preferences'
    )
    const result = ForumBarazoActorPreferences.validateRecord(record)
    expect(result.success).toBe(true)
  })
})

// ── Field Type Stability ────────────────────────────────────────────
// Ensures field types haven't changed in the lexicon JSON schemas.

describe('backward compatibility: field type stability', () => {
  const FIELD_TYPE_SNAPSHOTS: Record<string, { path: string; types: Record<string, string> }> = {
    'forum.barazo.topic.post': {
      path: 'forum/barazo/topic/post.json',
      types: {
        title: 'string',
        content: 'string',
        contentFormat: 'string',
        community: 'string',
        category: 'string',
        tags: 'array',
        facets: 'array',
        langs: 'array',
        labels: 'union',
        createdAt: 'string',
      },
    },
    'forum.barazo.topic.reply': {
      path: 'forum/barazo/topic/reply.json',
      types: {
        content: 'string',
        contentFormat: 'string',
        root: 'ref',
        parent: 'ref',
        community: 'string',
        facets: 'array',
        langs: 'array',
        labels: 'union',
        createdAt: 'string',
      },
    },
    'forum.barazo.interaction.reaction': {
      path: 'forum/barazo/interaction/reaction.json',
      types: {
        subject: 'ref',
        type: 'string',
        community: 'string',
        createdAt: 'string',
      },
    },
    'forum.barazo.interaction.vote': {
      path: 'forum/barazo/interaction/vote.json',
      types: {
        subject: 'ref',
        direction: 'string',
        community: 'string',
        createdAt: 'string',
      },
    },
    'forum.barazo.actor.preferences': {
      path: 'forum/barazo/actor/preferences.json',
      types: {
        maturityLevel: 'string',
        mutedWords: 'array',
        blockedDids: 'array',
        mutedDids: 'array',
        crossPostDefaults: 'ref',
        updatedAt: 'string',
      },
    },
  }

  for (const [name, { path: lexPath, types }] of Object.entries(FIELD_TYPE_SNAPSHOTS)) {
    describe(name, () => {
      const lexicon = loadLexiconJson(lexPath)
      const properties = getRecordProperties(lexicon)

      for (const [field, expectedType] of Object.entries(types)) {
        it(`field "${field}" remains type "${expectedType}"`, () => {
          const prop = properties[field] as Record<string, unknown>
          expect(
            prop['type'],
            `Field "${field}" in ${name} changed type from "${expectedType}" to "${String(prop['type'])}". ` +
              'Field types cannot change in published schemas.'
          ).toBe(expectedType)
        })
      }
    })
  }
})
