import type { Metadata } from "next";
import { ChatTeardropTextIcon } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/content/profile";
import { testimonials } from "@/content/testimonials";
import { ButtonLink, PageHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `What clients, teammates, and collaborators say about working with ${profile.name}.`,
};

export default function TestimonialsPage() {
  const [featured, ...rest] = testimonials;

  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Kind words from"
        accent="people I've worked with."
        description="Honest feedback from clients, teammates, and collaborators — what it's like to work together, and the results we got."
      />

      {featured ? (
        <>
          {/* Spotlight review */}
          <Reveal delay={0.05}>
            <TestimonialCard t={featured} featured className="mt-10" />
          </Reveal>

          {rest.length > 0 && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {rest.map((t, i) => (
                <Reveal
                  key={t.quote}
                  delay={0.08 + i * 0.05}
                  // An odd card out spans the full row instead of sitting alone
                  className={rest.length % 2 === 1 && i === rest.length - 1 ? "sm:col-span-2" : undefined}
                >
                  <TestimonialCard t={t} />
                </Reveal>
              ))}
            </div>
          )}
        </>
      ) : (
        <Reveal>
          <div className="card mt-10 flex flex-col items-center gap-3 px-6 py-14 text-center">
            <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
              <ChatTeardropTextIcon weight="duotone" className="size-6" />
            </span>
            <p className="text-lg font-semibold tracking-tight">Reviews are on the way</p>
            <p className="max-w-sm text-[15px] text-pretty text-muted">
              I&apos;m just getting started with freelancing — be one of my first clients and get my full attention on
              your project.
            </p>
            <ButtonLink href="/contact" className="mt-2">
              Start a project
            </ButtonLink>
          </div>
        </Reveal>
      )}
    </>
  );
}
