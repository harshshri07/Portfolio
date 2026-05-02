import type { VercelRequest, VercelResponse } from "@vercel/node";
import { streamChatRequest, type ChatMessage } from "./lib/chat-core.js";
import { chatRouteErrorToHttp } from "./lib/chat-route-errors.js";
import { PORTFOLIO_KNOWLEDGE } from "./lib/portfolio-knowledge.js";

/** Hard server-side cap per IP per 24 h. Higher than the localStorage soft cap
 *  (7) to accommodate shared IPs (offices, campuses) while still blocking abuse. */
const IP_DAILY_LIMIT = 7;

/** Returns the remaining request count for this IP, or null if Redis is unavailable. */
async function checkIpRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return { allowed: true, remaining: IP_DAILY_LIMIT };

  try {
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({ url, token });
    const key = `chat:ip:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, 86400);
    const remaining = Math.max(0, IP_DAILY_LIMIT - count);
    return { allowed: count <= IP_DAILY_LIMIT, remaining };
  } catch {
    // Fail open — don't block users if Redis is temporarily down.
    return { allowed: true, remaining: IP_DAILY_LIMIT };
  }
}

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

  // IP-based server-side rate limit
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const { allowed } = await checkIpRateLimit(ip);
  if (!allowed) {
    res.write(
      `data: ${JSON.stringify({
        error:
          "You've reached the daily limit for this chatbot. Come back tomorrow, or reach me directly at shrishrimal38@gmail.com.",
      })}\n\n`,
    );
    return res.end();
  }

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
