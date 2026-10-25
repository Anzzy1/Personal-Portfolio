import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/content/projects";
import { ProjectVisual, projectTheme } from "./project-visual";
import { Tag } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, wide, index }: { project: Project; wide?: boolean; index?: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      style={projectTheme(project)}
      className="spotlight card project-card group flex h-full flex-col p-2 hover:-translate-y-1"
    >
      <ProjectVisual
        project={project}
        className={cn(wide && "sm:aspect-[2/1]")}
        zoomOnHover
      />
      <div className={cn("flex flex-1 flex-col px-3 pb-3 pt-4", wide && "sm:px-4 sm:pt-5")}>
        <div className="flex items-center gap-2">
          {index !== undefined && (
            <span className="font-mono text-xs font-medium text-subtle tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            {project.category.join(" · ")}
          </span>
          <span className="text-xs text-subtle">{project.year}</span>
          {wide && (
            <span className="ml-auto rounded-full bg-fg px-2.5 py-0.5 text-[11px] font-semibold text-bg">
              Featured
            </span>
          )}
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className={cn("text-xl font-semibold tracking-[-0.02em]", wide && "sm:text-[28px] sm:leading-tight")}>
            {project.title}
          </h3>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            <ArrowUpRightIcon weight="bold" className="size-4" />
          </span>
        </div>

        <p className={cn("mt-2 text-[15px] text-pretty text-muted", wide && "sm:text-base")}>{project.summary}</p>

        <div className="mt-4 mb-5 flex flex-wrap gap-1.5">
          {project.metrics.slice(0, wide ? 3 : 2).map((m) => (
            <Tag key={m.label}>
              <span className="mr-1 font-semibold text-fg">{m.value}</span> {m.label}
            </Tag>
          ))}
        </div>

        <p className="mt-auto truncate border-t border-border pt-3 font-mono text-[11px] text-subtle">
          {project.stack.slice(0, wide ? 5 : 3).join("  ·  ")}
        </p>
      </div>
    </Link>
  );
}
