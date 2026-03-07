/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../../lexicons.js'
import {
  type $Typed,
  is$typed as _is$typed,
  type OmitKey,
} from '../../../../util.js'
import type * as ForumBarazoRichtext from '../richtext.js'
import type * as AppBskyRichtextFacet from '../../../app/bsky/richtext/facet.js'
import type * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'forum.barazo.topic.post'

export interface Main {
  $type: 'forum.barazo.topic.post'
  /** Topic title. */
  title: string
  content: $Typed<ForumBarazoRichtext.Markdown> | { $type: string }
  /** DID of the community where this record was created. Immutable origin identifier for cross-community attribution. */
  community: string
  /** Category record key (slug) within the community. Follows AT Protocol record key syntax. */
  category: string
  /** Reference to a site.standard.publication record (at:// URI) or publication URL (https://). Enables cross-app content discovery. */
  site?: string
  /** Topic tags. Lowercase alphanumeric + hyphens. */
  tags?: string[]
  /** Annotations of text (mentions, URLs, hashtags, etc). */
  facets?: AppBskyRichtextFacet.Main[]
  /** BCP 47 language tags indicating the primary language(s) of the content. */
  langs?: string[]
  labels?: $Typed<ComAtprotoLabelDefs.SelfLabels> | { $type: string }
  /** Client-declared timestamp when this post was originally published. */
  publishedAt: string
  [k: string]: unknown
}

const hashMain = 'main'

export function isMain<V>(v: V) {
  return is$typed(v, id, hashMain)
}

export function validateMain<V>(v: V) {
  return validate<Main & V>(v, id, hashMain, true)
}

export {
  type Main as Record,
  isMain as isRecord,
  validateMain as validateRecord,
}
