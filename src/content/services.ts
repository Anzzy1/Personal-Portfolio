// ------------------------------------------------------------------
// Services you offer. The Services page, home page, contact form, and
// AI assistant all read from here.
//
// No prices or timelines are shown: every project is quoted and scheduled based on its scope.
// ------------------------------------------------------------------

export type Service = {
  id: string;
  title: string;
  short: string;
  description: string;
  examples: string[]; // "Perfect for" chips
  deliverables: string[];
  badge?: string;
  proof?: { label: string; href: string }; // a project that shows this service
};

export const services: Service[] = [
  {
    id: "landing-pages",
    title: "Websites & Landing Pages",
    short: "Beautiful, fast sites that bring in customers.",
    description:
      "A modern website that makes your business look credible, loads fast on any phone, and turns visitors into orders, bookings, and messages.",
    examples: ["Coffee shops", "Restaurants", "Salons & spas", "Small businesses", "Personal brands", "Events"],
    deliverables: [
      "Custom design — no generic templates",
      "Mobile-first and lightning fast",
      "Menu, gallery, location, and opening hours",
      "Messenger, call, and contact buttons",
      "SEO basics so customers find you on Google",
      "2 rounds of revisions",
    ],
    badge: "Most popular",
  },
  {
    id: "web-systems",
    title: "Web Systems",
    short: "Custom tools that replace spreadsheets and paperwork.",
    description:
      "Dashboards and management systems built around how your business actually works — so your team spends less time on manual work.",
    examples: ["Inventory & POS", "Booking & reservations", "Clinic & school records", "Admin dashboards", "Order tracking"],
    deliverables: [
      "User accounts with owner and staff roles",
      "Database design and admin dashboard",
      "Reports, exports, and notifications",
      "Works on phones, tablets, and laptops",
      "Deployment, training, and handoff",
    ],
  },
  {
    id: "ai-integration",
    title: "AI Integrations & Chatbots",
    short: "AI that knows your business and works 24/7.",
    description:
      "Chatbots and AI features trained on your own content — answering customers instantly, capturing leads, and automating repetitive tasks.",
    examples: ["Website chatbot", "Messenger chatbot", "FAQ & support bot", "AI auto-replies", "Document Q&A", "Smart search"],
    deliverables: [
      "Answers grounded in your own FAQs, prices, and docs",
      "English, Filipino, and Taglish",
      "Lead capture and handoff to a real person",
      "AI features added to your existing site or system",
      "Monthly report of what customers are asking",
    ],
    badge: "My specialty",
    proof: { label: "See Anzyy AI", href: "/work/portfolio-ai-assistant" },
  },
  {
    id: "apps",
    title: "Apps",
    short: "Your idea, turned into an app people use every day.",
    description:
      "From first idea to a working app — designed to be simple, fast, and fun to use, with AI built in where it helps.",
    examples: ["Budget & tracking apps", "Booking apps", "Loyalty & rewards", "Student tools", "Startup MVPs"],
    deliverables: [
      "UX design and clickable prototype",
      "Mobile-first app that installs on phones",
      "Offline support and saved data",
      "AI features like voice input or smart advice",
      "Launch support and future updates",
    ],
    proof: { label: "See BaonBuddy", href: "/work/baonbuddy" },
  },
];

/** Extras that can be added to any project */
export const addOns = [
  {
    title: "Care Plan",
    text: "Hosting, small edits, backups, and priority support — so your site never breaks.",
  },
  {
    title: "Domain & Hosting Setup",
    text: "Your own .com or .ph domain, business email, and fast hosting, all set up for you.",
  },
  {
    title: "AI Add-on",
    text: "Add a chatbot or AI feature to a website or system you already have.",
  },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    text: "A free 15-minute call or chat to understand your goals, audience, and budget.",
  },
  {
    step: "02",
    title: "Design",
    text: "A clear plan, fixed quote, timeline, and visual direction you approve before any code is written.",
  },
  {
    step: "03",
    title: "Build",
    text: "Development with regular progress updates and a live preview link you can open anytime.",
  },
  {
    step: "04",
    title: "Launch & Support",
    text: "Deployment, handoff, and 2 weeks of free support after launch so nothing breaks.",
  },
];

export const faqs = [
  {
    q: "How much does a project cost?",
    a: "It depends on the project — its size, features, and timeline. After a quick chat about what you need, you'll get a fixed quote with no hidden fees, and the price won't change unless the scope does.",
  },
  {
    q: "How does payment work?",
    a: "50% down payment to start, and the remaining 50% when you're happy and ready to launch. GCash, Maya, and bank transfer are all fine.",
  },
  {
    q: "How long does it take?",
    a: "It depends on the project — a simple website is much quicker than a full system or app. Once we agree on the scope, you'll get a clear timeline with milestones, and I'll keep you updated along the way.",
  },
  {
    q: "How many revisions do I get?",
    a: "Two rounds of revisions are included in every project. Small tweaks after launch are covered by the free 2-week support period.",
  },
  {
    q: "Do you work with clients outside the Philippines?",
    a: "Yes. I work remotely, communicate in English or Filipino, and can quote in USD for international clients.",
  },
  {
    q: "What do I need to prepare?",
    a: "Just your goals and any content you already have (logo, photos, menu, prices). I'll guide you through the rest.",
  },
];
