"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowClockwiseIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowLineDownIcon,
  ArrowRightIcon,
  PauseIcon,
  PlayIcon,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

const COLS = 10;
const ROWS = 20;
const CELL = 28; // canvas pixels per cell (before devicePixelRatio)
const BEST_KEY = "anzyy-tetris-best";

type Kind = "I" | "J" | "L" | "O" | "S" | "T" | "Z";
type Board = (Kind | null)[][];
type Piece = { kind: Kind; m: number[][]; x: number; y: number };
type Status = "idle" | "playing" | "paused" | "over";

const SHAPES: Record<Kind, number[][]> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};

const COLORS: Record<Kind, string> = {
  I: "#22c7e8",
  J: "#4f6bff",
  L: "#ff8a4c",
  O: "#f5c83a",
  S: "#3ccf7a",
  T: "#a66bff",
  Z: "#f2545b",
};

const LINE_POINTS = [0, 100, 300, 500, 800];

const emptyBoard = (): Board => Array.from({ length: ROWS }, () => Array<Kind | null>(COLS).fill(null));
const rotateCW = (m: number[][]) => m[0].map((_, i) => m.map((row) => row[i]).reverse());
const dropInterval = (level: number) => Math.max(90, 800 - (level - 1) * 70);

function collides(board: Board, m: number[][], x: number, y: number) {
  for (let r = 0; r < m.length; r++) {
    for (let c = 0; c < m[r].length; c++) {
      if (!m[r][c]) continue;
      const nx = x + c;
      const ny = y + r;
      if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
      if (ny >= 0 && board[ny][nx]) return true;
    }
  }
  return false;
}

/** Rounded block with a soft top highlight */
function drawCell(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, size = CELL) {
  const pad = 1.5;
  const px = x * size + pad;
  const py = y * size + pad;
  const s = size - pad * 2;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(px, py, s, s, 6);
  ctx.fill();
  const shine = ctx.createLinearGradient(0, py, 0, py + s);
  shine.addColorStop(0, "rgb(255 255 255 / 0.35)");
  shine.addColorStop(0.5, "rgb(255 255 255 / 0)");
  ctx.fillStyle = shine;
  ctx.fill();
}

/** Classic Tetris: 7-bag pieces, ghost piece, wall kicks, levels, and a saved best score */
export function Tetris() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useRef({
    board: emptyBoard(),
    piece: null as Piece | null,
    bag: [] as Kind[],
    next: "T" as Kind,
    score: 0,
    lines: 0,
    level: 1,
    best: 0,
    acc: 0,
    status: "idle" as Status,
  });
  const [hud, setHud] = useState({ score: 0, lines: 0, level: 1, best: 0, next: "T" as Kind });
  const [status, setStatusState] = useState<Status>("idle");

  const sync = useCallback(() => {
    const g = game.current;
    setHud({ score: g.score, lines: g.lines, level: g.level, best: g.best, next: g.next });
  }, []);

  const setStatus = useCallback((s: Status) => {
    game.current.status = s;
    setStatusState(s);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const g = game.current;
    const css = getComputedStyle(document.documentElement);
    const dpr = canvas.width / (COLS * CELL);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, COLS * CELL, ROWS * CELL);

    // Faint dot at every cell corner instead of heavy grid lines
    ctx.fillStyle = css.getPropertyValue("--border-strong");
    for (let r = 1; r < ROWS; r++) {
      for (let c = 1; c < COLS; c++) {
        ctx.beginPath();
        ctx.arc(c * CELL, r * CELL, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    g.board.forEach((row, r) => row.forEach((k, c) => k && drawCell(ctx, c, r, COLORS[k])));

    const p = g.piece;
    if (p && g.status !== "idle") {
      let gy = p.y;
      while (!collides(g.board, p.m, p.x, gy + 1)) gy++;
      ctx.strokeStyle = COLORS[p.kind];
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1.5;
      p.m.forEach((row, r) =>
        row.forEach((v, c) => {
          if (!v || gy + r < 0) return;
          ctx.beginPath();
          ctx.roundRect((p.x + c) * CELL + 2.5, (gy + r) * CELL + 2.5, CELL - 5, CELL - 5, 5);
          ctx.stroke();
        }),
      );
      ctx.globalAlpha = 1;
      p.m.forEach((row, r) =>
        row.forEach((v, c) => v && p.y + r >= 0 && drawCell(ctx, p.x + c, p.y + r, COLORS[p.kind])),
      );
    }
  }, []);

  const takeFromBag = useCallback(() => {
    const g = game.current;
    if (!g.bag.length) {
      g.bag = (Object.keys(SHAPES) as Kind[]).sort(() => Math.random() - 0.5);
    }
    return g.bag.pop()!;
  }, []);

  const gameOver = useCallback(() => {
    const g = game.current;
    if (g.score > g.best) {
      g.best = g.score;
      try {
        localStorage.setItem(BEST_KEY, String(g.best));
      } catch {}
    }
    setStatus("over");
    sync();
  }, [setStatus, sync]);

  const spawn = useCallback(() => {
    const g = game.current;
    const kind = g.next;
    g.next = takeFromBag();
    const m = SHAPES[kind];
    const piece = { kind, m, x: Math.floor((COLS - m[0].length) / 2), y: kind === "I" ? -1 : 0 };
    g.piece = piece;
    if (collides(g.board, m, piece.x, piece.y)) gameOver();
  }, [takeFromBag, gameOver]);

  const lock = useCallback(() => {
    const g = game.current;
    const p = g.piece;
    if (!p) return;
    let toppedOut = false;
    p.m.forEach((row, r) =>
      row.forEach((v, c) => {
        if (!v) return;
        if (p.y + r < 0) toppedOut = true;
        else g.board[p.y + r][p.x + c] = p.kind;
      }),
    );
    if (toppedOut) return gameOver();

    const kept = g.board.filter((row) => row.some((cell) => !cell));
    const cleared = ROWS - kept.length;
    if (cleared) {
      g.board = [...Array.from({ length: cleared }, () => Array<Kind | null>(COLS).fill(null)), ...kept];
      g.lines += cleared;
      g.score += LINE_POINTS[cleared] * g.level;
      g.level = Math.floor(g.lines / 10) + 1;
    }
    g.acc = 0;
    spawn();
    sync();
  }, [gameOver, spawn, sync]);

  const start = useCallback(() => {
    const g = game.current;
    g.board = emptyBoard();
    g.bag = [];
    g.score = 0;
    g.lines = 0;
    g.level = 1;
    g.acc = 0;
    g.next = takeFromBag();
    setStatus("playing");
    spawn();
    sync();
  }, [setStatus, spawn, sync, takeFromBag]);

  // Every action is a no-op unless a game is running
  const act = useCallback(
    (action: "left" | "right" | "rotate" | "soft" | "hard") => {
      const g = game.current;
      const p = g.piece;
      if (g.status !== "playing" || !p) return;
      if (action === "left" || action === "right") {
        const dx = action === "left" ? -1 : 1;
        if (!collides(g.board, p.m, p.x + dx, p.y)) p.x += dx;
      } else if (action === "rotate") {
        const m = rotateCW(p.m);
        // Simple wall kicks: try shifting sideways, then up one row
        const kicks: [number, number][] = [[0, 0], [-1, 0], [1, 0], [-2, 0], [2, 0], [0, -1]];
        const fit = kicks.find(([kx, ky]) => !collides(g.board, m, p.x + kx, p.y + ky));
        if (fit) {
          p.m = m;
          p.x += fit[0];
          p.y += fit[1];
        }
      } else if (action === "soft") {
        if (!collides(g.board, p.m, p.x, p.y + 1)) {
          p.y++;
          g.score += 1;
          g.acc = 0;
          sync();
        } else lock();
      } else {
        let dist = 0;
        while (!collides(g.board, p.m, p.x, p.y + 1)) {
          p.y++;
          dist++;
        }
        g.score += dist * 2;
        lock();
      }
      draw();
    },
    [draw, lock, sync],
  );

  const togglePause = useCallback(() => {
    const s = game.current.status;
    if (s === "playing") setStatus("paused");
    else if (s === "paused") setStatus("playing");
  }, [setStatus]);

  // Crisp canvas on retina screens
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = COLS * CELL * dpr;
    canvas.height = ROWS * CELL * dpr;
    draw();
  }, [draw]);

  // Game loop: gravity + redraw every frame (redraw also follows theme changes)
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let loadedBest = false;
    const tick = (now: number) => {
      const g = game.current;
      if (!loadedBest) {
        loadedBest = true;
        try {
          g.best = Number(localStorage.getItem(BEST_KEY)) || 0;
        } catch {}
        sync();
      }
      const dt = now - last;
      last = now;
      if (g.status === "playing" && g.piece) {
        g.acc += dt;
        if (g.acc >= dropInterval(g.level)) {
          g.acc = 0;
          const p = g.piece;
          if (!collides(g.board, p.m, p.x, p.y + 1)) p.y++;
          else lock();
        }
      }
      draw();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [draw, lock, sync]);

  // Keyboard controls (ignored while typing, e.g. in the AI chat)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]") || e.ctrlKey || e.metaKey) return;
      const s = game.current.status;
      const map: Record<string, () => void> = {
        ArrowLeft: () => act("left"),
        ArrowRight: () => act("right"),
        ArrowUp: () => act("rotate"),
        KeyX: () => act("rotate"),
        ArrowDown: () => act("soft"),
        Space: () => (s === "idle" || s === "over" ? start() : act("hard")),
        KeyP: togglePause,
        Escape: togglePause,
      };
      const fn = map[e.code];
      if (!fn) return;
      // Only hijack keys (and stop page scrolling) while a game is on screen
      if (s === "idle" && e.code !== "Space") return;
      if (e.code === "Space" && t.closest("button, a")) return;
      e.preventDefault();
      fn();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [act, start, togglePause]);

  // Pause when the tab is hidden
  useEffect(() => {
    const onHide = () => document.hidden && game.current.status === "playing" && setStatus("paused");
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [setStatus]);

  const nextShape = SHAPES[hud.next].filter((row) => row.some(Boolean));

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-center">
      {/* Board */}
      <div className="relative w-full max-w-[300px] rounded-[22px] border border-border bg-surface-2 p-2.5 shadow-card">
        <canvas
          ref={canvasRef}
          aria-label="Tetris board"
          role="img"
          className="block aspect-[1/2] w-full rounded-[14px] bg-surface"
        />

        {status !== "playing" && (
          <div className="absolute inset-2.5 flex flex-col items-center justify-center gap-4 rounded-[14px] bg-surface/80 p-6 text-center backdrop-blur-sm">
            {status === "idle" && (
              <>
                <p className="font-display text-[34px] font-semibold leading-none tracking-[-0.04em]">
                  Tetris<span className="text-accent">.</span>
                </p>
                <p className="text-sm text-muted">Clear lines, stack smart, beat your best.</p>
              </>
            )}
            {status === "paused" && <p className="text-2xl font-semibold tracking-tight">Paused</p>}
            {status === "over" && (
              <>
                <p className="text-2xl font-semibold tracking-tight">Game over</p>
                <p className="text-sm text-muted">
                  You scored <span className="font-semibold text-fg tabular-nums">{hud.score.toLocaleString()}</span>
                  {hud.score > 0 && hud.score >= hud.best && <span className="text-accent"> · new best!</span>}
                </p>
              </>
            )}
            <button
              type="button"
              onClick={status === "paused" ? togglePause : start}
              className="cta-primary inline-flex h-11 items-center gap-2 rounded-full px-6 text-[15px] font-semibold"
            >
              <PlayIcon weight="fill" className="size-4" />
              {status === "idle" ? "Start game" : status === "paused" ? "Resume" : "Play again"}
            </button>
            {status === "idle" && <p className="text-xs text-subtle">or press Space</p>}
          </div>
        )}
      </div>

      {/* Side panel */}
      <div className="flex w-full max-w-[300px] flex-col gap-3 sm:w-[180px]">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-1">
          <div className="card flex flex-col items-center gap-2 p-4 sm:items-start">
            <span className="label">Next</span>
            <div className="flex h-12 flex-col justify-center gap-[3px]">
              {nextShape.map((row, r) => (
                <div key={r} className="flex gap-[3px]">
                  {row.map((v, c) => (
                    <span
                      key={c}
                      className="size-[18px] rounded-[5px]"
                      style={{ background: v ? COLORS[hud.next] : "transparent" }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <Stat label="Score" value={hud.score.toLocaleString()} accent />
          <Stat label="Best" value={hud.best.toLocaleString()} />
          <Stat label="Level" value={hud.level} className="hidden sm:flex" />
          <Stat label="Lines" value={hud.lines} className="hidden sm:flex" />
        </div>

        {status === "playing" && (
          <button
            type="button"
            onClick={togglePause}
            className="raised hidden h-10 items-center justify-center gap-2 rounded-full text-sm font-medium sm:inline-flex"
          >
            <PauseIcon weight="fill" className="size-4" /> Pause
          </button>
        )}

        {/* Keyboard help (desktop) */}
        <div className="card hidden flex-col gap-1.5 p-4 text-xs text-muted sm:flex">
          <span className="label mb-1">Controls</span>
          <Key k="← →">Move</Key>
          <Key k="↑ / X">Rotate</Key>
          <Key k="↓">Soft drop</Key>
          <Key k="Space">Hard drop</Key>
          <Key k="P">Pause</Key>
        </div>

        {/* Touch controls (mobile) */}
        <div className="grid grid-cols-5 gap-2 sm:hidden">
          <TouchBtn label="Move left" onPress={() => act("left")}>
            <ArrowLeftIcon weight="bold" />
          </TouchBtn>
          <TouchBtn label="Rotate" onPress={() => act("rotate")}>
            <ArrowClockwiseIcon weight="bold" />
          </TouchBtn>
          <TouchBtn label="Move right" onPress={() => act("right")}>
            <ArrowRightIcon weight="bold" />
          </TouchBtn>
          <TouchBtn label="Soft drop" onPress={() => act("soft")}>
            <ArrowDownIcon weight="bold" />
          </TouchBtn>
          <TouchBtn label="Hard drop" onPress={() => act("hard")}>
            <ArrowLineDownIcon weight="bold" />
          </TouchBtn>
        </div>
        {status === "playing" && (
          <button
            type="button"
            onClick={togglePause}
            className="raised inline-flex h-10 items-center justify-center gap-2 rounded-full text-sm font-medium sm:hidden"
          >
            <PauseIcon weight="fill" className="size-4" /> Pause
          </button>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
  className,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("card flex flex-col items-center gap-1 p-4 sm:items-start", className)}>
      <span className="label">{label}</span>
      <span
        className={cn(
          "text-[22px] font-semibold leading-none tracking-[-0.03em] tabular-nums",
          accent && "text-accent",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function Key({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center justify-between gap-2">
      {children}
      <kbd className="rounded-md border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[10.5px] text-ink-2">
        {k}
      </kbd>
    </span>
  );
}

/** Big tap target; fires on pointer down so rapid taps feel responsive */
function TouchBtn({
  label,
  onPress,
  children,
}: {
  label: string;
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      className="raised inline-flex h-14 items-center justify-center rounded-2xl text-xl touch-manipulation"
    >
      {children}
    </button>
  );
}
