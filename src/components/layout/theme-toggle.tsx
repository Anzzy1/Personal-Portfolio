"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
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

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduced) {
      setTheme(next);
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
      setTheme(next);
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
    <button
      type="button"
      role="switch"
      onClick={toggle}
      aria-checked={resolvedTheme === "dark"}
      aria-label="Dark mode"
      // The theme is only known on the client, so aria-checked differs from the server render
      suppressHydrationWarning
      className={cn(
        "group relative inline-flex h-8 w-[58px] shrink-0 items-center rounded-full bg-surface-2 shadow-[inset_0_0_0_1px_var(--ring),inset_0_1px_3px_rgb(17_17_19/0.08)] transition-colors duration-500 dark:bg-[#1a1d2e] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08),inset_0_1px_3px_rgb(0_0_0/0.5)]",
        className,
      )}
    >
      {/* Track icons hint at the other side; the knob covers the active one */}
      <SunIcon weight="fill" className="absolute left-2 size-3.5 text-subtle/70" />
      <MoonIcon weight="fill" className="absolute right-2 size-3.5 text-subtle/70" />

      {/* Sliding knob — positioned purely by the `dark` class, so it never flickers on load */}
      <span className="absolute left-1 grid size-6 place-items-center rounded-full bg-gradient-to-b from-[#ffb067] to-[#f2541b] text-white shadow-[0_2px_6px_rgb(242_84_27/0.45),inset_0_1px_0_rgb(255_255_255/0.35)] transition-[translate,scale] duration-500 ease-[var(--ease-out)] group-active:scale-90 dark:translate-x-[26px] dark:from-[#c7cdf5] dark:to-[#7c86d6] dark:shadow-[0_2px_8px_rgb(124_134_214/0.5),inset_0_1px_0_rgb(255_255_255/0.4)]">
        <SunIcon
          weight="fill"
          className="absolute size-3.5 rotate-0 scale-100 transition-transform duration-500 ease-[var(--ease-out)] dark:rotate-90 dark:scale-0"
        />
        <MoonIcon
          weight="fill"
          className="absolute size-3.5 -rotate-90 scale-0 text-[#1a1d2e] transition-transform duration-500 ease-[var(--ease-out)] dark:rotate-0 dark:scale-100"
        />
      </span>
    </button>
  );
}
