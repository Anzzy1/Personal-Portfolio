import { cn } from "@/lib/utils";

/**
 * The assistant's mark: a glowing four-point spark circled by a tilted orbit
 * with a small dot travelling around it, on a tangerine tile.
 */
export function AiMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-[linear-gradient(140deg,#ffa066,#f2541b_55%,#b8360a)] text-white shadow-[0_4px_16px_-4px_var(--accent),inset_0_1px_0_rgb(255_255_255/0.35)]",
        // Size and rounding come from the caller (cn doesn't merge conflicting classes)
        className ?? "size-8 rounded-xl",
      )}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-[78%] overflow-visible">
        <g className="ai-orbit">
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4"
            transform="rotate(-28 12 12)"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".5"
            strokeWidth="1.2"
          />
          <circle cx="20.8" cy="7.3" r="1.5" fill="currentColor" />
        </g>
        <path
          className="ai-spark"
          d="M12 4.2c.55 4.6 2.6 6.75 7.3 7.8-4.7 1.05-6.75 3.2-7.3 7.8-.55-4.6-2.6-6.75-7.3-7.8 4.7-1.05 6.75-3.2 7.3-7.8Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
