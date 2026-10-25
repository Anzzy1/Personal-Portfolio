import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { certifications } from "@/content/certifications";
import { PageHeader } from "@/components/ui/primitives";
import { CertificationList } from "@/components/certifications/certification-list";

export const metadata: Metadata = {
  title: "Certifications",
  description: `Certifications, awards, and courses completed by ${profile.name}.`,
};

export default function CertificationsPage() {
  const issuers = new Set(certifications.map((c) => c.issuer)).size;
  const latest = certifications.map((c) => c.date.match(/\d{4}/)?.[0] ?? "").sort().at(-1);

  const stats = [
    { value: String(certifications.length), label: "Credentials" },
    { value: String(issuers), label: issuers === 1 ? "Issuer" : "Issuers" },
    { value: latest || "—", label: "Most recent" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Certifications"
        title="Always"
        accent="learning."
        description="Certifications, awards, and courses that back up the work. Click any card with a verify link to check it at the source."
      />

      <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-7">
        {stats.map((s) => (
          <div key={s.label}>
            <dd className="text-[30px] font-medium leading-none tracking-[-0.03em]">{s.value}</dd>
            <dt className="mt-2 text-sm text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>

      <CertificationList />
    </>
  );
}
