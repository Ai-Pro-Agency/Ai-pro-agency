"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { whatsappHref, API_BASE } from "@/lib/constants";
import { SparkleFlower } from "@/components/icons/SparkleFlower";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Quels sont vos tarifs ?",
  "Combien de temps pour un site ?",
  "Comment se passe le paiement ?",
];

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Bonjour ! Je suis l'assistant d'AI Pro Agency 👋 Posez-moi vos questions sur nos tarifs, nos délais ou notre méthode, je réponds en quelques secondes.",
};

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-ink-soft/50"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    // The greeting is a static UI bubble, not part of the real exchange —
    // the API requires the conversation to start on a user turn.
    const history = nextMessages.slice(1);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) throw new Error("chat request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = { ...last, content: last.content + chunk };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "Petit souci de connexion. Écrivez-nous directement sur WhatsApp, on répond vite !",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <div className="fixed bottom-6 left-5 z-50 sm:bottom-8 sm:left-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="shadow-3d absolute bottom-16 left-0 flex h-[32rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-ink via-brown-dark to-ink px-4 py-3">
              <div className="flex items-center gap-2">
                <SparkleFlower className="h-5 w-5" />
                <p className="font-script text-lg font-bold text-cream">AI Pro Agency</p>
              </div>
              <button
                aria-label="Fermer le chat"
                onClick={() => setOpen(false)}
                className="text-cream/70 hover:text-cream"
              >
                <X size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-3.5 py-2 text-sm leading-relaxed text-ink"
                        : "max-w-[85%] rounded-2xl rounded-bl-sm bg-cream-dark/60 px-3.5 py-2 text-sm leading-relaxed text-ink-soft"
                    }
                  >
                    {m.content ||
                      (isStreaming && i === messages.length - 1 ? <TypingDots /> : "")}
                  </div>
                </motion.div>
              ))}
            </div>

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent-dark"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-ink/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre question..."
                className="flex-1 rounded-full border border-ink/15 px-3.5 py-2 text-sm outline-none focus:border-accent"
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                aria-label="Envoyer"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-cream transition-opacity disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>

            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-t border-ink/10 bg-green/10 py-2 text-xs font-semibold text-green-dark transition-colors hover:bg-green/20"
            >
              Préférez WhatsApp ? Écrivez-nous directement
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {!open && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-accent/50"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <motion.button
          aria-label="Ouvrir le chat"
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-ink to-brown-dark text-cream shadow-lg shadow-black/20 transition-colors hover:from-accent hover:to-accent-dark hover:text-ink"
        >
          {open ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>
    </div>
  );
}
