"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ListIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import { SidebarPanel, Wordmark } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Page frame: floating sidebar on desktop,
 * slim top bar + slide-in drawer on mobile.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);

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

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeDrawer}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-110%" }}
              animate={{ x: 0 }}
              exit={{ x: "-110%" }}
              transition={{ duration: 0.32, ease }}
              className="sb-shell fixed left-2.5 top-2.5 z-50 h-[calc(100dvh-20px)] w-[296px] max-w-[calc(100vw-20px)] lg:hidden"
            >
              <SidebarPanel mobile onClose={closeDrawer} onNavigate={closeDrawer} pillId="drawer-pill" />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

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
