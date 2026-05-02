import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Sparkles, RotateCcw } from "lucide-react";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

/** Render a single line of text, converting **bold** to <strong>. */
function InlineLine({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/** Split assistant text on blank lines; render bullet lines as a list. */
function FormattedMessage({ text, streaming }: { text: string; streaming?: boolean }) {
  const blocks = text.trim().split(/\n\n+/);
  return (
    <div className="space-y-2.5">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        const isList = lines.length > 1 && lines.every((l) => l.trim().startsWith("- "));
        if (isList) {
          return (
            <ul key={i} className="m-0 space-y-0.5 pl-4 list-disc">
              {lines.map((l, j) => (
                <li key={j} className="leading-relaxed">
                  <InlineLine text={l.trim().slice(2)} />
                </li>
              ))}
            </ul>
          );
        }
        const isLast = i === blocks.length - 1;
        return (
          <p key={i} className="m-0 leading-relaxed">
            {lines.map((line, j) => (
              <span key={j}>
                <InlineLine text={line} />
                {j < lines.length - 1 ? <br /> : null}
              </span>
            ))}
            {isLast && streaming && (
              <span className="inline-block w-0.5 h-[1em] bg-current opacity-70 animate-pulse ml-0.5 align-middle" />
            )}
          </p>
        );
      })}
    </div>
  );
}

/** Parse SSE stream from /api/chat, calling onChunk for each text delta and onError on failure. */
async function streamFetch(
  apiMessages: { role: string; content: string }[],
  onChunk: (text: string) => void,
  onError: (msg: string) => void,
): Promise<void> {
  let res: Response;
  try {
    res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: apiMessages }),
    });
  } catch {
    onError("Network error. Check your connection and try again.");
    return;
  }

  if (!res.body) {
    onError(`Request failed (${res.status}).`);
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      const line = part.trim();
      if (!line.startsWith("data: ")) continue;
      const raw = line.slice(6);
      if (raw === "[DONE]") return;
      try {
        const parsed = JSON.parse(raw) as { delta?: string; error?: string };
        if (parsed.error) { onError(parsed.error); return; }
        if (parsed.delta) onChunk(parsed.delta);
      } catch {
        // malformed chunk — skip
      }
    }
  }
}

const WELCOME = "Hi! Ask me about my background, projects, skills, or how to get in touch.";
const INITIAL_MESSAGES: Msg[] = [{ role: "assistant", content: WELCOME }];

const SUGGESTED_QUESTIONS = [
  "What are your best projects?",
  "What roles are you looking for?",
  "How do I get in touch?",
];

const MIN_MS_BETWEEN_SENDS = 4000;
const COOLDOWN_AFTER_429_SEC = 90;

/** Daily message budget per visitor (resets after 24 h). */
const DAILY_LIMIT = 7;
const STORAGE_KEY = "hs_chat_usage";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

interface UsageRecord { count: number; windowStart: number }

function getUsage(): UsageRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const rec = JSON.parse(raw) as UsageRecord;
      if (Date.now() - rec.windowStart < ONE_DAY_MS) return rec;
    }
  } catch { /* ignore */ }
  return { count: 0, windowStart: Date.now() };
}

function consumeMessage(): number {
  const rec = getUsage();
  const updated = { ...rec, count: rec.count + 1 };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
  return DAILY_LIMIT - updated.count;
}

function remainingMessages(): number {
  return Math.max(0, DAILY_LIMIT - getUsage().count);
}

// ── Conversation persistence ──────────────────────────────────────────────────
const CONV_KEY = "hs_chat_conv";

function loadConversation(): Msg[] {
  try {
    const raw = localStorage.getItem(CONV_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Msg[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return [INITIAL_MESSAGES[0], ...parsed];
      }
    }
  } catch { /* ignore */ }
  return INITIAL_MESSAGES;
}

function saveConversation(msgs: Msg[]): void {
  try {
    const toSave = msgs.slice(1); // drop welcome message
    if (toSave.length > 0) localStorage.setItem(CONV_KEY, JSON.stringify(toSave));
    else localStorage.removeItem(CONV_KEY);
  } catch { /* ignore */ }
}

// ── Response cache ────────────────────────────────────────────────────────────
const CACHE_KEY = "hs_chat_cache";
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_CACHE_ENTRIES = 40;

interface CacheEntry { reply: string; ts: number }
type CacheStore = Record<string, CacheEntry>;

function normalizeQ(q: string): string {
  return q.toLowerCase().trim().replace(/\s+/g, " ");
}

function getCached(question: string): string | null {
  try {
    const store = JSON.parse(localStorage.getItem(CACHE_KEY) ?? "{}") as CacheStore;
    const entry = store[normalizeQ(question)];
    if (entry && Date.now() - entry.ts < CACHE_TTL_MS) return entry.reply;
  } catch { /* ignore */ }
  return null;
}

function setCached(question: string, reply: string): void {
  try {
    const store = JSON.parse(localStorage.getItem(CACHE_KEY) ?? "{}") as CacheStore;
    store[normalizeQ(question)] = { reply, ts: Date.now() };
    const pruned = Object.fromEntries(
      Object.entries(store).sort((a, b) => b[1].ts - a[1].ts).slice(0, MAX_CACHE_ENTRIES),
    );
    localStorage.setItem(CACHE_KEY, JSON.stringify(pruned));
  } catch { /* ignore */ }
}

export function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>(() => loadConversation());
  const [loading, setLoading] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [remaining, setRemaining] = useState(() => remainingMessages());
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastSendAtRef = useRef(0);
  const sendInFlightRef = useRef(false);

  const budgetExhausted = remaining <= 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    saveConversation(messages);
  }, [messages]);

  const cooldownActive = cooldownLeft > 0;
  useEffect(() => {
    if (!cooldownActive) return;
    const id = window.setInterval(() => {
      setCooldownLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [cooldownActive]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading || sendInFlightRef.current || cooldownLeft > 0) return;

      const userMsg: Msg = { role: "user", content: text.trim() };
      const thread = [...messages, userMsg];

      // Serve from cache — no API call, no budget cost
      const cached = getCached(text.trim());
      if (cached) {
        setMessages([...thread, { role: "assistant", content: cached }]);
        track("chat_cache_hit", { question: text.slice(0, 100) });
        return;
      }

      if (remainingMessages() <= 0) { setRemaining(0); return; }
      const now = Date.now();
      if (now - lastSendAtRef.current < MIN_MS_BETWEEN_SENDS) return;
      lastSendAtRef.current = now;
      sendInFlightRef.current = true;
      setRemaining(consumeMessage());

      track("chat_message", { question: text.slice(0, 100) });

      setMessages([...thread, { role: "assistant", content: "" }]);
      setLoading(true);

      const apiMessages = thread.map((m) => ({ role: m.role, content: m.content }));
      let fullText = "";

      await streamFetch(
        apiMessages,
        (chunk) => {
          fullText += chunk;
          setMessages([...thread, { role: "assistant", content: fullText }]);
        },
        (errMsg) => {
          if (/429|rate.?limit|throttl/i.test(errMsg)) {
            setCooldownLeft(COOLDOWN_AFTER_429_SEC);
          }
          setMessages([...thread, { role: "assistant", content: errMsg }]);
        },
      );

      if (fullText) setCached(text.trim(), fullText);

      sendInFlightRef.current = false;
      setLoading(false);
    },
    [messages, loading, cooldownLeft],
  );

  const send = useCallback(() => {
    const text = input.trim();
    setInput("");
    sendMessage(text);
  }, [input, sendMessage]);

  const reset = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
    setCooldownLeft(0);
    try { localStorage.removeItem(CONV_KEY); } catch { /* ignore */ }
  }, []);

  const disabled = loading || cooldownLeft > 0 || budgetExhausted;
  const isStreaming = loading && messages[messages.length - 1]?.role === "assistant";

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2 md:bottom-8 md:right-8 md:gap-3">
        <AnimatePresence mode="wait">
          {!open && (
            <motion.button
              key="chat-teaser"
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(true)}
              className="hidden max-w-[min(100vw-2rem,20rem)] items-center gap-2.5 rounded-full border border-accent/50 bg-background/95 px-3 py-2.5 text-left shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-accent hover:bg-secondary/40 md:flex"
              aria-label="Open AI chat: ask about Harsh"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Sparkles className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium leading-tight text-foreground">Chat with Harsh</span>
                <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                  AI answers as me about my work
                </span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key="chat-panel"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-lg border border-accent/25 bg-background/95 shadow-[0_12px_48px_rgba(0,0,0,0.45)] shadow-accent/5 backdrop-blur-md sm:w-[min(100vw-2.5rem,24rem)] md:w-[min(100vw-3rem,26rem)] lg:w-[min(100vw-4rem,28rem)] xl:w-[min(100vw-5rem,30rem)]"
            >
              {/* Header */}
              <div className="border-b border-accent/20 bg-gradient-to-br from-accent/10 via-background/80 to-background px-4 py-3.5 md:px-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent/20 text-accent">
                      <Sparkles className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
                          Ask Harsh
                        </span>
                        <span className="rounded-sm bg-accent/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-accent">
                          AI chat
                        </span>
                      </div>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                        Ask this bot questions about me. It replies in my voice from my public profile.
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={reset}
                      className="rounded-sm p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      aria-label="Clear chat"
                      title="Clear chat"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-sm p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      aria-label="Close chat"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="max-h-[min(50vh,320px)] space-y-3 overflow-y-auto px-4 py-3 md:max-h-[min(56vh,440px)] md:px-5 lg:max-h-[min(60vh,520px)] xl:max-h-[min(68vh,620px)]">
                {messages.map((m, i) => {
                  const isStreamingThis = isStreaming && i === messages.length - 1;
                  return (
                    <div key={i}>
                      <div
                        className={cn(
                          "rounded-sm px-3 py-2 text-sm leading-relaxed md:text-[15px] md:leading-relaxed",
                          m.role === "user"
                            ? "ml-6 bg-accent/15 text-foreground"
                            : "mr-4 max-w-none border border-border/60 bg-secondary/30 text-muted-foreground",
                        )}
                      >
                        {m.role === "assistant" ? (
                          m.content === "" && loading ? (
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              Thinking…
                            </span>
                          ) : (
                            <FormattedMessage text={m.content} streaming={isStreamingThis} />
                          )
                        ) : (
                          m.content
                        )}
                      </div>
                      {/* Suggested question chips — only below the welcome message */}
                      {i === 0 && messages.length === 1 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {SUGGESTED_QUESTIONS.map((q) => (
                            <button
                              key={q}
                              type="button"
                              onClick={() => sendMessage(q)}
                              className="rounded-full border border-accent/30 bg-accent/8 px-2.5 py-1 text-[11px] text-accent/80 transition hover:border-accent/60 hover:bg-accent/15 hover:text-accent md:text-xs"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="border-t border-border p-3 md:p-4">
                {budgetExhausted ? (
                  <p className="rounded-sm border border-border/60 bg-secondary/30 px-3 py-2.5 text-[11px] leading-relaxed text-muted-foreground">
                    You've reached the daily message limit. Reach me directly at{" "}
                    <a
                      href="mailto:shrishrimal38@gmail.com"
                      className="text-accent underline underline-offset-2"
                    >
                      shrishrimal38@gmail.com
                    </a>{" "}
                    or on{" "}
                    <a
                      href="https://linkedin.com/in/harsh-shrishrimal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline underline-offset-2"
                    >
                      LinkedIn
                    </a>
                    . Limit resets in 24 hours.
                  </p>
                ) : (
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
                          : "Ask the AI about my work, skills, contact…"
                      }
                      className="min-h-10 flex-1 rounded-sm border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent md:min-h-11 md:text-[15px]"
                      disabled={disabled}
                    />
                    <button
                      type="button"
                      onClick={send}
                      disabled={disabled || !input.trim()}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-40 md:h-11 md:w-11"
                      aria-label="Send"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {!budgetExhausted && (
                  <p className="mt-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
                    AI replies as Harsh, based on his public profile.
                    {remaining <= 3 && remaining > 0 && (
                      <span className="ml-1 text-amber-600/80 dark:text-amber-400/80">
                        {remaining} message{remaining === 1 ? "" : "s"} left today.
                      </span>
                    )}
                    {cooldownLeft > 0 && (
                      <span className="mt-1 block text-amber-600/90 dark:text-amber-400/90">
                        Rate limited. Wait a moment, then try again.
                      </span>
                    )}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent/45 bg-background/95 text-accent shadow-[0_4px_24px_rgba(56,189,248,0.25)] backdrop-blur-md transition hover:scale-[1.04] hover:border-accent hover:shadow-[0_6px_28px_rgba(56,189,248,0.35)] active:scale-[0.98] md:h-[3.75rem] md:w-[3.75rem]"
            aria-label={open ? "Close AI chat" : "Open AI chat with Harsh"}
          >
            {!open && (
              <span
                className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1 font-mono text-[9px] font-bold uppercase leading-none text-accent-foreground shadow-sm"
                aria-hidden
              >
                AI
              </span>
            )}
            {open ? <X className="h-6 w-6 md:h-7 md:w-7" /> : <Sparkles className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />}
          </button>
          {/* Mobile label — hidden on md+ where the teaser pill already shows */}
          {!open && (
            <span className="font-mono text-[10px] text-muted-foreground md:hidden">
              Ask Harsh
            </span>
          )}
        </div>
      </div>
    </>
  );
}
