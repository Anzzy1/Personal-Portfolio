"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getReply, type ChatMessage, type Reply } from "@/lib/ai/demo-responder";
import { ChatWidget } from "./chat-widget";

type ChatContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  messages: ChatMessage[];
  streamingId: string | null;
  thinking: boolean;
  mode: "ai" | "demo";
  ask: (question: string) => void;
  reset: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}

const uid = () => Math.random().toString(36).slice(2);

/**
 * Asks the Groq-backed API route. Falls back to the offline demo responder
 * when no key is configured, the network fails, or the model errors.
 */
async function getAnswer(history: ChatMessage[]): Promise<Reply> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: history.slice(-12).map(({ role, content }) => ({ role, content })),
      }),
    });
    if (res.ok) {
      const data = (await res.json()) as { ok?: boolean; content?: string; links?: Reply["links"] };
      if (data.ok && typeof data.content === "string" && data.content.trim()) {
        return { content: data.content.trim(), links: Array.isArray(data.links) ? data.links : undefined };
      }
    }
  } catch {
    // Offline or the model is down — the demo responder still answers
  }
  return getReply(history);
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [thinking, setThinking] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [mode, setMode] = useState<"ai" | "demo">("demo");
  const busy = useRef(false);

  // Ask the server once whether a model key is configured
  useEffect(() => {
    let alive = true;
    fetch("/api/chat")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d?.configured) setMode("ai");
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const ask = useCallback(
    async (question: string) => {
      const text = question.trim();
      if (!text || busy.current) return;
      busy.current = true;
      setOpen(true);

      const history = [...messages, { id: uid(), role: "user" as const, content: text }];
      setMessages(history);
      setThinking(true);

      const [reply] = await Promise.all([
        getAnswer(history),
        new Promise((r) => setTimeout(r, 300)), // feels less robotic
      ]);
      setThinking(false);

      // Simulated streaming, word by word
      const id = uid();
      setStreamingId(id);
      setMessages((m) => [...m, { id, role: "assistant", content: "" }]);
      const words = reply.content.split(" ");
      for (let i = 0; i < words.length; i++) {
        await new Promise((r) => setTimeout(r, 22));
        const partial = words.slice(0, i + 1).join(" ");
        setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, content: partial } : msg)));
      }
      setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, links: reply.links } : msg)));
      setStreamingId(null);
      busy.current = false;
    },
    [messages],
  );

  const reset = useCallback(() => {
    if (busy.current) return;
    setMessages([]);
  }, []);

  // ⌘K / Ctrl+K opens the assistant
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ChatContext.Provider value={{ open, setOpen, messages, streamingId, thinking, mode, ask, reset }}>
      {children}
      <ChatWidget />
    </ChatContext.Provider>
  );
}
