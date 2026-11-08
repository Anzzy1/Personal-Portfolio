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
    title: "I didn't care about code — until I saw what it could do",
    excerpt:
      "From watching my cousin code at 9 years old to writing my first line of HTML on a very old PC — this is how my journey began.",
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
    title: "I quit using AI for coding — then everything changed",
    excerpt:
      "From copy-pasting ChatGPT answers that never quite worked, to free coding agents, to Claude Code — how AI went from useless to my everyday building partner.",
    date: "2026-11-09",
    tags: ["Story", "AI"],
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
    title: "What a chessboard and a Rubik's cube taught me about code",
    excerpt:
      "Long before I wrote my first line of code, I was already solving puzzles. Here's how math, chess, and the Rubik's cube shaped the way I build.",
    date: "2026-11-09",
    tags: ["Story", "Logic"],
    body: [
      {
        paragraphs: [
          "People think coding starts when you open a code editor. For me, it started way earlier — with a toy, a chessboard, and a cube.",
        ],
      },
      {
        heading: "Age 4: a toy full of questions",
        paragraphs: [
          "When I was 4, my cousins had a toy that asked you questions, and you had to answer them. Most of them were math. While other kids just pressed buttons, I wanted to get every answer right.",
          "That little toy is where I first found out I was good at logic. Without knowing it, I was already training my critical thinking — reading a problem, figuring out what it's asking, and finding the answer.",
        ],
      },
      {
        heading: "Age 5: falling in love with math",
        paragraphs: [
          "I quickly realized I didn't just solve math — I loved it. By the time I was 5, I already knew how to add, subtract, multiply, and divide.",
          "To me, math wasn't homework. It was a puzzle with exactly one right answer, and finding it felt amazing.",
        ],
      },
      {
        heading: "Also age 5: my father's chessboard",
        paragraphs: [
          "That same year, I noticed my father playing chess. I didn't know how it worked, but I could see how much the players enjoyed it — so I got curious and asked him to teach me.",
          "I picked it up fast. Really fast. And the more I played, the more I loved it, because chess trained something math alone didn't:",
        ],
        list: [
          "Planning — thinking several moves ahead before making one",
          "Decision making — choosing the best option, not just the first one",
          "Seeing consequences — every move changes the whole board",
        ],
      },
      {
        heading: "Age 9: cracking the Rubik's cube",
        paragraphs: [
          "At 9, I learned how to solve a Rubik's cube. Here's the secret: you don't start by inventing anything. You learn the patterns other people already figured out, and you follow them step by step.",
          "But once you master those patterns, something changes. You start seeing shortcuts. You find your own way — one that's faster and better than the method you first copied.",
        ],
      },
      {
        heading: "The cube is exactly how coding works",
        paragraphs: [
          "Years later, I realized learning to code is the same as learning the cube.",
          "Honestly, we all start by copying. We see a project we think is amazing, and we rebuild it line by line to understand how it works. That's not cheating — that's learning the patterns.",
          "Then one day, you stop copying. You start figuring things out yourself. You find a cleaner way, a faster way, a smarter way — until what you build is better than the thing you once copied.",
        ],
      },
      {
        heading: "Logic is still my secret weapon",
        paragraphs: [
          "Every time I build something today, I'm using the same skills that toy, that chessboard, and that cube gave me. Reading a problem like a math question. Planning a system like a chess game, several moves ahead. And learning from others before making it my own, like the cube.",
          "Code is just where all of it comes together. That's why I love it.",
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
