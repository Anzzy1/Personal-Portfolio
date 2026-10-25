"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  BriefcaseIcon,
  CertificateIcon,
  ChatTeardropTextIcon,
  GameControllerIcon,
  HouseIcon,
  SquaresFourIcon,
  UserIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { certifications } from "@/content/certifications";
import { testimonials } from "@/content/testimonials";

type NavItem = { href: string; label: string; icon: Icon; count?: number };

const groups: { label?: string; items: NavItem[] }[] = [
  { items: [{ href: "/", label: "Home", icon: HouseIcon }] },
  {
    label: "Portfolio",
    items: [
      { href: "/work", label: "Work", icon: SquaresFourIcon, count: projects.length },
      { href: "/services", label: "Services", icon: BriefcaseIcon, count: services.length },
      {
        href: "/certifications",
        label: "Certifications",
        icon: CertificateIcon,
        count: certifications.length,
      },
      {
        href: "/testimonials",
        label: "Testimonials",
        icon: ChatTeardropTextIcon,
        count: testimonials.length || undefined,
      },
    ],
  },
  {
    label: "Get to know me",
    items: [
      { href: "/about", label: "About me", icon: UserIcon },
    ],
  },
  {
    label: "Just for fun",
    items: [{ href: "/play", label: "Play Tetris", icon: GameControllerIcon }],
  },
];

const linkBase =
  "relative flex h-10 items-center gap-3 rounded-xl px-3 text-[15px] font-medium transition-[color,background-color,transform] duration-200";

export function NavLinks({
  onNavigate,
  pillId = "nav-pill",
}: {
  onNavigate?: () => void;
  pillId?: string;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="-mx-1 flex min-h-0 shrink flex-col gap-[18px] overflow-y-auto px-1">
      {groups.map((group, gi) => (
        <div key={gi} className="flex flex-col gap-0.5">
          {group.label && (
            <span className="px-3 pb-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-subtle">
              {group.label}
            </span>
          )}
          {group.items.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  linkBase,
                  active ? "text-fg" : "text-ink-2 hover:translate-x-0.5 hover:bg-hover hover:text-fg",
                )}
              >
                {/* The active tile glides between links */}
                {active && (
                  <motion.span
                    layoutId={pillId}
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                    className="tile-active absolute inset-0 rounded-xl"
                  />
                )}
                <Icon
                  weight={active ? "fill" : "regular"}
                  className={cn("relative size-[18px] shrink-0", active ? "text-accent" : "text-subtle")}
                />
                <span className="relative flex-1">{item.label}</span>
                {item.count !== undefined && (
                  <span
                    className={cn(
                      "relative inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold tabular-nums",
                      active ? "bg-accent text-white" : "bg-surface-2 text-muted",
                    )}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export function NavLinksFallback() {
  return (
    <nav className="flex flex-col gap-[18px]">
      {groups.map((group, gi) => (
        <div key={gi} className="flex flex-col gap-0.5">
          {group.label && (
            <span className="px-3 pb-1.5 text-xs font-medium text-subtle">{group.label}</span>
          )}
          {group.items.map((item) => (
            <Link key={item.href} href={item.href} className={cn(linkBase, "text-ink-2")}>
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
