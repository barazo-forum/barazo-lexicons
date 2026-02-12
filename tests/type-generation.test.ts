import { describe, it, expect } from "vitest";
import {
  ForumAtgoraTopicPost,
  ForumAtgoraTopicReply,
  ForumAtgoraInteractionReaction,
  ForumAtgoraActorPreferences,
  LEXICON_IDS,
  schemas,
  ids,
} from "../src/index.js";

describe("generated type exports", () => {
  it("exports ForumAtgoraTopicPost with Record type and validators", () => {
    expect(ForumAtgoraTopicPost.isRecord).toBeTypeOf("function");
    expect(ForumAtgoraTopicPost.validateRecord).toBeTypeOf("function");
  });

  it("exports ForumAtgoraTopicReply with Record type and validators", () => {
    expect(ForumAtgoraTopicReply.isRecord).toBeTypeOf("function");
    expect(ForumAtgoraTopicReply.validateRecord).toBeTypeOf("function");
  });

  it("exports ForumAtgoraInteractionReaction with Record type and validators", () => {
    expect(ForumAtgoraInteractionReaction.isRecord).toBeTypeOf("function");
    expect(ForumAtgoraInteractionReaction.validateRecord).toBeTypeOf(
      "function",
    );
  });

  it("exports ForumAtgoraActorPreferences with Record type and validators", () => {
    expect(ForumAtgoraActorPreferences.isRecord).toBeTypeOf("function");
    expect(ForumAtgoraActorPreferences.validateRecord).toBeTypeOf("function");
  });
});

describe("LEXICON_IDS constants", () => {
  it("has correct TopicPost ID", () => {
    expect(LEXICON_IDS.TopicPost).toBe("forum.atgora.topic.post");
  });

  it("has correct TopicReply ID", () => {
    expect(LEXICON_IDS.TopicReply).toBe("forum.atgora.topic.reply");
  });

  it("has correct Reaction ID", () => {
    expect(LEXICON_IDS.Reaction).toBe("forum.atgora.interaction.reaction");
  });

  it("has correct ActorPreferences ID", () => {
    expect(LEXICON_IDS.ActorPreferences).toBe(
      "forum.atgora.actor.preferences",
    );
  });
});

describe("generated schemas", () => {
  it("exports schemas array", () => {
    expect(Array.isArray(schemas)).toBe(true);
    expect(schemas.length).toBeGreaterThan(0);
  });

  it("schemas contain all ATgora lexicon IDs", () => {
    const schemaIds = schemas.map(
      (s: Record<string, unknown>) => s["id"] as string,
    );
    expect(schemaIds).toContain("forum.atgora.topic.post");
    expect(schemaIds).toContain("forum.atgora.topic.reply");
    expect(schemaIds).toContain("forum.atgora.interaction.reaction");
    expect(schemaIds).toContain("forum.atgora.actor.preferences");
  });
});

describe("generated ids map", () => {
  it("maps ForumAtgoraTopicPost correctly", () => {
    expect(ids.ForumAtgoraTopicPost).toBe("forum.atgora.topic.post");
  });

  it("maps ForumAtgoraTopicReply correctly", () => {
    expect(ids.ForumAtgoraTopicReply).toBe("forum.atgora.topic.reply");
  });

  it("maps ForumAtgoraInteractionReaction correctly", () => {
    expect(ids.ForumAtgoraInteractionReaction).toBe(
      "forum.atgora.interaction.reaction",
    );
  });

  it("maps ForumAtgoraActorPreferences correctly", () => {
    expect(ids.ForumAtgoraActorPreferences).toBe(
      "forum.atgora.actor.preferences",
    );
  });
});

describe("isRecord type guards", () => {
  it("ForumAtgoraTopicPost.isRecord identifies correct $type", () => {
    expect(
      ForumAtgoraTopicPost.isRecord({
        $type: "forum.atgora.topic.post",
        title: "Test",
      }),
    ).toBe(true);
  });

  it("ForumAtgoraTopicPost.isRecord rejects wrong $type", () => {
    expect(
      ForumAtgoraTopicPost.isRecord({
        $type: "forum.atgora.topic.reply",
        content: "Test",
      }),
    ).toBe(false);
  });

  it("ForumAtgoraTopicPost.isRecord rejects non-objects", () => {
    expect(ForumAtgoraTopicPost.isRecord("string")).toBe(false);
    expect(ForumAtgoraTopicPost.isRecord(null)).toBe(false);
    expect(ForumAtgoraTopicPost.isRecord(undefined)).toBe(false);
  });
});
