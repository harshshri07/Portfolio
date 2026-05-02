import type { VercelRequest, VercelResponse } from "@vercel/node";
import { streamChatRequest, type ChatMessage } from "./lib/chat-core.js";
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
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  try {
    let body: unknown = req.body;
    if (typeof body === "string") {
      body = body ? JSON.parse(body) : {};
    }
    if (body == null || typeof body !== "object") {
      res.write(`data: ${JSON.stringify({ error: "Invalid JSON body" })}\n\n`);
      return res.end();
    }
    const messages = (body as { messages?: ChatMessage[] }).messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      res.write(`data: ${JSON.stringify({ error: "Missing messages" })}\n\n`);
      return res.end();
    }

    const trimmed = messages.slice(-12);

    for await (const chunk of streamChatRequest(trimmed, PORTFOLIO_KNOWLEDGE)) {
      res.write(`data: ${JSON.stringify({ delta: chunk })}\n\n`);
    }
    res.write("data: [DONE]\n\n");
    return res.end();
  } catch (e) {
    const { message } = chatRouteErrorToHttp(e);
    res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
    return res.end();
  }
}
