import { z } from 'zod'
import { selfLabelsSchema } from './self-labels.js'
import { facetSchema } from './facet.js'
import { didRegex, recordKeyRegex } from './patterns.js'
import { markdownContentSchema } from './richtext.js'

/**
 * Zod schema for forum.barazo.topic.post records.
 *
 * Note: maxLength in lexicon = UTF-8 bytes, but Zod .max() counts
 * JS string length (UTF-16 code units). For ASCII-heavy content
 * these are equivalent; for full Unicode safety the AppView should
 * also validate byte length.
 */
export const topicPostSchema = z.object({
  title: z.string().min(1).max(2000),
  content: markdownContentSchema,
  community: z.string().regex(didRegex),
  category: z.string().regex(recordKeyRegex).max(640),
  site: z.string().max(5000).optional(),
  tags: z.array(z.string().min(1).max(300)).max(25).optional(),
  facets: z.array(facetSchema).optional(),
  langs: z.array(z.string().min(1)).max(3).optional(),
  labels: selfLabelsSchema.optional(),
  publishedAt: z.iso.datetime(),
})

export type TopicPostInput = z.input<typeof topicPostSchema>
