import { QuotesIcon } from "@phosphor-icons/react/dist/ssr";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/utils";

// Same colors as the matching services, so a review reads as part of that offer
export const projectColors: Record<string, string> = {
  Website: "#f2541b",
  "Web System": "#10b981",
  "AI Chatbot": "#8b5cf6",
  App: "#3a4bff",
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

export function TestimonialCard({
  t,
  featured,
  className,
}: {
  t: Testimonial;
  featured?: boolean;
  className?: string;
}) {
  const color = (t.project && projectColors[t.project]) || "var(--accent)";

  return (
    <figure
      style={
        {
          "--accent": color,
          "--accent-soft": `color-mix(in srgb, ${color} 12%, transparent)`,
        } as React.CSSProperties
      }
      className={cn(
        "card relative flex h-full flex-col gap-4 overflow-hidden bg-[radial-gradient(110%_60%_at_100%_0%,var(--accent-soft),transparent_60%)] p-6 project-card hover:-translate-y-1",
        featured && "gap-6 p-7 sm:p-10",
        className,
      )}
    >
      <QuotesIcon weight="fill" className={cn("text-accent", featured ? "size-9" : "size-7")} />

      <blockquote
        className={cn(
          "relative flex-1 text-pretty",
          featured
            ? "text-[22px] font-medium leading-snug tracking-[-0.015em] text-fg sm:text-[26px]"
            : "text-[16px] leading-relaxed text-ink-2",
        )}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-3 border-t border-border pt-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold text-white shadow-[0_6px_14px_-6px_var(--accent)]">
          {initials(t.name)}
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-semibold tracking-tight">{t.name}</span>
          <span className="truncate text-sm text-muted">{t.role}</span>
        </span>
        {t.project && (
          <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">
            {t.project}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
