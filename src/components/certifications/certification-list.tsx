"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { certifications, type CertificationKind } from "@/content/certifications";
import { CertificateCard } from "./certificate-card";
import { cn } from "@/lib/utils";

const filters: ("All" | CertificationKind)[] = ["All", "Certification", "Award", "Course"];

/** Filterable grid — tabs with no entries are hidden */
export function CertificationList() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const tabs = filters.filter((f) => f === "All" || certifications.some((c) => c.kind === f));
  const list = active === "All" ? certifications : certifications.filter((c) => c.kind === active);

  return (
    <>
      <div className="mt-10 inline-flex flex-wrap gap-1 rounded-full border border-border bg-surface p-1">
        {tabs.map((f) => {
          const count = f === "All" ? certifications.length : certifications.filter((c) => c.kind === f).length;
          const on = active === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                on ? "text-bg" : "text-muted hover:text-fg",
              )}
            >
              {on && (
                <motion.span
                  layoutId="cert-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-fg"
                />
              )}
              <span className="relative">
                {f === "All" ? "All" : `${f}s`}
                <span className="ml-1.5 text-xs opacity-60">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((c) => (
            <motion.div
              key={c.title + c.issuer}
              layout
              initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <CertificateCard cert={c} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
