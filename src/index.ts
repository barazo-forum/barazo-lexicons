/**
 * @barazo-forum/lexicons
 *
 * AT Protocol lexicon schemas and generated TypeScript types
 * for the Barazo forum platform.
 *
 * Namespace: forum.barazo.*
 */

// Generated types (from lex-cli)
export {
  ForumBarazoTopicPost,
  ForumBarazoTopicReply,
  ForumBarazoInteractionReaction,
  ForumBarazoActorPreferences,
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
  TopicPost: "forum.barazo.topic.post",
  TopicReply: "forum.barazo.topic.reply",
  Reaction: "forum.barazo.interaction.reaction",
  ActorPreferences: "forum.barazo.actor.preferences",
} as const;
