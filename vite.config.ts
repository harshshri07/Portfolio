import path from "path";
import type { IncomingMessage, ServerResponse } from "http";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { handleChatRequest } from "./api/lib/chat-core";
import { PORTFOLIO_KNOWLEDGE } from "./api/lib/portfolio-knowledge";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  if (env.OPENAI_API_KEY) {
    process.env.OPENAI_API_KEY = env.OPENAI_API_KEY;
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
                const reply = await handleChatRequest(
                  messages,
                  PORTFOLIO_KNOWLEDGE,
                  process.env.OPENAI_API_KEY,
                );
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ reply }));
              } catch (e) {
                const message = e instanceof Error ? e.message : "Chat failed";
                const status = message.includes("OPENAI_API_KEY") ? 503 : 500;
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
