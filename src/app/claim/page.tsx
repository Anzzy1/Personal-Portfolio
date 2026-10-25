import type { Metadata } from "next";
import { InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { offer, offerOpen } from "@/content/offer";
import { ButtonLink, PageHeader, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { FoundingOffer } from "@/components/offer/founding-offer";
import { ClaimForm } from "@/components/offer/claim-form";

export const metadata: Metadata = {
  title: "Claim your founding spot",
  description: `A big discount for my first ${offer.total} clients — websites, web systems, AI integrations, and apps.`,
};

const steps = [
  {
    step: "01",
    title: "Send your claim",
    text: "Fill out the form below with what you'd like to build. No payment needed yet.",
  },
  {
    step: "02",
    title: "Free call & quote",
    text: "We talk through your project, and you get a fixed quote with your founding discount already applied.",
  },
  {
    step: "03",
    title: "Lock in your spot",
    text: "Your spot is confirmed once we agree on the project and start. Then I get building.",
  },
];

const finePrint = [
  `Limited to my first ${offer.total} clients — once the spots are gone, the offer ends.`,
  "The discount applies to your first project with me.",
  "Same quality, process, and support as any regular project — nothing is cut.",
  "Works for every service: websites, web systems, AI integrations, and apps.",
];

export default function ClaimPage() {
  if (!offerOpen) {
    return (
      <>
        <PageHeader
          eyebrow="Founding client offer"
          title="All founding spots"
          accent="are taken."
          description={`Thank you to my first ${offer.total} clients! The founding discount is closed, but I'd still love to hear about your project.`}
        />
        <ButtonLink href="/contact" className="mt-8">
          Start a project
        </ButtonLink>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Founding client offer"
        title="Claim your"
        accent="founding spot."
        description={`I'm opening ${offer.total} founding spots with a big discount — a thank-you to the first clients who trust me with their project. Here's how to get one.`}
      />

      <Reveal>
        <FoundingOffer className="mt-10" cta={{ href: "#claim-form", label: "Fill out the form" }} />
      </Reveal>

      <Section title="How it" accent="works">
        <ol className="grid gap-3 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.06}>
              <li className="card h-full p-5">
                <span className="font-serif text-3xl italic text-accent">{s.step}</span>
                <h3 className="mt-2 font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-1 text-sm text-pretty text-muted">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section title="Claim your" accent="spot">
        <Reveal>
          <ClaimForm />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-6 rounded-2xl border border-dashed border-border-strong p-5 sm:p-6">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <InfoIcon weight="fill" className="size-4 text-accent" />
              The fine print
            </p>
            <ul className="mt-3 space-y-2">
              {finePrint.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-pretty text-muted">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-subtle" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
