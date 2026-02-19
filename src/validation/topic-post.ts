import { z } from 'zod'
import { selfLabelsSchema } from './self-labels.js'
import { facetSchema } from './facet.js'

/** DID format regex (simplified, catches obvious malformed DIDs). */
const didRegex = /^did:[a-z]+:[a-zA-Z0-9._:%-]+$/

/**
 * Zod schema for forum.barazo.topic.post records.
 *
 * Mirrors the lexicon constraints from prd-lexicons.md section 3.1.
 * Note: maxLength in lexicon = UTF-8 bytes, but Zod .max() counts
 * JS string length (UTF-16 code units). For ASCII-heavy content
 * these are equivalent; for full Unicode safety the AppView should
 * also validate byte length.
 */
export const topicPostSchema = z.object({
  title: z.string().min(1).max(2000),
  content: z.string().min(1).max(100_000),
  contentFormat: z.literal('markdown').optional(),
  community: z.string().regex(didRegex),
  category: z.string().min(1).max(640),
  tags: z.array(z.string().min(1).max(300)).max(5).optional(),
  facets: z.array(facetSchema).optional(),
  langs: z.array(z.string().min(1)).max(3).optional(),
  labels: selfLabelsSchema.optional(),
  createdAt: z.iso.datetime(),
})

export type TopicPostInput = z.input<typeof topicPostSchema>
