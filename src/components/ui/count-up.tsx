"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Counts up the number inside a value like "1+ yr", "<24h" or "4"
 * once it scrolls into view. Non-numeric values render as-is.
 */
export function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const reduced = useReducedMotion();
  const hasNumber = match !== null;
  const target = match ? Number(match[2]) : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!hasNumber || !inView || reduced) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, target, hasNumber]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums">
      {match[1]}
      {reduced ? target : n}
      {match[3]}
    </span>
  );
}
