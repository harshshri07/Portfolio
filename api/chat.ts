import { handleChatRequest, type ChatMessage } from "../server/chat-core";
import { PORTFOLIO_KNOWLEDGE } from "../server/portfolio-knowledge";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status, headers: corsHeaders });
}

/** Web handler (default export) — most reliable on Vercel vs named POST/OPTIONS exports. */
export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method !== "POST") {
      return jsonError("Method not allowed", 405);
    }

    try {
      const body = (await request.json()) as { messages?: ChatMessage[] };
      const messages = body?.messages;
      if (!Array.isArray(messages) || messages.length === 0) {
        return jsonError("Missing messages", 400);
      }

      const trimmed = messages.slice(-12);
      const reply = await handleChatRequest(trimmed, PORTFOLIO_KNOWLEDGE, process.env.OPENAI_API_KEY);
      return Response.json({ reply }, { headers: corsHeaders });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Chat failed";
      const status = message.includes("OPENAI_API_KEY") ? 503 : 500;
      return jsonError(message, status);
    }
  },
};
