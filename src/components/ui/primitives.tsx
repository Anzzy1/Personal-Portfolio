import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Magnetic } from "./magnetic";

/** Section with a friendly title (optional serif accent), count, and "view all" link */
export function Section({
  title,
  accent,
  count,
  href,
  hrefLabel = "View all",
  children,
  className,
  id,
}: {
  title: string;
  accent?: string;
  count?: number;
  href?: string;
  hrefLabel?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("mt-24 scroll-mt-24 sm:mt-28", className)}>
      <Reveal>
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="flex items-baseline gap-2.5 text-[22px] font-medium tracking-tight">
            <span>
              {title}
              {accent && (
                <>
                  {" "}
                  <span className="font-serif text-[1.15em] font-normal italic">{accent}</span>
                </>
              )}
            </span>
            {count !== undefined && (
              <span className="font-mono text-xs text-subtle">{String(count).padStart(2, "0")}</span>
            )}
          </h2>
          {href && (
            <Link
              href={href}
              className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              {hrefLabel}
              <ArrowRightIcon
                weight="bold"
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </div>
      </Reveal>
      {children}
    </section>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  magnetic?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  magnetic,
  className,
}: ButtonProps) {
  const styles = cn(
    "group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-sm font-medium transition-[background-color,border-color,color,transform] active:scale-[0.97]",
    variant === "primary" && "bg-fg text-bg hover:bg-ink-2",
    variant === "secondary" &&
      "border border-border bg-surface text-fg hover:border-border-strong",
    variant === "ghost" && "px-3 text-muted hover:text-fg",
    className,
  );
  const icon = external ? (
    <ArrowUpRightIcon
      weight="bold"
      className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    />
  ) : (
    <ArrowRightIcon weight="bold" className="size-4 transition-transform group-hover:translate-x-0.5" />
  );

  const isAnchor = external || href.startsWith("mailto:") || href.endsWith(".pdf");
  const button = isAnchor ? (
    <a href={href} target={external ? "_blank" : undefined} rel="noreferrer" className={styles}>
      {children}
      {icon}
    </a>
  ) : (
    <Link href={href} className={styles}>
      {children}
      {icon}
    </Link>
  );

  return magnetic ? <Magnetic>{button}</Magnetic> : button;
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface-2/70 px-2.5 py-0.5 text-xs font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <header className="stagger">
      <p className="label">{eyebrow}</p>
      <h1 className="mt-3 text-[34px] font-medium leading-[1.12] tracking-tight text-balance sm:text-[44px]">
        {title}
        {accent && (
          <>
            {" "}
            <span className="font-serif font-normal italic text-accent">{accent}</span>
          </>
        )}
      </h1>
      {description && <p className="lead mt-5 max-w-xl text-pretty">{description}</p>}
    </header>
  );
}
