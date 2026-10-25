// ------------------------------------------------------------------
// DEMO MODE responder.
//
// Answers from your content files using simple keyword matching so the
// chat UI works without an API key. When you're ready for real AI:
//   1. Create src/app/api/chat/route.ts that calls your LLM, passing
//      the content from src/content/* as context.
//   2. Replace `getReply` below with a fetch to "/api/chat".
// Nothing else in the UI needs to change.
// ------------------------------------------------------------------

import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { stack } from "@/content/experience";
import { certifications } from "@/content/certifications";
import { offer, offerOpen, spotsLeft } from "@/content/offer";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  links?: { label: string; href: string }[];
};

export type Reply = Omit<ChatMessage, "id" | "role">;

// Very small Filipino detector so the demo can answer in Taglish
const FIL_WORDS = ["ano", "magkano", "pwede", "puwede", "kaya", "ikaw", "mo", "ba", "po", "paano", "saan", "gawa", "gumawa", "kailan", "ng"];

function isFilipino(text: string) {
  const words = text.toLowerCase().split(/\W+/);
  return words.filter((w) => FIL_WORDS.includes(w)).length >= 2;
}

/** Matches keywords at the start of a word ("ai" won't match "email") */
function has(text: string, keywords: string[]) {
  const t = text.toLowerCase();
  return keywords.some((k) => new RegExp(`\\b${k}`).test(t));
}

const first = profile.name.split(" ")[0];
const link = (p: (typeof projects)[number]) => ({ label: p.title, href: `/work/${p.slug}` });

export async function getReply(messages: ChatMessage[]): Promise<Reply> {
  const last = messages[messages.length - 1]?.content ?? "";
  const fil = isFilipino(last);

  if (has(last, ["payment", "pay", "gcash", "maya", "bayad", "down payment", "bank"])) {
    return {
      content: fil
        ? `50% down payment para magsimula, at ang natitirang 50% kapag ready na i-launch. Puwede ang GCash, Maya, at bank transfer.`
        : `It's a 50% down payment to start, and the other 50% when you're happy and ready to launch. GCash, Maya, and bank transfer all work.`,
      links: [{ label: "Get a quote", href: "/contact" }],
    };
  }

  if (has(last, ["founding", "discount", "promo", "offer", "spot", "slot"])) {
    return {
      content: offerOpen
        ? fil
          ? `May ${spotsLeft} na lang na founding-client spots sa ${offer.total}, na may malaking discount sa websites, systems, AI, at apps. Puwede kang mag-claim sa claim page.`
          : `${spotsLeft} of ${offer.total} founding-client spots are left, with a big discount on websites, systems, AI, and apps. You can claim one on the claim page.`
        : fil
          ? `Sarado na ang founding-client offer, pero puwede ka pa ring humingi ng quote kay ${first}.`
          : `The founding-client offer is closed, but you can still ask ${first} for a quote.`,
      links: offerOpen ? [{ label: "Claim a spot", href: "/claim" }] : [{ label: "Contact", href: "/contact" }],
    };
  }

  if (has(last, ["certif", "award", "competition", "freecodecamp", "credential"])) {
    return {
      content: `${first}'s certifications and awards: ${certifications.map((c) => `${c.title} (${c.issuer})`).join(", ")}.`,
      links: [{ label: "Certifications", href: "/certifications" }],
    };
  }

  if (has(last, ["review", "testimonial", "feedback"])) {
    return {
      content: fil
        ? `Wala pang published na client testimonials si ${first} dahil nagsisimula pa lang siya sa freelancing at kumukuha ng founding clients. Makikita mo ang mga project niya sa Work page.`
        : `${first} doesn't have published client testimonials yet, since he's just starting out as a freelancer and is taking founding clients. You can see his projects on the Work page.`,
      links: [{ label: "View work", href: "/work" }],
    };
  }

  if (has(last, ["price", "pricing", "cost", "rate", "magkano", "budget", "how much", "presyo", "quote"])) {
    return {
      content: fil
        ? `Depende sa laki at features ng project. I-message lang si ${first} ng maikling description ng kailangan mo para makapagbigay ng malinaw na fixed quote — walang hidden fees.`
        : `It depends on the project's size and features. Send ${first} a short description of what you need and you'll get a clear, fixed quote — no hidden fees.`,
      links: [
        { label: "See services", href: "/services" },
        { label: "Get a quote", href: "/contact" },
      ],
    };
  }

  if (has(last, ["chatbot", "chat bot", "ai", "artificial", "llm", "gpt", "claude", "rag", "automat"])) {
    const ai = projects.filter((p) => p.category.includes("AI"));
    return {
      content: fil
        ? `Oo! AI integration ang isa sa main specialties ni ${first} — chatbots na naka-base sa sariling FAQs at documents ng business mo, kaya accurate ang sagot. Halimbawa: ${ai.map((p) => p.title).join(", ")}.`
        : `Yes — AI integration is one of ${first}'s core specialties: chatbots grounded in your own FAQs and documents so answers stay accurate, plus lead capture and human handoff. Examples: ${ai.map((p) => p.title).join(", ")}.`,
      links: [...ai.slice(0, 2).map(link), { label: "AI services", href: "/services" }],
    };
  }

  if (has(last, ["system", "dashboard", "inventory", "point of sale", "management", "crm", "admin"])) {
    const sys = projects.filter((p) => p.category.includes("Web System"));
    return {
      content: fil
        ? `Oo, kaya! Gumagawa si ${first} ng custom web systems — dashboards, inventory, at management tools na papalit sa spreadsheets at manual na trabaho.`
        : `${first} builds custom web systems — dashboards, inventory, and management tools that replace spreadsheets and manual work.`,
      links: sys.slice(0, 2).map(link),
    };
  }

  if (has(last, ["landing", "website", "site", "web page", "webpage"])) {
    return {
      content: fil
        ? `Kaya ni ${first} gumawa ng mabilis at professional na website o landing page para sa business mo — mobile-first, SEO-ready, at custom design.`
        : `${first} designs and builds fast, custom websites and landing pages — mobile-first, SEO-ready, and made to turn visitors into customers.`,
      links: [{ label: "See services", href: "/services" }],
    };
  }

  if (has(last, ["stack", "tech", "tools", "language", "framework", "skill"])) {
    return {
      content: `${first}'s main stack — ${stack.map((s) => `${s.group}: ${s.items.slice(0, 4).join(", ")}`).join(". ")}.`,
      links: [{ label: "About", href: "/about" }],
    };
  }

  if (has(last, ["project", "work", "portfolio", "built", "build", "gawa", "example"])) {
    return {
      content: `Here are a few things ${first} has built: ${projects
        .slice(0, 3)
        .map((p) => `${p.title} — ${p.summary.charAt(0).toLowerCase()}${p.summary.slice(1, -1)}`)
        .join("; ")}.`,
      links: projects.slice(0, 3).map(link),
    };
  }

  if (has(last, ["available", "hire", "contact", "email", "reach", "book", "call", "start"])) {
    return {
      content: fil
        ? `Available si ${first} para sa freelance projects! Pwede kang mag-email sa ${profile.email} o mag-message sa socials.`
        : `${first} is available for freelance projects. Email ${profile.email} or send a message on socials — ${profile.responseTime.toLowerCase()}.`,
      links: [{ label: "Contact", href: "/contact" }],
    };
  }

  if (has(last, ["who", "about", "yourself", "sino", "background", "experience"])) {
    return {
      content: `${profile.name} (${profile.alias}) is a ${profile.title} based in the Philippines, now freelancing full-time (previously a web developer at RC Studio in 2025), with a focus on frontend and AI integration. Outside code: math, Rubik's cubes, and chess.`,
      links: [{ label: "About", href: "/about" }],
    };
  }

  return {
    content: fil
      ? `Pwede mo akong tanungin tungkol sa projects, services, o availability ni ${first}. Ano ang kailangan mo?`
      : `I can answer questions about ${first}'s projects, services (${services.map((s) => s.title).join(", ")}), or availability. What are you looking to build?`,
    links: [{ label: "View work", href: "/work" }],
  };
}
