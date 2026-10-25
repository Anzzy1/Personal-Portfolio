import Image from "next/image";
import { StorefrontIcon } from "@phosphor-icons/react/dist/ssr";
import { siFreecodecamp } from "simple-icons";
import type { Project } from "@/content/projects";
import type { Certification } from "@/content/certifications";
import { BuddyMascot } from "@/components/project/buddy-mascot";
import { AiMark } from "@/components/ai/ai-mark";
import { RowThumb } from "@/components/ui/rows";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Small illustrated thumbnails (72×48) for the home page rows. Each one
// is drawn in the item's own colors so the lists read at a glance.
// ------------------------------------------------------------------

function Frame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative isolate flex h-12 w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg ring-1 ring-black/5 dark:ring-white/10",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Soft light blob for depth inside a thumbnail */
function Glow({ className }: { className: string }) {
  return <span className={cn("absolute -z-10 size-10 rounded-full opacity-70 blur-md", className)} />;
}

const projectThumbs: Record<string, () => React.ReactNode> = {
  baonbuddy: () => (
    <Frame className="bg-[#3a4bff]">
      <Glow className="-right-3 -top-4 bg-[#d7f25c]" />
      <Glow className="-bottom-5 -left-3 bg-[#ffa3cb]" />
      <span className="block size-9 -rotate-6 overflow-hidden rounded-[10px] bg-[#d7f25c] ring-[1.5px] ring-[#0e0e10]">
        <BuddyMascot className="block size-full" />
      </span>
    </Frame>
  ),
  "portfolio-ai-assistant": () => (
    <Frame className="bg-[#141416]">
      <Glow className="-left-3 -top-4 bg-[#f2541b]" />
      <span className="flex items-center gap-1.5">
        <AiMark className="size-7 rounded-lg" />
        <span className="flex flex-col gap-1">
          <span className="h-2 w-6 rounded-full rounded-bl-sm bg-white/85" />
          <span className="h-2 w-4 rounded-full rounded-bl-sm bg-[#ff8a4c]" />
        </span>
      </span>
    </Frame>
  ),
  tindahub: () => (
    <Frame className="bg-[linear-gradient(135deg,#16a374,#083f2c)]">
      <Glow className="-right-4 -top-5 bg-[#ffc83d]" />
      {/* Mini dashboard: sidebar, stat tiles, and a rising sales line */}
      <span className="flex h-[30px] w-[46px] -translate-x-[3px] gap-[3px] rounded-[5px] bg-white p-[3px] shadow-[0_4px_10px_-4px_rgb(0_0_0/0.5)]">
        <span className="flex w-[7px] flex-col items-center gap-[2px] rounded-[2px] bg-[#0b5f42] pt-[2px]">
          <span className="size-[4px] rounded-[1px] bg-[#ffc83d]" />
          <span className="h-[1.5px] w-[4px] rounded-full bg-white/50" />
          <span className="h-[1.5px] w-[4px] rounded-full bg-white/50" />
        </span>
        <span className="flex flex-1 flex-col gap-[2px]">
          <span className="flex gap-[2px]">
            <span className="h-[6px] flex-1 rounded-[1.5px] bg-[#0f7a55]" />
            <span className="h-[6px] flex-1 rounded-[1.5px] bg-[#ecf7f2]" />
          </span>
          <svg viewBox="0 0 32 14" className="w-full flex-1" preserveAspectRatio="none">
            <path d="M0 11 L6 10 L11 11 L17 7 L22 8 L27 4 L32 2 V14 H0Z" fill="#0f7a55" fillOpacity=".18" />
            <path d="M0 11 L6 10 L11 11 L17 7 L22 8 L27 4 L32 2" fill="none" stroke="#0f7a55" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
      {/* Store badge */}
      <span className="absolute bottom-[5px] right-[6px] grid size-[17px] place-items-center rounded-full bg-[#ffc83d] ring-2 ring-[#0b5f42]">
        <StorefrontIcon weight="fill" className="size-[10px] text-[#0b5f42]" />
      </span>
    </Frame>
  ),
  "kape-luna": () => (
    <Frame className="bg-[#1a110b]">
      <Image src="/images/projects/kape-luna-thumb.jpg" alt="" fill sizes="72px" className="object-cover" />
    </Frame>
  ),
};

export function ProjectThumb({ project, icon }: { project: Project; icon: Icon }) {
  const Thumb = projectThumbs[project.slug];
  return Thumb ? <Thumb /> : <RowThumb icon={icon} src={project.cover} />;
}

const serviceThumbs: Record<string, () => React.ReactNode> = {
  "landing-pages": () => (
    <Frame className="bg-[linear-gradient(135deg,#ff8a4c,#e0400a)]">
      <Glow className="-right-3 -top-4 bg-[#ffd0a8]" />
      {/* Mini browser window with a hero and a button */}
      <span className="flex h-[30px] w-11 flex-col overflow-hidden rounded-[5px] bg-white shadow-[0_4px_10px_-4px_rgb(0_0_0/0.4)]">
        <span className="flex gap-[2px] px-1 py-[3px]">
          <span className="size-[3px] rounded-full bg-[#ff5f57]" />
          <span className="size-[3px] rounded-full bg-[#febc2e]" />
          <span className="size-[3px] rounded-full bg-[#28c840]" />
        </span>
        <span className="flex flex-1 flex-col items-center justify-center gap-[3px] bg-[#fff4ec]">
          <span className="h-[3px] w-5 rounded-full bg-[#f2541b]" />
          <span className="h-[2px] w-7 rounded-full bg-[#e7d6ca]" />
          <span className="h-[4px] w-3 rounded-full bg-[#141416]" />
        </span>
      </span>
    </Frame>
  ),
  "web-systems": () => (
    <Frame className="bg-[linear-gradient(135deg,#34d399,#047857)]">
      <Glow className="-left-3 -top-4 bg-white/40" />
      {/* Dashboard: stat tiles over a chart */}
      <span className="flex h-[30px] w-11 flex-col gap-[3px] rounded-[5px] bg-white p-[4px] shadow-[0_4px_10px_-4px_rgb(0_0_0/0.4)]">
        <span className="flex gap-[3px]">
          <span className="h-[6px] flex-1 rounded-[2px] bg-[#10b981]" />
          <span className="h-[6px] flex-1 rounded-[2px] bg-[#d1fae5]" />
          <span className="h-[6px] flex-1 rounded-[2px] bg-[#d1fae5]" />
        </span>
        <span className="flex flex-1 items-end gap-[2px]">
          {[40, 70, 55, 90, 65].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className={cn("flex-1 rounded-[1px]", i === 3 ? "bg-[#10b981]" : "bg-[#a7f3d0]")}
            />
          ))}
        </span>
      </span>
    </Frame>
  ),
  "ai-integration": () => (
    <Frame className="bg-[linear-gradient(135deg,#a78bfa,#6d28d9)]">
      <Glow className="-right-3 -top-4 bg-[#f0abfc]" />
      {/* A question and a typing reply */}
      <span className="flex w-11 flex-col gap-[3px]">
        <span className="ml-auto h-[9px] w-7 rounded-full rounded-br-sm bg-white" />
        <span className="flex h-[11px] w-8 items-center gap-[2px] rounded-full rounded-bl-sm bg-white/25 px-[5px] ring-1 ring-white/40">
          <span className="size-[3px] rounded-full bg-white" />
          <span className="size-[3px] rounded-full bg-white/75" />
          <span className="size-[3px] rounded-full bg-white/50" />
        </span>
      </span>
    </Frame>
  ),
  apps: () => (
    <Frame className="bg-[linear-gradient(135deg,#6b7bff,#2a37d9)]">
      <Glow className="-left-3 -bottom-5 bg-[#d7f25c]" />
      {/* Phone with an app screen */}
      <span className="flex h-[38px] w-[22px] flex-col gap-[3px] rounded-[6px] bg-white p-[3px] shadow-[0_4px_10px_-4px_rgb(0_0_0/0.5)]">
        <span className="h-[9px] rounded-[2px] bg-[#3a4bff]" />
        <span className="flex gap-[2px]">
          <span className="h-[5px] flex-1 rounded-[1px] bg-[#d7f25c]" />
          <span className="h-[5px] flex-1 rounded-[1px] bg-[#c9b8ff]" />
        </span>
        <span className="h-[3px] w-3/4 rounded-full bg-[#e5e5ea]" />
        <span className="mx-auto mt-auto h-[2px] w-2 rounded-full bg-[#c7c7cc]" />
      </span>
    </Frame>
  ),
};

export function ServiceThumb({ id, icon }: { id: string; icon: Icon }) {
  const Thumb = serviceThumbs[id];
  return Thumb ? <Thumb /> : <RowThumb icon={icon} />;
}

const ordinal = /^(\d+)(st|nd|rd|th)/i;

export function CertThumb({ cert, icon }: { cert: Certification; icon: Icon }) {
  if (cert.issuer.toLowerCase() === "freecodecamp") {
    return (
      <Frame className="bg-[#0a0a23]">
        <Glow className="-right-4 -top-5 bg-white/20" />
        <svg viewBox="0 0 24 24" className="size-7 text-white" fill="currentColor">
          <path d={siFreecodecamp.path} />
        </svg>
      </Frame>
    );
  }

  const place = cert.kind === "Award" ? cert.title.match(ordinal) : null;
  if (place) {
    return (
      <Frame className="bg-[linear-gradient(135deg,#f3c89d,#b8682f)]">
        <Glow className="-left-3 -top-4 bg-white/60" />
        {/* Bronze medal hanging from a ribbon */}
        <span className="relative flex flex-col items-center">
          <span className="absolute -top-[9px] flex gap-[2px]">
            <span className="h-[10px] w-[5px] -skew-x-12 rounded-[1px] bg-[#3a4bff]" />
            <span className="h-[10px] w-[5px] skew-x-12 rounded-[1px] bg-[#f2541b]" />
          </span>
          <span className="relative grid size-[30px] place-items-center rounded-full bg-[linear-gradient(145deg,#f6d2ab,#c47a3e_55%,#8a4a1c)] shadow-[0_4px_10px_-3px_rgb(80_40_10/0.7),inset_0_1px_0_rgb(255_255_255/0.6)] ring-2 ring-[#fbe3c8]/70">
            <span className="text-[11px] font-black leading-none tracking-tight text-white [text-shadow:0_1px_1px_rgb(90_45_10/0.6)]">
              {place[1]}
              <sup className="text-[7px]">{place[2]}</sup>
            </span>
          </span>
        </span>
      </Frame>
    );
  }

  return <RowThumb icon={icon} />;
}
