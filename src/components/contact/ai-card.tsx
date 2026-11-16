"use client";

import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useChat } from "@/components/ai/chat-provider";
import { AiMark } from "@/components/ai/ai-mark";

/** Dark "ask my AI" strip for the contact page, matching the home page's AI card */
export function ContactAiCard() {
  const { setOpen } = useChat();

  return (
    <div className="relative isolate flex flex-col gap-5 overflow-hidden rounded-2xl bg-[#141416] p-6 text-white ring-1 ring-black/5 sm:flex-row sm:items-center dark:ring-white/10">
      <span className="mesh-a absolute -left-1/4 -top-1/2 -z-10 size-[70%] rounded-full bg-[radial-gradient(circle,#f2541b,transparent_62%)] opacity-60 blur-2xl" />
      <span className="mesh-b absolute -bottom-2/3 right-[-10%] -z-10 size-[60%] rounded-full bg-[radial-gradient(circle,#ffb067,transparent_62%)] opacity-35 blur-2xl" />

      <AiMark className="size-12 rounded-xl" />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="flex items-center gap-2 text-[17px] font-semibold tracking-tight">
          Need an answer right now?
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/75">
            <span className="size-1.5 rounded-full bg-[#5fd08a]" /> online
          </span>
        </p>
        <p className="text-sm leading-relaxed text-white/65">
          My AI assistant replies instantly about my work, services, and availability.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#141416] shadow-[0_8px_20px_-8px_rgb(0_0_0/0.6)] transition-transform duration-200 hover:-translate-y-px active:translate-y-0"
      >
        Ask my AI
        <kbd className="hidden rounded-md bg-[#141416]/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-[#141416]/60 sm:inline">
          Ctrl K
        </kbd>
        <ArrowRightIcon weight="bold" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
