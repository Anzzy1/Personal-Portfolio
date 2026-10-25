"use client";

import { Suspense } from "react";
import Link from "next/link";
import { EnvelopeSimpleIcon, SparkleIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/content/profile";
import { NavLinks, NavLinksFallback } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { LocalTime } from "./local-time";
import { useChat } from "@/components/ai/chat-provider";
import { SocialIcon } from "@/components/ui/social-icon";
import { SidebarOffer } from "@/components/offer/founding-offer";

/** "Anzyy Dev" with the last word in italic accent; style with `.wordmark` */
export function Wordmark() {
  const [brand, ...rest] = profile.alias.split(" ");
  return (
    <>
      {brand} {rest.length > 0 && <em>{rest.join(" ")}</em>}
    </>
  );
}

/** Inner sidebar card — shared by the desktop sidebar and the mobile drawer */
export function SidebarPanel({
  onClose,
  onNavigate,
  pillId,
  mobile,
}: {
  onClose?: () => void;
  onNavigate?: () => void;
  pillId: string;
  mobile?: boolean;
}) {
  const { setOpen } = useChat();
  const footSocials = profile.socials.filter((s) => ["GitHub", "LinkedIn"].includes(s.label));

  return (
    <div className="sb-panel flex h-full flex-col gap-[18px] overflow-hidden px-3 pt-3.5">
      <div className="flex items-center justify-between pl-2.5 pr-0.5">
        <Link href="/" onClick={onNavigate} className="wordmark text-[23px] leading-none">
          <Wordmark />
        </Link>
        <div className="flex items-center gap-1.5">
          {/* On mobile the toggle lives in the top bar instead */}
          {!mobile && <ThemeToggle />}
          {mobile && (
            <button type="button" onClick={onClose} aria-label="Close menu" className="foot-btn">
              <XIcon className="size-4" />
            </button>
          )}
        </div>
      </div>

      <Link
        href="/contact"
        onClick={onNavigate}
        className="cta-primary group flex h-[46px] shrink-0 items-center gap-2.5 rounded-full pl-4 pr-2 text-[15px] font-semibold"
      >
        <EnvelopeSimpleIcon weight="bold" className="size-[18px] text-white/90" />
        <span className="flex-1 whitespace-nowrap">Let&apos;s talk</span>
        {profile.available && (
          <span className="inline-flex h-[26px] items-center gap-1.5 rounded-full bg-white/20 px-2.5 text-[11px] font-semibold text-white ring-1 ring-white/25">
            <span className="pulse-dot size-1.5 rounded-full bg-[#9ff2b8] text-[#9ff2b8]" />
            Available
          </span>
        )}
      </Link>

      <Suspense fallback={<NavLinksFallback />}>
        <NavLinks onNavigate={onNavigate} pillId={pillId} />
      </Suspense>

      <div className="mt-auto">
        <SidebarOffer onNavigate={onNavigate} />
      </div>

      <div className="flex shrink-0 items-center gap-2.5 pl-2.5 pr-1">
        <div className="flex flex-1 flex-col gap-px text-xs text-subtle">
          <span>Got a question?</span>
          <span className="text-[13px] font-medium text-ink-2">My AI replies instantly</span>
        </div>
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            setOpen(true);
          }}
          className="group inline-flex h-[34px] items-center gap-1.5 rounded-full bg-fg pl-3 pr-3.5 text-sm font-semibold text-bg shadow-[0_6px_16px_-6px_rgb(17_17_19/0.45)] transition-transform duration-200 hover:-translate-y-px active:translate-y-0"
        >
          <SparkleIcon
            weight="fill"
            className="size-3.5 text-accent transition-transform duration-500 group-hover:rotate-90"
          />
          Ask
        </button>
      </div>

      <div className="-mx-3 flex shrink-0 items-center gap-2 border-t border-border py-3.5 pl-[22px] pr-4">
        <div className="flex flex-1 flex-col gap-px text-xs text-subtle">
          <span>Manila · GMT+8</span>
          <span className="text-[13px] font-medium text-ink-2">
            <LocalTime />
          </span>
        </div>
        <a href={`mailto:${profile.email}`} aria-label="Email me" title={profile.email} className="foot-btn">
          <EnvelopeSimpleIcon className="size-4" />
        </a>
        {footSocials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="foot-btn"
          >
            <SocialIcon label={s.label} className="size-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
