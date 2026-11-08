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
    slug: "how-i-started-coding",
    title: "How a ₱200,000 client got a 9-year-old into coding",
    excerpt:
      "I didn't care about code at first — until I saw what one system was worth. This is how my journey started, on a very old PC.",
    date: "2026-11-09",
    tags: ["Story", "Journey"],
    body: [
      {
        paragraphs: [
          "I was 9 years old the first time I saw someone write code. It was my cousin, sitting in front of a screen full of colored text that made no sense to me. Honestly? I wasn't interested. It looked boring, and I didn't understand any of it.",
        ],
      },
      {
        heading: "The moment it clicked",
        paragraphs: [
          "That changed the day my cousin got a client. One client, one system — and it was worth ₱200,000, right away. I remember thinking: wait, what do you mean one client is worth 200k, just for a system?",
          "That was when I realized this thing I didn't understand was actually powerful. Those lines of text could turn into something people would pay a lot of money for. I wanted to understand it.",
        ],
      },
      {
        heading: "A very old PC and my first line of code",
        paragraphs: [
          "My setup was nothing special — a very old PC that was slow to boot and even slower to open a browser. But it could run a text editor, and that was enough. I wrote my first code on that machine, and seeing something I typed actually show up on the screen felt like magic.",
        ],
      },
      {
        heading: "HTML, CSS, and my first portfolio",
        paragraphs: [
          "I started where most people start: HTML and CSS. HTML gave me the structure, CSS made it look good. Once I got comfortable, I built my own portfolio — my first real project, something I could open and say, \"I made this.\"",
        ],
      },
      {
        heading: "Then came JavaScript",
        paragraphs: [
          "JavaScript is where I felt how hard programming really is. HTML and CSS describe how things look, but JavaScript is pure logic — conditions, loops, functions, state. Things broke all the time, and I didn't always know why.",
          "But that's also what hooked me. I love logic puzzles, and code turned out to be the biggest puzzle of all. So I kept exploring, kept breaking things, and kept building:",
        ],
        list: [
          "Small interactive pages with buttons that actually did something",
          "Little tools and games to practice logic",
          "Bigger projects, one feature at a time",
        ],
      },
      {
        heading: "Where it led",
        paragraphs: [
          "That curious kid watching his cousin now builds websites, web systems, and apps for real clients. The old PC is long gone, but the feeling is the same: I build because I love making things that didn't exist before.",
        ],
      },
    ],
  },
  {
    slug: "how-i-started-vibe-coding-with-ai",
    title: "How I started vibe coding with AI",
    excerpt:
      "From typing every line by hand to building with AI as a partner — and why knowing the fundamentals still matters.",
    date: "2026-11-09",
    tags: ["Story", "AI"],
    body: [
      {
        paragraphs: [
          "For years, I wrote every line of code by hand. Then AI coding tools showed up, and the way I build changed completely. People call it vibe coding — describing what you want and letting AI help write it. Here's how I got into it.",
        ],
      },
      {
        heading: "Skeptical at first",
        paragraphs: [
          "When I first tried AI for coding, I didn't trust it. It gave me code that looked right but didn't work, or used things that didn't exist. I thought it was just a toy.",
          "But I kept testing it on small tasks — fixing a bug, explaining an error, writing a function I didn't feel like typing. Slowly, I noticed I was finishing things a lot faster.",
        ],
      },
      {
        heading: "Learning to talk to AI",
        paragraphs: [
          "The big shift was realizing that AI is only as good as the instructions you give it. Vague prompts gave me messy code. Clear prompts — with context, the goal, and the rules to follow — gave me code I could actually ship.",
          "It felt like learning a new programming language, except the language was plain English.",
        ],
      },
      {
        heading: "Why fundamentals still matter",
        paragraphs: [
          "Vibe coding works best when you understand what the AI is writing. All those hours struggling with JavaScript logic paid off here: I can read what it gives me, spot when it's wrong, and steer it back on track.",
        ],
        list: [
          "I let AI handle the repetitive parts, so I can focus on the hard decisions",
          "I always review and test what it writes before it goes live",
          "I never let AI decide anything that has to be exact — like money or totals",
        ],
      },
      {
        heading: "From using AI to building with it",
        paragraphs: [
          "Once I got comfortable, I didn't just use AI to code — I started putting AI inside the things I build. Chatbots that answer from real business data, apps that understand Taglish, and the assistant on this very site (press Ctrl K to try it).",
          "Today, AI is part of how I work every day. It doesn't replace the builder — it lets one person build like a small team.",
        ],
      },
    ],
  },
  {
    slug: "from-learning-to-building-for-clients",
    title: "From learning to building for real clients",
    excerpt:
      "The jump from practice projects to freelance work — and what I learned building things people actually depend on.",
    date: "2026-11-09",
    tags: ["Story", "Freelance"],
    body: [
      {
        paragraphs: [
          "For a long time, everything I built was just for me — practice projects nobody else would ever use. Then one day I realized I had come full circle: I wanted to do what my cousin did, and build systems for real clients.",
        ],
      },
      {
        heading: "Practice projects vs. real projects",
        paragraphs: [
          "A practice project can break and nobody cares. A client's project can't. When someone's business depends on what you build, small details suddenly matter: does it load fast, does it work on a cheap phone, what happens when the internet drops?",
        ],
      },
      {
        heading: "What I learned along the way",
        paragraphs: ["Building for others taught me lessons no tutorial did:"],
        list: [
          "Listen first — the real problem is often different from the first request",
          "Simple and reliable beats clever and fragile",
          "Design for the people who will actually use it, not for a perfect demo",
          "Keep the client updated, so there are no surprises",
        ],
      },
      {
        heading: "Still that same curious kid",
        paragraphs: [
          "Every project still gives me the same feeling I had on that old PC — the excitement of turning an idea into something real. The only difference now is that it helps someone else too. And that's the best part.",
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
