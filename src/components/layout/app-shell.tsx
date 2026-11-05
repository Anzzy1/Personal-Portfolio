"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ListIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import { SidebarPanel, Wordmark } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Page frame: floating sidebar on desktop,
 * slim top bar + slide-in drawer on mobile.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);

  // Any navigation (links, back/forward) closes the drawer
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setDrawerOpen(false);
  }

  // Escape closes the drawer; lock page scroll while it's open
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <div className="flex min-h-dvh">
      {/* Desktop sidebar */}
      <div className="sticky top-0 hidden h-dvh w-[276px] shrink-0 lg:block">
        <aside className="sb-shell ml-3 mt-3 h-[calc(100dvh-24px)] w-[264px]">
          <SidebarPanel pillId="nav-pill" />
        </aside>
      </div>

      {/* Mobile drawer. Always mounted: being closed is a class, not an exit animation,
          so a stalled animation can never leave an invisible backdrop blocking taps. */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: drawerOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={closeDrawer}
        className={cn(
          "fixed inset-0 z-40 bg-black/25 lg:hidden",
          drawerOpen ? "backdrop-blur-[2px]" : "pointer-events-none",
        )}
      />
      <motion.aside
        initial={false}
        animate={{ x: drawerOpen ? 0 : "-110%" }}
        transition={{ duration: 0.32, ease }}
        inert={!drawerOpen}
        aria-hidden={!drawerOpen}
        className={cn(
          "sb-shell fixed left-2.5 top-2.5 z-50 h-[calc(100dvh-20px)] w-[296px] max-w-[calc(100vw-20px)] lg:hidden",
          !drawerOpen && "pointer-events-none",
        )}
      >
        <SidebarPanel mobile onClose={closeDrawer} onNavigate={closeDrawer} pillId="drawer-pill" />
      </motion.aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/70 bg-bg/80 px-4 py-2.5 backdrop-blur-md lg:hidden">
          <Link href="/" className="wordmark text-[22px] leading-none">
            <Wordmark />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/contact"
              aria-label="Contact me"
              title="Contact me"
              className="cta-primary grid size-8 place-items-center rounded-full"
            >
              <PaperPlaneTiltIcon weight="fill" className="size-[15px]" />
            </Link>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className="foot-btn size-9"
            >
              <ListIcon className="size-5" />
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[688px] px-5 pb-10 pt-10 sm:px-6 lg:pt-[104px]">
          {children}
        </main>
      </div>
    </div>
  );
}
