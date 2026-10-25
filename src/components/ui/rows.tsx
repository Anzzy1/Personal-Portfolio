import Link from "next/link";
import Image from "next/image";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/** Small muted section label with an optional count or link on the right */
export function SectionHead({
  label,
  count,
  href,
  hrefLabel = "View all",
}: {
  label: string;
  count?: number;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="text-sm font-medium text-muted">{label}</h2>
      {href ? (
        <Link href={href} className="text-[13px] text-subtle transition-colors hover:text-fg">
          {hrefLabel}
        </Link>
      ) : (
        count !== undefined && (
          <span className="text-[13px] tabular-nums text-subtle">{String(count).padStart(2, "0")}</span>
        )
      )}
    </div>
  );
}

/** 72×48 thumbnail at the start of a row: an image, or an icon on a soft tile */
export function RowThumb({ icon: Icon, src }: { icon: Icon; src?: string }) {
  return (
    <span className="relative flex h-12 w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-2 bg-[radial-gradient(120%_100%_at_0%_0%,var(--accent-soft),transparent_70%)] text-ink-2">
      {src ? (
        <Image src={src} alt="" fill sizes="72px" className="object-cover object-left-top" />
      ) : (
        <Icon weight="duotone" className="size-5" />
      )}
    </span>
  );
}

/** Small outlined pill next to a row title, e.g. a status or category */
export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "ml-2 inline-flex rounded-full px-2 py-0.5 align-middle text-[11px] font-semibold text-ink-2 ring-1 ring-inset ring-border-strong",
        className,
      )}
    >
      {children}
    </span>
  );
}
