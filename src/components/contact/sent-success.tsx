"use client";

import { motion } from "motion/react";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/content/profile";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Shown in place of a form after it's sent: a ring pops in, the check draws
 * itself, then the message rises in.
 */
export function SentSuccess({ title = "Message sent!", onReset }: { title?: string; onReset: () => void }) {
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease }}
      className="flex flex-col items-center px-6 py-12 text-center"
    >
      <span className="relative grid size-20 place-items-center">
        {/* Soft pulse behind the badge */}
        <motion.span
          initial={{ scale: 0.6, opacity: 0.6 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-success/30"
        />
        <motion.svg viewBox="0 0 52 52" className="relative size-20" aria-hidden>
          <motion.circle
            cx="26"
            cy="26"
            r="24"
            className="fill-success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            style={{ transformOrigin: "center" }}
          />
          <motion.path
            d="M15 27 l7.5 7.5 L37.5 18.5"
            fill="none"
            stroke="white"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, delay: 0.3, ease }}
          />
        </motion.svg>
      </span>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55, ease }}
        className="mt-5 flex flex-col items-center"
      >
        <p className="text-[22px] font-semibold tracking-[-0.02em]">{title}</p>
        <p className="mt-2 max-w-sm text-[15px] text-pretty text-muted">
          Just check your email for updates — I&apos;ll reply {profile.responseTime.replace(/^replies /i, "")}.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
        >
          <ArrowCounterClockwiseIcon weight="bold" className="size-3.5" />
          Send another message
        </button>
      </motion.div>
    </motion.div>
  );
}
