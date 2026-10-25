"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ChatsCircleIcon, DeviceMobileIcon, RocketLaunchIcon, TreeStructureIcon } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { projects, type Project, type ProjectCategory } from "@/content/projects";
import { ProjectVisual } from "@/components/project/project-visual";
import { Chip, SectionHead } from "@/components/ui/rows";
import { ProjectThumb } from "./thumbs";
import { cn } from "@/lib/utils";

const VISIBLE = 3;
const PREVIEW_W = 260;

export const categoryIcons: Record<ProjectCategory, Icon> = {
  AI: ChatsCircleIcon,
  App: DeviceMobileIcon,
  "Web System": TreeStructureIcon,
  "Landing Page": RocketLaunchIcon,
};

/**
 * Project rows with a floating preview that follows the cursor.
 * The preview shares its view-transition name with the case-study cover,
 * so clicking a row morphs the preview into the page hero.
 */
export function ProjectRows() {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState<Project | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 350, damping: 30, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 350, damping: 30, mass: 0.5 });

  const hiddenCount = projects.length - VISIBLE;
  const shown = expanded ? projects : projects.slice(0, VISIBLE);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !listRef.current) return;
    const r = listRef.current.getBoundingClientRect();
    const px = e.clientX - r.left;
    // Flip to the left of the cursor near the right edge
    x.set(px + 24 + PREVIEW_W > r.width ? px - 24 - PREVIEW_W : px + 24);
    y.set(e.clientY - r.top);
  }

  return (
    <section id="work" className="flex scroll-mt-24 flex-col gap-4">
      <SectionHead label="Projects" count={projects.length} />
      <div
        ref={listRef}
        onPointerMove={onMove}
        onPointerLeave={() => setHovered(null)}
        className="relative flex flex-col"
      >
        {shown.map((p, i) => {
          const faded = !expanded && hiddenCount > 0 && i === VISIBLE - 1;
          return (
            <motion.div
              key={p.slug}
              initial={i >= VISIBLE ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: (i - VISIBLE) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/work/${p.slug}`}
                onPointerEnter={() => setHovered(p)}
                aria-hidden={faded || undefined}
                tabIndex={faded ? -1 : undefined}
                className={cn("row", faded && "row-faded")}
              >
                <ProjectThumb project={p} icon={categoryIcons[p.category[0]]} />
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="row-title font-medium">
                    {p.title}
                    <Chip>{p.category[0]}</Chip>
                  </span>
                  <span className="truncate text-sm text-muted">{p.summary}</span>
                </span>
                <span className="hidden shrink-0 text-[13px] text-subtle sm:block">{p.type}</span>
              </Link>
            </motion.div>
          );
        })}

        {/* Floating cursor preview (mouse only) */}
        <motion.div
          style={{ x, y, width: PREVIEW_W }}
          className="pointer-events-none absolute left-0 top-0 z-20 hidden -translate-y-1/2 pointer-fine:block"
        >
          <AnimatePresence mode="popLayout">
            {hovered && (
              <motion.div
                key={hovered.slug}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[16px] border border-border bg-surface p-1.5 shadow-[0_24px_48px_-12px_rgb(17_17_19/0.3)]"
              >
                <ProjectVisual project={hovered} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="-mt-2 h-10 self-center rounded-full border border-border-strong bg-surface px-5 text-sm font-medium transition-colors hover:bg-hover"
        >
          {expanded ? "Show less" : `+ ${hiddenCount} more`}
        </button>
      )}
    </section>
  );
}
