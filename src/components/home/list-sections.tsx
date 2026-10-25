import Link from "next/link";
import { services } from "@/content/services";
import { stack } from "@/content/experience";
import { certifications } from "@/content/certifications";
import { testimonials } from "@/content/testimonials";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { kindIcons } from "@/components/certifications/certificate-card";
import { serviceIcons } from "./sections";
import { Chip, SectionHead } from "@/components/ui/rows";
import { CertThumb, ServiceThumb } from "./thumbs";

export function ServiceRows() {
  return (
    <section className="flex flex-col gap-4">
      <SectionHead label="Services" href="/services" hrefLabel="Details" />
      <div className="flex flex-col">
        {services.map((s) => (
          <Link key={s.id} href={`/services#${s.id}`} className="row">
            <ServiceThumb id={s.id} icon={serviceIcons[s.id]} />
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="row-title font-medium">{s.title}</span>
              <span className="text-sm text-muted">{s.short}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CertificationRows({ limit = 3 }: { limit?: number }) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHead label="Certifications" href="/certifications" />
      <div className="flex flex-col">
        {certifications.slice(0, limit).map((c) => {
          const inner = (
            <>
              <CertThumb cert={c} icon={kindIcons[c.kind]} />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="row-title font-medium">
                  {c.title}
                  <Chip>{c.kind}</Chip>
                </span>
                <span className="text-sm text-muted">{c.issuer}</span>
              </span>
              <span className="shrink-0 text-[13px] text-subtle">{c.date}</span>
            </>
          );
          return c.href ? (
            <a key={c.title + c.issuer} href={c.href} target="_blank" rel="noreferrer" className="row">
              {inner}
            </a>
          ) : (
            <Link key={c.title + c.issuer} href="/certifications" className="row">
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function StackRows() {
  return (
    <section className="flex flex-col gap-4">
      <SectionHead label="Stack" href="/about" hrefLabel="More about me" />
      <div className="flex flex-col">
        {stack.map((g) => (
          <div key={g.group} className="kv">
            <span>{g.group}</span>
            <span>{g.items.join(", ")}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Two testimonial cards with a link to the rest; hidden until there are any to show */
export function TestimonialPreview() {
  if (testimonials.length === 0) return null;
  return (
    <section className="flex flex-col gap-4">
      <SectionHead label="Testimonials" href="/testimonials" />
      <div className="grid gap-4 sm:grid-cols-2">
        {testimonials.slice(0, 2).map((t) => (
          <TestimonialCard key={t.quote} t={t} />
        ))}
      </div>
    </section>
  );
}
