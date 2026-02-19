import { describe, it, expect } from 'vitest'
import {
  ForumBarazoTopicPost,
  ForumBarazoTopicReply,
  ForumBarazoInteractionReaction,
  ForumBarazoInteractionVote,
  ForumBarazoActorPreferences,
  LEXICON_IDS,
  schemas,
  ids,
} from '../src/index.js'

describe('generated type exports', () => {
  it('exports ForumBarazoTopicPost with Record type and validators', () => {
    expect(ForumBarazoTopicPost.isRecord).toBeTypeOf('function')
    expect(ForumBarazoTopicPost.validateRecord).toBeTypeOf('function')
  })

  it('exports ForumBarazoTopicReply with Record type and validators', () => {
    expect(ForumBarazoTopicReply.isRecord).toBeTypeOf('function')
    expect(ForumBarazoTopicReply.validateRecord).toBeTypeOf('function')
  })

  it('exports ForumBarazoInteractionReaction with Record type and validators', () => {
    expect(ForumBarazoInteractionReaction.isRecord).toBeTypeOf('function')
    expect(ForumBarazoInteractionReaction.validateRecord).toBeTypeOf('function')
  })

  it('exports ForumBarazoInteractionVote with Record type and validators', () => {
    expect(ForumBarazoInteractionVote.isRecord).toBeTypeOf('function')
    expect(ForumBarazoInteractionVote.validateRecord).toBeTypeOf('function')
  })

  it('exports ForumBarazoActorPreferences with Record type and validators', () => {
    expect(ForumBarazoActorPreferences.isRecord).toBeTypeOf('function')
    expect(ForumBarazoActorPreferences.validateRecord).toBeTypeOf('function')
  })
})

describe('LEXICON_IDS constants', () => {
  it('has correct TopicPost ID', () => {
    expect(LEXICON_IDS.TopicPost).toBe('forum.barazo.topic.post')
  })

  it('has correct TopicReply ID', () => {
    expect(LEXICON_IDS.TopicReply).toBe('forum.barazo.topic.reply')
  })

  it('has correct Reaction ID', () => {
    expect(LEXICON_IDS.Reaction).toBe('forum.barazo.interaction.reaction')
  })

  it('has correct Vote ID', () => {
    expect(LEXICON_IDS.Vote).toBe('forum.barazo.interaction.vote')
  })

  it('has correct ActorPreferences ID', () => {
    expect(LEXICON_IDS.ActorPreferences).toBe('forum.barazo.actor.preferences')
  })

  it('has correct AuthForumAccess ID', () => {
    expect(LEXICON_IDS.AuthForumAccess).toBe('forum.barazo.authForumAccess')
  })
})

describe('generated schemas', () => {
  it('exports schemas array', () => {
    expect(Array.isArray(schemas)).toBe(true)
    expect(schemas.length).toBeGreaterThan(0)
  })

  it('schemas contain all Barazo lexicon IDs', () => {
    const schemaIds = schemas.map((s: Record<string, unknown>) => s['id'] as string)
    expect(schemaIds).toContain('forum.barazo.topic.post')
    expect(schemaIds).toContain('forum.barazo.topic.reply')
    expect(schemaIds).toContain('forum.barazo.interaction.reaction')
    expect(schemaIds).toContain('forum.barazo.interaction.vote')
    expect(schemaIds).toContain('forum.barazo.actor.preferences')
    expect(schemaIds).toContain('forum.barazo.authForumAccess')
  })
})

describe('generated ids map', () => {
  it('maps ForumBarazoTopicPost correctly', () => {
    expect(ids.ForumBarazoTopicPost).toBe('forum.barazo.topic.post')
  })

  it('maps ForumBarazoTopicReply correctly', () => {
    expect(ids.ForumBarazoTopicReply).toBe('forum.barazo.topic.reply')
  })

  it('maps ForumBarazoInteractionReaction correctly', () => {
    expect(ids.ForumBarazoInteractionReaction).toBe('forum.barazo.interaction.reaction')
  })

  it('maps ForumBarazoInteractionVote correctly', () => {
    expect(ids.ForumBarazoInteractionVote).toBe('forum.barazo.interaction.vote')
  })

  it('maps ForumBarazoActorPreferences correctly', () => {
    expect(ids.ForumBarazoActorPreferences).toBe('forum.barazo.actor.preferences')
  })

  it('maps ForumBarazoAuthForumAccess correctly', () => {
    expect(ids.ForumBarazoAuthForumAccess).toBe('forum.barazo.authForumAccess')
  })
})

describe('isRecord type guards', () => {
  it('ForumBarazoTopicPost.isRecord identifies correct $type', () => {
    expect(
      ForumBarazoTopicPost.isRecord({
        $type: 'forum.barazo.topic.post',
        title: 'Test',
      })
    ).toBe(true)
  })

  it('ForumBarazoTopicPost.isRecord rejects wrong $type', () => {
    expect(
      ForumBarazoTopicPost.isRecord({
        $type: 'forum.barazo.topic.reply',
        content: 'Test',
      })
    ).toBe(false)
  })

  it('ForumBarazoTopicPost.isRecord rejects non-objects', () => {
    expect(ForumBarazoTopicPost.isRecord('string')).toBe(false)
    expect(ForumBarazoTopicPost.isRecord(null)).toBe(false)
    expect(ForumBarazoTopicPost.isRecord(undefined)).toBe(false)
  })
})
