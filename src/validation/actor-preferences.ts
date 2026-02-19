import { z } from 'zod'

const didRegex = /^did:[a-z]+:[a-zA-Z0-9._:%-]+$/

/** Cross-post configuration for new topics. */
export const crossPostConfigSchema = z.object({
  bluesky: z.boolean().optional(),
  frontpage: z.boolean().optional(),
})

/**
 * Zod schema for forum.barazo.actor.preferences records.
 *
 * Mirrors the lexicon constraints from prd-lexicons.md section 3.4.
 * Singleton record (key: literal:self).
 */
export const actorPreferencesSchema = z.object({
  maturityLevel: z.enum(['safe', 'mature', 'all']),
  mutedWords: z.array(z.string().max(1000)).max(100).optional(),
  blockedDids: z.array(z.string().regex(didRegex)).max(1000).optional(),
  mutedDids: z.array(z.string().regex(didRegex)).max(1000).optional(),
  crossPostDefaults: crossPostConfigSchema.optional(),
  updatedAt: z.iso.datetime(),
})

export type ActorPreferencesInput = z.input<typeof actorPreferencesSchema>
