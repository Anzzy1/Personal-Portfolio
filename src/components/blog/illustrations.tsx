import type { ReactNode } from "react";
import type { IllustrationName } from "@/content/blog";

// ------------------------------------------------------------------
// Hand-drawn SVG illustrations for blog posts. Neutral parts use the
// theme tokens (fill-surface, stroke-border-strong, …) so they follow
// light/dark mode; screens and game pieces keep fixed colors.
// ------------------------------------------------------------------

const MONO = { fontFamily: "var(--font-mono), ui-monospace, monospace" };
const SCREEN = "#16161a";
const C = {
  orange: "#ff7a45",
  green: "#5fd08a",
  blue: "#8ab4f8",
  yellow: "#febc2e",
  red: "#ff6b6b",
  light: "#ededee",
  dim: "#6b6b70",
};

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 640 360" role="img" aria-label={label} className="block h-auto w-full">
      {children}
    </svg>
  );
}

/** Straight arrow with a drawn head, so no shared <marker> ids are needed */
function Arrow({ x1, y1, x2, y2, className = "stroke-accent", dashed = false }: {
  x1: number; y1: number; x2: number; y2: number; className?: string; dashed?: boolean;
}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 10;
  const p1 = `${x2 - h * Math.cos(a - 0.5)},${y2 - h * Math.sin(a - 0.5)}`;
  const p2 = `${x2 - h * Math.cos(a + 0.5)},${y2 - h * Math.sin(a + 0.5)}`;
  return (
    <g className={className} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={`M${x1} ${y1} L${x2} ${y2}`} strokeDasharray={dashed ? "6 7" : undefined} />
      <path d={`M${p1} L${x2} ${y2} L${p2}`} />
    </g>
  );
}

function WindowDots({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={5} fill="#ff5f57" />
      <circle cx={x + 15} cy={y} r={5} fill="#febc2e" />
      <circle cx={x + 30} cy={y} r={5} fill="#28c840" />
    </g>
  );
}

function Sparkle({ x, y, s = 1, className = "fill-accent" }: { x: number; y: number; s?: number; className?: string }) {
  return (
    <path
      className={className}
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -12 C1.5 -3 3 -1.5 12 0 C3 1.5 1.5 3 0 12 C-1.5 3 -3 1.5 -12 0 C-3 -1.5 -1.5 -3 0 -12Z"
    />
  );
}

function Lines({ x, y, step, size = 13, rows }: { x: number; y: number; step: number; size?: number; rows: [string, string][] }) {
  return (
    <g style={MONO} fontSize={size}>
      {rows.map(([text, color], i) => (
        <text key={i} x={x} y={y + i * step} fill={color} xmlSpace="preserve">
          {text}
        </text>
      ))}
    </g>
  );
}

// Rubik's cube colors
const Y = "#f5c542", R = "#e8462b", B = "#3b82f6", G = "#22a45d", O = "#ff8a2a";

/** Isometric 3×3 cube; `top` is the y of the top corner */
function Cube({ cx, top, s, faces }: { cx: number; top: number; s: number; faces: [string[], string[], string[]] }) {
  const u = [0.866 * s, 0.5 * s];
  const v = [-0.866 * s, 0.5 * s];
  const w = [0, s];
  const quad = (ox: number, oy: number, a: number[], b: number[]) =>
    [[ox, oy], [ox + a[0], oy + a[1]], [ox + a[0] + b[0], oy + a[1] + b[1]], [ox + b[0], oy + b[1]]]
      .map((p) => p.join(","))
      .join(" ");
  const cells: ReactNode[] = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // top face: spanned by u and v from the top corner
      cells.push(
        <polygon key={`t${i}${j}`} points={quad(cx + i * u[0] + j * v[0], top + i * u[1] + j * v[1], u, v)} fill={faces[0][i * 3 + j]} />,
      );
      // left face: from the left corner, spanned by u and w
      const lx = cx + 3 * v[0], ly = top + 3 * v[1];
      cells.push(
        <polygon key={`l${i}${j}`} points={quad(lx + i * u[0], ly + i * u[1] + j * w[1], u, w)} fill={faces[1][j * 3 + i]} />,
      );
      // right face: from the front corner, spanned by -v and w
      const fx = cx + 3 * u[0] + 3 * v[0], fy = top + 3 * u[1] + 3 * v[1];
      const nv = [-v[0], -v[1]];
      cells.push(
        <polygon key={`r${i}${j}`} points={quad(fx + i * nv[0], fy + i * nv[1] + j * w[1], nv, w)} fill={faces[2][j * 3 + i]} />,
      );
    }
  }
  return (
    <g className="stroke-surface-2" strokeWidth={Math.max(2, s / 14)} strokeLinejoin="round">
      {cells}
    </g>
  );
}

// ---------- Post 1: how I started coding ----------

function OldPc() {
  return (
    <Frame label="A very old desktop computer showing my first HTML code">
      <rect x={0} y={334} width={640} height={26} className="fill-border" />
      {/* tower */}
      <rect x={470} y={128} width={90} height={206} rx={10} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <rect x={485} y={148} width={60} height={10} rx={3} className="fill-surface-2 stroke-border-strong" strokeWidth={2} />
      <rect x={485} y={168} width={60} height={10} rx={3} className="fill-surface-2 stroke-border-strong" strokeWidth={2} />
      <circle cx={505} cy={300} r={8} className="fill-surface-2 stroke-border-strong" strokeWidth={2} />
      <circle cx={535} cy={300} r={4} fill="#2f9e5b" />
      {/* monitor */}
      <rect x={150} y={50} width={290} height={220} rx={22} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <rect x={175} y={75} width={240} height={165} rx={12} fill={SCREEN} className="stroke-border-strong" strokeWidth={2} />
      <Lines
        x={195}
        y={104}
        step={22}
        rows={[
          ["<html>", C.orange],
          ["  <h1>Hello!</h1>", C.green],
          ["  <p>my first page</p>", C.blue],
          ["</html>", C.orange],
        ]}
      />
      <rect x={195} y={184} width={9} height={16} fill={C.light}>
        <animate attributeName="opacity" values="1;1;0;0" dur="1.1s" repeatCount="indefinite" />
      </rect>
      <circle cx={405} cy={255} r={4} fill="#2f9e5b" />
      <rect x={270} y={270} width={50} height={22} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <rect x={225} y={290} width={140} height={16} rx={8} className="fill-surface stroke-border-strong" strokeWidth={3} />
      {/* sticky note */}
      <g transform="rotate(8 425 64)">
        <rect x={395} y={36} width={64} height={56} rx={3} fill="#ffd966" />
        <text x={427} y={60} textAnchor="middle" fontSize={12} fontWeight={600} fill="#141414">learn</text>
        <text x={427} y={77} textAnchor="middle" fontSize={12} fontWeight={600} fill="#141414">HTML!</text>
      </g>
      {/* keyboard + mouse */}
      <rect x={175} y={312} width={240} height={20} rx={6} className="fill-surface stroke-border-strong" strokeWidth={3} />
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={188 + i * 22} y={318} width={14} height={8} rx={2} className="fill-border-strong" />
      ))}
      <ellipse cx={440} cy={324} rx={12} ry={8} className="fill-surface stroke-border-strong" strokeWidth={3} />
      {/* floating bits */}
      <text x={70} y={120} fontSize={34} fontWeight={600} className="fill-accent" style={MONO}>{"{ }"}</text>
      <text x={560} y={90} fontSize={24} className="fill-subtle" style={MONO}>{"</>"}</text>
      <Sparkle x={100} y={220} />
      <Sparkle x={600} y={250} s={0.6} className="fill-subtle" />
    </Frame>
  );
}

function FirstWebsite() {
  return (
    <Frame label="HTML code on the left turning into my first portfolio page on the right">
      <rect x={60} y={70} width={240} height={220} rx={14} fill={SCREEN} className="stroke-border-strong" strokeWidth={2} />
      <WindowDots x={80} y={90} />
      <Lines
        x={80}
        y={124}
        step={24}
        rows={[
          ["<h1>Anzar</h1>", C.orange],
          ["<p>I build</p>", C.blue],
          ["<p>websites!</p>", C.blue],
          ["<button>", C.green],
          ["  Hire me", C.light],
          ["</button>", C.green],
        ]}
      />
      <text x={325} y={164} textAnchor="middle" fontSize={12} fontWeight={600} className="fill-muted">+ CSS</text>
      <Arrow x1={308} y1={180} x2={342} y2={180} />
      <rect x={350} y={70} width={240} height={220} rx={14} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <WindowDots x={370} y={90} />
      <rect x={415} y={82} width={160} height={16} rx={8} className="fill-surface-2" />
      <circle cx={470} cy={146} r={26} className="fill-accent-soft stroke-accent" strokeWidth={3} />
      <circle cx={470} cy={140} r={8} className="fill-accent" />
      <path d="M455 160 Q470 148 485 160" className="stroke-accent" strokeWidth={3} fill="none" strokeLinecap="round" />
      <text x={470} y={198} textAnchor="middle" fontSize={18} fontWeight={600} className="fill-fg">Anzar</text>
      <rect x={420} y={208} width={100} height={8} rx={4} className="fill-border-strong" />
      <rect x={435} y={222} width={70} height={8} rx={4} className="fill-border-strong" />
      <rect x={430} y={242} width={80} height={26} rx={13} className="fill-accent" />
      <text x={470} y={259} textAnchor="middle" fontSize={12} fontWeight={600} fill="#ffffff">Hire me</text>
      <Sparkle x={604} y={60} s={0.8} />
      <Sparkle x={40} y={300} s={0.6} className="fill-subtle" />
    </Frame>
  );
}

function JsLogic() {
  return (
    <Frame label="A JavaScript flowchart with an if statement, one branch working and one throwing an error">
      <rect x={260} y={28} width={120} height={38} rx={19} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <text x={320} y={52} textAnchor="middle" fontSize={14} fontWeight={600} className="fill-fg" style={MONO}>click()</text>
      <Arrow x1={320} y1={68} x2={320} y2={96} className="stroke-border-strong" />
      <polygon points="320,100 400,145 320,190 240,145" className="fill-accent-soft stroke-accent" strokeWidth={3} strokeLinejoin="round" />
      <text x={320} y={150} textAnchor="middle" fontSize={13} fontWeight={600} className="fill-fg" style={MONO}>if (x &gt; 3)</text>
      <path d="M240 145 H150 V196" className="stroke-border-strong" strokeWidth={3} fill="none" />
      <path d="M400 145 H490 V196" className="stroke-border-strong" strokeWidth={3} fill="none" />
      <text x={195} y={136} textAnchor="middle" fontSize={12} fontWeight={600} fill="#2f9e5b" style={MONO}>true</text>
      <text x={445} y={136} textAnchor="middle" fontSize={12} fontWeight={600} fill="#e5484d" style={MONO}>false</text>
      <rect x={90} y={200} width={120} height={42} rx={10} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <text x={150} y={226} textAnchor="middle" fontSize={13} className="fill-fg" style={MONO}>doThis()</text>
      <circle cx={208} cy={202} r={11} fill="#2f9e5b" />
      <path d="M203 202 L207 206 L214 198" stroke="#fff" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x={430} y={200} width={120} height={42} rx={10} className="fill-surface" stroke="#e5484d" strokeWidth={3} />
      <text x={490} y={226} textAnchor="middle" fontSize={13} className="fill-fg" style={MONO}>doThat()</text>
      <circle cx={548} cy={202} r={11} fill="#e5484d" />
      <text x={548} y={207} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">!</text>
      <text x={490} y={268} textAnchor="middle" fontSize={12} fill="#e5484d" style={MONO}>Uncaught TypeError</text>
      <text x={70} y={330} fontSize={26} className="fill-subtle" style={MONO}>=&gt;</text>
      <text x={300} y={330} fontSize={30} fontWeight={600} className="fill-accent" style={MONO}>{"{ }"}</text>
      <text x={545} y={330} fontSize={26} className="fill-subtle" style={MONO}>&amp;&amp;</text>
      <Sparkle x={80} y={70} s={0.8} />
    </Frame>
  );
}

// ---------- Post 2: AI ----------

function AiTimeline() {
  return (
    <Frame label="My AI journey: a chatbot in 2023, then a free coding agent, now Claude Code">
      <path d="M120 165 H520" className="stroke-border-strong" strokeWidth={3} strokeDasharray="6 8" />
      {/* chatbot */}
      <rect x={70} y={125} width={100} height={70} rx={16} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <path d="M95 195 L92 212 L112 195" className="fill-surface stroke-border-strong" strokeWidth={3} strokeLinejoin="round" />
      <circle cx={100} cy={160} r={5} className="fill-subtle" />
      <circle cx={120} cy={160} r={5} className="fill-subtle" />
      <circle cx={140} cy={160} r={5} className="fill-subtle" />
      <circle cx={166} cy={128} r={12} fill="#e5484d" />
      <path d="M161 123 L171 133 M171 123 L161 133" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
      <text x={120} y={250} textAnchor="middle" fontSize={16} fontWeight={600} className="fill-fg">2023–24</text>
      <text x={120} y={272} textAnchor="middle" fontSize={13} className="fill-muted">just a chatbot</text>
      {/* free agent */}
      <rect x={265} y={127} width={110} height={76} rx={12} fill={SCREEN} className="stroke-border-strong" strokeWidth={2} />
      <text x={285} y={160} fontSize={18} fontWeight={600} fill={C.green} style={MONO}>&gt;_</text>
      <rect x={285} y={174} width={60} height={6} rx={3} fill={C.dim} />
      <rect x={285} y={186} width={40} height={6} rx={3} fill={C.dim} />
      <text x={320} y={250} textAnchor="middle" fontSize={16} fontWeight={600} className="fill-fg">then</text>
      <text x={320} y={272} textAnchor="middle" fontSize={13} className="fill-muted">a free coding agent</text>
      {/* claude code */}
      <rect x={455} y={110} width={130} height={104} rx={14} fill={SCREEN} className="stroke-accent" strokeWidth={3} />
      <Lines x={472} y={140} step={20} size={12} rows={[["✓ plan", C.green], ["✓ build", C.green], ["✓ test", C.green], ["✓ ship", C.green]]} />
      <Sparkle x={588} y={104} s={1.2} />
      <Sparkle x={610} y={140} s={0.6} />
      <text x={520} y={250} textAnchor="middle" fontSize={16} fontWeight={600} className="fill-fg">now</text>
      <text x={520} y={272} textAnchor="middle" fontSize={13} className="fill-muted">Claude Code</text>
      <Arrow x1={192} y1={165} x2={244} y2={165} />
      <Arrow x1={396} y1={165} x2={438} y2={165} />
    </Frame>
  );
}

function ChatCopyPaste() {
  return (
    <Frame label="Asking an AI chatbot for code, pasting it, and getting an error">
      <rect x={40} y={40} width={300} height={280} rx={16} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <text x={60} y={66} fontSize={12} fontWeight={600} className="fill-muted">AI chat</text>
      <path d="M40 80 H340" className="stroke-border" strokeWidth={2} />
      <rect x={150} y={94} width={170} height={46} rx={14} className="fill-accent" />
      <text x={165} y={113} fontSize={12} fill="#fff">give me the code</text>
      <text x={165} y={130} fontSize={12} fill="#fff">for my project pls</text>
      <rect x={60} y={152} width={220} height={146} rx={14} className="fill-surface-2" />
      <text x={75} y={175} fontSize={12} className="fill-ink-2">Sure! Here&apos;s the code:</text>
      <rect x={75} y={186} width={190} height={96} rx={8} fill={SCREEN} className="stroke-border-strong" strokeWidth={2} />
      <Lines x={86} y={207} step={19} size={11} rows={[["function login() {", C.blue], ["  return magic()", C.light], ["}", C.blue], ["// trust me", C.dim]]} />
      <path d="M146 230 q4 4 8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0" stroke="#e5484d" strokeWidth={1.8} fill="none" />
      <text x={378} y={165} textAnchor="middle" fontSize={12} fontWeight={600} className="fill-muted">paste</text>
      <Arrow x1={350} y1={180} x2={405} y2={180} />
      <rect x={415} y={80} width={190} height={200} rx={14} fill={SCREEN} className="stroke-border-strong" strokeWidth={2} />
      <WindowDots x={433} y={100} />
      <rect x={433} y={124} width={120} height={7} rx={3} fill={C.dim} />
      <rect x={433} y={140} width={90} height={7} rx={3} fill={C.dim} />
      <rect x={433} y={156} width={130} height={7} rx={3} fill={C.dim} />
      <rect x={430} y={190} width={160} height={58} rx={8} fill="rgb(229 72 77 / 0.18)" stroke="#e5484d" strokeWidth={2} />
      <text x={445} y={213} fontSize={13} fontWeight={600} fill={C.red}>✕ Error</text>
      <text x={445} y={234} fontSize={11} fill="#ffb4b4" style={MONO}>magic is not defined</text>
      <text x={320} y={348} textAnchor="middle" fontSize={13} fontWeight={600} className="fill-muted">copy → paste → error → repeat</text>
    </Frame>
  );
}

function FreeAgent() {
  return (
    <Frame label="A free coding agent in the terminal editing files, breaking something, then fixing it">
      <rect x={90} y={44} width={460} height={280} rx={16} fill={SCREEN} className="stroke-border-strong" strokeWidth={2} />
      <WindowDots x={112} y={66} />
      <text x={320} y={70} textAnchor="middle" fontSize={11} fill={C.dim} style={MONO}>free model · terminal</text>
      <Lines
        x={115}
        y={108}
        step={26}
        rows={[
          ["> make my navbar responsive", C.light],
          ["✓ read 4 files", C.green],
          ["✎ edited navbar.tsx", C.blue],
          ["✕ oops, broke the footer", C.red],
          ["↻ trying again…", C.yellow],
          ["✓ navbar works (footer too!)", C.green],
          ["> ", C.light],
        ]}
      />
      <rect x={134} y={253} width={9} height={16} fill={C.light}>
        <animate attributeName="opacity" values="1;1;0;0" dur="1.1s" repeatCount="indefinite" />
      </rect>
      <g transform="rotate(7 520 40)">
        <rect x={462} y={22} width={116} height={34} rx={17} className="fill-accent" />
        <text x={520} y={44} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">$0 / month</text>
      </g>
    </Frame>
  );
}

function AgentBuilding() {
  return (
    <Frame label="A coding agent planning and building a full booking system across many files">
      <rect x={50} y={50} width={170} height={260} rx={14} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <g className="text-ink-2">
      <Lines
        x={68}
        y={84}
        step={26}
        size={12}
        rows={[
          ["▾ app", "currentColor"],
          ["  ▸ api", "currentColor"],
          ["    booking.ts", "currentColor"],
          ["  ▸ dashboard", "currentColor"],
          ["    page.tsx", "currentColor"],
          ["▾ db", "currentColor"],
          ["    schema.ts", "currentColor"],
          ["▾ tests", "currentColor"],
          ["    24 tests", "currentColor"],
        ]}
      />
      </g>
      {[136, 188, 240, 292].map((y) => (
        <circle key={y} cx={204} cy={y - 4} r={4.5} fill="#2f9e5b" />
      ))}
      <rect x={235} y={50} width={355} height={260} rx={14} fill={SCREEN} className="stroke-border-strong" strokeWidth={2} />
      <Lines
        x={255}
        y={84}
        step={26}
        size={12.5}
        rows={[
          ["> build a booking system", C.light],
          ["  with an admin dashboard", C.light],
          ["● plan: 6 steps", C.orange],
          ["✓ database schema", C.green],
          ["✓ API routes", C.green],
          ["✓ admin dashboard UI", C.green],
          ["✓ fixed 2 errors on its own", C.green],
          ["✓ tests passing 24/24", C.green],
        ]}
      />
      <Sparkle x={600} y={40} s={1.2} />
      <Sparkle x={30} y={330} s={0.7} className="fill-subtle" />
    </Frame>
  );
}

// ---------- Post 3: logic ----------

function GamesToCode() {
  return (
    <Frame label="Math, chess, and a Rubik's cube adding up to code">
      {/* math */}
      <rect x={40} y={110} width={110} height={110} rx={20} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <text x={95} y={175} textAnchor="middle" fontSize={24} fontWeight={700} className="fill-fg" style={MONO}>2+3</text>
      <text x={95} y={255} textAnchor="middle" fontSize={14} fontWeight={600} className="fill-muted">logic</text>
      <text x={168} y={175} textAnchor="middle" fontSize={26} className="fill-subtle">+</text>
      {/* chess */}
      <rect x={185} y={110} width={110} height={110} rx={20} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <text x={240} y={196} textAnchor="middle" fontSize={72} className="fill-fg">♞</text>
      <text x={240} y={255} textAnchor="middle" fontSize={14} fontWeight={600} className="fill-muted">planning</text>
      <text x={313} y={175} textAnchor="middle" fontSize={26} className="fill-subtle">+</text>
      {/* cube */}
      <rect x={330} y={110} width={110} height={110} rx={20} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <Cube cx={385} top={122} s={16} faces={[[Y, Y, R, Y, Y, Y, B, Y, Y], [R, R, G, R, R, R, R, O, R], [B, O, B, B, B, B, B, B, G]]} />
      <text x={385} y={255} textAnchor="middle" fontSize={14} fontWeight={600} className="fill-muted">patterns</text>
      <Arrow x1={455} y1={165} x2={492} y2={165} />
      {/* code */}
      <rect x={500} y={100} width={110} height={130} rx={22} className="fill-accent-soft stroke-accent" strokeWidth={3} />
      <text x={555} y={178} textAnchor="middle" fontSize={32} fontWeight={700} className="fill-accent" style={MONO}>{"</>"}</text>
      <text x={555} y={262} textAnchor="middle" fontSize={14} fontWeight={700} className="fill-accent">code</text>
      <Sparkle x={612} y={92} />
      <Sparkle x={60} y={80} s={0.6} className="fill-subtle" />
    </Frame>
  );
}

function QuizToy() {
  return (
    <Frame label="A kids' quiz toy asking 7 + 5, with 12 picked as the right answer">
      <rect x={170} y={40} width={300} height={280} rx={44} className="fill-accent" />
      <rect x={185} y={52} width={270} height={20} rx={10} fill="rgb(255 255 255 / 0.18)" />
      <rect x={210} y={84} width={220} height={100} rx={14} fill="#1d2b1f" />
      <text x={320} y={146} textAnchor="middle" fontSize={30} fontWeight={700} fill="#9be29b" style={MONO}>7 + 5 = ?</text>
      {["10", "11", "12", "13"].map((n, i) => {
        const right = n === "12";
        return (
          <g key={n}>
            <circle cx={233 + i * 58} cy={232} r={22} fill={right ? "#5fd08a" : "#ffffff"} stroke="rgb(0 0 0 / 0.15)" strokeWidth={3} />
            <text x={233 + i * 58} y={238} textAnchor="middle" fontSize={16} fontWeight={700} fill="#141414">{n}</text>
          </g>
        );
      })}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={272 + i * 20} y={280} width={10} height={20} rx={5} fill="rgb(0 0 0 / 0.18)" />
      ))}
      <text x={110} y={110} fontSize={44} fontWeight={700} className="fill-subtle">?</text>
      <text x={80} y={250} fontSize={30} fontWeight={700} className="fill-subtle">?</text>
      <text x={520} y={150} fontSize={36} fontWeight={700} className="fill-subtle">?</text>
      <Sparkle x={380} y={204} s={0.7} className="fill-[#ffd966]" />
      <Sparkle x={540} y={260} />
      <Sparkle x={120} y={310} s={0.6} />
    </Frame>
  );
}

function Chessboard() {
  const x0 = 200, y0 = 20, sq = 40;
  const center = (f: number, r: number) => [x0 + f * sq + sq / 2, y0 + r * sq + sq / 2];
  const pieces: [string, number, number, boolean][] = [
    ["♚", 6, 0, false],
    ["♛", 5, 2, false],
    ["♟", 2, 2, false],
    ["♞", 3, 4, true],
    ["♟", 4, 4, true],
    ["♚", 6, 7, true],
  ];
  const targets: [number, number][] = [[2, 2], [4, 2], [5, 3]];
  const [kx, ky] = center(3, 4);
  return (
    <Frame label="A chessboard with my knight's possible moves drawn out, thinking about what happens next">
      {Array.from({ length: 64 }, (_, i) => {
        const f = i % 8, r = Math.floor(i / 8);
        return <rect key={i} x={x0 + f * sq} y={y0 + r * sq} width={sq} height={sq} fill={(f + r) % 2 ? "#b58863" : "#f0d9b5"} />;
      })}
      {targets.map(([f, r]) => (
        <rect key={`${f}${r}`} x={x0 + f * sq} y={y0 + r * sq} width={sq} height={sq} fill="rgb(242 84 27 / 0.45)" />
      ))}
      {targets.map(([f, r]) => {
        const [tx, ty] = center(f, r);
        return <Arrow key={`a${f}${r}`} x1={kx} y1={ky - 8} x2={tx + (kx - tx) * 0.25} y2={ty + (ky - ty) * 0.25} dashed className="stroke-[#c2410c]" />;
      })}
      {pieces.map(([g, f, r, white], i) => {
        const [x, y] = center(f, r);
        return (
          <text key={i} x={x} y={y + 12} textAnchor="middle" fontSize={34} fill={white ? "#ffffff" : "#141414"} stroke={white ? "#141414" : "none"} strokeWidth={1}>
            {g}
          </text>
        );
      })}
      <rect x={18} y={70} width={160} height={66} rx={18} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <text x={98} y={98} textAnchor="middle" fontSize={14} fontWeight={600} className="fill-fg">If I go here…</text>
      <text x={98} y={118} textAnchor="middle" fontSize={14} fontWeight={600} className="fill-fg">what&apos;s next?</text>
      <circle cx={170} cy={150} r={7} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <circle cx={186} cy={166} r={4} className="fill-surface stroke-border-strong" strokeWidth={2} />
      <rect x={532} y={220} width={98} height={66} rx={18} className="fill-accent" />
      <text x={581} y={248} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">how do</text>
      <text x={581} y={268} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">I win?</text>
    </Frame>
  );
}

function RubiksCube() {
  return (
    <Frame label="A Rubik's cube: learn the pattern first, then make your own way">
      <Cube
        cx={320}
        top={30}
        s={50}
        faces={[
          [Y, Y, Y, Y, Y, Y, R, Y, Y],
          [R, R, R, G, R, R, R, R, O],
          [B, B, O, B, B, B, B, B, B],
        ]}
      />
      <path d="M150 120 C175 60 230 30 270 30" className="stroke-accent" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Arrow x1={262} y1={31} x2={280} y2={30} />
      <rect x={24} y={130} width={150} height={60} rx={16} className="fill-surface stroke-border-strong" strokeWidth={3} />
      <text x={99} y={156} textAnchor="middle" fontSize={13} fontWeight={600} className="fill-muted">step 1</text>
      <text x={99} y={176} textAnchor="middle" fontSize={14} fontWeight={700} className="fill-fg">learn the pattern</text>
      <rect x={466} y={236} width={150} height={60} rx={16} className="fill-accent" />
      <text x={541} y={262} textAnchor="middle" fontSize={13} fontWeight={600} fill="rgb(255 255 255 / 0.85)">step 2</text>
      <text x={541} y={282} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">make it yours</text>
      <Sparkle x={560} y={90} />
      <Sparkle x={90} y={290} s={0.7} className="fill-subtle" />
    </Frame>
  );
}

const illustrations: Record<IllustrationName, () => ReactNode> = {
  "old-pc": OldPc,
  "first-website": FirstWebsite,
  "js-logic": JsLogic,
  "ai-timeline": AiTimeline,
  "chat-copy-paste": ChatCopyPaste,
  "free-agent": FreeAgent,
  "agent-building": AgentBuilding,
  "games-to-code": GamesToCode,
  "quiz-toy": QuizToy,
  chessboard: Chessboard,
  "rubiks-cube": RubiksCube,
};

export function Illustration({ name }: { name: IllustrationName }) {
  const Art = illustrations[name];
  return <Art />;
}
