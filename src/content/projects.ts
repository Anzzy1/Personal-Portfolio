// ------------------------------------------------------------------
// Projects / case studies
//
// TODO: These are starter projects shaped around the services you
// offer. Replace them with your real personal projects (or build
// these!). Keep the same fields — every page, card, and the AI
// assistant read from this list.
// ------------------------------------------------------------------

export type ProjectCategory = "AI" | "App" | "Web System" | "Landing Page";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory[];
  featured: boolean;
  year: string;
  type: string; // e.g. "Personal project", "Client project"
  role: string;
  timeline: string;
  // Client layer — what a business owner cares about
  problem: string;
  solution: string;
  ai?: string; // where AI fits in (optional)
  metrics: { value: string; label: string }[];
  // Technical layer — how it's built
  stack: string[];
  architecture: string[];
  decisions: string[];
  challenges: string[];
  // Links
  demo?: string;
  github?: string;
  // Put screenshots in /public/images/projects/ and set e.g. "/images/projects/baonbuddy.png".
  // While empty, a generated preview is shown.
  cover?: string;
  // Signature color: tints the project's card, cover, and hover glow
  color?: string;
  // Demo video in /public/videos, played on the case-study page
  video?: { src: string; poster: string; duration?: string };
};

export const projects: Project[] = [
  {
    slug: "baonbuddy",
    color: "#3a4bff",
    title: "BaonBuddy",
    summary:
      "A cheerful baon tracker app for Filipino students — say or snap your gastos, and Buddy keeps your allowance on track with Taglish money advice. Mobile app coming soon.",
    category: ["AI", "App"],
    featured: true,
    year: "2026",
    type: "Personal project · Mobile app in the works",
    role: "Design & full-stack development",
    timeline: "Personal build",
    problem:
      "Students get their baon weekly or monthly, then run out days early. Spreadsheets feel like homework, so nobody keeps tracking long enough to see where the money goes.",
    solution:
      "A playful budget app built around Buddy, a student mascot — running today as a web app, with a mobile version on the way. Log expenses by typing, talking, or scanning a receipt, see exactly how much you can spend per day, and ask Buddy if you can afford that samgyup this weekend.",
    ai: "Voice is transcribed by Whisper right in the browser, receipts are read with on-device OCR, and a local LLM rewrites Buddy's advice — while every number comes from exact budget math, so the AI never makes up amounts.",
    metrics: [
      { value: "Voice", label: "Offline logging" },
      { value: "Snap", label: "Receipt scanning" },
      { value: "EN/FIL", label: "Taglish advisor" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Whisper (Transformers.js)", "Tesseract.js", "Ollama"],
    architecture: [
      "Budget, period, and expenses are saved on the device — no account needed",
      "Typed or spoken messages like \"jeep 13, lunch 85\" are parsed into categorized expenses",
      "Whisper runs in a Web Worker so voice input works fully offline",
      "Receipts are read with Tesseract OCR and checked against the amounts actually printed",
      "Buddy's advisor answers money questions with exact math, using a local LLM only to phrase tips",
    ],
    decisions: [
      "Rules first, AI second — parsing and budget math never depend on the model, so the app stays fast and correct",
      "Everything runs locally, so a student's spending stays private and the app works without signal",
      "A mascot and bright color-blocked UI so budgeting feels like a game, not a chore",
    ],
    challenges: [
      "Understanding Taglish and casual phrasing like \"pamasahe 20 tas milk tea 120\"",
      "Stopping the model from inventing receipt totals — every amount must appear in the OCR text",
    ],
    demo: "",
    github: "https://github.com/Anzzy1/BaonBuddy",
    video: {
      src: "/videos/baonbuddy-demo.mp4",
      poster: "/videos/baonbuddy-demo-poster.jpg",
      duration: "1:00",
    },
  },
  {
    slug: "tindahub",
    color: "#0f7a55",
    title: "TindaHub",
    summary:
      "A store management system for large sari-sari stores — fast POS, live inventory, an utang ledger per suki, and daily profit reports, so the owner closes the day in minutes instead of hours.",
    category: ["Web System"],
    featured: true,
    year: "2026",
    type: "Web system · Retail / sari-sari store",
    role: "Design & full-stack development",
    timeline: "6 weeks",
    problem:
      "A big sari-sari store moves hundreds of small sales a day — per-stick cigarettes, per-kilo rice, eLoad, softdrinks — with several staff behind the counter. Utang lives in a notebook, stock is counted by eye, and nobody really knows the day's profit until the owner spends hours adding everything up at night. Money leaks through unpaid utang, missing stock, and items that run out before anyone notices.",
    solution:
      "TindaHub puts the whole store in one place. Cashiers ring up sales in seconds, including tingi and per-kilo items. Every sale updates stock instantly, every utang is recorded under the suki's name with what they took and when it's due, and the dashboard shows today's sales, gross profit, overdue utang, and what needs restocking — on any phone, tablet, or laptop.",
    metrics: [
      { value: "Utang", label: "Ledger per suki" },
      { value: "Live", label: "Stock & profit" },
      { value: "Offline", label: "Keeps selling" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    architecture: [
      "Point of sale with barcode or quick-tap items, tingi units (per stick, per kilo, per sachet), and cash or utang checkout",
      "Inventory is built from a stock movement log — deliveries, sales, returns, and spoilage — so every count is traceable",
      "Utang ledger per suki: each item taken on credit, partial payments, due dates, and overdue reminders",
      "Profit is computed per sale from the item's cost price, so the dashboard shows real gross profit, not just sales",
      "Gastos (expenses) and reports roll up into daily, weekly, and monthly summaries with best sellers by profit",
      "Owner, cashier, and stock-keeper roles — staff can sell, only the owner can edit prices or delete records",
      "Sales are saved on the device first and synced when the connection comes back",
    ],
    decisions: [
      "Offline-first POS, because store internet drops and the counter can't stop selling",
      "Utang is tied to a suki profile instead of free-text notes, so balances can never get lost or mixed up",
      "Restock list is generated from reorder points, so the owner can send it straight to the supplier",
      "Taglish labels (Benta, Utang, Gastos) and big tap targets, because the people using it are busy cashiers, not office staff",
    ],
    challenges: [
      "Selling one product in several units — a whole pack vs. per stick, a sack vs. per kilo — while keeping one accurate stock count",
      "Keeping stock correct when two cashiers sell the same item at the same time, even while one is offline",
      "Making utang collection feel friendly: clear balances for the suki, without awkward conversations at the counter",
    ],
    demo: "",
    github: "",
  },
  {
    slug: "portfolio-ai-assistant",
    color: "#f2541b",
    title: "Anzyy AI",
    summary:
      "The assistant built into this portfolio — ask about my work, services, or availability in English or Filipino, and get a short answer with links to the right page.",
    category: ["AI", "Web System"],
    featured: true,
    year: "2026",
    type: "Personal project · Live on this site",
    role: "Design & development",
    timeline: "1 week",
    problem:
      "Visitors rarely read a whole portfolio. A client usually has one or two questions — \"can you build this?\", \"how do we start?\" — and leaves if the answer isn't easy to find.",
    solution:
      "A chat assistant that lives on every page. Open it with the floating button or Ctrl K, tap a suggested question or type your own, and it replies in a few seconds with a short answer and buttons that take you straight to the matching project, service, or contact page.",
    ai: "Grounded in the same content files that power the site. A large language model writes each reply from that content only, and if the model is ever unavailable a local keyword responder takes over, so the chat never goes down.",
    metrics: [
      { value: "EN/FIL", label: "Bilingual replies" },
      { value: "Ctrl K", label: "Open anywhere" },
      { value: "Grounded", label: "In real content" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "LLM API"],
    architecture: [
      "All portfolio content lives in typed content files — projects, services, profile, and stack",
      "The assistant reads those same files, so the site and the AI can never disagree",
      "Each question is matched to a topic (projects, services, pricing, contact) and detects Filipino to reply in Taglish",
      "Replies type out word by word, then show link buttons to the right page",
      "One API route sends the site content to the model, falling back to the local responder if it's unavailable",
    ],
    decisions: [
      "Single source of truth for content — update a project once and the AI knows about it instantly",
      "A strict system prompt and content-only context, so the model can't invent prices, timelines, or projects",
      "Suggested questions on open, because most visitors don't know what to ask",
    ],
    challenges: [
      "Keeping answers short, honest, and helpful instead of salesy",
      "Detecting Filipino and Taglish questions reliably with simple rules",
    ],
    demo: "/",
    github: "",
  },
  {
    slug: "kape-luna",
    color: "#b7792f",
    title: "Kape Luna",
    summary:
      "A golden-hour landing page for a coffee shop in San Isidro, Antipolo City — built to turn scrollers into guests with a craveable hero, a featured-drink spotlight, and order-now in one tap.",
    category: ["Landing Page"],
    featured: false,
    year: "2026",
    type: "Landing page · Café in Antipolo City",
    role: "Design & development",
    timeline: "2 weeks",
    problem:
      "Kape Luna had great coffee and a loyal crowd of regulars, but online it only had scattered social posts. New guests couldn't easily see the menu, prices, or opening hours, couldn't order ahead, and had to message the page just to ask how to find C. Lawis Ext. in San Isidro.",
    solution:
      "A one-page site that feels like sitting inside the café: warm golden-hour light, the iced Spanish Latte front and center, and the promise \"Where every sip feels like a brighter day.\" A featured-drink card shows the best sellers with prices, Explore Our Menu and Order Now are always one tap away, and a short brand story video builds trust with first-time guests.",
    metrics: [
      { value: "Order", label: "Now, in one tap" },
      { value: "Mobile", label: "First design" },
      { value: "Featured", label: "Drink spotlight" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    architecture: [
      "Statically generated page served from a CDN, so it loads fast even on mobile data up the hill",
      "Menu lives in one content file — the owner updates drinks and prices without touching the design",
      "\"Open now\" badge computed from the café's hours in Philippine time",
      "Reservation form sends the request straight to the café's email and Messenger",
      "Google Maps directions link pinned to C. Lawis Ext., San Isidro, Antipolo City",
    ],
    decisions: [
      "Full-bleed, golden-hour product photography with cream-gold accents, so the page feels as cozy as the café itself",
      "The best seller and its price sit in the first screen, in a featured card that rotates through the signature drinks",
      "Explore Our Menu and Order Now stay one tap away on mobile, where most guests find the café",
    ],
    challenges: [
      "Keeping text readable over a rich photo — a soft dark gradient on the left side gives the headline room to breathe",
      "Keeping a large hero photo fast on slow mobile data with responsive, optimized images",
    ],
    demo: "",
    github: "",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
