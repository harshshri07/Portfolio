import { GoogleGenerativeAIFetchError } from "@google/generative-ai";

/** Map thrown errors to HTTP status + safe client message. */
export function chatRouteErrorToHttp(e: unknown): { status: number; message: string } {
  if (e instanceof GoogleGenerativeAIFetchError) {
    const status = e.status ?? 500;
    if (status === 429) {
      return {
        status: 429,
        message:
          "Gemini quota or rate limit reached. Check limits at https://ai.google.dev/gemini-api/docs/rate-limits and your Google AI Studio project.",
      };
    }
    return { status, message: e.message };
  }
  const message = e instanceof Error ? e.message : "Chat failed";
  if (message.includes("GEMINI_API_KEY")) {
    return { status: 503, message };
  }
  return { status: 500, message };
}
