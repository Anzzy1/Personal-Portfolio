"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STEPS = [22, 14, 9, 6, 4, 2.5, 1.5];

/**
 * Renders text that "resolves" from chunky pixels into crisp type on load
 * (and again on hover). The real text is in the DOM for SEO / screen readers;
 * the canvas is decoration on top.
 */
export function PixelName({ text, className }: { text: string; className?: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playing = useRef(false);
  const [done, setDone] = useState(false);

  const play = useCallback(async () => {
    const el = textRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas || playing.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    playing.current = true;
    await document.fonts.ready;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = el.getBoundingClientRect();
    if (!width || !height) {
      // Hidden (e.g. collapsed sidebar) — nothing to animate
      setDone(true);
      playing.current = false;
      return;
    }
    const style = getComputedStyle(el);
    // The text itself is transparent while pending; its wrapper holds the real color
    const color = getComputedStyle(el.parentElement ?? el).color;

    // Draw the crisp text once, offscreen
    const src = document.createElement("canvas");
    src.width = canvas.width = Math.ceil(width * dpr);
    src.height = canvas.height = Math.ceil(height * dpr);
    const sctx = src.getContext("2d")!;
    sctx.scale(dpr, dpr);
    sctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    sctx.letterSpacing = style.letterSpacing === "normal" ? "0px" : style.letterSpacing;
    sctx.fillStyle = color;
    sctx.textBaseline = "alphabetic";
    const m = sctx.measureText(text);
    const asc = m.fontBoundingBoxAscent ?? m.actualBoundingBoxAscent;
    const desc = m.fontBoundingBoxDescent ?? m.actualBoundingBoxDescent;
    sctx.fillText(text, 0, (height - (asc + desc)) / 2 + asc);

    // Downsample → upscale without smoothing, with shrinking blocks
    const ctx = canvas.getContext("2d")!;
    const tiny = document.createElement("canvas");
    const tctx = tiny.getContext("2d")!;
    setDone(false);
    canvas.style.opacity = "1";
    for (const block of STEPS) {
      const b = block * dpr;
      tiny.width = Math.max(1, Math.ceil(src.width / b));
      tiny.height = Math.max(1, Math.ceil(src.height / b));
      tctx.clearRect(0, 0, tiny.width, tiny.height);
      tctx.drawImage(src, 0, 0, tiny.width, tiny.height);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tiny, 0, 0, canvas.width, canvas.height);
      await new Promise((r) => setTimeout(r, 85));
    }
    setDone(true);
    canvas.style.opacity = "0";
    playing.current = false;
  }, [text]);

  useEffect(() => {
    const id = requestAnimationFrame(() => play());
    return () => cancelAnimationFrame(id);
  }, [play]);

  return (
    <span className={className} onMouseEnter={play}>
      <span className="relative inline-block">
        <span ref={textRef} className={done ? "transition-colors duration-200" : "pixel-pending"}>
          {text}
        </span>
        <canvas
          ref={canvasRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full transition-opacity duration-200 [image-rendering:pixelated]"
        />
      </span>
    </span>
  );
}
