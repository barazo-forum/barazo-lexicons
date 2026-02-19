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
import type * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'forum.barazo.interaction.vote'

export interface Main {
  $type: 'forum.barazo.interaction.vote'
  subject: ComAtprotoRepoStrongRef.Main
  /** Vote direction. Start upvote-only; 'down' can be added later without breaking change. */
  direction: 'up' | (string & {})
  /** DID of the community where this vote was cast. Immutable origin identifier. */
  community: string
  /** Client-declared timestamp when this vote was originally created. */
  createdAt: string
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
