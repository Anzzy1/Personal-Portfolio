// ------------------------------------------------------------------
// Testimonials from clients, teammates, or mentors.
//
// Add real ones with `sample` left off. Entries marked `sample: true` are
// design placeholders: they only show while running `npm run dev` and are
// never shown on the live site, so no made-up reviews go public.
// Delete the samples once you have a few real testimonials.
// ------------------------------------------------------------------

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  project?: string; // what you built for them, e.g. "Website"
  sample?: boolean;
};

const all: Testimonial[] = [
  {
    quote:
      "Our café finally has a website that looks as good as our coffee. Customers find our menu and hours on Google now, and the Messenger button brings in orders every day.",
    name: "Café owner",
    role: "Coffee shop",
    project: "Website",
    sample: true,
  },
  {
    quote:
      "The chatbot answers the same questions we used to reply to all night — prices, schedules, location. It even replies in Taglish. We save hours every week.",
    name: "Small business owner",
    role: "Online shop",
    project: "AI Chatbot",
    sample: true,
  },
  {
    quote:
      "We replaced three spreadsheets with one simple system. Stock is always accurate now, and I can check sales from my phone anytime.",
    name: "Store manager",
    role: "Retail store",
    project: "Web System",
    sample: true,
  },
  {
    quote:
      "Fast, clear, and easy to work with. Every update came with a live preview link, so I always knew exactly where the project was.",
    name: "Startup founder",
    role: "Early-stage startup",
    project: "App",
    sample: true,
  },
];

const showSamples = process.env.NODE_ENV !== "production";

/** Real testimonials, plus samples while developing locally */
export const testimonials = all.filter((t) => !t.sample || showSamples);
export const realTestimonialCount = all.filter((t) => !t.sample).length;
