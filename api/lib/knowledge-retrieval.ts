import { KNOWLEDGE_SECTIONS } from "./portfolio-knowledge.js";

/**
 * Score each knowledge section against the user's last message by keyword overlap,
 * then return the sections reordered so the most relevant ones appear first.
 * Sections marked alwaysInclude are pinned to the top regardless of score.
 */
export function buildKnowledge(lastUserMessage: string): string {
  const query = lastUserMessage.toLowerCase();

  const scored = KNOWLEDGE_SECTIONS.map((section) => {
    if (section.alwaysInclude) {
      return { section, score: 10000 };
    }
    const score = section.keywords.reduce(
      (acc, kw) => acc + (query.includes(kw) ? 1 : 0),
      0,
    );
    return { section, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .map((s) => s.section.content)
    .join("\n\n");
}

