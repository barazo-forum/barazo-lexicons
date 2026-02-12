/**
 * @atgora-forum/lexicons
 *
 * AT Protocol lexicon schemas and generated TypeScript types
 * for the ATgora forum platform.
 *
 * Namespace: forum.atgora.*
 */

// Generated types (from lex-cli)
export {
  ForumAtgoraTopicPost,
  ForumAtgoraTopicReply,
  ForumAtgoraInteractionReaction,
  ForumAtgoraActorPreferences,
  ComAtprotoRepoStrongRef,
  ComAtprotoLabelDefs,
} from "./generated/index.js";

// Generated lexicon schemas and validation (from lex-cli)
export { schemas, validate } from "./generated/index.js";
export { ids } from "./generated/lexicons.js";

// Zod validation schemas (hand-written, mirrors lexicon constraints)
export {
  topicPostSchema,
  topicReplySchema,
  reactionSchema,
  actorPreferencesSchema,
  crossPostConfigSchema,
  strongRefSchema,
  selfLabelsSchema,
  selfLabelSchema,
  type TopicPostInput,
  type TopicReplyInput,
  type ReactionInput,
  type ActorPreferencesInput,
} from "./validation/index.js";

// Lexicon ID constants
export const LEXICON_IDS = {
  TopicPost: "forum.atgora.topic.post",
  TopicReply: "forum.atgora.topic.reply",
  Reaction: "forum.atgora.interaction.reaction",
  ActorPreferences: "forum.atgora.actor.preferences",
} as const;
