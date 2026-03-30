import path from "path";
import type { IncomingMessage, ServerResponse } from "http";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { handleChatRequest } from "./api/lib/chat-core";
import { chatRouteErrorToHttp } from "./api/lib/chat-route-errors";
import { getGeminiApiKey } from "./api/lib/gemini-env";
import { PORTFOLIO_KNOWLEDGE } from "./api/lib/portfolio-knowledge";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  if (env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  }
  if (env.GOOGLE_GENERATIVE_AI_API_KEY) {
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = env.GOOGLE_GENERATIVE_AI_API_KEY;
  }
  if (env.GOOGLE_API_KEY) {
    process.env.GOOGLE_API_KEY = env.GOOGLE_API_KEY;
  }
  if (env.GEMINI_MODEL) {
    process.env.GEMINI_MODEL = env.GEMINI_MODEL;
  }

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      {
        name: "portfolio-chat-api-dev",
        configureServer(server) {
          server.middlewares.use("/api/chat", (req: IncomingMessage, res: ServerResponse, next) => {
            if (req.method !== "POST") {
              return next();
            }
            const chunks: Buffer[] = [];
            req.on("data", (c) => chunks.push(c as Buffer));
            req.on("end", async () => {
              try {
                const raw = Buffer.concat(chunks).toString("utf8");
                const body = JSON.parse(raw || "{}");
                const messages = body.messages;
                if (!Array.isArray(messages) || messages.length === 0) {
                  res.statusCode = 400;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: "Missing or invalid messages" }));
                  return;
                }
                const reply = await handleChatRequest(
                  messages,
                  PORTFOLIO_KNOWLEDGE,
                  getGeminiApiKey(),
                  process.env.GEMINI_MODEL,
                );
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ reply }));
              } catch (e) {
                const { status, message } = chatRouteErrorToHttp(e);
                res.statusCode = status;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: message }));
              }
            });
          });
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
