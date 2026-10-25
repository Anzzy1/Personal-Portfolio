"use client";

import { useState } from "react";
import { ArrowUpRightIcon, CheckIcon, CopyIcon } from "@phosphor-icons/react/dist/ssr";
import { BrandIcon, brandColors } from "@/components/ui/brand-icon";

type Social = { label: string; href: string; handle: string };

const shell =
  "group flex w-full items-center gap-4 rounded-2xl border border-border bg-surface p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand)_45%,transparent)] hover:shadow-[0_14px_32px_-18px_var(--brand)]";

/** Big branded link card; socials without a URL (Discord) copy the handle instead */
export function SocialCard({ social }: { social: Social }) {
  const [copied, setCopied] = useState(false);
  const style = { "--brand": brandColors[social.label] ?? "var(--accent)" } as React.CSSProperties;

  const body = (
    <>
      <BrandIcon
        label={social.label}
        className="size-12 rounded-[14px] shadow-[0_8px_18px_-10px_var(--brand)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
      />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[17px] font-semibold tracking-tight">{social.label}</span>
        <span className="truncate text-sm text-muted" aria-live="polite">
          {copied ? "Username copied!" : social.handle}
        </span>
      </span>
    </>
  );

  if (social.href) {
    return (
      <a href={social.href} target="_blank" rel="noreferrer" style={style} className={shell}>
        {body}
        <ArrowUpRightIcon className="size-5 shrink-0 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--brand)]" />
      </a>
    );
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(social.handle);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <button type="button" onClick={copy} style={style} className={shell} title={`Copy ${social.label} username`}>
      {body}
      {copied ? (
        <CheckIcon weight="bold" className="size-5 shrink-0 text-success" />
      ) : (
        <CopyIcon className="size-5 shrink-0 text-subtle transition-colors group-hover:text-[var(--brand)]" />
      )}
    </button>
  );
}
