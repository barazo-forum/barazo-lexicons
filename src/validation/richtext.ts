import { z } from 'zod'

/**
 * Zod schema for forum.barazo.richtext#markdown content.
 *
 * Content is wrapped in a union discriminator object with $type.
 * The value field contains the actual markdown text.
 */
export const markdownContentSchema = z.object({
  $type: z.literal('forum.barazo.richtext#markdown'),
  value: z.string().min(1).max(100_000),
})

export type MarkdownContentInput = z.input<typeof markdownContentSchema>
