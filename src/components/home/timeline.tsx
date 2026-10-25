"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { experience } from "@/content/experience";
import { Tag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

/** Experience list whose connecting line draws itself as you scroll */
export function ExperienceTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative space-y-10 pl-8">
      <span className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
      <motion.span
        style={{ scaleY }}
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent"
      />
      {experience.map((e, i) => (
        <li key={e.company} className="relative">
          <span className="absolute -left-8 top-1.5 flex size-[15px] items-center justify-center rounded-full border border-border-strong bg-bg">
            <span className={`size-[7px] rounded-full ${i === 0 ? "bg-accent" : "bg-border-strong"}`} />
          </span>
          <Reveal delay={i * 0.05}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-[17px] font-medium tracking-tight">
                {e.role} <span className="text-muted">at {e.company}</span>
              </h3>
              <span className="text-sm text-subtle">{e.period}</span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {e.points.map((pt) => (
                <li key={pt} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-2">
                  <span className="mt-[11px] size-1 shrink-0 rounded-full bg-subtle" />
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {e.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
