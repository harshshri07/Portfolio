import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME =
  "Hi — I'm Harsh's assistant. Ask me about his background, projects, skills, or how to get in touch.";

export function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: WELCOME }]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    const thread = [...messages, userMsg];
    setMessages(thread);
    setLoading(true);

    try {
      const apiMessages = thread.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const raw = await res.text();
      let data: { reply?: string; error?: string } = {};
      try {
        data = raw ? (JSON.parse(raw) as { reply?: string; error?: string }) : {};
      } catch {
        throw new Error(
          res.ok
            ? "Unexpected response from the chat service."
            : res.status >= 500
              ? `Server error (${res.status}). Open Vercel → your deployment → Logs, filter by /api/chat. If you see a crash, redeploy; if GEMINI_API_KEY is missing, add it under Settings → Environment Variables and redeploy.`
              : `Chat request failed (${res.status}). Check that the latest commit is deployed and Vercel → Functions lists /api/chat.`,
        );
      }

      if (!res.ok) {
        throw new Error(
          data.error ||
            (res.status === 503
              ? "GEMINI_API_KEY is not set for this deployment. In Vercel: Settings → Environment Variables → add GEMINI_API_KEY for Production, then redeploy."
              : `Request failed (${res.status}).`),
        );
      }
      if (!data.reply) {
        throw new Error(data.error || "No reply from the assistant.");
      }
      setMessages([...thread, { role: "assistant", content: data.reply }]);
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : "Sorry — something went wrong. Try again in a moment.";
      setMessages([...thread, { role: "assistant", content: message }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 md:bottom-8 md:right-8">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-sm border border-border bg-background/95 shadow-2xl backdrop-blur-md sm:w-[22rem]"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Ask Harsh
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-sm p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[min(50vh,320px)] space-y-3 overflow-y-auto px-4 py-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-sm px-3 py-2 text-sm leading-relaxed",
                      m.role === "user"
                        ? "ml-6 bg-accent/15 text-foreground"
                        : "mr-4 border border-border/60 bg-secondary/30 text-muted-foreground",
                    )}
                  >
                    {m.content}
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Thinking…
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="border-t border-border p-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                    placeholder="Ask about projects, skills, contact…"
                    className="min-h-10 flex-1 rounded-sm border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={send}
                    disabled={loading || !input.trim()}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-40"
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                  Answers are AI-assisted and based on Harsh&apos;s public profile.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background/90 text-accent shadow-lg backdrop-blur-md transition hover:border-accent/50 hover:bg-secondary/10"
          aria-label={open ? "Close chat" : "Open chat"}
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" strokeWidth={1.5} />}
        </button>
      </div>
    </>
  );
}
