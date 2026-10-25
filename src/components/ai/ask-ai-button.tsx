"use client";

import { SparkleIcon } from "@phosphor-icons/react/dist/ssr";
import { useChat } from "./chat-provider";
import { cn } from "@/lib/utils";

export function AskAiButton({
  variant = "sidebar",
  onClick,
  className,
}: {
  variant?: "sidebar" | "inline";
  onClick?: () => void;
  className?: string;
}) {
  const { setOpen } = useChat();

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        setOpen(true);
      }}
      className={cn(
        "group flex h-10 w-full items-center gap-2.5 rounded-xl border border-border bg-surface px-3 text-left text-sm transition-all hover:border-accent/40 hover:shadow-[0_0_0_4px_var(--accent-soft)]",
        variant === "inline" && "w-auto",
        className,
      )}
    >
      <SparkleIcon weight="fill" className="size-4 text-accent transition-transform duration-500 group-hover:rotate-90" />
      <span className="flex-1 font-medium text-ink-2 group-hover:text-fg">Ask my AI</span>
      <kbd className="hidden rounded-md border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:inline">
        Ctrl K
      </kbd>
    </button>
  );
}
