import { z } from 'zod'

/** Byte slice for facet positioning (UTF-8 byte offsets). */
const byteSliceSchema = z.object({
  byteStart: z.number().int().nonnegative(),
  byteEnd: z.number().int().nonnegative(),
})

/** Facet feature: mention, link, or tag. */
const facetFeatureSchema = z.looseObject({})

/**
 * Zod schema for app.bsky.richtext.facet objects.
 *
 * Validates structural shape (index + features array). Feature contents
 * are validated permissively since new feature types may be added to the
 * AT Protocol standard.
 */
export const facetSchema = z.object({
  index: byteSliceSchema,
  features: z.array(facetFeatureSchema).min(1),
})
