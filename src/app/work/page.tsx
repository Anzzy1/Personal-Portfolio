import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/primitives";
import { ProjectFilter } from "@/components/project/project-filter";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";

const stats = [
  { value: projects.length, label: "Projects built" },
  { value: projects.filter((p) => p.category.includes("AI")).length, label: "Powered by AI" },
  { value: new Set(projects.flatMap((p) => p.stack)).size, label: "Tools used" },
  { value: profile.buildingSince, label: "Building since" },
];

export const metadata: Metadata = {
  title: "Work",
  description: "Websites, web systems, and AI integrations I've designed and built.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Things I've"
        accent="designed & built"
        description="Websites, web systems, and AI integrations — each one built to solve a real problem. Open any project for the full story."
      />
      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1 bg-surface px-5 py-4">
            <dt className="order-2 text-sm text-muted">{s.label}</dt>
            <dd className="text-[26px] font-semibold leading-none tracking-[-0.03em] tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>
      <ProjectFilter />
    </>
  );
}
