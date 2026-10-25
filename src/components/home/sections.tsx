import {
  ChatsCircleIcon,
  DeviceMobileIcon,
  RocketLaunchIcon,
  TreeStructureIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { process } from "@/content/services";
import { stack } from "@/content/experience";
import { certifications } from "@/content/certifications";
import { CertificateCard } from "@/components/certifications/certificate-card";
import { Reveal } from "@/components/ui/reveal";

export const serviceIcons: Record<string, Icon> = {
  "landing-pages": RocketLaunchIcon,
  "web-systems": TreeStructureIcon,
  "ai-integration": ChatsCircleIcon,
  apps: DeviceMobileIcon,
};

export function ProcessSteps() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {process.map((p, i) => (
        <Reveal key={p.step} delay={i * 0.06}>
          <li className="spotlight card h-full p-5">
            <span className="font-serif text-3xl italic text-accent">{p.step}</span>
            <h3 className="mt-2 font-medium tracking-tight">{p.title}</h3>
            <p className="mt-1 text-sm text-pretty text-muted">{p.text}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

/** Grouped stack, for the About page */
export function StackGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {stack.map((g, i) => (
        <Reveal key={g.group} delay={i * 0.05}>
          <div className="card h-full p-5">
            <p className="label">{g.group}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{g.items.join(", ")}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** First few credentials, for the About page */
export function Certifications({ limit = 2 }: { limit?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {certifications.slice(0, limit).map((c, i) => (
        <Reveal key={c.title + c.issuer} delay={i * 0.06}>
          <CertificateCard cert={c} />
        </Reveal>
      ))}
    </div>
  );
}
