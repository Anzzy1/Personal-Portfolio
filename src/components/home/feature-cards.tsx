"use client";

import { useChat } from "@/components/ai/chat-provider";
import { AiMark } from "@/components/ai/ai-mark";

const PALUWAGAN_URL = "https://paluwagan-web-page.vercel.app/";

/** Two highlight cards: the AI assistant (dark mesh) and the featured Paluwagan app */
export function FeatureCards() {
  const { setOpen } = useChat();

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative isolate flex items-center gap-5 overflow-hidden rounded-2xl bg-[#141416] p-6 text-left text-white ring-1 ring-black/5 dark:ring-white/10"
      >
        {/* Drifting tangerine mesh + grain */}
        <span className="mesh-a absolute -left-1/4 -top-1/2 -z-10 size-[80%] rounded-full bg-[radial-gradient(circle,#f2541b,transparent_62%)] opacity-70 blur-2xl" />
        <span className="mesh-b absolute -bottom-2/3 right-[-10%] -z-10 size-[70%] rounded-full bg-[radial-gradient(circle,#ffb067,transparent_62%)] opacity-40 blur-2xl" />
        <span className="absolute inset-0 -z-10 [background:var(--grain)] opacity-70" />

        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-white/60">
            <AiMark className="size-5 rounded-md" />
            Anzyy AI
            <span className="size-1.5 rounded-full bg-[#5fd08a]" /> online
          </span>
          <span className="text-[17px] font-medium group-hover:underline group-hover:underline-offset-[3px]">
            Short on time? Ask my AI anything.
          </span>
          <span className="text-sm leading-relaxed text-white/65">
            It knows my projects, services, and availability — in English or Filipino.
          </span>
        </span>
        <kbd className="hidden shrink-0 rounded-md border border-white/15 bg-white/5 px-2 py-1 font-mono text-[11px] text-white/60 sm:inline">
          Ctrl K
        </kbd>
      </button>

      <a
        href={PALUWAGAN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative isolate flex flex-col items-start gap-5 overflow-hidden rounded-2xl bg-[#16A34A] p-6 sm:flex-row sm:items-center text-white shadow-[0_24px_48px_-24px_rgb(22_163_74/0.7)] ring-1 ring-black/5 transition-transform duration-500 ease-[var(--ease-out)] hover:-translate-y-0.5 dark:ring-white/10"
      >
        {/* Paluwagan's green + gold drifting, with a faint dot grid + grain */}
        <span className="mesh-a absolute -right-[12%] -top-[60%] -z-10 size-[65%] rounded-full bg-[radial-gradient(circle,#F5B53D,transparent_62%)] opacity-60 blur-2xl" />
        <span className="mesh-b absolute -bottom-[70%] left-[-12%] -z-10 size-[70%] rounded-full bg-[radial-gradient(circle,#34D27A,transparent_62%)] opacity-60 blur-2xl" />
        <span className="mesh-a absolute -bottom-1/2 right-1/4 -z-10 size-[45%] rounded-full bg-[radial-gradient(circle,#0F8A3C,transparent_62%)] opacity-50 blur-2xl" />
        <span className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.16)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(90deg,transparent,black)]" />
        <span className="absolute inset-0 -z-10 [background:var(--grain)] opacity-60" />

        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="flex items-center gap-1.5 pr-20 text-[13px] font-medium text-white/80 sm:pr-0">
            <span className="size-1.5 rounded-full bg-[#F5B53D]" />
            Featured project · App
          </span>
          <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 pr-20 sm:pr-0">
            <span className="text-[22px] font-semibold tracking-[-0.03em] group-hover:underline group-hover:underline-offset-[4px]">
              Paluwagan
            </span>
            <span className="font-serif text-[19px] italic text-[#FFE27A]">Without the listahan.</span>
          </span>
          <span className="text-sm leading-relaxed text-white/90">
            Run your savings circle with friends, family, or officemates — online or face to face. It draws a fair
            payout order, tracks every hulog, and sends the reminders for you. It never holds your money; members pay
            each other through GCash, Maya, bank, or cash.
          </span>
          <span className="mt-2 flex flex-wrap gap-1.5">
            {["Online + offline", "Digital bunot", "Auto-reminders"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </span>
        </span>

        {/* The app's mascot on a tilted gold tile with a peso coin: top-right corner on phones, beside the text from sm up */}
        <span className="absolute right-6 top-6 shrink-0 sm:relative sm:right-auto sm:top-auto">
          <span className="block size-16 -rotate-6 overflow-hidden rounded-[18px] bg-[#FFF4DA] sm:size-[104px] sm:rounded-[28px] shadow-[0_16px_32px_-12px_rgb(12_20_16/0.5)] ring-2 ring-[#0C1410] transition-transform duration-500 ease-[var(--ease-out)] group-hover:-rotate-2 group-hover:scale-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/projects/paluwagan-logo.svg" alt="" className="block size-full" />
          </span>
          <span className="absolute -right-2.5 -top-2.5 grid size-8 rotate-12 text-[14px] sm:-right-3 sm:-top-3 sm:size-9 sm:text-[15px] place-items-center rounded-full bg-[#F5B53D] font-bold text-[#0C1410] ring-2 ring-[#0C1410] transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-[30deg]">
            ₱
          </span>
        </span>
      </a>
    </div>
  );
}
