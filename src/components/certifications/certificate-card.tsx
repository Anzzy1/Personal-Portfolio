import { ArrowUpRightIcon, CertificateIcon, MedalIcon, StudentIcon } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { Certification, CertificationKind } from "@/content/certifications";
import { Tag } from "@/components/ui/primitives";

export const kindIcons: Record<CertificationKind, Icon> = {
  Certification: CertificateIcon,
  Award: MedalIcon,
  Course: StudentIcon,
};

/** Card styled like a framed certificate, with a light sweep on hover */
export function CertificateCard({ cert }: { cert: Certification }) {
  const Icon = kindIcons[cert.kind];
  const body = (
    <>
      {/* Shine that sweeps across on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,rgb(255_255_255/0.5)_50%,transparent_65%)] transition-transform duration-1000 ease-[var(--ease-out)] group-hover:translate-x-full dark:bg-[linear-gradient(105deg,transparent_35%,rgb(255_255_255/0.06)_50%,transparent_65%)]" />

      {/* Inner "certificate" frame */}
      <div className="relative flex h-full flex-col rounded-[12px] border border-dashed border-border-strong p-5">
        <div className="flex items-start justify-between gap-4">
          <span className="label">
            {cert.kind}
            {cert.date && ` · ${cert.date}`}
          </span>
          {/* Seal */}
          <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent ring-1 ring-accent/20 transition-transform duration-700 ease-[var(--ease-out)] group-hover:rotate-[20deg]">
            <span className="absolute inset-1 rounded-full border border-dashed border-accent/30" />
            <Icon weight="duotone" className="size-6" />
          </span>
        </div>

        <h3 className="mt-2 font-serif text-[26px] leading-[1.1] text-pretty">{cert.title}</h3>
        <p className="mt-1.5 text-[15px] font-medium text-ink-2">{cert.issuer}</p>

        {cert.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {cert.skills.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm">
          <span className="truncate font-mono text-xs text-subtle">
            {cert.credentialId ? `ID ${cert.credentialId}` : ""}
          </span>
          {cert.href ? (
            <span className="inline-flex shrink-0 items-center gap-1 font-medium text-fg">
              Verify
              <ArrowUpRightIcon
                weight="bold"
                className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          ) : null}
        </div>
      </div>
    </>
  );

  const shell = "spotlight card card-hover group relative block h-full overflow-hidden p-2 hover:-translate-y-1";
  return cert.href ? (
    <a href={cert.href} target="_blank" rel="noreferrer" className={shell}>
      {body}
    </a>
  ) : (
    <div className={shell}>{body}</div>
  );
}
