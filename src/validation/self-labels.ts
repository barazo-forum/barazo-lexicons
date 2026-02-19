import { z } from 'zod'

/** Self-label value (matches com.atproto.label.defs#selfLabel). */
export const selfLabelSchema = z.object({
  val: z.string().max(128),
})

/** Self-labels object (matches com.atproto.label.defs#selfLabels). */
export const selfLabelsSchema = z.object({
  values: z.array(selfLabelSchema).max(10),
})
