import type { Metadata } from "next";
import { BrainIcon, CrownSimpleIcon, CubeIcon } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/content/profile";
import { certifications } from "@/content/certifications";
import { ButtonLink, PageHeader, Section } from "@/components/ui/primitives";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { Reveal } from "@/components/ui/reveal";
import { Certifications, StackGrid } from "@/components/home/sections";
import { ExperienceTimeline } from "@/components/home/timeline";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name}, ${profile.title}.`,
};

const interestIcons = [CubeIcon, CrownSimpleIcon, BrainIcon];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About me" title="I solve problems with code —" accent="and a little AI." />

      <div className="mt-12 grid gap-8 sm:grid-cols-[200px_1fr]">
        <Reveal>
          <PhotoFrame className="w-44 -rotate-2 shadow-card transition-transform duration-500 hover:rotate-0 sm:w-full" />
        </Reveal>
        <Reveal delay={0.06}>
          <div className="lead space-y-4 text-pretty">
            {profile.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="text-muted">
              After working as a web developer at RC Studio in 2025, I&apos;m now focused full-time on
              freelancing — building for clients and my own projects, with a focus on frontend craft and
              practical AI integration.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" magnetic>
              Work with me
            </ButtonLink>
            <ButtonLink href={profile.resume} variant="secondary">
              Download résumé
            </ButtonLink>
          </div>
        </Reveal>
      </div>

      <Section title="Beyond the" accent="code">
        <div className="grid gap-3 sm:grid-cols-3">
          {profile.interests.map((it, i) => {
            const Icon = interestIcons[i % interestIcons.length];
            return (
              <Reveal key={it.title} delay={i * 0.06}>
                <div className="spotlight card group h-full p-5">
                  <Icon
                    weight="duotone"
                    className="size-7 text-accent transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110"
                  />
                  <h3 className="mt-4 font-medium tracking-tight">{it.title}</h3>
                  <p className="mt-1 text-sm text-pretty text-muted">{it.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section title="Where I've" accent="worked">
        <ExperienceTimeline />
      </Section>

      <Section title="My" accent="stack">
        <StackGrid />
      </Section>

      <Section title="Certifications" count={certifications.length} href="/certifications">
        <Certifications />
      </Section>
    </>
  );
}
