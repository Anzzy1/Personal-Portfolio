"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects, type ProjectCategory } from "@/content/projects";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";

const filters: ("All" | ProjectCategory)[] = ["All", "AI", "App", "Web System", "Landing Page"];

export function ProjectFilter() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const list = active === "All" ? projects : projects.filter((p) => p.category.includes(active));

  return (
    <>
      <div className="mt-10 inline-flex flex-wrap gap-1 rounded-full border border-border bg-surface p-1">
        {filters.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.category.includes(f)).length;
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
                  layoutId="filter-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-fg"
                />
              )}
              <span className="relative">
                {f}
                <span className="ml-1.5 text-xs opacity-60">{count}</span>
              </span>
            </button>
          );
        })}
      </div>
      <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              // The first project leads as a full-width feature
              className={cn("min-w-0", i === 0 && "sm:col-span-2")}
              initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} index={projects.indexOf(p)} wide={i === 0} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
