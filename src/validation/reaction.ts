import { z } from 'zod'
import { strongRefSchema } from './strong-ref.js'
import { didRegex } from './patterns.js'

/**
 * Zod schema for forum.barazo.interaction.reaction records.
 *
 * Mirrors the lexicon constraints from prd-lexicons.md section 3.3.
 */
export const reactionSchema = z.object({
  subject: strongRefSchema,
  type: z.string().min(1).max(300),
  community: z.string().regex(didRegex),
  createdAt: z.iso.datetime(),
})

export type ReactionInput = z.input<typeof reactionSchema>
