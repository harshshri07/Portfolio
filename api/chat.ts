import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleChatRequest, type ChatMessage } from "../server/chat-core";
import { PORTFOLIO_KNOWLEDGE } from "../server/portfolio-knowledge";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const messages = body?.messages as ChatMessage[] | undefined;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Missing messages" });
    }

    const trimmed = messages.slice(-12);
    const reply = await handleChatRequest(trimmed, PORTFOLIO_KNOWLEDGE, process.env.OPENAI_API_KEY);
    return res.status(200).json({ reply });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Chat failed";
    const status = message.includes("OPENAI_API_KEY") ? 503 : 500;
    return res.status(status).json({ error: message });
  }
}
