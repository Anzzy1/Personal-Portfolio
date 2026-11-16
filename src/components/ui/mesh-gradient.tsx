"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/*
 * Flowing WebGL mesh gradient: a handful of colour points drift on their own
 * Lissajous paths, the surface is gently warped, and colours are blended by
 * inverse distance. A light grain keeps it from looking like a flat CSS blur.
 * It speeds up while the parent is hovered, pauses off-screen, and renders a
 * single still frame for reduced-motion users.
 */
const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_warp;
uniform vec3 u_colors[5];

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

vec2 point(int i, float t) {
  float f = float(i);
  return vec2(
    0.5 + 0.42 * sin(t * (0.31 + f * 0.07) + f * 1.7),
    0.5 + 0.42 * cos(t * (0.27 + f * 0.05) + f * 2.3)
  );
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;

  // Soft, slowly evolving warp of the sampling space
  uv.x += u_warp * 0.08 * sin(uv.y * 3.1 + u_time * 0.6);
  uv.y += u_warp * 0.08 * cos(uv.x * 2.7 - u_time * 0.5);

  vec3 col = vec3(0.0);
  float total = 0.0;
  for (int i = 0; i < 5; i++) {
    vec2 d = uv - point(i, u_time);
    d.x *= aspect;
    float w = 1.0 / (pow(length(d), 3.0) + 0.002);
    col += u_colors[i] * w;
    total += w;
  }
  col /= total;

  // Fine grain
  col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.045;
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = "attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }";

function hexToRgb(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function MeshGradient({
  colors,
  className,
}: {
  /** Exactly five hex colours */
  colors: [string, string, string, string, string];
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const key = colors.join();

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false });
    if (!canvas || !host || !gl) return;

    const prog = gl.createProgram()!;
    for (const [type, src] of [
      [gl.VERTEX_SHADER, VERT],
      [gl.FRAGMENT_SHADER, FRAG],
    ] as const) {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      gl.attachShader(prog, sh);
    }
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uWarp = gl.getUniformLocation(prog, "u_warp");
    gl.uniform3fv(gl.getUniformLocation(prog, "u_colors"), new Float32Array(key.split(",").flatMap(hexToRgb)));

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hover = 0; // eased 0..1
    let hovering = false;
    let time = 4; // start mid-flow so the first frame is already interesting
    let last = performance.now();
    let raf = 0;
    let visible = true;

    const enter = () => (hovering = true);
    const leave = () => (hovering = false);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);

    function frame(now: number) {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      hover += ((hovering ? 1 : 0) - hover) * Math.min(1, dt / 0.25);
      time += dt * (0.7 + hover * 1.6);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas!.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas!.clientHeight * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
      gl!.viewport(0, 0, w, h);
      gl!.uniform2f(uRes, w, h);
      gl!.uniform1f(uTime, time);
      gl!.uniform1f(uWarp, 1 + hover * 0.6);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

      if (!reduced && visible) raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced) {
        cancelAnimationFrame(raf);
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(canvas);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
    };
  }, [key]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 block size-full", className)}
    />
  );
}
