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

const is$typed = _is$typed,
  validate = _validate
const id = 'forum.barazo.actor.preferences'

export interface Main {
  $type: 'forum.barazo.actor.preferences'
  /** Maximum maturity tier to show. Default: 'safe'. */
  maturityLevel: 'safe' | 'mature' | 'all'
  /** Global muted words (apply to all communities). */
  mutedWords?: string[]
  /** Blocked accounts (content hidden everywhere). */
  blockedDids?: string[]
  /** Muted accounts (content de-emphasized, collapsed but visible). */
  mutedDids?: string[]
  crossPostDefaults?: CrossPostConfig
  /** Client-declared timestamp when preferences were last updated. */
  updatedAt: string
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

export interface CrossPostConfig {
  $type?: 'forum.barazo.actor.preferences#crossPostConfig'
  /** Cross-post new topics to Bluesky. Default: false. */
  bluesky?: boolean
  /** Cross-post new topics to Frontpage. Default: false. */
  frontpage?: boolean
}

const hashCrossPostConfig = 'crossPostConfig'

export function isCrossPostConfig<V>(v: V) {
  return is$typed(v, id, hashCrossPostConfig)
}

export function validateCrossPostConfig<V>(v: V) {
  return validate<CrossPostConfig & V>(v, id, hashCrossPostConfig)
}
