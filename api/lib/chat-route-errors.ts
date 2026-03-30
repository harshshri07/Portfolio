import { GoogleGenerativeAIFetchError, GoogleGenerativeAIResponseError } from "@google/generative-ai";

/** Map thrown errors to HTTP status + safe client message. */
export function chatRouteErrorToHttp(e: unknown): { status: number; message: string } {
  if (e instanceof GoogleGenerativeAIResponseError) {
    return {
      status: 503,
      message:
        e.message ||
        "The model did not return text (blocked or empty). Try a shorter question, or try again later.",
    };
  }

  if (e instanceof GoogleGenerativeAIFetchError) {
    const status = e.status ?? 500;
    const raw = e.message ?? "";

    if (status === 429) {
      return {
        status: 429,
        message:
          "Gemini rate limit or quota reached (common on the free tier). Wait a few minutes and try again, or add billing / raise limits in Google AI Studio. See https://ai.google.dev/gemini-api/docs/rate-limits",
      };
    }

    if (status === 403) {
      return {
        status: 403,
        message:
          "Gemini returned 403 (forbidden). Check Google AI Studio: API key restrictions, that the Generative Language API is enabled for the project, and billing if your project requires it.",
      };
    }

    if (status === 400) {
      if (/API key|API_KEY|invalid key|expired/i.test(raw)) {
        return {
          status: 400,
          message:
            "Gemini rejected the API key (invalid or expired). Create a new key at https://aistudio.google.com/apikey, put it in .env as GEMINI_API_KEY (or GOOGLE_API_KEY), then restart the dev server. For a deployed site, set the same variable in your host's environment (not in the repo).",
        };
      }
      if (/model|not found|not supported|is not found|404/i.test(raw)) {
        return {
          status: 400,
          message: `Model error: ${raw}. Set GEMINI_MODEL to a model your account supports (e.g. gemini-2.5-flash), then restart.`,
        };
      }
    }

    return { status, message: raw || "Gemini request failed" };
  }

  const message = e instanceof Error ? e.message : "Chat failed";
  if (message.includes("No Gemini API key") || message.includes("Gemini API key")) {
    return { status: 503, message };
  }
  return { status: 500, message };
}
