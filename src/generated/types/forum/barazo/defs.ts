/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../lexicons.js'
import { type $Typed, is$typed as _is$typed, type OmitKey } from '../../../util.js'

const is$typed = _is$typed,
  validate = _validate
const id = 'forum.barazo.defs'

/** Reference to a Barazo community by its DID. */
export interface CommunityRef {
  $type?: 'forum.barazo.defs#communityRef'
  /** The community's DID. */
  did: string
}

const hashCommunityRef = 'communityRef'

export function isCommunityRef<V>(v: V) {
  return is$typed(v, id, hashCommunityRef)
}

export function validateCommunityRef<V>(v: V) {
  return validate<CommunityRef & V>(v, id, hashCommunityRef)
}
