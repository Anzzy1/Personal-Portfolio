import Link from "next/link";
import { ArrowRightIcon, CheckIcon, SealPercentIcon } from "@phosphor-icons/react/dist/ssr";
import { offer, offerOpen, spotsLeft } from "@/content/offer";
import { cn } from "@/lib/utils";

/**
 * Ticket-style poster for the founding-client discount: a bold headline on the
 * left, a perforated tear line, and a 10-slot meter showing spots claimed.
 */
export function FoundingOffer({
  className,
  cta = { href: "/claim", label: "Claim my spot" },
}: {
  className?: string;
  cta?: { href: string; label: string };
}) {
  if (!offerOpen) return null;

  return (
    <section
      aria-label="Founding client offer"
      className={cn(
        "relative isolate overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#ff8a4c_0%,#f2541b_45%,#c2280f_100%)] text-white shadow-[0_30px_60px_-30px_rgb(242_84_27/0.8)] ring-1 ring-black/5",
        className,
      )}
    >
      {/* Light blobs, diagonal stripes, and an outsized % watermark */}
      <span className="mesh-a absolute -right-[15%] -top-[50%] -z-10 size-[70%] rounded-full bg-[radial-gradient(circle,#ffd29a,transparent_62%)] opacity-60 blur-2xl" />
      <span className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.07)_0_2px,transparent_2px_14px)] [mask-image:linear-gradient(90deg,transparent,black_60%)]" />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-14 -left-4 -z-10 font-display text-[200px] font-black leading-none tracking-[-0.08em] text-white/10"
      >
        %
      </span>

      <div className="flex flex-col sm:flex-row">
        {/* Headline */}
        <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ring-1 ring-white/25">
            <SealPercentIcon weight="fill" className="size-4" />
            Founding client offer
          </span>
          <h2 className="font-display text-[40px] font-black leading-[0.95] tracking-[-0.045em] sm:text-[52px]">
            {offer.discount ?? "Big discount"}
            <span className="block font-serif text-[0.62em] font-normal italic tracking-[-0.01em] text-[#fff1e6]">
              for my first {offer.total} clients.
            </span>
          </h2>
          <ul className="mt-1 flex flex-col gap-1.5">
            {offer.perks.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-medium text-white/90">
                <span className="grid size-[18px] place-items-center rounded-full bg-white/20">
                  <CheckIcon weight="bold" className="size-2.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Perforated tear line with ticket notches */}
        <div aria-hidden className="relative hidden w-px sm:block">
          <span className="absolute inset-y-6 left-0 border-l-2 border-dashed border-white/35" />
          <span className="absolute -top-4 left-1/2 size-8 -translate-x-1/2 rounded-full bg-bg" />
          <span className="absolute -bottom-4 left-1/2 size-8 -translate-x-1/2 rounded-full bg-bg" />
        </div>
        <div aria-hidden className="mx-6 border-t-2 border-dashed border-white/35 sm:hidden" />

        {/* Spot meter + CTA */}
        <div className="flex flex-col justify-center gap-4 p-6 sm:w-[230px] sm:p-8">
          <div>
            <p className="flex items-baseline gap-1.5">
              <span className="font-display text-[44px] font-black leading-none tracking-[-0.05em] tabular-nums">
                {spotsLeft}
              </span>
              <span className="text-sm font-semibold text-white/85">
                of {offer.total} spots left
              </span>
            </p>
            <div
              className="mt-3 grid grid-cols-10 gap-1"
              role="meter"
              aria-valuemin={0}
              aria-valuemax={offer.total}
              aria-valuenow={offer.claimed}
              aria-label={`${offer.claimed} of ${offer.total} spots claimed`}
            >
              {Array.from({ length: offer.total }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-2.5 rounded-full",
                    i < offer.claimed ? "bg-[#3b0d03]/45" : "bg-white shadow-[0_0_10px_rgb(255_255_255/0.6)]",
                  )}
                />
              ))}
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-white/75">
              {offer.claimed}/{offer.total} claimed
            </p>
          </div>

          <Link
            href={cta.href}
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#c2280f] shadow-[0_10px_24px_-10px_rgb(60_10_0/0.6)] transition-transform duration-200 hover:-translate-y-px"
          >
            {cta.label}
            <ArrowRightIcon weight="bold" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Compact version of the poster for the sidebar */
export function SidebarOffer({ onNavigate }: { onNavigate?: () => void }) {
  if (!offerOpen) return null;

  return (
    <Link
      href="/claim"
      onClick={onNavigate}
      className="group relative isolate block shrink-0 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#ff8a4c_0%,#f2541b_50%,#c2280f_100%)] p-3.5 text-white shadow-[0_14px_30px_-16px_rgb(242_84_27/0.9)] transition-transform duration-200 hover:-translate-y-0.5"
    >
      <span className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(135deg,rgb(255_255_255/0.07)_0_2px,transparent_2px_12px)]" />
      <span className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/85">
          <SealPercentIcon weight="fill" className="size-3.5" />
          Founding offer
        </span>
        <span className="font-mono text-[10px] font-medium text-white/80">
          {offer.claimed}/{offer.total}
        </span>
      </span>
      <span className="mt-1.5 block text-[15px] font-bold leading-tight tracking-[-0.02em]">
        {offer.discount ?? "Big discount"} for my first {offer.total} clients
      </span>
      <span className="mt-2.5 grid grid-cols-10 gap-[3px]" aria-hidden>
        {Array.from({ length: offer.total }, (_, i) => (
          <span key={i} className={cn("h-1.5 rounded-full", i < offer.claimed ? "bg-[#3b0d03]/45" : "bg-white")} />
        ))}
      </span>
      <span className="mt-2 flex items-center justify-between text-xs font-semibold">
        {spotsLeft} spots left
        <span className="inline-flex items-center gap-1">
          Claim
          <ArrowRightIcon weight="bold" className="size-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </span>
    </Link>
  );
}
