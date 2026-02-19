import { z } from 'zod'

/** AT Protocol strong reference (AT URI + CID pair). */
export const strongRefSchema = z.object({
  uri: z.string().startsWith('at://'),
  cid: z.string().min(1),
})
