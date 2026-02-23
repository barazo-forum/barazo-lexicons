import { describe, it, expect } from 'vitest'
import { readFile, readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const LEXICONS_DIR = resolve(import.meta.dirname, '../lexicons/forum/barazo')

async function loadJson(path: string): Promise<unknown> {
  const content = await readFile(path, 'utf-8')
  return JSON.parse(content)
}

async function getAllLexiconFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true })
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.json'))
    .map((e) => join(e.parentPath, e.name))
}

describe('Lexicon JSON schema structure', () => {
  it('all lexicon files are valid JSON', async () => {
    const files = await getAllLexiconFiles(LEXICONS_DIR)
    expect(files.length).toBeGreaterThanOrEqual(5)
    for (const file of files) {
      await expect(loadJson(file)).resolves.toBeDefined()
    }
  })

  it('all lexicons have required top-level fields', async () => {
    const files = await getAllLexiconFiles(LEXICONS_DIR)
    for (const file of files) {
      const lexicon = (await loadJson(file)) as Record<string, unknown>
      expect(lexicon).toHaveProperty('lexicon', 1)
      expect(lexicon).toHaveProperty('id')
      expect(lexicon).toHaveProperty('defs')
      expect(typeof lexicon['id']).toBe('string')
    }
  })

  it('lexicon ids match file paths', async () => {
    const files = await getAllLexiconFiles(LEXICONS_DIR)
    for (const file of files) {
      const lexicon = (await loadJson(file)) as Record<string, unknown>
      const id = lexicon['id'] as string
      // Convert "forum.barazo.topic.post" to a path fragment "forum/barazo/topic/post.json"
      const expectedPath = id.replace(/\./g, '/') + '.json'
      expect(file).toContain(expectedPath)
    }
  })
})

describe('forum.barazo.topic.post lexicon', () => {
  let schema: Record<string, unknown>

  it('loads successfully', async () => {
    schema = (await loadJson(join(LEXICONS_DIR, 'topic/post.json'))) as Record<string, unknown>
    expect(schema['id']).toBe('forum.barazo.topic.post')
  })

  it('defines a record with key type tid', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    expect(main['type']).toBe('record')
    expect(main['key']).toBe('tid')
  })

  it('has required fields: title, content, community, category, createdAt', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const required = record['required'] as string[]
    expect(required).toContain('title')
    expect(required).toContain('content')
    expect(required).toContain('community')
    expect(required).toContain('category')
    expect(required).toContain('createdAt')
  })

  it('title has maxGraphemes: 200 and maxLength: 2000', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const props = record['properties'] as Record<string, unknown>
    const title = props['title'] as Record<string, unknown>
    expect(title['maxGraphemes']).toBe(200)
    expect(title['maxLength']).toBe(2000)
    expect(title['minLength']).toBe(1)
  })

  it('community field uses DID format', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const props = record['properties'] as Record<string, unknown>
    const community = props['community'] as Record<string, unknown>
    expect(community['type']).toBe('string')
    expect(community['format']).toBe('did')
  })

  it('labels uses union with selfLabels ref', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const props = record['properties'] as Record<string, unknown>
    const labels = props['labels'] as Record<string, unknown>
    expect(labels['type']).toBe('union')
    expect(labels['refs']).toContain('com.atproto.label.defs#selfLabels')
  })

  it('category uses record-key format', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const props = record['properties'] as Record<string, unknown>
    const category = props['category'] as Record<string, unknown>
    expect(category['type']).toBe('string')
    expect(category['format']).toBe('record-key')
    expect(category['maxLength']).toBe(640)
    expect(category['maxGraphemes']).toBe(64)
  })

  it('tags is optional with max 5 items', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const required = record['required'] as string[]
    expect(required).not.toContain('tags')
    const props = record['properties'] as Record<string, unknown>
    const tags = props['tags'] as Record<string, unknown>
    expect(tags['maxLength']).toBe(5)
  })

  it('has optional facets array referencing app.bsky.richtext.facet', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const required = record['required'] as string[]
    expect(required).not.toContain('facets')
    const props = record['properties'] as Record<string, unknown>
    const facets = props['facets'] as Record<string, unknown>
    expect(facets['type']).toBe('array')
    const items = facets['items'] as Record<string, unknown>
    expect(items['ref']).toBe('app.bsky.richtext.facet')
  })

  it('has optional langs array with max 3 language items', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const required = record['required'] as string[]
    expect(required).not.toContain('langs')
    const props = record['properties'] as Record<string, unknown>
    const langs = props['langs'] as Record<string, unknown>
    expect(langs['type']).toBe('array')
    expect(langs['maxLength']).toBe(3)
    const items = langs['items'] as Record<string, unknown>
    expect(items['format']).toBe('language')
  })
})

describe('forum.barazo.topic.reply lexicon', () => {
  let schema: Record<string, unknown>

  it('loads successfully', async () => {
    schema = (await loadJson(join(LEXICONS_DIR, 'topic/reply.json'))) as Record<string, unknown>
    expect(schema['id']).toBe('forum.barazo.topic.reply')
  })

  it('has required fields: content, root, parent, community, createdAt', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const required = record['required'] as string[]
    expect(required).toEqual(
      expect.arrayContaining(['content', 'root', 'parent', 'community', 'createdAt'])
    )
  })

  it('root and parent use strongRef', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const props = record['properties'] as Record<string, unknown>
    const root = props['root'] as Record<string, unknown>
    const parent = props['parent'] as Record<string, unknown>
    expect(root['type']).toBe('ref')
    expect(root['ref']).toBe('com.atproto.repo.strongRef')
    expect(parent['type']).toBe('ref')
    expect(parent['ref']).toBe('com.atproto.repo.strongRef')
  })

  it('has optional facets array referencing app.bsky.richtext.facet', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const required = record['required'] as string[]
    expect(required).not.toContain('facets')
    const props = record['properties'] as Record<string, unknown>
    const facets = props['facets'] as Record<string, unknown>
    expect(facets['type']).toBe('array')
    const items = facets['items'] as Record<string, unknown>
    expect(items['ref']).toBe('app.bsky.richtext.facet')
  })

  it('has optional langs array with max 3 language items', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const required = record['required'] as string[]
    expect(required).not.toContain('langs')
    const props = record['properties'] as Record<string, unknown>
    const langs = props['langs'] as Record<string, unknown>
    expect(langs['type']).toBe('array')
    expect(langs['maxLength']).toBe(3)
  })
})

describe('forum.barazo.interaction.reaction lexicon', () => {
  let schema: Record<string, unknown>

  it('loads successfully', async () => {
    schema = (await loadJson(join(LEXICONS_DIR, 'interaction/reaction.json'))) as Record<
      string,
      unknown
    >
    expect(schema['id']).toBe('forum.barazo.interaction.reaction')
  })

  it('has required fields: subject, type, community, createdAt', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const required = record['required'] as string[]
    expect(required).toEqual(expect.arrayContaining(['subject', 'type', 'community', 'createdAt']))
  })

  it('subject uses strongRef', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const props = record['properties'] as Record<string, unknown>
    const subject = props['subject'] as Record<string, unknown>
    expect(subject['type']).toBe('ref')
    expect(subject['ref']).toBe('com.atproto.repo.strongRef')
  })

  it('type uses knownValues with token references', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const props = record['properties'] as Record<string, unknown>
    const type = props['type'] as Record<string, unknown>
    expect(type['knownValues']).toEqual([
      'forum.barazo.interaction.reaction#like',
      'forum.barazo.interaction.reaction#heart',
      'forum.barazo.interaction.reaction#thumbsup',
    ])
  })

  it('defines like, heart, and thumbsup token defs', () => {
    const defs = schema['defs'] as Record<string, unknown>
    for (const token of ['like', 'heart', 'thumbsup']) {
      const def = defs[token] as Record<string, unknown>
      expect(def).toBeDefined()
      expect(def['type']).toBe('token')
      expect(def['description']).toBeTypeOf('string')
    }
  })
})

describe('forum.barazo.interaction.vote lexicon', () => {
  let schema: Record<string, unknown>

  it('loads successfully', async () => {
    schema = (await loadJson(join(LEXICONS_DIR, 'interaction/vote.json'))) as Record<
      string,
      unknown
    >
    expect(schema['id']).toBe('forum.barazo.interaction.vote')
  })

  it('defines a record with key type tid', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    expect(main['type']).toBe('record')
    expect(main['key']).toBe('tid')
  })

  it('has required fields: subject, direction, community, createdAt', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const required = record['required'] as string[]
    expect(required).toEqual(
      expect.arrayContaining(['subject', 'direction', 'community', 'createdAt'])
    )
  })

  it('subject uses strongRef', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const props = record['properties'] as Record<string, unknown>
    const subject = props['subject'] as Record<string, unknown>
    expect(subject['type']).toBe('ref')
    expect(subject['ref']).toBe('com.atproto.repo.strongRef')
  })

  it('direction uses knownValues with up', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const props = record['properties'] as Record<string, unknown>
    const direction = props['direction'] as Record<string, unknown>
    expect(direction['knownValues']).toEqual(['up'])
  })

  it('community field uses DID format', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const props = record['properties'] as Record<string, unknown>
    const community = props['community'] as Record<string, unknown>
    expect(community['type']).toBe('string')
    expect(community['format']).toBe('did')
  })
})

describe('forum.barazo.authForumAccess lexicon', () => {
  let schema: Record<string, unknown>

  it('loads successfully', async () => {
    schema = (await loadJson(join(LEXICONS_DIR, 'authForumAccess.json'))) as Record<string, unknown>
    expect(schema['id']).toBe('forum.barazo.authForumAccess')
  })

  it('has a top-level description', () => {
    expect(schema['description']).toBeTypeOf('string')
    expect((schema['description'] as string).length).toBeGreaterThan(0)
  })

  it('defines a permission-set type', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    expect(main['type']).toBe('permission-set')
  })

  it('has title and detail strings', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    expect(main['title']).toBeTypeOf('string')
    expect(main['detail']).toBeTypeOf('string')
  })

  it('declares repo permissions for all Barazo record collections', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const permissions = main['permissions'] as Record<string, unknown>[]
    expect(permissions).toHaveLength(1)

    const repoPerm = permissions[0] as Record<string, unknown>
    expect(repoPerm['type']).toBe('permission')
    expect(repoPerm['resource']).toBe('repo')

    const collections = repoPerm['collection'] as string[]
    expect(collections).toContain('forum.barazo.topic.post')
    expect(collections).toContain('forum.barazo.topic.reply')
    expect(collections).toContain('forum.barazo.interaction.reaction')
    expect(collections).toContain('forum.barazo.interaction.vote')
    expect(collections).toContain('forum.barazo.actor.preferences')
  })
})

describe('forum.barazo.defs lexicon', () => {
  let schema: Record<string, unknown>

  it('loads successfully', async () => {
    schema = (await loadJson(join(LEXICONS_DIR, 'defs.json'))) as Record<string, unknown>
    expect(schema['id']).toBe('forum.barazo.defs')
  })

  it('defines communityRef as an object with required did field', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const communityRef = defs['communityRef'] as Record<string, unknown>
    expect(communityRef).toBeDefined()
    expect(communityRef['type']).toBe('object')
    expect(communityRef['required']).toEqual(['did'])
    const props = communityRef['properties'] as Record<string, unknown>
    const did = props['did'] as Record<string, unknown>
    expect(did['type']).toBe('string')
    expect(did['format']).toBe('did')
  })
})

describe('forum.barazo.actor.preferences lexicon', () => {
  let schema: Record<string, unknown>

  it('loads successfully', async () => {
    schema = (await loadJson(join(LEXICONS_DIR, 'actor/preferences.json'))) as Record<
      string,
      unknown
    >
    expect(schema['id']).toBe('forum.barazo.actor.preferences')
  })

  it('uses literal:self key (singleton record)', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    expect(main['key']).toBe('literal:self')
  })

  it('has maturityLevel knownValues with safe, mature, all', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const props = record['properties'] as Record<string, unknown>
    const ml = props['maturityLevel'] as Record<string, unknown>
    expect(ml['knownValues']).toEqual(['safe', 'mature', 'all'])
  })

  it('defines crossPostConfig as a separate def', () => {
    const defs = schema['defs'] as Record<string, unknown>
    expect(defs['crossPostConfig']).toBeDefined()
    const cpc = defs['crossPostConfig'] as Record<string, unknown>
    expect(cpc['type']).toBe('object')
  })
})
