// ------------------------------------------------------------------
// Blog posts
//
// Newest first. Each post is a list of sections: an optional heading,
// paragraphs, and an optional bullet list. The blog page, home page,
// sitemap, and AI assistant all read from this list.
// ------------------------------------------------------------------

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  body: BlogSection[];
  // Project this post is about, linked at the end
  project?: string;
};

export const posts: BlogPost[] = [
  {
    slug: "rules-first-ai-second",
    title: "Rules first, AI second: how BaonBuddy keeps the numbers honest",
    excerpt:
      "Why my student budget app never lets the AI touch the math — and what the model is actually allowed to do.",
    date: "2026-11-08",
    tags: ["AI", "App"],
    project: "baonbuddy",
    body: [
      {
        paragraphs: [
          "When you build a money app, one wrong number is enough to lose someone's trust. That's why BaonBuddy follows one simple rule: the AI never decides an amount.",
        ],
      },
      {
        heading: "The problem with letting a model do math",
        paragraphs: [
          "Language models are great at understanding casual Taglish like \"pamasahe 20 tas milk tea 120\", but they can still miscount, round wrong, or invent a total that looks believable. For a student on a tight baon, a made-up number is worse than no number at all.",
        ],
      },
      {
        heading: "What runs on rules",
        paragraphs: ["Everything that touches money is plain, predictable code:"],
        list: [
          "Parsing messages like \"jeep 13, lunch 85\" into categorized expenses",
          "Computing how much you can still spend per day",
          "Checking receipt totals — every amount must actually appear in the OCR text",
        ],
      },
      {
        heading: "What the AI is allowed to do",
        paragraphs: [
          "The local LLM only rewrites Buddy's advice so it sounds friendly and natural. The numbers in that advice come from the budget math, not from the model. Voice input goes through Whisper right in the browser, and receipts are read with on-device OCR, so everything stays private and works even without signal.",
          "The result: the app feels smart, but it's always correct. That's the balance I aim for whenever I add AI to a project.",
        ],
      },
    ],
  },
  {
    slug: "an-ai-assistant-that-cant-make-things-up",
    title: "Building a portfolio assistant that can't make things up",
    excerpt:
      "How Anzyy AI answers visitors in English or Filipino using only what's actually on this site.",
    date: "2026-11-08",
    tags: ["AI", "Web System"],
    project: "portfolio-ai-assistant",
    body: [
      {
        paragraphs: [
          "Most visitors don't read a whole portfolio. They have one or two questions — \"can you build this?\", \"how do we start?\" — and leave if the answer isn't easy to find. So I built an assistant that lives on every page and answers in seconds.",
        ],
      },
      {
        heading: "One source of truth",
        paragraphs: [
          "All my projects, services, and profile details live in typed content files. The website reads them, and so does the assistant. Update a project once and the AI knows about it instantly — the site and the chat can never disagree.",
        ],
      },
      {
        heading: "Keeping it honest",
        list: [
          "A strict system prompt and content-only context, so it can't invent prices, timelines, or projects",
          "Simple rules detect Filipino and Taglish questions so it replies in the same language",
          "If the model is ever unavailable, a local keyword responder takes over, so the chat never goes down",
        ],
        paragraphs: ["A few guardrails do most of the work:"],
      },
      {
        heading: "Small details that matter",
        paragraphs: [
          "Suggested questions show up when you open the chat, because most people don't know what to ask. Each reply ends with buttons that take you straight to the right project, service, or contact page. Try it — press Ctrl K anywhere on this site.",
        ],
      },
    ],
  },
  {
    slug: "offline-first-for-the-sari-sari-store",
    title: "Why a sari-sari store system has to work offline",
    excerpt:
      "Lessons from designing TindaHub: tingi units, utang per suki, and a counter that never stops selling.",
    date: "2026-11-08",
    tags: ["Web System"],
    project: "tindahub",
    body: [
      {
        paragraphs: [
          "A big sari-sari store moves hundreds of small sales a day, with several staff behind the counter. When I designed TindaHub, the first question wasn't about features — it was: what happens when the internet drops?",
        ],
      },
      {
        heading: "The counter can't stop",
        paragraphs: [
          "Store internet is unreliable, and a line of customers won't wait for a page to load. So every sale is saved on the device first and synced when the connection comes back. The hard part is keeping stock correct when two cashiers sell the same item at the same time, even while one of them is offline.",
        ],
      },
      {
        heading: "Designing for how the store actually works",
        paragraphs: ["A few decisions came straight from watching how a sari-sari store runs:"],
        list: [
          "Tingi units — one product sold per pack, per stick, or per kilo, while keeping one accurate stock count",
          "Utang tied to a suki profile instead of notebook notes, so balances never get lost or mixed up",
          "Taglish labels like Benta, Utang, and Gastos, with big tap targets for busy cashiers",
          "A restock list generated from reorder points, ready to send to the supplier",
        ],
      },
      {
        heading: "The payoff",
        paragraphs: [
          "Instead of spending hours adding everything up at night, the owner opens the dashboard and sees today's sales, real gross profit, overdue utang, and what needs restocking — on any phone, tablet, or laptop.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

/** Rough reading time from the post's words */
export function readingTime(post: BlogPost) {
  const words = post.body
    .flatMap((s) => [s.heading ?? "", ...s.paragraphs, ...(s.list ?? [])])
    .join(" ")
    .split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
