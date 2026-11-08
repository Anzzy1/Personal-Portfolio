// ------------------------------------------------------------------
// Blog posts
//
// Newest first. Each post is a list of sections: an optional heading,
// paragraphs, and an optional bullet list. The blog page, home page,
// sitemap, and AI assistant all read from this list.
// ------------------------------------------------------------------

// A post's cover: an image under /public (1200×676 works best)
export type BlogImage = {
  src: string;
  alt: string;
};

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
  // Big image at the top of the post and on the blog list
  cover?: BlogImage;
  // Project this post is about, linked at the end
  project?: string;
};

export const posts: BlogPost[] = [
  {
    slug: "how-i-started-coding",
    title: "I didn't care about code — until I saw what it could do",
    excerpt:
      "From watching my cousin code at 9 years old to writing my first line of HTML on a very old PC — this is how my journey began.",
    date: "2026-11-09",
    tags: ["Story", "Journey"],
    cover: { src: "/images/blog/old-pc.png", alt: "Stippled drawing of an old desktop computer with code on the screen" },
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
    title: "The day AI actually started building with me",
    excerpt:
      "From copy-pasting ChatGPT answers that never quite worked, to free coding agents, to Claude Code — how AI went from useless to my everyday building partner.",
    date: "2026-11-09",
    tags: ["Story", "AI"],
    cover: { src: "/images/blog/ai-terminal.png", alt: "Stippled drawing of a chat bubble next to a coding terminal with a sparkle" },
    body: [
      {
        paragraphs: [
          "Today, AI is part of almost everything I build. But it didn't start that way. At first, I actually stopped using it — because it just couldn't do what I needed.",
        ],
      },
      {
        heading: "When AI was just a chatbot",
        paragraphs: [
          "Back in 2023 to 2024, AI to me was just a chatbot. I'd open ChatGPT, describe what I wanted, and ask it to give me the code. Then I'd copy it, paste it into my project, and hope it worked.",
          "Most of the time, it didn't. AI wasn't that good at coding back then. The code looked right but broke when I ran it, missed parts of what I asked for, or didn't fit the rest of my project. I spent more time fixing its answers than I would have spent writing the code myself.",
          "So I made a decision: no more AI when building projects. If I couldn't get what I wanted from it, I'd just do it myself.",
        ],
      },
      {
        heading: "Then coding agents appeared",
        paragraphs: [
          "Things changed when coding agents came out. These weren't chatbots anymore — they could read your project, edit your files, and run commands on their own. It sounded exactly like what I needed.",
          "The problem? Almost all of them needed a paid AI subscription. As a student, I couldn't afford one. So I could only watch other people use them.",
        ],
      },
      {
        heading: "Discovering OpenCode",
        paragraphs: [
          "Then I found OpenCode — a coding agent that could run on free models. For the first time, I had an AI that could actually work inside my project: reading my code, changing my files, and helping me build.",
          "Honestly, it wasn't that good. The free models made mistakes, got confused on bigger tasks, and I still had to fix a lot. But that was okay. At least I had an AI helping me make my projects better, and I learned a lot about how to work with one.",
        ],
      },
      {
        heading: "Finally: Claude Code",
        paragraphs: [
          "When I could finally afford it, I bought a Claude Code subscription. And wow — it was on a completely different level.",
          "It understood my whole project, planned changes across many files, fixed its own errors, and actually built what I described. Things that used to take me days now took an afternoon. I remember just watching it work and thinking: how is it doing all of this?",
        ],
      },
      {
        heading: "What vibe coding taught me",
        paragraphs: [
          "Vibe coding — describing what you want and letting AI build it — sounds easy, but it works best when you know what you're doing. All those years struggling with JavaScript logic paid off: I can read what the AI writes, spot when it's wrong, and steer it back on track.",
        ],
        list: [
          "Clear instructions get clear results — vague prompts get messy code",
          "I let AI handle the repetitive work, so I can focus on the hard decisions",
          "I always review and test what it builds before it goes live",
          "I never let AI decide anything that has to be exact, like money or totals",
        ],
      },
      {
        heading: "From using AI to building with it",
        paragraphs: [
          "Once AI became part of how I code, I started putting it inside the things I build too — chatbots that answer from real business data, apps that understand Taglish, and the assistant on this very site (press Ctrl K to try it).",
          "From copy-pasting broken ChatGPT answers to building full systems with a coding agent — it's been a wild ride. AI doesn't replace the builder. It lets one person build like a whole team.",
        ],
      },
    ],
  },
  {
    slug: "math-chess-rubiks-cube",
    title: "The games I loved as a kid shaped how I code",
    excerpt:
      "Logic from math, planning from chess, and patterns from the Rubik's cube — how the games I grew up with turned into the skills I use to code.",
    date: "2026-11-09",
    tags: ["Story", "Logic"],
    cover: { src: "/images/blog/cube-pawn.png", alt: "Stippled drawing of a Rubik's cube and a chess pawn" },
    body: [
      {
        paragraphs: [
          "Most people think coding starts the day you open a code editor. Mine started years earlier — with a quiz toy, my father's chessboard, and a scrambled cube that refused to cooperate.",
          "I didn't know it back then, but I was already training for the job I do today.",
        ],
      },
      {
        heading: "The toy that kept asking questions",
        paragraphs: [
          "I was 4 years old when I found it: a toy that belonged to my cousins. It asked you questions, and you had to answer them. Most of the questions were math.",
          "For most kids, it was just a toy with buttons. For me, it was a challenge. Every question was a little mystery, and I wasn't happy until I got it right. Then I wanted the next one. And the next one.",
          "That's when I first found out something about myself: I was good at logic. Without even knowing the word, I was already practicing critical thinking — read the problem, figure out what it's really asking, find the answer.",
        ],
      },
      {
        heading: "The 5-year-old who thought math was fun",
        paragraphs: [
          "That toy started something. I didn't just solve math — I fell in love with it.",
          "By the time I was 5, I already knew how to add, subtract, multiply, and divide. While math sounds like homework to most people, to me it was a puzzle with exactly one right answer hiding somewhere. Finding it felt like winning.",
        ],
      },
      {
        heading: "\"Pa, can you teach me that?\"",
        paragraphs: [
          "That same year, I kept noticing my father playing chess. I had no idea what was happening on that board — just a bunch of pieces moving around. But I could see one thing clearly: the people playing were really enjoying it.",
          "So, of course, I got curious. I asked my father to teach me.",
          "And I picked it up fast. The more I played, the more I loved it, because chess wasn't about one right answer like math. It was about thinking ahead. Every move I made, I had to ask myself:",
        ],
        list: [
          "If I move this piece, what happens next?",
          "How will my opponent answer?",
          "And how do I actually win from here?",
        ],
      },
      {
        heading: "Six colors and a lot of frustration",
        paragraphs: [
          "Then at 9, a new opponent showed up: the Rubik's cube.",
          "Here's the thing nobody tells you — you don't solve a Rubik's cube by being a genius. You learn the patterns other people already figured out, and you follow them, step by step, twist by twist.",
          "But something interesting happens once you master those patterns. You start seeing shortcuts. You stop following the guide and start finding your own way — one that's faster and smarter than the method you first learned.",
        ],
      },
      {
        heading: "Plot twist: I was training for coding all along",
        paragraphs: [
          "Years later, I sat down in front of a very old PC and started learning to code. And something surprised me: I wasn't starting from zero.",
          "Every game I loved as a kid had quietly given me a skill. Now I just had a new board to play on.",
        ],
      },
      {
        heading: "Math taught me not to panic",
        paragraphs: [
          "A hard math problem and a hard bug feel exactly the same: confusing at first, impossible-looking, a little scary.",
          "But math taught me what to do. Break it down. Understand what it's really asking. Solve one piece at a time, then put them back together. When a feature is complicated or my code breaks for no reason, I'm still that 4-year-old with the quiz toy — not stopping until I find the answer.",
        ],
      },
      {
        heading: "Chess taught me to think three moves ahead",
        paragraphs: [
          "In chess, a careless move can lose you the game ten moves later. Building software works the same way.",
          "So before I write code, I play it out in my head like a chess game: if I build it this way, what happens next? What breaks when more people use it? What will be painful to change later? How do I \"win\" — a system that's fast, reliable, and easy to grow? A good move early saves a lot of pain later, on the board and in a project.",
        ],
      },
      {
        heading: "The cube taught me it's okay to copy — at first",
        paragraphs: [
          "This one is my favorite, because it's exactly how learning to code works.",
          "Honestly, we all start by copying. We see a project we think is amazing, and we rebuild it piece by piece just to understand how it works. That's not cheating — that's learning the patterns, just like the cube.",
          "Then one day, you stop needing the guide. You start figuring things out yourself, finding a cleaner way, a faster way, a smarter way — until what you build is better than the thing you once copied.",
        ],
      },
      {
        heading: "I never stopped playing",
        paragraphs: [
          "Every time I build something today, I'm still using what those games gave me: the logic from math, the planning from chess, and the learn-then-improve mindset from the cube.",
          "I never really stopped playing. The game just changed — and now it's called code.",
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
