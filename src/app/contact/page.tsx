import type { Metadata } from "next";
import { ArrowUpRightIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/content/profile";
import { PageHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { SocialCard } from "@/components/contact/social-card";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactAiCard } from "@/components/contact/ai-card";
import { LocalTime } from "@/components/layout/local-time";

export const metadata: Metadata = {
  title: "Contact",
  description: `Send a message to ${profile.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something"
        accent="together."
        description="Send me a message about your project, an idea, or just a question. English or Filipino — whichever you prefer."
      />

      <div className="mt-10 flex flex-col gap-12">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.06}>
          <section className="flex flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-[22px] font-semibold tracking-[-0.02em]">Find me online</h2>
              <p className="text-sm text-muted">
                It&apos;s <LocalTime /> in Manila
              </p>
            </div>

            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-accent/25 bg-[linear-gradient(110deg,var(--accent-soft),transparent_70%)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_14px_32px_-16px_var(--accent)] sm:p-5"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-white shadow-[0_8px_18px_-8px_var(--accent)]">
                <EnvelopeSimpleIcon weight="fill" className="size-6" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[17px] font-semibold tracking-tight">Email</span>
                <span className="truncate text-sm text-muted">{profile.email}</span>
              </span>
              <ArrowUpRightIcon className="size-5 shrink-0 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>

            <ul className="grid gap-3 sm:grid-cols-2">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <SocialCard social={s} />
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactAiCard />
        </Reveal>
      </div>
    </>
  );
}
