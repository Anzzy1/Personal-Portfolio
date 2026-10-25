"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { featuredProjects } from "@/content/projects";
import { useChat } from "@/components/ai/chat-provider";
import { AiMark } from "@/components/ai/ai-mark";
import { BuddyMascot } from "@/components/project/buddy-mascot";

/** Two highlight cards: the AI assistant (dark mesh) and the featured project */
export function FeatureCards() {
  const { setOpen } = useChat();
  const featured = featuredProjects[0];

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

      {featured && (
        <Link
          href={`/work/${featured.slug}`}
          className="group relative isolate flex items-center gap-5 overflow-hidden rounded-2xl bg-[#3A4BFF] p-6 text-white shadow-[0_24px_48px_-24px_rgb(58_75_255/0.7)] ring-1 ring-black/5 transition-transform duration-500 ease-[var(--ease-out)] hover:-translate-y-0.5 dark:ring-white/10"
        >
          {/* BaonBuddy's candy palette drifting over cobalt, with a faint dot grid + grain */}
          <span className="mesh-a absolute -right-[12%] -top-[60%] -z-10 size-[65%] rounded-full bg-[radial-gradient(circle,#D7F25C,transparent_62%)] opacity-60 blur-2xl" />
          <span className="mesh-b absolute -bottom-[70%] left-[-12%] -z-10 size-[70%] rounded-full bg-[radial-gradient(circle,#FFA3CB,transparent_62%)] opacity-55 blur-2xl" />
          <span className="mesh-a absolute -bottom-1/2 right-1/4 -z-10 size-[45%] rounded-full bg-[radial-gradient(circle,#9FD8FF,transparent_62%)] opacity-40 blur-2xl" />
          <span className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.16)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(90deg,transparent,black)]" />
          <span className="absolute inset-0 -z-10 [background:var(--grain)] opacity-60" />

          <span className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-white/75">
              <span className="size-1.5 rounded-full bg-[#D7F25C]" />
              Featured project · {featured.year}
            </span>
            <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
              <span className="text-[22px] font-semibold tracking-[-0.03em] group-hover:underline group-hover:underline-offset-[4px]">
                {featured.title}
              </span>
              <span className="font-serif text-[19px] italic text-[#D7F25C]">Budget mo, kontrolado mo.</span>
            </span>
            <span className="text-sm leading-relaxed text-white/85">
              Your baon, finally under control. Just say “jeep 13, lunch 85” or snap a receipt — Buddy logs it,
              shows what you can still spend today, and gives friendly Taglish money tips. Private, playful, and
              it even works offline.
            </span>
            <span className="mt-2 flex flex-wrap gap-1.5">
              {["Voice logging", "Receipt scan", "AI money buddy"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </span>
          </span>

          {/* Buddy on a tilted lime tile with a peso coin, like the app's logo */}
          <span className="relative hidden shrink-0 sm:block">
            <span className="block size-[104px] -rotate-6 overflow-hidden rounded-[28px] bg-[#D7F25C] shadow-[0_16px_32px_-12px_rgb(14_14_16/0.5)] ring-2 ring-[#0E0E10] transition-transform duration-500 ease-[var(--ease-out)] group-hover:-rotate-2 group-hover:scale-105">
              <BuddyMascot className="block size-full" />
            </span>
            <span className="absolute -right-3 -top-3 grid size-9 rotate-12 place-items-center rounded-full bg-[#FFB98F] text-[15px] font-bold text-[#0E0E10] ring-2 ring-[#0E0E10] transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-[30deg]">
              ₱
            </span>
          </span>
          <ArrowUpRightIcon className="absolute right-4 top-4 size-5 text-white/70 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white sm:hidden" />
        </Link>
      )}
    </div>
  );
}
