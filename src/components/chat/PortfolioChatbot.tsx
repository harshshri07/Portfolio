import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

/** Split assistant text on blank lines so multi-paragraph replies are readable. */
function FormattedMessage({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\n+/);
  return (
    <div className="space-y-2.5">
      {blocks.map((block, i) => (
        <p key={i} className="m-0 leading-relaxed">
          {block.split("\n").map((line, j, lines) => (
            <span key={j}>
              {line}
              {j < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

const WELCOME =
  "Hi, I'm Harsh. Ask me about my background, projects, skills, or how to get in touch.";

/** Spacing between sends helps stay under free-tier RPM. */
const MIN_MS_BETWEEN_SENDS = 4000;
/** After a 429, block new sends briefly so repeated tries do not burn the quota faster. */
const COOLDOWN_AFTER_429_SEC = 90;

export function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: WELCOME }]);
  const [loading, setLoading] = useState(false);
  /** Seconds left before user can send again (after rate limit). */
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastSendAtRef = useRef(0);
  /** Blocks duplicate sends before React flips `loading` (e.g. double-clicks). */
  const sendInFlightRef = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const cooldownActive = cooldownLeft > 0;
  useEffect(() => {
    if (!cooldownActive) return;
    const id = window.setInterval(() => {
      setCooldownLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [cooldownActive]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading || sendInFlightRef.current || cooldownLeft > 0) return;
    const now = Date.now();
    if (now - lastSendAtRef.current < MIN_MS_BETWEEN_SENDS) {
      return;
    }
    lastSendAtRef.current = now;

    sendInFlightRef.current = true;
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
              ? `Server error (${res.status}). Locally: check the terminal running npm run dev. Deployed: check your host's logs and environment variables for the chat API.`
              : `Chat request failed (${res.status}). Locally: ensure npm run dev is running. Deployed: check your host's deployment and /api/chat route.`,
        );
      }

      if (!res.ok) {
        if (res.status === 429) {
          setCooldownLeft(COOLDOWN_AFTER_429_SEC);
        }
        throw new Error(
          data.error ||
            (res.status === 503
              ? "No Gemini API key configured. Locally: add GEMINI_API_KEY or GOOGLE_API_KEY to .env and restart npm run dev. Deployed: set the same variables in your host's dashboard and redeploy."
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
          : "Sorry, something went wrong. Try again in a moment.";
      setMessages([...thread, { role: "assistant", content: message }]);
    } finally {
      sendInFlightRef.current = false;
      setLoading(false);
    }
  }, [input, loading, messages, cooldownLeft]);

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
              className="flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-sm border border-border bg-background/95 shadow-2xl backdrop-blur-md sm:w-[min(100vw-2.5rem,24rem)] md:w-[min(100vw-3rem,26rem)] lg:w-[min(100vw-4rem,28rem)] xl:w-[min(100vw-5rem,30rem)]"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3 md:px-5">
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

              <div className="max-h-[min(50vh,320px)] space-y-3 overflow-y-auto px-4 py-3 md:max-h-[min(56vh,440px)] md:px-5 lg:max-h-[min(60vh,520px)] xl:max-h-[min(68vh,620px)]">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-sm px-3 py-2 text-sm leading-relaxed md:text-[15px] md:leading-relaxed",
                      m.role === "user"
                        ? "ml-6 bg-accent/15 text-foreground"
                        : "mr-4 max-w-none border border-border/60 bg-secondary/30 text-muted-foreground",
                    )}
                  >
                    {m.role === "assistant" ? <FormattedMessage text={m.content} /> : m.content}
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

              <div className="border-t border-border p-3 md:p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key !== "Enter" || e.shiftKey) return;
                      e.preventDefault();
                      send();
                    }}
                    placeholder={
                      cooldownLeft > 0
                        ? `Rate limited: wait ${cooldownLeft}s…`
                        : "Ask about projects, skills, contact…"
                    }
                    className="min-h-10 flex-1 rounded-sm border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent md:min-h-11 md:text-[15px]"
                    disabled={loading || cooldownLeft > 0}
                  />
                  <button
                    type="button"
                    onClick={send}
                    disabled={loading || !input.trim() || cooldownLeft > 0}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-40 md:h-11 md:w-11"
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                  Answers are AI-assisted and based on Harsh&apos;s public profile.
                  {cooldownLeft > 0 ? (
                    <span className="mt-1 block text-amber-600/90 dark:text-amber-400/90">
                      Gemini free tier is strict: wait, then try one message at a time. For higher limits, add billing in
                      Google AI Studio.
                    </span>
                  ) : null}
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
