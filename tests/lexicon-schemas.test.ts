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
    expect(collections).toContain('forum.barazo.actor.preferences')
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

  it('has maturityLevel enum with safe, mature, all', () => {
    const defs = schema['defs'] as Record<string, unknown>
    const main = defs['main'] as Record<string, unknown>
    const record = main['record'] as Record<string, unknown>
    const props = record['properties'] as Record<string, unknown>
    const ml = props['maturityLevel'] as Record<string, unknown>
    expect(ml['enum']).toEqual(['safe', 'mature', 'all'])
  })

  it('defines crossPostConfig as a separate def', () => {
    const defs = schema['defs'] as Record<string, unknown>
    expect(defs['crossPostConfig']).toBeDefined()
    const cpc = defs['crossPostConfig'] as Record<string, unknown>
    expect(cpc['type']).toBe('object')
  })
})
