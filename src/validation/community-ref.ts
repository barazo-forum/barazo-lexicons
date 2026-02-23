import { z } from 'zod'
import { didRegex } from './patterns.js'

/**
 * Zod schema for forum.barazo.defs#communityRef.
 *
 * Reference to a Barazo community by its DID.
 */
export const communityRefSchema = z.object({
  did: z.string().regex(didRegex),
})

export type CommunityRefInput = z.input<typeof communityRefSchema>
