/** DID format regex (simplified, catches obvious malformed DIDs). */
export const didRegex = /^did:[a-z]+:[a-zA-Z0-9._:%-]+$/

/** AT Protocol record key format regex. Excludes "." and ".." per spec. */
export const recordKeyRegex = /^(?!\.{1,2}$)[a-zA-Z0-9._:~-]{1,512}$/
