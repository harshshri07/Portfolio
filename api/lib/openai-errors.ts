import { APIError } from "openai";

/** Map thrown errors to HTTP status + safe client message (OpenAI quota → 429, not 500). */
export function chatRouteErrorToHttp(e: unknown): { status: number; message: string } {
  if (e instanceof APIError) {
    const status = e.status ?? 500;
    if (status === 429) {
      return {
        status: 429,
        message:
          "OpenAI quota or rate limit reached. Add credits or check billing at https://platform.openai.com/account/billing — then try again.",
      };
    }
    return { status, message: e.message };
  }
  const message = e instanceof Error ? e.message : "Chat failed";
  if (message.includes("OPENAI_API_KEY")) {
    return { status: 503, message };
  }
  return { status: 500, message };
}
