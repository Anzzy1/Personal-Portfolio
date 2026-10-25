# Anzyy Dev — Portfolio

Personal portfolio of Anzar Pangcoga, AI-native Web Developer.
Built with Next.js 16, TypeScript, Tailwind CSS v4, Motion, and next-themes.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Edit your content (no component changes needed)

| What | File |
|---|---|
| Name, bio, socials, stats, photo, resume | `src/content/profile.ts` |
| Projects / case studies | `src/content/projects.ts` |
| Services, process, FAQ, pricing | `src/content/services.ts` |
| Experience, stack, certifications, testimonials | `src/content/experience.ts` |
| AI chat suggested questions | `src/components/ai/suggestions.ts` |

Search the project for `TODO` to find every placeholder.

### Images
- **Profile photo:** put it at `public/images/profile.jpg`, then set `photo: "/images/profile.jpg"` in `profile.ts`.
- **Project screenshots:** put them in `public/images/projects/`, then set `cover` on the project. Without a cover, a generated preview is shown.
- **Resume:** put it at `public/resume.pdf`.

### Pricing
Each service has `startingAt: null`. Set it (e.g. `"₱15,000"`) to show "From ₱15,000" instead of "Custom quote".

## AI assistant

The widget (`src/components/ai/`) calls `src/app/api/chat/route.ts`, which talks to
[Groq](https://console.groq.com) using `openai/gpt-oss-120b`. The system prompt in
`src/lib/ai/context.ts` is generated from `src/content/*`, so the assistant answers only from
your real content and never invents prices or timelines.

```bash
# .env.local (already created) or Project → Settings → Environment Variables in Vercel
GROQ_API_KEY=gsk_...
# optional: GROQ_MODEL=openai/gpt-oss-120b
```

With no key — or if Groq errors or the visitor is offline — the chat falls back to the keyword
responder in `src/lib/ai/demo-responder.ts`, so it never breaks. The widget header shows
"AI mode · Groq" once a key is detected.

Per-IP rate limiting (20 messages / 10 min) keeps a public endpoint from burning your quota.

## Structure

```
src/
├── app/            Pages: /, /work, /work/[slug], /services, /about, /contact
├── components/
│   ├── layout/     Sidebar, mobile nav, theme toggle, footer
│   ├── home/       Home page sections
│   ├── project/    Project cards, previews, filter
│   ├── ai/         Chat assistant (provider, widget, launcher)
│   ├── contact/    Contact form
│   └── ui/         Shared primitives
├── content/        All your editable content
└── lib/            Helpers and the AI demo responder
```

## Contact form email

`src/app/api/contact/route.ts` delivers inquiries in one of two ways, picked automatically:

1. **FormSubmit (default, no account or API key).** Posts to `formsubmit.co` addressed to
   `CONTACT_TO_EMAIL`, falling back to `profile.email`. The first submission sends a one-time
   **"Activate Form"** email to that inbox — click the link once, then every submission is delivered.
2. **Resend (used automatically when `RESEND_API_KEY` is set).** Sends the designed HTML email
   from `src/lib/email/template.ts`. Add `RESEND_API_KEY`, and optionally `CONTACT_FROM_EMAIL`
   (must be a verified domain in Resend; otherwise it sends from `onboarding@resend.dev`,
   which only delivers to your own Resend account address).

Copy `.env.example` to `.env.local` for local dev, and set the same variables in Vercel.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com). It deploys with zero config.

Add `NEXT_PUBLIC_SITE_URL=https://your-domain.dev` in Vercel (build-time, then redeploy), then
attach the domain under Project → Settings → Domains.

