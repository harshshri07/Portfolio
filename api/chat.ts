import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleChatRequest, type ChatMessage } from "./lib/chat-core.js";
import { chatRouteErrorToHttp } from "./lib/chat-route-errors.js";
import { PORTFOLIO_KNOWLEDGE } from "./lib/portfolio-knowledge.js";

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
    let body: unknown = req.body;
    if (typeof body === "string") {
      body = body ? JSON.parse(body) : {};
    }
    if (body == null || typeof body !== "object") {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
    const messages = (body as { messages?: ChatMessage[] }).messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Missing messages" });
    }

    const trimmed = messages.slice(-12);
    const reply = await handleChatRequest(
      trimmed,
      PORTFOLIO_KNOWLEDGE,
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_MODEL,
    );
    return res.status(200).json({ reply });
  } catch (e) {
    const { status, message } = chatRouteErrorToHttp(e);
    return res.status(status).json({ error: message });
  }
}
