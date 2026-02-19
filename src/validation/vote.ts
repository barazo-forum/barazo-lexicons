import { z } from 'zod'
import { strongRefSchema } from './strong-ref.js'

const didRegex = /^did:[a-z]+:[a-zA-Z0-9._:%-]+$/

/**
 * Zod schema for forum.barazo.interaction.vote records.
 *
 * Directional votes are quantitative (ranking), separate from reactions
 * (expressive, emoji-style). Uses knownValues for direction so 'down'
 * can be added later without a breaking change.
 */
export const voteSchema = z.object({
  subject: strongRefSchema,
  direction: z.string().min(1),
  community: z.string().regex(didRegex),
  createdAt: z.iso.datetime(),
})

export type VoteInput = z.input<typeof voteSchema>
