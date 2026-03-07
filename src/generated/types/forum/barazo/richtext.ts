/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../lexicons.js'
import { type $Typed, is$typed as _is$typed, type OmitKey } from '../../../util.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'forum.barazo.richtext'

/** Markdown-formatted text content. */
export interface Markdown {
  $type?: 'forum.barazo.richtext#markdown'
  /** Markdown-formatted text. */
  value: string
}

const hashMarkdown = 'markdown'

export function isMarkdown<V>(v: V) {
  return is$typed(v, id, hashMarkdown)
}

export function validateMarkdown<V>(v: V) {
  return validate<Markdown & V>(v, id, hashMarkdown)
}
