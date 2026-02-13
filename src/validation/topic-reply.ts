import { z } from "zod";
import { strongRefSchema } from "./strong-ref.js";
import { selfLabelsSchema } from "./self-labels.js";

const didRegex = /^did:[a-z]+:[a-zA-Z0-9._:%-]+$/;

/**
 * Zod schema for forum.barazo.topic.reply records.
 *
 * Mirrors the lexicon constraints from prd-lexicons.md section 3.2.
 */
export const topicReplySchema = z.object({
  content: z.string().min(1).max(50_000),
  contentFormat: z.literal("markdown").optional(),
  root: strongRefSchema,
  parent: strongRefSchema,
  community: z.string().regex(didRegex),
  labels: selfLabelsSchema.optional(),
  createdAt: z.iso.datetime(),
});

export type TopicReplyInput = z.input<typeof topicReplySchema>;
