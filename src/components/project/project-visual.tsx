import { ViewTransition } from "react";
import Image from "next/image";
import type { Project } from "@/content/projects";
import {
  BarbellIcon,
  BookOpenTextIcon,
  CalendarCheckIcon,
  CheckIcon,
  ListChecksIcon,
  MapTrifoldIcon,
  ChartLineUpIcon,
  ChatCircleDotsIcon,
  CoffeeIcon,
  DeviceMobileIcon,
  KeyboardIcon,
  LinkIcon,
  MicrophoneIcon,
  MountainsIcon,
  MusicNotesIcon,
  NotebookIcon,
  PackageIcon,
  ReceiptIcon,
  SealCheckIcon,
  ShoppingBagIcon,
  SparkleIcon,
  TranslateIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { AiMark } from "@/components/ai/ai-mark";
import { cn } from "@/lib/utils";

/** Re-points the accent tokens at the project's own color for everything inside */
export function projectTheme(project: Project) {
  if (!project.color) return undefined;
  return {
    "--accent": project.color,
    "--accent-soft": `color-mix(in srgb, ${project.color} 14%, transparent)`,
  } as React.CSSProperties;
}

// Hand-made covers for projects that deserve more than the generic window mock
const customPreviews: Record<string, () => React.ReactNode> = {
  paluwagan: PaluwaganPreview,
  waypoint: WaypointPreview,
  baonbuddy: BaonBuddyPreview,
  tindahub: TindaHubPreview,
  "kape-luna": KapeLunaPreview,
  "playlist-cafe": PlaylistCafePreview,
  "pro-fitness-gym": ProFitnessGymPreview,
  "casidar-gadgets": CasidarGadgetsPreview,
  "portfolio-ai-assistant": AnzyyAiPreview,
};

/**
 * Project cover. Uses `project.cover` when set; otherwise renders a
 * generated browser-window preview so the grid never looks empty.
 * The same cover on the card and case-study page morphs between them.
 */
export function ProjectVisual({
  project,
  className,
  priority,
  zoomOnHover,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  zoomOnHover?: boolean;
}) {
  return (
    <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
      <div
        style={projectTheme(project)}
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-[12px] border border-border bg-surface-2",
          className,
        )}
      >
        <div
          className={cn(
            "absolute inset-0 transition-transform duration-700 ease-[var(--ease-out)]",
            zoomOnHover && "group-hover:scale-[1.04]",
          )}
        >
          {project.cover ? (
            <Image
              src={project.cover}
              alt={`${project.title} preview`}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
            />
          ) : (
            <GeneratedPreview project={project} />
          )}
        </div>
      </div>
    </ViewTransition>
  );
}

function GeneratedPreview({ project }: { project: Project }) {
  const Custom = customPreviews[project.slug];
  if (Custom) return <Custom />;
  const kind = project.category[0];
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,var(--accent-soft),transparent_60%)]">
      <div className="absolute inset-x-[9%] top-[13%] bottom-0 overflow-hidden rounded-t-xl border border-b-0 border-border-strong bg-surface shadow-card">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="size-2 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2 rounded-full bg-[#febc2e]/80" />
          <span className="size-2 rounded-full bg-[#28c840]/80" />
          <span className="ml-3 h-2 w-24 rounded-full bg-surface-2" />
        </div>
        <div className="p-3 sm:p-4">
          {kind === "AI" && <ChatMock />}
          {(kind === "Web System" || kind === "App") && <DashboardMock />}
          {kind === "Landing Page" && <LandingMock title={project.title} />}
        </div>
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <div className="space-y-2">
      <div className="ml-auto h-5 w-2/5 rounded-xl rounded-br-sm bg-fg/90" />
      <div className="w-3/4 space-y-1.5 rounded-xl rounded-bl-sm border border-border bg-surface-2 p-2">
        <div className="h-1.5 w-full rounded-full bg-border-strong" />
        <div className="h-1.5 w-4/5 rounded-full bg-border-strong" />
        <div className="h-1.5 w-2/3 rounded-full bg-accent/50" />
      </div>
      <div className="ml-auto h-5 w-1/3 rounded-xl rounded-br-sm bg-fg/90" />
      <div className="flex items-center gap-1 pl-1">
        <span className="size-1.5 animate-pulse rounded-full bg-accent" />
        <span className="size-1.5 animate-pulse rounded-full bg-accent/60 [animation-delay:150ms]" />
        <span className="size-1.5 animate-pulse rounded-full bg-accent/30 [animation-delay:300ms]" />
      </div>
    </div>
  );
}

function DashboardMock() {
  const bars = [40, 65, 50, 80, 60, 90, 72];
  return (
    <div className="grid grid-cols-3 gap-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-lg border border-border p-2">
          <div className="h-1.5 w-1/2 rounded-full bg-border-strong" />
          <div className={cn("mt-2 h-2.5 w-2/3 rounded-full", i === 0 ? "bg-accent/60" : "bg-fg/70")} />
        </div>
      ))}
      <div className="col-span-3 flex h-16 items-end gap-1.5 rounded-lg border border-border p-2 sm:h-20">
        {bars.map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className={cn("flex-1 rounded-sm", i === 5 ? "bg-accent/70" : "bg-border-strong")}
          />
        ))}
      </div>
    </div>
  );
}

function LandingMock({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center pt-1 text-center">
      <div className="h-1.5 w-12 rounded-full bg-accent/50" />
      <p className="mt-2 font-serif text-base italic sm:text-lg">{title}</p>
      <div className="mt-2 h-1.5 w-1/2 rounded-full bg-border-strong" />
      <div className="mt-1 h-1.5 w-1/3 rounded-full bg-border-strong" />
      <div className="mt-3 h-5 w-16 rounded-full bg-fg/90" />
      <div className="mt-3 grid w-full grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-square rounded-lg bg-surface-2" />
        ))}
      </div>
    </div>
  );
}

/** Paluwagan: the real desktop app in a browser window on green, with the phone app in front */
function PaluwaganPreview() {
  const features = [
    { icon: UsersThreeIcon, label: "Online & offline" },
    { icon: SparkleIcon, label: "Digital bunot" },
    { icon: CalendarCheckIcon, label: "Auto-reminders" },
  ];
  return (
    <div className="@container absolute inset-0 isolate overflow-hidden bg-[linear-gradient(150deg,#16a34a,#0b5e2a)]">
      <span className="absolute -right-[12%] -top-[35%] -z-10 size-[60%] rounded-full bg-[radial-gradient(circle,#f5b53d,transparent_65%)] opacity-55 blur-2xl" />
      <span className="absolute -bottom-[45%] -left-[12%] -z-10 size-[65%] rounded-full bg-[radial-gradient(circle,#34d27a,transparent_65%)] opacity-50 blur-2xl" />
      <span className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.13)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(transparent,black_70%)]" />

      <div className="absolute inset-x-0 top-[5.5%] flex justify-center gap-[1.6cqw] px-[4%]">
        {features.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-[0.8cqw] whitespace-nowrap rounded-full bg-white/15 px-[1.8cqw] py-[0.8cqw] text-[clamp(8px,1.7cqw,13px)] font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm"
          >
            <Icon weight="fill" className="size-[1.25em] text-[#ffe27a]" />
            {label}
          </span>
        ))}
      </div>

      {/* The real desktop app, in a browser window that runs off the bottom edge */}
      <div className="absolute bottom-[-4%] left-[7%] right-[14%] top-[19%] overflow-hidden rounded-t-[1.6cqw] bg-white shadow-[0_30px_60px_-20px_rgb(4_30_14/0.6)] ring-1 ring-black/10">
        <div className="flex h-[6.5%] min-h-[10px] items-center gap-[0.7cqw] border-b border-[#ededf0] px-[1.6cqw]">
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#ff5f57]" />
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#febc2e]" />
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#28c840]" />
          <span className="ml-[2cqw] rounded-full bg-[#f5f5f7] px-[1.6cqw] py-[0.3cqw] font-mono text-[clamp(6px,1.1cqw,10px)] text-[#70707a]">
            paluwagan.app
          </span>
        </div>
        <div className="relative h-[93.5%]">
          <Image
            src="/images/projects/paluwagan-overview.jpg"
            alt="Paluwagan home screen on desktop: next payout, savings, Ipon's tip, and payments due"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-left-top"
          />
        </div>
      </div>

      {/* The phone app, overlapping the window's right edge */}
      <div className="absolute right-[5%] top-[30%] aspect-[780/1688] h-[92%] rotate-3 overflow-hidden rounded-[3cqw] border-[0.8cqw] border-[#0c1410] bg-[#0c1410] shadow-[0_30px_60px_-16px_rgb(4_30_14/0.7)]">
        <Image
          src="/images/projects/paluwagan-phone.jpg"
          alt="Paluwagan home screen on a phone"
          fill
          sizes="(min-width: 1024px) 200px, 30vw"
          className="rounded-[2.2cqw] object-cover object-top"
        />
      </div>
    </div>
  );
}

/** Waypoint: the real roadmap page on dark slate, with the 8 career paths and a progress card in front */
function WaypointPreview() {
  const features = [
    { icon: MapTrifoldIcon, label: "8 career roadmaps" },
    { icon: BookOpenTextIcon, label: "Lessons + projects" },
    { icon: ListChecksIcon, label: "Progress checklist" },
  ];
  const roles = [
    { name: "Frontend", pct: 43, active: true },
    { name: "Backend", pct: 100 },
    { name: "Full-Stack", pct: 18 },
    { name: "AI & ML", pct: 0 },
    { name: "DevOps", pct: 0 },
    { name: "Mobile", pct: 0 },
    { name: "Cloud", pct: 0 },
    { name: "AI Agent", pct: 0 },
  ];
  const stages = ["Foundations", "HTML & CSS", "JavaScript", "Tooling", "React", "Quality", "Ship it"];
  return (
    <div className="@container absolute inset-0 isolate overflow-hidden bg-[linear-gradient(150deg,#1f2b30,#0b0f11)]">
      <span className="absolute -right-[12%] -top-[35%] -z-10 size-[60%] rounded-full bg-[radial-gradient(circle,#7fd49a,transparent_65%)] opacity-40 blur-2xl" />
      <span className="absolute -bottom-[45%] -left-[12%] -z-10 size-[65%] rounded-full bg-[radial-gradient(circle,#1f6b45,transparent_65%)] opacity-70 blur-2xl" />
      <span className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.1)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(transparent,black_70%)]" />

      {/* Feature chips */}
      <div className="absolute inset-x-0 top-[5.5%] flex justify-center gap-[1.6cqw] px-[4%]">
        {features.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-[0.8cqw] whitespace-nowrap rounded-full bg-white/10 px-[1.8cqw] py-[0.8cqw] text-[clamp(8px,1.7cqw,13px)] font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm"
          >
            <Icon weight="fill" className="size-[1.25em] text-[#7fd49a]" />
            {label}
          </span>
        ))}
      </div>

      {/* The real roadmap page, running off the right and bottom edges */}
      <div className="absolute left-[24%] top-[19%] w-[96%] overflow-hidden rounded-tl-[1.6cqw] bg-white shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] ring-1 ring-black/10">
        <div className="flex h-[3.4cqw] items-center gap-[0.7cqw] border-b border-[#ededf0] px-[1.6cqw]">
          <span className="size-[1cqw] rounded-full bg-[#ff5f57]" />
          <span className="size-[1cqw] rounded-full bg-[#febc2e]" />
          <span className="size-[1cqw] rounded-full bg-[#28c840]" />
          <span className="ml-[2cqw] rounded-full bg-[#f5f5f7] px-[1.6cqw] py-[0.3cqw] font-mono text-[clamp(4px,1.1cqw,10px)] text-[#70707a]">
            waypoint-developer.vercel.app
          </span>
        </div>
        <div className="relative aspect-[1440/900]">
          <Image
            src="/images/projects/waypoint-roadmap.jpg"
            alt="Waypoint's Frontend Developer roadmap: overview, progress card, and the 7 stages"
            fill
            sizes="(min-width: 1024px) 800px, 120vw"
            className="object-cover object-left-top"
          />
        </div>
      </div>

      {/* Floating: pick your path — the 8 roadmaps */}
      <div className="absolute left-[4%] top-[25%] w-[30%] rounded-[2cqw] bg-white p-[2cqw] text-[#0b0f11] shadow-[0_24px_50px_-16px_rgb(0_0_0/0.7)] ring-1 ring-black/5">
        <p className="font-mono text-[clamp(4px,1.25cqw,10px)] uppercase tracking-[0.12em] text-[#78909c]">Choose your path</p>
        <ul className="mt-[1.2cqw] space-y-[0.55cqw]">
          {roles.map((r) => (
            <li
              key={r.name}
              className={cn(
                "flex items-center gap-[1cqw] rounded-[0.9cqw] px-[1cqw] py-[0.55cqw] text-[clamp(5px,1.55cqw,12px)] font-semibold",
                r.active ? "bg-[#0b0f11] text-white" : "text-[#263238]",
              )}
            >
              <span
                className={cn(
                  "grid size-[2.2cqw] shrink-0 place-items-center rounded-full",
                  r.pct === 100 ? "bg-[#1f6b45] text-white" : r.active ? "bg-[#7fd49a] text-[#0b0f11]" : "ring-1 ring-[#cfd8dc]",
                )}
              >
                {r.pct === 100 && <CheckIcon weight="bold" className="size-[60%]" />}
              </span>
              <span className="flex-1 truncate">{r.name}</span>
              {r.pct > 0 && (
                <span className={cn("font-mono text-[0.8em] tabular-nums", r.active ? "text-[#7fd49a]" : "text-[#1f6b45]")}>
                  {r.pct}%
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Floating: progress through the Frontend stages */}
      <div className="absolute bottom-[5%] right-[4%] w-[44%] rounded-[2cqw] bg-white p-[2.2cqw] text-[#0b0f11] shadow-[0_24px_50px_-16px_rgb(0_0_0/0.7)] ring-1 ring-black/5">
        <div className="flex items-baseline justify-between gap-[1cqw]">
          <p className="text-[clamp(6px,1.8cqw,14px)] font-bold tracking-[-0.02em]">Frontend Developer</p>
          <p className="font-mono text-[clamp(4px,1.2cqw,10px)] text-[#78909c]">9 / 21 lessons</p>
        </div>
        <div className="mt-[1.8cqw] flex items-center">
          {stages.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <span
                title={s}
                className={cn(
                  "grid size-[2.8cqw] shrink-0 place-items-center rounded-full font-mono text-[clamp(4px,1.1cqw,9px)] font-bold",
                  i < 2 && "bg-[#1f6b45] text-white",
                  i === 2 && "bg-[#0b0f11] text-white ring-[0.5cqw] ring-[#7fd49a]/50",
                  i > 2 && "bg-[#f1f3f4] text-[#90a4ae]",
                )}
              >
                {i < 2 ? <CheckIcon weight="bold" className="size-[55%]" /> : i + 1}
              </span>
              {i < stages.length - 1 && (
                <span className={cn("h-[0.35cqw] flex-1", i < 2 ? "bg-[#1f6b45]" : "bg-[#eceff1]")} />
              )}
            </div>
          ))}
        </div>
        <p className="mt-[1.4cqw] text-[clamp(5px,1.35cqw,11px)] text-[#455a64]">
          Next up: <span className="font-semibold text-[#0b0f11]">JavaScript</span> · build a weather app
        </p>
      </div>
    </div>
  );
}

/** BaonBuddy: the real app screen in a browser window on cobalt, with its headline features */
function BaonBuddyPreview() {
  const features = [
    { icon: MicrophoneIcon, label: "Voice logging" },
    { icon: ReceiptIcon, label: "Receipt scan" },
    { icon: ChatCircleDotsIcon, label: "Taglish AI advisor" },
  ];
  return (
    <div className="@container absolute inset-0 isolate overflow-hidden bg-[#3a4bff]">
      <span className="absolute -right-[12%] -top-[35%] -z-10 size-[60%] rounded-full bg-[radial-gradient(circle,#d7f25c,transparent_65%)] opacity-60 blur-2xl" />
      <span className="absolute -bottom-[45%] -left-[12%] -z-10 size-[65%] rounded-full bg-[radial-gradient(circle,#ffa3cb,transparent_65%)] opacity-50 blur-2xl" />
      <span className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.13)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(transparent,black_70%)]" />

      {/* Feature chips */}
      <div className="absolute inset-x-0 top-[5.5%] flex justify-center gap-[1.6cqw] px-[4%]">
        {features.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-[0.8cqw] whitespace-nowrap rounded-full bg-white/15 px-[1.8cqw] py-[0.8cqw] text-[clamp(8px,1.7cqw,13px)] font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm"
          >
            <Icon weight="fill" className="size-[1.25em] text-[#d7f25c]" />
            {label}
          </span>
        ))}
      </div>

      {/* The real app, in a browser window that runs off the bottom edge */}
      <div className="absolute inset-x-[7%] bottom-[-4%] top-[19%] overflow-hidden rounded-t-[1.6cqw] bg-white shadow-[0_30px_60px_-20px_rgb(14_14_16/0.55)] ring-1 ring-black/10">
        <div className="flex h-[6.5%] min-h-[10px] items-center gap-[0.7cqw] border-b border-[#ededf0] px-[1.6cqw]">
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#ff5f57]" />
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#febc2e]" />
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#28c840]" />
          <span className="ml-[2cqw] rounded-full bg-[#f5f5f7] px-[1.6cqw] py-[0.3cqw] font-mono text-[clamp(6px,1.1cqw,10px)] text-[#70707a]">
            baonbuddy.app
          </span>
        </div>
        <div className="relative h-[93.5%]">
          <Image
            src="/images/projects/baonbuddy-overview.jpg"
            alt="BaonBuddy overview screen: remaining balance, Buddy's tip, and the budget meter"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-left-top"
          />
        </div>
      </div>
    </div>
  );
}

/** TindaHub: a zoomed-in dashboard on deep green, with today's numbers floating in front */
function TindaHubPreview() {
  return (
    <div className="@container absolute inset-0 isolate overflow-hidden bg-[linear-gradient(150deg,#0f7a55,#083f2c)]">
      <span className="absolute -right-[10%] -top-[40%] -z-10 size-[65%] rounded-full bg-[radial-gradient(circle,#ffc83d,transparent_65%)] opacity-50 blur-2xl" />
      <span className="absolute -bottom-[50%] -left-[15%] -z-10 size-[70%] rounded-full bg-[radial-gradient(circle,#4ade80,transparent_65%)] opacity-30 blur-2xl" />
      <span className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.12)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(to_bottom_right,black,transparent_60%)]" />

      {/* The dashboard, running off the right and bottom edges */}
      <div className="absolute left-[22%] top-[11%] w-[100%] overflow-hidden rounded-tl-[1.6cqw] bg-white shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] ring-1 ring-black/10">
        <div className="flex h-[3.4cqw] items-center gap-[0.7cqw] border-b border-[#ededf0] px-[1.6cqw]">
          <span className="size-[1cqw] rounded-full bg-[#ff5f57]" />
          <span className="size-[1cqw] rounded-full bg-[#febc2e]" />
          <span className="size-[1cqw] rounded-full bg-[#28c840]" />
          <span className="ml-[2cqw] rounded-full bg-[#f5f5f7] px-[1.6cqw] py-[0.3cqw] font-mono text-[clamp(4px,1.1cqw,10px)] text-[#70707a]">
            tindahub.app
          </span>
        </div>
        <div className="relative aspect-[1740/1050]">
          <Image
            src="/images/projects/tindahub-overview.jpg"
            alt="TindaHub dashboard: sales, profit, utang, low stock, and weekly revenue"
            fill
            sizes="(min-width: 1024px) 800px, 120vw"
            className="object-cover object-left-top"
          />
        </div>
      </div>

      {/* Floating: this week's profit */}
      <div className="absolute left-[5%] top-[38%] w-[34%] @max-sm:top-[46%] @max-sm:w-[40%] rounded-[2cqw] bg-white p-[2.4cqw] text-[#0f1513] shadow-[0_24px_50px_-16px_rgb(0_0_0/0.55)] ring-1 ring-black/5">
        <div className="flex items-center gap-[1cqw] text-[clamp(4px,1.7cqw,13px)] font-medium text-[#78807d]">
          <span className="grid size-[3.6cqw] place-items-center rounded-[1cqw] bg-[#ecf7f2] text-[#0f7a55]">
            <ChartLineUpIcon weight="bold" className="size-[60%]" />
          </span>
          Profit this week
        </div>
        <div className="mt-[1.4cqw] flex items-end justify-between gap-[1cqw]">
          <div>
            <p className="text-[clamp(10px,4.4cqw,34px)] font-bold leading-none tracking-[-0.04em] tabular-nums">₱22,340</p>
            <span className="mt-[1cqw] inline-block whitespace-nowrap rounded-full bg-[#ecf7f2] px-[1cqw] py-[0.3cqw] text-[clamp(4px,1.4cqw,11px)] font-semibold text-[#0c6647]">
              ↑ 9.6% vs last week
            </span>
          </div>
          <svg viewBox="0 0 92 40" className="w-[30%] shrink-0" aria-hidden>
            <defs>
              <linearGradient id="th-spark" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#0f7a55" stopOpacity=".25" />
                <stop offset="1" stopColor="#0f7a55" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 32 L15 28 L30 30 L46 21 L61 23 L76 13 L92 5 V40 H0Z" fill="url(#th-spark)" />
            <path d="M0 32 L15 28 L30 30 L46 21 L61 23 L76 13 L92 5" fill="none" stroke="#0f7a55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Floating: an utang reminder (hidden on small previews to stay readable) */}
      <div className="absolute bottom-[5%] left-[15%] flex @max-sm:hidden w-[40%] items-center gap-[1.4cqw] rounded-[1.8cqw] bg-white p-[1.6cqw] pr-[2cqw] text-[#0f1513] shadow-[0_24px_50px_-16px_rgb(0_0_0/0.55)] ring-1 ring-black/5">
        <span className="grid size-[4.6cqw] shrink-0 place-items-center rounded-full bg-[#e8f0ff] text-[clamp(4px,1.5cqw,12px)] font-bold text-[#2459c4]">
          JR
        </span>
        <div className="min-w-0 flex-1 whitespace-nowrap">
          <p className="text-[clamp(4px,1.6cqw,13px)] font-semibold leading-tight">Jose Ramos · Utang</p>
          <p className="text-[clamp(4px,1.3cqw,11px)] text-[#78807d]">Rice 5 kg, Coke 1.5L</p>
        </div>
        <div className="whitespace-nowrap text-right">
          <p className="text-[clamp(4px,1.9cqw,15px)] font-bold tabular-nums">₱1,240</p>
          <span className="inline-flex items-center gap-[0.5cqw] rounded-full bg-[#feecec] px-[0.9cqw] py-[0.2cqw] text-[clamp(4px,1.2cqw,10px)] font-semibold text-[#c4302b]">
            <NotebookIcon weight="fill" className="size-[1.1em]" />
            12 days late
          </span>
        </div>
      </div>

      {/* Floating: low stock alert */}
      <div className="absolute right-[4%] top-[4%] flex @max-sm:hidden items-center gap-[1cqw] whitespace-nowrap rounded-full bg-white/95 py-[0.9cqw] pl-[1cqw] pr-[1.8cqw] text-[clamp(4px,1.4cqw,11px)] font-semibold text-[#0f1513] shadow-[0_16px_30px_-12px_rgb(0_0_0/0.5)]">
        <span className="grid size-[2.8cqw] place-items-center rounded-full bg-[#fff7e0] text-[#a16b00]">
          <PackageIcon weight="fill" className="size-[60%]" />
        </span>
        Coke 1.5L — 5 left · Restock
      </div>
    </div>
  );
}

/** Kape Luna: the real hero in a browser window, glowing over a blurred copy of itself */
function KapeLunaPreview() {
  const features = [
    { icon: CoffeeIcon, label: "Craveable menu" },
    { icon: ShoppingBagIcon, label: "Order now" },
    { icon: SparkleIcon, label: "Featured drinks" },
  ];
  return (
    <div className="@container absolute inset-0 isolate overflow-hidden bg-[#1a110b]">
      {/* Ambient backdrop: the hero itself, blurred and dimmed, so the frame feels lit by the photo */}
      <Image
        src="/images/projects/kape-luna-ambient.jpg"
        alt=""
        fill
        sizes="320px"
        className="-z-20 scale-110 object-cover"
      />
      <span className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_100%,rgb(233_190_130/0.35),transparent_70%)]" />
      <span className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.09)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(black,transparent_60%)]" />

      <div className="absolute inset-x-0 top-[5.5%] flex justify-center gap-[1.6cqw] px-[4%] @max-sm:hidden">
        {features.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-[0.8cqw] whitespace-nowrap rounded-full bg-black/30 px-[1.8cqw] py-[0.8cqw] text-[clamp(8px,1.7cqw,13px)] font-semibold text-[#f6e7cf] ring-1 ring-[#e9c99a]/40 backdrop-blur-sm"
          >
            <Icon weight="fill" className="size-[1.25em] text-[#e9c99a]" />
            {label}
          </span>
        ))}
      </div>

      {/* The landing page, in a browser window that runs off the bottom edge */}
      <div className="absolute inset-x-[7%] bottom-[-4%] top-[19%] overflow-hidden rounded-t-[1.6cqw] bg-[#120c08] shadow-[0_30px_70px_-16px_rgb(0_0_0/0.75),0_0_60px_-10px_rgb(233_190_130/0.35)] ring-1 ring-[#e9c99a]/25 @max-sm:top-[10%]">
        <div className="flex h-[6.5%] min-h-[10px] items-center gap-[0.7cqw] border-b border-white/10 bg-[#1f1610] px-[1.6cqw]">
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#ff5f57]" />
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#febc2e]" />
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#28c840]" />
          <span className="ml-[2cqw] rounded-full bg-white/10 px-[1.6cqw] py-[0.3cqw] font-mono text-[clamp(4px,1.1cqw,10px)] text-[#d9c7ad]">
            kapeluna.ph
          </span>
        </div>
        <div className="relative h-[93.5%]">
          <Image
            src="/images/projects/kape-luna.jpg"
            alt="Kape Luna landing page: an iced Spanish Latte in golden-hour light, the Kape Luna wordmark, and a featured-drink card"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-left-top"
          />
        </div>
      </div>
    </div>
  );
}

/** Playlist Cafe: the real hero in a browser window, over the terrace at sunset */
function PlaylistCafePreview() {
  const features = [
    { icon: MountainsIcon, label: "Skyline views" },
    { icon: MusicNotesIcon, label: "Live acoustic" },
    { icon: CoffeeIcon, label: "Full menu" },
  ];
  return (
    <div className="@container absolute inset-0 isolate overflow-hidden bg-[#2a1c13]">
      {/* Ambient backdrop: the terrace at sunset, blurred and dimmed */}
      <Image
        src="/images/projects/playlist-cafe-ambient.jpg"
        alt=""
        fill
        sizes="320px"
        className="-z-20 scale-110 object-cover"
      />
      <span className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_100%,rgb(240_170_120/0.35),transparent_70%)]" />
      <span className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.09)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(black,transparent_60%)]" />

      <div className="absolute inset-x-0 top-[5.5%] flex justify-center gap-[1.6cqw] px-[4%] @max-sm:hidden">
        {features.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-[0.8cqw] whitespace-nowrap rounded-full bg-black/30 px-[1.8cqw] py-[0.8cqw] text-[clamp(8px,1.7cqw,13px)] font-semibold text-[#f7ebe0] ring-1 ring-[#f0c9a8]/40 backdrop-blur-sm"
          >
            <Icon weight="fill" className="size-[1.25em] text-[#f0c9a8]" />
            {label}
          </span>
        ))}
      </div>

      {/* The landing page, in a browser window that runs off the bottom edge */}
      <div className="absolute inset-x-[7%] bottom-[-4%] top-[19%] overflow-hidden rounded-t-[1.6cqw] bg-white shadow-[0_30px_70px_-16px_rgb(0_0_0/0.75),0_0_60px_-10px_rgb(240_170_120/0.35)] ring-1 ring-white/20 @max-sm:top-[10%]">
        <div className="flex h-[6.5%] min-h-[10px] items-center gap-[0.7cqw] border-b border-black/5 bg-[#f4efe9] px-[1.6cqw]">
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#ff5f57]" />
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#febc2e]" />
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#28c840]" />
          <span className="ml-[2cqw] rounded-full bg-black/5 px-[1.6cqw] py-[0.3cqw] font-mono text-[clamp(4px,1.1cqw,10px)] text-[#6b5848]">
            playlistcafe.vercel.app
          </span>
        </div>
        <div className="relative h-[93.5%]">
          <Image
            src="/images/projects/playlist-cafe.jpg"
            alt="Playlist Cafe landing page: the headline &quot;Good coffee, good music & the best view in Antipolo&quot; next to guests on the terrace at sunset"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-left-top"
          />
        </div>
      </div>
    </div>
  );
}

/** Anzyy AI: the real chat panel on a dark tangerine stage, with what it does */
function AnzyyAiPreview() {
  const features = [
    { icon: TranslateIcon, label: "English & Filipino" },
    { icon: LinkIcon, label: "Links to the right page" },
    { icon: KeyboardIcon, label: "Opens with Ctrl K" },
  ];
  return (
    <div className="@container absolute inset-0 isolate overflow-hidden bg-[#141416] text-white">
      <span className="absolute -left-[15%] -top-[45%] -z-10 size-[75%] rounded-full bg-[radial-gradient(circle,#f2541b,transparent_62%)] opacity-60 blur-2xl" />
      <span className="absolute -bottom-[55%] right-[5%] -z-10 size-[65%] rounded-full bg-[radial-gradient(circle,#ffb067,transparent_62%)] opacity-35 blur-2xl" />
      <span className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.09)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(90deg,black,transparent_70%)]" />

      <div className="flex h-full items-center gap-[5%] pl-[7%]">
        <div className="flex w-[47%] flex-col gap-[2.2cqw]">
          <AiMark className="size-[8cqw] rounded-[2cqw]" />
          <p className="text-[clamp(14px,4.6cqw,34px)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Ask me anything<span className="text-[#ff8a4c]">.</span>
          </p>
          <div className="flex flex-col items-start gap-[1cqw]">
            {features.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-[0.9cqw] rounded-full bg-white/10 px-[1.6cqw] py-[0.6cqw] text-[clamp(7px,1.6cqw,12px)] font-medium text-white/85 ring-1 ring-white/15"
              >
                <Icon weight="fill" className="size-[1.2em] text-[#ff8a4c]" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* The real conversation, running off the bottom edge */}
        <div className="relative mt-[14%] aspect-[2/3] w-[38%] shrink-0 -rotate-2 self-start overflow-hidden rounded-[2.6cqw] shadow-[0_30px_60px_-18px_rgb(0_0_0/0.7)] ring-1 ring-white/15">
          <Image
            src="/images/projects/anzyy-ai-chat.jpg"
            alt="Anzyy AI answering a question in English and one in Filipino, with links to projects"
            fill
            sizes="(min-width: 1024px) 320px, 50vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

/** Casidar Gadgets: the real hero in a browser window, on the shop's blue-to-violet brand */
function CasidarGadgetsPreview() {
  const features = [
    { icon: DeviceMobileIcon, label: "iPhone & iPad" },
    { icon: ChatCircleDotsIcon, label: "Ask or pre-order" },
    { icon: SealCheckIcon, label: "Checked units" },
  ];
  return (
    <div className="@container absolute inset-0 isolate overflow-hidden bg-[linear-gradient(150deg,#3d7bff,#6a4dff_60%,#7b4dff)]">
      <span className="absolute -right-[12%] -top-[35%] -z-10 size-[60%] rounded-full bg-[radial-gradient(circle,#7cf5d4,transparent_65%)] opacity-45 blur-2xl" />
      <span className="absolute -bottom-[45%] -left-[12%] -z-10 size-[65%] rounded-full bg-[radial-gradient(circle,#9fc0ff,transparent_65%)] opacity-50 blur-2xl" />
      <span className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.13)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(transparent,black_70%)]" />

      <div className="absolute inset-x-0 top-[5.5%] flex justify-center gap-[1.6cqw] px-[4%] @max-sm:hidden">
        {features.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-[0.8cqw] whitespace-nowrap rounded-full bg-white/15 px-[1.8cqw] py-[0.8cqw] text-[clamp(8px,1.7cqw,13px)] font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm"
          >
            <Icon weight="fill" className="size-[1.25em] text-[#7cf5d4]" />
            {label}
          </span>
        ))}
      </div>

      {/* The website, in a browser window that runs off the bottom edge */}
      <div className="absolute inset-x-[7%] bottom-[-4%] top-[19%] overflow-hidden rounded-t-[1.6cqw] bg-white shadow-[0_30px_60px_-20px_rgb(20_12_70/0.6)] ring-1 ring-black/10 @max-sm:top-[10%]">
        <div className="flex h-[6.5%] min-h-[10px] items-center gap-[0.7cqw] border-b border-[#ededf0] px-[1.6cqw]">
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#ff5f57]" />
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#febc2e]" />
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#28c840]" />
          <span className="ml-[2cqw] rounded-full bg-[#f5f5f7] px-[1.6cqw] py-[0.3cqw] font-mono text-[clamp(4px,1.1cqw,10px)] text-[#70707a]">
            casidar-gadgets.vercel.app
          </span>
        </div>
        <div className="relative h-[93.5%]">
          <Image
            src="/images/projects/casidar-gadgets.jpg"
            alt="Casidar Gadgets website: &quot;Welcome to Casidar Gadgets&quot; above photos of iPhones and an iPad"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

/** Pro Fitness Gym: the real hero in a browser window, over the red-lit training floor */
function ProFitnessGymPreview() {
  const features = [
    { icon: BarbellIcon, label: "Memberships" },
    { icon: CalendarCheckIcon, label: "Class schedule" },
    { icon: UsersThreeIcon, label: "Coaches" },
  ];
  return (
    <div className="@container absolute inset-0 isolate overflow-hidden bg-[#0b0b0c]">
      {/* Ambient backdrop: the training floor under red lights, blurred and dimmed */}
      <Image
        src="/images/projects/pro-fitness-gym-ambient.jpg"
        alt=""
        fill
        sizes="320px"
        className="-z-20 scale-110 object-cover opacity-70"
      />
      <span className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_100%,rgb(225_6_0/0.38),transparent_70%)]" />
      <span className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.08)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(black,transparent_60%)]" />

      <div className="absolute inset-x-0 top-[5.5%] flex justify-center gap-[1.6cqw] px-[4%] @max-sm:hidden">
        {features.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-[0.8cqw] whitespace-nowrap rounded-full bg-black/45 px-[1.8cqw] py-[0.8cqw] text-[clamp(8px,1.7cqw,13px)] font-semibold text-white ring-1 ring-[#ff3b30]/45 backdrop-blur-sm"
          >
            <Icon weight="fill" className="size-[1.25em] text-[#ff3b30]" />
            {label}
          </span>
        ))}
      </div>

      {/* The website, in a browser window that runs off the bottom edge */}
      <div className="absolute inset-x-[7%] bottom-[-4%] top-[19%] overflow-hidden rounded-t-[1.6cqw] bg-black shadow-[0_30px_70px_-16px_rgb(0_0_0/0.8),0_0_60px_-10px_rgb(225_6_0/0.45)] ring-1 ring-white/15 @max-sm:top-[10%]">
        <div className="flex h-[6.5%] min-h-[10px] items-center gap-[0.7cqw] border-b border-white/10 bg-[#1a1a1c] px-[1.6cqw]">
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#ff5f57]" />
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#febc2e]" />
          <span className="size-[1cqw] min-h-1 min-w-1 rounded-full bg-[#28c840]" />
          <span className="ml-[2cqw] rounded-full bg-white/10 px-[1.6cqw] py-[0.3cqw] font-mono text-[clamp(4px,1.1cqw,10px)] text-white/60">
            pro-fitness-gym-antipolo.vercel.app
          </span>
        </div>
        <div className="relative h-[93.5%]">
          <Image
            src="/images/projects/pro-fitness-gym.jpg"
            alt="Pro Fitness Gym website: the headline &quot;Train like a PRO.&quot; over the gym's building in Antipolo"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-left-top"
          />
        </div>
      </div>
    </div>
  );
}
