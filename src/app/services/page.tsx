import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  PlusIcon,
  TagIcon,
} from "@phosphor-icons/react/dist/ssr";
import { addOns, faqs, services } from "@/content/services";
import { PageHeader, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ProcessSteps, serviceIcons } from "@/components/home/sections";
import { FoundingOffer } from "@/components/offer/founding-offer";

export const metadata: Metadata = {
  title: "Services",
  description: "Websites, web systems, AI chatbots, and apps for businesses — quoted around your project.",
};

// Each service gets its own color; everything accent-colored inside follows it
const serviceColors: Record<string, string> = {
  "landing-pages": "#f2541b",
  "web-systems": "#10b981",
  "ai-integration": "#8b5cf6",
  apps: "#3a4bff",
};

const themed = (id: string) =>
  ({
    "--accent": serviceColors[id],
    "--accent-soft": `color-mix(in srgb, ${serviceColors[id]} 13%, transparent)`,
  }) as React.CSSProperties;

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What I can"
        accent="build for you"
        description="From a coffee shop website to a full AI-powered app — every project gets a clear, fixed quote based on what you actually need, before any work begins."
      />

      <Reveal>
        <FoundingOffer className="mt-10" />
      </Reveal>

      {/* At-a-glance overview */}
      <Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3">
          {services.map((s) => {
            const Icon = serviceIcons[s.id];
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={themed(s.id)}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--border))] hover:shadow-[0_18px_36px_-22px_var(--accent)] sm:p-5"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon weight="duotone" className="size-5" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-semibold leading-snug tracking-tight">{s.title}</span>
                  <span className="text-sm text-pretty text-muted">{s.short}</span>
                </span>
              </a>
            );
          })}
        </div>
      </Reveal>

      {/* Full details per service */}
      <div className="mt-12 space-y-5">
        {services.map((s, i) => {
          const Icon = serviceIcons[s.id];
          return (
            <Reveal key={s.id} delay={i * 0.05}>
              <section
                id={s.id}
                style={themed(s.id)}
                className="card scroll-mt-24 overflow-hidden bg-[radial-gradient(120%_60%_at_0%_0%,var(--accent-soft),transparent_55%)]"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent text-white shadow-[0_10px_24px_-10px_var(--accent)]">
                      <Icon weight="fill" className="size-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{s.title}</h2>
                        {s.badge && (
                          <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-white">
                            {s.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-[15px] text-pretty text-muted">{s.description}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="label">Perfect for</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {s.examples.map((e) => (
                        <span
                          key={e}
                          className="rounded-full border border-[color-mix(in_srgb,var(--accent)_25%,var(--border))] bg-accent-soft px-3 py-1 text-[13px] font-medium text-fg"
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="label">What you get</p>
                    <ul className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-[15px]">
                          <CheckCircleIcon weight="fill" className="mt-0.5 size-[18px] shrink-0 text-accent" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price + call to action */}
                <div className="flex flex-col gap-4 border-t border-border bg-surface-2/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                  <div>
                    <p className="text-xs font-medium text-subtle">Price & timeline</p>
                    <p className="mt-0.5 inline-flex items-center gap-1.5 font-semibold tracking-tight">
                      <TagIcon weight="bold" className="size-4 text-accent" /> Tailored to your project
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {s.proof && (
                      <Link
                        href={s.proof.href}
                        className="group inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-muted transition-colors hover:text-fg"
                      >
                        {s.proof.label}
                        <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    )}
                    <Link
                      href={`/contact?service=${s.id}`}
                      className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-[0_10px_22px_-10px_var(--accent)] transition-transform duration-200 hover:-translate-y-px"
                    >
                      Start this project
                      <ArrowRightIcon weight="bold" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>

      <Section title="Add-ons for" accent="any project">
        <div className="grid gap-3 sm:grid-cols-3">
          {addOns.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <div className="card flex h-full flex-col gap-2 p-5">
                <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent">
                  <PlusIcon weight="bold" className="size-4" />
                </span>
                <p className="font-semibold tracking-tight">{a.title}</p>
                <p className="text-sm text-pretty text-muted">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="How I" accent="work">
        <ProcessSteps />
      </Section>

      <Section title="Common" accent="questions">
        <Reveal>
          <div className="card divide-y divide-border overflow-hidden">
            {faqs.map((f) => (
              <details key={f.q} className="group px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {f.q}
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-transform duration-300 group-open:rotate-45">
                    <PlusIcon weight="bold" className="size-3.5" />
                  </span>
                </summary>
                <p className="mt-3 text-[15px] text-pretty text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
