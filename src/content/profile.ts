// ------------------------------------------------------------------
// Your personal info. Everything on the site reads from here.
// ------------------------------------------------------------------

export const copyrightYear = 2026;

// The year you started building — drives the "years building" stats
const buildingSince = 2024;

export const profile = {
  name: "Anzar Pangcoga",
  alias: "Anzyy Dev",
  initials: "AP",
  title: "Full-Stack & AI Developer",
  tagline:
    "I build websites, web systems, AI integrations, and apps that help businesses work smarter.",
  bio: [
    "I'm a freelance full-stack & AI developer — from fast, polished landing pages to full web systems, AI chatbots that actually understand your business, and apps people use every day.",
    "I build because I love inventing things. I'm also hooked on logic — math, Rubik's cubes, chess — and code is where all of that comes together.",
  ],
  // TODO: confirm your location / work setup
  location: "Philippines · Remote worldwide",
  available: true,
  availabilityText: "Available for freelance projects",
  responseTime: "Replies within 24 hours",

  // Path under /public. Set to null to show the styled placeholder frame instead.
  photo: "/images/profile-anzyy.jpg" as string | null,

  // Put your resume at /public/resume.pdf
  resume: "/resume.pdf",

  email: "mohamadanzarpangcoga@gmail.com",

  buildingSince,

  // `handle` is shown instead of the URL; a social with no `href` copies
  // its handle on click (Discord has no public profile URL for usernames)
  socials: [
    { label: "GitHub", href: "https://github.com/Anzzy1", handle: "Anzzy1" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mohamad-anzar-pangcoga-492585381",
      handle: "Mohamad Anzar Pangcoga",
    },
    { label: "Facebook", href: "https://www.facebook.com/Anzyydev1", handle: "Anzyydev1" },
    { label: "Instagram", href: "https://www.instagram.com/wtf.anzyy", handle: "@wtf.anzyy" },
    { label: "TikTok", href: "https://www.tiktok.com/@wtf.anzyy", handle: "@wtf.anzyy" },
    { label: "Discord", href: "", handle: "anzyy.dev" },
  ] as { label: string; href: string; handle: string }[],


  // TODO: update as you grow
  stats: [
    { value: `${copyrightYear - buildingSince}+ yrs`, label: "Building", href: "/about" },
    { value: "4", label: "Projects built", href: "/work" },
    { value: "4", label: "Core services", href: "/services" },
    { value: "<24h", label: "Reply time", href: "/contact" },
  ],

  // Things you love outside code — shown on the About page
  interests: [
    {
      title: "Rubik's cubes",
      text: "Pattern recognition and algorithms, one twist at a time.",
    },
    {
      title: "Chess",
      text: "Thinking several moves ahead — the same way I plan systems.",
    },
    {
      title: "Math & logic",
      text: "Breaking big problems into small, solvable pieces.",
    },
  ],
};


// Public URL used for SEO, the sitemap, and social previews.
// Set NEXT_PUBLIC_SITE_URL (e.g. "https://anzyy.dev") once you own a domain.
// Until then, Vercel builds fall back to the project's production URL.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
