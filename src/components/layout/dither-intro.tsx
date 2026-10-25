"use client";

import { useEffect, useRef } from "react";

// 8×8 ordered-dither (Bayer) matrix
const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28,
  52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39,
  13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
];
const PIXEL = 7;
const DURATION = 950;

/**
 * On first load the page is covered in background color, which then
 * dissolves away in a pixel-dither pattern sweeping from the top-left.
 */
export function DitherIntro() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wrap.style.display = "none";
      return;
    }

    const w = Math.ceil(window.innerWidth / PIXEL);
    const h = Math.ceil(window.innerHeight / PIXEL);
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    const rgb = getComputedStyle(document.body).backgroundColor.match(/\d+/g)?.map(Number);
    if (!ctx || !rgb) {
      wrap.style.display = "none";
      return;
    }

    // Each cell disappears once progress passes its threshold
    const thresholds = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const radial = Math.hypot(x / w, (y / h) * 0.8) / 1.28;
        thresholds[y * w + x] = radial * 0.6 + (BAYER[(y % 8) * 8 + (x % 8)] / 64) * 0.4;
      }
    }

    const img = ctx.createImageData(w, h);
    const d = img.data;
    for (let i = 0; i < w * h; i++) {
      d[i * 4] = rgb[0];
      d[i * 4 + 1] = rgb[1];
      d[i * 4 + 2] = rgb[2];
    }

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const cut = (1 - (1 - p) ** 3) * 1.02;
      for (let i = 0; i < w * h; i++) d[i * 4 + 3] = thresholds[i] < cut ? 0 : 255;
      ctx.putImageData(img, 0, 0);
      wrap.style.background = "transparent";
      if (p < 1) raf = requestAnimationFrame(frame);
      else wrap.style.display = "none";
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="dither-cover pointer-events-none fixed inset-0 z-[100] bg-bg">
      <canvas ref={canvasRef} className="size-full [image-rendering:pixelated]" />
    </div>
  );
}
