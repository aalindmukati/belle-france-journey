import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What is the best region to visit?",
  "Tell me about French cuisine",
  "What does 'Château' mean?",
  "Give me a fun fact about France",
];

const GREETING =
  "Bonjour! I'm Pierre, your personal guide to all things France! 🇫🇷 Whether you want to know about the best landmarks to visit, the most delicious French dishes, or what a French word means — I'm here to help. What would you like to explore today?";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/pierre-chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok || !resp.body) {
      onError("Pardonnez-moi! I seem to be having a little trouble at the moment. Please try again in a moment.");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") { onDone(); return; }
        try {
          const parsed = JSON.parse(json);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }
    onDone();
  } catch {
    onError("Pardonnez-moi! I seem to be having a little trouble at the moment. Please try again in a moment.");
  }
}

const PierreChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [pulsing, setPulsing] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  // Stop pulse after 5s
  useEffect(() => {
    const t = setTimeout(() => setPulsing(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const openChat = useCallback(() => {
    setOpen(true);
    setShowBadge(false);
    if (!hasGreeted) {
      setMessages([{ role: "assistant", content: GREETING }]);
      setHasGreeted(true);
    }
  }, [hasGreeted]);

  // Show badge after 2s if not opened
  useEffect(() => {
    const t = setTimeout(() => {
      if (!open && !hasGreeted) setShowBadge(true);
    }, 2000);
    return () => clearTimeout(t);
  }, [open, hasGreeted]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      const userMsg: Message = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setLoading(true);

      let assistantText = "";
      const updateAssistant = (chunk: string) => {
        assistantText += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && prev.length === newMessages.length + 1) {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantText } : m));
          }
          return [...prev, { role: "assistant", content: assistantText }];
        });
      };

      await streamChat({
        messages: newMessages,
        onDelta: updateAssistant,
        onDone: () => setLoading(false),
        onError: (msg) => {
          setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
          setLoading(false);
        },
      });
    },
    [messages, loading]
  );

  const showSuggestions = messages.length <= 1;

  return (
    <>
      {/* Floating trigger */}
      {!open && (
        <button
          onClick={openChat}
          className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-primary text-accent flex items-center justify-center shadow-xl hover:scale-110 transition-transform ${pulsing ? "animate-pulse" : ""}`}
          aria-label="Open chat with Pierre"
        >
          <span className="text-2xl">⚜️</span>
          {showBadge && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full border-2 border-primary" />
          )}
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          className={`fixed z-[9999] flex flex-col bg-background border border-border shadow-2xl ${
            isMobile
              ? "inset-0"
              : "bottom-6 right-6 w-[380px] h-[520px] rounded-xl"
          }`}
          style={{ overflow: "hidden" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground shrink-0">
            <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-lg">🎩</div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-sm text-accent truncate">Pierre — Your French Guide</p>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-accent/20 rounded" aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[hsl(var(--cream-light))]">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs shrink-0 mt-1">🎩</div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-accent text-accent-foreground rounded-br-sm"
                      : "bg-background text-foreground border border-border rounded-bl-sm"
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                      em: ({ children }) => <em className="text-accent font-medium">{children}</em>,
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs shrink-0">🎩</div>
                <div className="bg-background border border-border rounded-xl px-4 py-3 rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggestion chips */}
          {showSuggestions && (
            <div className="flex flex-wrap gap-2 px-4 py-2 bg-[hsl(var(--cream-light))] border-t border-border">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-accent text-accent-foreground bg-accent/10 hover:bg-accent/20 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-border bg-background shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask me anything about France..."
              className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
              disabled={loading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-lg bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/80 transition-colors disabled:opacity-40"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PierreChatbot;
