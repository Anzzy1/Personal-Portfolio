import Link from "next/link";
import { services } from "@/content/services";
import { stack } from "@/content/experience";
import { certifications } from "@/content/certifications";
import { formatPostDate, posts } from "@/content/blog";
import { kindIcons } from "@/components/certifications/certificate-card";
import { serviceIcons } from "./sections";
import { Chip, RowThumb, SectionHead } from "@/components/ui/rows";
import { NotePencilIcon } from "@phosphor-icons/react/dist/ssr";
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

/** Latest blog posts as rows, linking to the full post */
export function BlogPreview({ limit = 3 }: { limit?: number }) {
  if (posts.length === 0) return null;
  return (
    <section className="flex flex-col gap-4">
      <SectionHead label="Blog" href="/blog" hrefLabel="All posts" />
      <div className="flex flex-col">
        {posts.slice(0, limit).map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="row">
            <RowThumb icon={NotePencilIcon} />
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="row-title font-medium">{p.title}</span>
              <span className="truncate text-sm text-muted">{p.excerpt}</span>
            </span>
            <span className="hidden shrink-0 text-[13px] text-subtle sm:block">{formatPostDate(p.date)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
