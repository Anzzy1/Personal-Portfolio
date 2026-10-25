"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowCounterClockwiseIcon,
  ArrowUpIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useChat } from "./chat-provider";
import { AiMark } from "./ai-mark";
import { suggestedQuestions } from "./suggestions";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const { open, setOpen, messages, thinking, streamingId, mode, ask, reset } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, thinking]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const busy = thinking || streamingId !== null;

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setOpen(true)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full border border-border bg-surface/90 py-1.5 pl-1.5 pr-4 text-sm font-medium shadow-float backdrop-blur transition-colors hover:border-accent/40"
            aria-label="Open AI assistant"
          >
            <AiMark className="size-8 rounded-full" />
            Ask my AI
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Anzyy AI assistant"
            initial={{ opacity: 0, y: 16, scale: 0.9, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 16, scale: 0.9, filter: "blur(6px)" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed inset-x-3 bottom-3 z-50 flex h-[min(600px,calc(100dvh-24px))] flex-col overflow-hidden rounded-[24px] border border-border bg-surface shadow-[0_24px_64px_-16px_rgb(0_0_0/0.35)] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <AiMark />
              <div className="flex-1 leading-tight">
                <p className="text-sm font-semibold">Anzyy AI</p>
                <p className="flex items-center gap-1.5 text-xs text-subtle">
                  <span className="size-1.5 rounded-full bg-success" />
                  {mode === "ai" ? "Online" : "Demo mode"}
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                aria-label="Clear conversation"
                className="rounded-md p-1.5 text-subtle hover:bg-surface-2 hover:text-fg"
              >
                <ArrowCounterClockwiseIcon weight="bold" className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="rounded-md p-1.5 text-subtle hover:bg-surface-2 hover:text-fg"
              >
                <XIcon weight="bold" className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <div className="flex h-full flex-col justify-end">
                  <div className="mb-auto pt-6 text-center">
                    <AiMark className="mx-auto size-11 rounded-2xl" />
                    <p className="mt-3 text-sm font-medium">Hi! I'm Anzar's AI assistant.</p>
                    <p className="mx-auto mt-1 max-w-[260px] text-xs text-muted">
                      Ask me about his projects, services, or availability — in English or Filipino.
                    </p>
                  </div>
                  <p className="label mb-2">Try asking</p>
                  <div className="flex flex-col gap-1.5">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => ask(q)}
                        className="rounded-xl border border-border px-3.5 py-2.5 text-left text-sm text-ink-2 transition-all hover:translate-x-1 hover:border-accent/40 hover:text-fg"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "gap-2.5")}>
                  {m.role === "assistant" && <AiMark className="mt-0.5 size-6 rounded-md" />}
                  <div className={cn("max-w-[85%]", m.role === "user" && "text-right")}>
                    <div
                      className={cn(
                        "inline-block text-left text-sm leading-relaxed",
                        m.role === "user"
                          ? "rounded-2xl rounded-br-md bg-fg px-3.5 py-2 text-bg"
                          : "text-fg",
                        m.id === streamingId && "caret",
                      )}
                    >
                      {m.content}
                    </div>
                    {m.links && m.links.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.links.map((l) => (
                          <Link
                            key={l.href + l.label}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="rounded-full border border-border bg-surface-2/60 px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
                          >
                            {l.label} →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {thinking && (
                <div className="flex gap-2.5">
                  <AiMark className="size-6 rounded-md" />
                  <div className="flex items-center gap-1 pt-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="size-1.5 rounded-full bg-subtle"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
                setInput("");
              }}
              className="border-t border-border p-3"
            >
              <div
                onClick={() => inputRef.current?.focus()}
                className="flex cursor-text items-center gap-2 rounded-2xl border border-border bg-bg py-1.5 pl-3.5 pr-1.5 transition-[border-color,box-shadow] hover:border-border-strong hover:shadow-[0_0_0_4px_var(--hover)] focus-within:border-accent/50 focus-within:shadow-[0_0_0_4px_var(--accent-soft)] focus-within:hover:border-accent/50 focus-within:hover:shadow-[0_0_0_4px_var(--accent-soft)]"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, pricing, services…"
                  className="h-8 flex-1 bg-transparent text-sm outline-none placeholder:text-subtle"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  aria-label="Send"
                  className="flex size-8 items-center justify-center rounded-xl bg-fg text-bg transition-opacity disabled:opacity-30"
                >
                  <ArrowUpIcon weight="bold" className="size-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
