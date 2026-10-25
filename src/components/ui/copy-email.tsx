"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

/** Copies my email in one click — easier than opening a mail app */
export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "group inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium text-ink-2 transition-colors hover:border-border-strong hover:text-fg",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "done" : "copy"}
          initial={{ y: 12, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -12, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2"
        >
          {copied ? (
            <>
              <CheckIcon weight="bold" className="size-4 text-success" /> Copied to clipboard
            </>
          ) : (
            <>
              <CopyIcon className="size-4 text-subtle group-hover:text-fg" /> Copy my email
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
