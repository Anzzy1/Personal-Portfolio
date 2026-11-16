"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { MonitorIcon, MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

// 8×8 ordered-dither (Bayer) matrix, same pattern as the page-load intro
const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28,
  52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39,
  13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
];
const CELL = 10; // on-screen size of one dither pixel
const FRAMES = 18;
const DURATION = 800;

/**
 * Pre-renders the mask frames for a dither ripple spreading out from (ox, oy).
 * Each frame is a small PNG; cells turn opaque once progress passes their
 * threshold (distance from the origin, roughened by the Bayer pattern).
 */
function buildMaskFrames(ox: number, oy: number) {
  const w = Math.ceil(window.innerWidth / CELL);
  const h = Math.ceil(window.innerHeight / CELL);
  const cx = ox / CELL;
  const cy = oy / CELL;
  const far = Math.max(
    Math.hypot(cx, cy),
    Math.hypot(w - cx, cy),
    Math.hypot(cx, h - cy),
    Math.hypot(w - cx, h - cy),
  );

  const small = document.createElement("canvas");
  small.width = w;
  small.height = h;
  const sctx = small.getContext("2d")!;
  const img = sctx.createImageData(w, h);

  // Upscale with hard edges so the pixels stay crisp in the mask
  const big = document.createElement("canvas");
  big.width = w * 4;
  big.height = h * 4;
  const bctx = big.getContext("2d")!;
  bctx.imageSmoothingEnabled = false;

  const thresholds = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const d = Math.hypot(x - cx, y - cy) / far;
      thresholds[y * w + x] = d * 0.72 + (BAYER[(y % 8) * 8 + (x % 8)] / 64) * 0.28;
    }
  }

  const frames: string[] = [];
  for (let f = 0; f < FRAMES; f++) {
    const p = f / (FRAMES - 1);
    const cut = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2; // ease-in-out
    for (let i = 0; i < w * h; i++) img.data[i * 4 + 3] = thresholds[i] < cut ? 255 : 0;
    sctx.putImageData(img, 0, 0);
    bctx.clearRect(0, 0, big.width, big.height);
    bctx.drawImage(small, 0, 0, big.width, big.height);
    frames.push(`url(${big.toDataURL()})`);
  }
  return frames;
}

type ThemeChoice = "system" | "light" | "dark";

const OPTIONS: { value: ThemeChoice; label: string; Icon: typeof SunIcon }[] = [
  { value: "system", label: "System theme", Icon: MonitorIcon },
  { value: "light", label: "Light theme", Icon: SunIcon },
  { value: "dark", label: "Dark theme", Icon: MoonIcon },
];

/** Minimal three-way theme switcher: System / Light / Dark */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  // The stored choice is only known on the client; avoid a hydration mismatch
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const active = mounted ? (theme as ThemeChoice) : undefined;

  function choose(choice: ThemeChoice, e: React.MouseEvent<HTMLButtonElement>) {
    if (choice === theme) return;
    const next =
      choice === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : choice;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Same resolved colors (e.g. Dark -> System on a dark OS): just save the choice
    if (next === resolvedTheme || !document.startViewTransition || reduced) {
      setTheme(choice);
      return;
    }

    const r = e.currentTarget.getBoundingClientRect();
    const frames = buildMaskFrames(r.left + r.width / 2, r.top + r.height / 2);

    root.classList.add("theme-vt");
    const transition = document.startViewTransition(() => {
      // next-themes applies the class in an effect (too late for the snapshot),
      // so switch it here synchronously, then let next-themes persist it.
      root.classList.toggle("dark", next === "dark");
      root.classList.toggle("light", next === "light");
      root.style.colorScheme = next;
      setTheme(choice);
    });

    transition.ready
      .then(() =>
        root.animate(
          { maskImage: frames, WebkitMaskImage: frames } as PropertyIndexedKeyframes,
          { duration: DURATION, easing: "linear", fill: "both", pseudoElement: "::view-transition-new(root)" },
        ).finished,
      )
      .catch(() => {})
      .finally(() => root.classList.remove("theme-vt"));
  }

  return (
    <div
      role="group"
      aria-label="Theme"
      className={cn(
        "inline-flex shrink-0 items-center gap-px rounded-full border border-border p-0.5",
        className,
      )}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            type="button"
            onClick={(e) => choose(value, e)}
            aria-label={label}
            aria-pressed={isActive}
            title={label.replace(" theme", "")}
            className={cn(
              "grid size-[22px] place-items-center rounded-full transition-colors duration-200",
              isActive ? "bg-hover text-fg" : "text-subtle hover:text-fg",
            )}
          >
            <Icon weight={isActive ? "fill" : "regular"} className="size-[13px]" />
          </button>
        );
      })}
    </div>
  );
}
