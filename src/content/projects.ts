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
    slug: "paluwagan",
    color: "#16a34a",
    title: "Paluwagan",
    summary:
      "A savings circle app for Filipino groups — run your paluwagan online or face to face, draw a fair payout order, track every hulog, and let the app send the reminders. Works in the browser today, with Android, Windows, and iOS coming soon.",
    category: ["AI", "App"],
    featured: true,
    year: "2026",
    type: "Personal project · Open beta",
    role: "Design & full-stack development",
    timeline: "Personal build",
    problem:
      "A paluwagan runs on trust and a notebook. The admin keeps the listahan by hand, the payout order is drawn from paper slips, and proof of payment gets buried in the group chat. When someone forgets a hulog or questions the draw, there's no record to settle it.",
    solution:
      "Paluwagan keeps the listahan for the group. Online circles let every member join with a code, link, or QR, upload receipts, and get reminders. Offline circles let one admin run everything on their phone, ticking off each hulog as it's handed over. The payout order is picked by a Digital Bunot that anyone can verify, turned into a game night with Spin the Wheel, Lucky Envelopes, and more. The app never holds money; members pay each other through GCash, Maya, bank, or cash.",
    ai: "Ipon AI, powered by Claude, reads your circles, dues, and savings goals to answer questions like \"what do I pay this week?\" and suggest savings plans. It runs in a Supabase Edge Function, so the API key never ships in the app.",
    metrics: [
      { value: "Fair", label: "Verifiable draw" },
      { value: "2 modes", label: "Online & offline" },
      { value: "Auto", label: "Hulog reminders" },
    ],
    stack: ["Expo", "React Native", "TypeScript", "Supabase", "PostgreSQL", "TanStack Query", "Claude API"],
    architecture: [
      "One Expo codebase runs on the web today and builds for Android, iOS, and Windows",
      "Supabase Postgres with row-level security, so members can only read the circles they belong to",
      "Every write with business rules — joining, locking, drawing, paying, swapping turns — goes through a server-side function",
      "Commit-reveal draw: a SHA-256 commitment is published when the circle locks, so any member can recompute the payout order on their phone",
      "Two-sided payment sign-off: the member uploads a receipt, the recipient confirms it",
      "Scheduled push reminders 3 days before, 1 day before, on the due date, and when overdue",
      "Offline circles are stored on the device with SQLite, no account or internet needed",
    ],
    decisions: [
      "The app never touches money — it only keeps the record — so there's nothing to steal and no license needed",
      "Two modes instead of one, because many paluwagan are run by one trusted admin who collects in person",
      "Draw games make bunutan night fun, while the locked-in result keeps it fair",
      "Scam safeguards warn when a circle mentions interest or returns, and circles are invite-only",
    ],
    challenges: [
      "Making the draw provably fair — the app's shuffle and the database's shuffle are tested against the same fixed result",
      "Supporting how groups really run it: daily, kinsenas, or monthly hulog, a separate sahod schedule, turn swaps, and split slots",
    ],
    demo: "https://paluwagan-web-page.vercel.app/",
    github: "https://github.com/Anzzy1/Paluwagan-App",
    video: {
      src: "/videos/paluwagan-demo.mp4",
      poster: "/videos/paluwagan-demo-poster.jpg",
      duration: "1:00",
    },
  },
  {
    slug: "waypoint",
    color: "#1f6b45",
    title: "Waypoint",
    summary:
      "Free, step-by-step developer roadmaps for 8 roles, from Frontend to AI Agent Engineer — short lessons, hand-picked videos and docs, a project per stage, and a checklist that remembers your progress.",
    category: ["Web System"],
    featured: true,
    year: "2026",
    type: "Personal project · Live",
    role: "Design & full-stack development",
    timeline: "Personal build",
    problem:
      "People who want to become developers drown in options. There are thousands of tutorials and \"learn X in 30 days\" videos, but no clear order, so beginners jump between topics, lose track of what they've finished, and quit before building anything real.",
    solution:
      "Waypoint gives each role one clear path. Pick a roadmap — Frontend, Backend, Full-Stack, AI & ML, DevOps, Mobile, Cloud, or AI Agent Engineer — and work through small stages, each with plain-language lessons, code examples, curated videos and docs, and a project to build. A 10-minute quick start teaches how to study and sets a personal finish date from your weekly hours, and a Tech Stacks page shows what companies actually hire for in each role.",
    metrics: [
      { value: "8", label: "Career roadmaps" },
      { value: "72", label: "Focused lessons" },
      { value: "296", label: "Hand-picked resources" },
    ],
    stack: ["React", "TypeScript", "Vite", "React Router", "Supabase", "PostgreSQL"],
    architecture: [
      "All lessons, roadmaps, stages, and tech stacks live in typed data files, so adding a lesson is one object and one id",
      "Lessons are shared between roadmaps, so finishing Git in Frontend also marks it done in Backend",
      "Progress, weekly plan, and badges save in the browser first, so the site works fully with no account",
      "Optional login with Google or a 6-digit email code (no passwords) through Supabase Auth",
      "When you log in, your device progress is merged into your account and synced across devices",
      "Supabase Postgres with row-level security, so each user can only read and write their own data",
      "Hash routing and a relative base, so the built site runs on any static host with no rewrite rules",
    ],
    decisions: [
      "No sign-up wall — learning comes first, and an account is only a way to keep progress across devices",
      "Video links that aren't one specific video open a YouTube search for a trusted creator, so they never go dead",
      "Every stage ends with a project, because building is what turns watching into skill",
      "A black-and-white design with one green accent, plus light and dark themes, so it stays calm and readable",
    ],
    challenges: [
      "Writing beginner-friendly lessons for 8 roles without copying the same content into each one",
      "Merging guest progress with an existing account on a new device without losing or duplicating anything",
    ],
    demo: "https://waypoint-developer.vercel.app/",
    github: "https://github.com/Anzzy1/Waypoint",
  },
  {
    slug: "baonbuddy",
    cover: "/images/projects/baonbuddy-cover.jpg",
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
    cover: "/images/projects/tindahub-cover.jpg",
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
  {
    slug: "casidar-gadgets",
    color: "#3d7bff",
    title: "Casidar Gadgets",
    summary:
      "A website for Casidar Gadgets, a family-run iPhone and iPad shop in Antipolo and Cainta — pre-owned and brand-new units, with a request builder that lets customers ask if a model is in stock or pre-order it in a few taps.",
    category: ["Landing Page"],
    featured: false,
    year: "2026",
    type: "Client project · Gadget shop in Antipolo & Cainta",
    role: "Design & development",
    timeline: "Client build",
    problem:
      "Casidar Gadgets sells pre-owned and brand-new iPhones and iPads from two branches, but stock changes every week, so a normal product list would always be out of date. Customers kept messaging the page with the same questions — \"may iPhone 13 kayo?\", \"magkano?\", \"ilang battery health?\" — and every reply started with a long back-and-forth just to find out what they wanted.",
    solution:
      "Instead of listing units, the site asks the customer what they're looking for. A step-by-step request builder walks them through device, series, model, storage, condition, minimum battery health, color, budget, and branch, with a live \"ticket\" summary that updates on every choice. When they're done, it writes a ready-to-send message and opens Messenger, SMS, Viber, or email, so the shop gets a complete inquiry or pre-order in one message.",
    metrics: [
      { value: "2", label: "Branches, one site" },
      { value: "Ask", label: "Or pre-order any model" },
      { value: "No server", label: "Static & fast" },
    ],
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
    architecture: [
      "Plain HTML, CSS, and JavaScript with no build step, deployed as a static site on Vercel",
      "Contacts, branches, unit types, the model list, and \"available now\" chips all live in one config file the family can edit",
      "Request builder with Ask and Pre-order modes and a live ticket summary that updates with every choice",
      "Links can pre-fill the form (mode, device, series, model, storage, branch), handy for Facebook posts",
      "Sends through Messenger, SMS, Viber, or email — Messenger can't pre-fill text, so the message is copied for the customer to paste",
      "Branch section with map, directions, call, and an \"Ask this branch\" button",
      "Scroll-driven hero, parallax photos, and animated chips that all turn off with reduce motion",
    ],
    decisions: [
      "No product list on purpose, because weekly stock would make one wrong most of the time",
      "The questions customers always ask — battery health, iCloud status, openline, warranty — are built into the form and the FAQ",
      "Light and dark themes, with the shop's blue-to-violet brand throughout",
      "No backend or database, so the shop has nothing to maintain or pay for",
    ],
    challenges: [
      "Covering every iPhone from the 6 to the latest, plus old and new iPads with Wi-Fi or cellular, without making the form feel long",
      "Turning a chat-based way of selling into a clear form that still feels like talking to the shop",
    ],
    demo: "https://casidar-gadgets.vercel.app/",
    github: "https://github.com/Anzzy1/Casidar-Gadgets",
  },
  {
    slug: "pro-fitness-gym",
    color: "#e10600",
    title: "Pro Fitness Gym",
    summary:
      "A bold, red-and-black website for Pro Fitness Gym in Antipolo City — memberships with coach sessions, a live class schedule, the full coaching team, and inquiries sent straight to the gym's inbox.",
    category: ["Landing Page"],
    featured: false,
    year: "2026",
    type: "Business website · Gym in Antipolo City",
    role: "Design & development",
    timeline: "Personal build",
    problem:
      "Pro Fitness Gym beside SM Cherry Antipolo had the equipment, the coaches, and a busy class schedule — but all of it lived on photos of posters and schedule boards. People had to message the page to ask about rates, class times, opening hours, and promos, and many never followed up.",
    solution:
      "A one-page site that feels like walking onto the gym floor: \"Train like a PRO.\" over the gym's own building, then membership plans with coach sessions included, a GX class schedule you can filter by day and type, the head coach and the coaching team, a photo gallery, and a visit section with hours, directions, and a map. Every \"Join Now\" leads to an inquiry form that emails the gym directly.",
    metrics: [
      { value: "Auto", label: "Promo pricing" },
      { value: "Live", label: "Class schedule" },
      { value: "Direct", label: "Inquiries by email" },
    ],
    stack: ["Next.js", "React", "TypeScript", "CSS", "FormSubmit"],
    architecture: [
      "Promo dates, prices, hours, classes, coaches, gallery, and contact info all live in one typed data file",
      "The 50% promo turns on and off by itself between its start and end dates (Philippine time), switching prices and buttons",
      "Class schedule with day tabs and a dance / strength filter, opening on today's classes",
      "Opening hours highlight today, computed in Philippine time no matter where the visitor is",
      "Gallery loops two rows of photos in opposite directions, then turns into a swipeable strip when you pick a category",
      "Inquiry form checks names, plans, and PH mobile numbers, then emails the gym through FormSubmit — no server to maintain",
    ],
    decisions: [
      "The gym's own red-and-black branding and building photo up front, so the site feels like the place, not a template",
      "Coach sessions shown inside every membership plan, because coaching is what sets the gym apart",
      "\"Choose plan\" buttons prefill the inquiry form, so a visitor goes from interested to inquiry in two taps",
      "Built so the owner can run the next promo just by changing two dates",
    ],
    challenges: [
      "Transcribing the gym's posters, price lists, and schedule board into clean, accurate content",
      "Keeping a photo-heavy, animated page fast on mobile data, with reduced motion respected",
    ],
    demo: "https://pro-fitness-gym-antipolo.vercel.app/",
    github: "https://github.com/Anzzy1/pro-fitness-gym",
  },
  {
    slug: "playlist-cafe",
    cover: "/images/projects/playlist-cafe-cover.jpg",
    color: "#7a5236",
    title: "Playlist Cafe",
    summary:
      "A landing page for Playlist Cafe, the overlooking glass cafe in Antipolo — skyline views, the full menu in one tap, live acoustic nights, and directions and reservations right from the first screen.",
    category: ["Landing Page"],
    featured: false,
    year: "2026",
    type: "Landing page · Café in Antipolo, Rizal",
    role: "Design & development",
    timeline: "Personal build",
    problem:
      "Playlist Cafe's best selling point is the view: the whole Metro Manila skyline from the hills of Antipolo. But online it lived on Facebook and Instagram posts, so new guests couldn't easily find the full menu and prices, the opening hours, or how to get to Grand Heights.",
    solution:
      "A one-page site that sells the place before any copy: the terrace at sunset up front, with \"Good coffee, good music & the best view in Antipolo.\" A live open/closed badge, one-tap directions and reservations, a music-themed \"Now Playing\" spotlight for the new Ube Series, the full in-store menu transcribed into a searchable sheet, and an experience section for golden hour, acoustic nights, and proposals.",
    metrics: [
      { value: "60+", label: "Menu items online" },
      { value: "Live", label: "Open / closed badge" },
      { value: "Mobile", label: "First design" },
    ],
    stack: ["Astro", "TypeScript", "Tailwind CSS", "GSAP", "Lenis"],
    architecture: [
      "Static Astro site — ships almost no JavaScript, so it loads fast on mobile data up the hill",
      "Contact info, the full menu, highlights, and gallery live in one typed data file",
      "Photos are converted to responsive WebP at build time",
      "\"Open now\" status computed from the café's hours, shown in the nav and hero",
      "Full menu opens in a bottom sheet with categories, sizes, and prices; gallery opens in a lightbox",
      "GSAP drives scroll reveals and the spinning vinyl, with Lenis smooth scrolling on desktop only",
    ],
    decisions: [
      "On phones the photo comes before the headline, because the view is what brings people in",
      "A playlist theme throughout — \"Now Playing\", \"Top Hits\", \"Appetizer Radio\" — matching the café's own menu names",
      "Directions, reservations, and hours pinned in the first screen, since those are what guests message the page about",
    ],
    challenges: [
      "Transcribing four in-store menu boards — hot/iced sizes, sharing plates, wing flavors and dips — into one clean, readable menu",
      "Keeping heavy scroll motion smooth on mid-range phones",
    ],
    demo: "https://playlistcafe.vercel.app/",
    github: "https://github.com/Anzzy1/Playlist-Cafe",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
