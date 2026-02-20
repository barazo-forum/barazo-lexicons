import { z } from 'zod'
import { strongRefSchema } from './strong-ref.js'
import { selfLabelsSchema } from './self-labels.js'
import { facetSchema } from './facet.js'
import { didRegex } from './patterns.js'

/**
 * Zod schema for forum.barazo.topic.reply records.
 *
 * Mirrors the lexicon constraints from prd-lexicons.md section 3.2.
 */
export const topicReplySchema = z.object({
  content: z.string().min(1).max(50_000),
  contentFormat: z.literal('markdown').optional(),
  root: strongRefSchema,
  parent: strongRefSchema,
  community: z.string().regex(didRegex),
  facets: z.array(facetSchema).optional(),
  langs: z.array(z.string().min(1)).max(3).optional(),
  labels: selfLabelsSchema.optional(),
  createdAt: z.iso.datetime(),
})

export type TopicReplyInput = z.input<typeof topicReplySchema>
