import path from "path";
import type { IncomingMessage, ServerResponse } from "http";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { streamChatRequest } from "./api/lib/chat-core";
import { chatRouteErrorToHttp } from "./api/lib/chat-route-errors";
import { PORTFOLIO_KNOWLEDGE } from "./api/lib/portfolio-knowledge";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Forward AWS / Bedrock env vars from .env into process.env for the dev-server middleware.
  const awsVars = [
    "AWS_REGION",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_SESSION_TOKEN",
    "BEDROCK_MODEL_ID",
  ] as const;
  for (const key of awsVars) {
    if (env[key]) process.env[key] = env[key];
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
                  res.setHeader("Content-Type", "text/event-stream");
                  res.end(`data: ${JSON.stringify({ error: "Missing or invalid messages" })}\n\n`);
                  return;
                }
                res.setHeader("Content-Type", "text/event-stream");
                res.setHeader("Cache-Control", "no-cache");
                res.setHeader("Connection", "keep-alive");
                for await (const chunk of streamChatRequest(messages, PORTFOLIO_KNOWLEDGE)) {
                  res.write(`data: ${JSON.stringify({ delta: chunk })}\n\n`);
                }
                res.write("data: [DONE]\n\n");
                res.end();
              } catch (e) {
                const { message } = chatRouteErrorToHttp(e);
                res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
                res.end();
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
