import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeftIcon, ArrowRightIcon, SparkleIcon } from "@phosphor-icons/react/dist/ssr";
import { getProject, projects } from "@/content/projects";
import { ProjectVisual } from "@/components/project/project-visual";
import { VideoCover } from "@/components/project/demo-video";
import { ButtonLink, Tag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

// The shared shell (back link + skeleton) renders instantly; the
// project content that depends on the URL streams in behind Suspense.
export default function ProjectPage(props: PageProps<"/work/[slug]">) {
  return (
    <>
      <Link
        href="/work"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
      >
        <ArrowLeftIcon weight="bold" className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        All work
      </Link>
      <Suspense fallback={<ProjectSkeleton />}>
        <ProjectContent params={props.params} />
      </Suspense>
    </>
  );
}

function ProjectSkeleton() {
  return (
    <div className="mt-8 animate-pulse">
      <div className="h-4 w-24 rounded-full bg-surface-2" />
      <div className="mt-4 h-10 w-1/2 rounded-xl bg-surface-2" />
      <div className="mt-4 h-5 w-3/4 rounded-full bg-surface-2" />
      <div className="mt-10 aspect-[16/10] rounded-2xl bg-surface-2" />
    </div>
  );
}

async function ProjectContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.timeline },
    { label: "Type", value: project.type },
    { label: "Year", value: project.year },
  ];

  return (
    <article>
      <header className="stagger mt-8">
        <p className="label">{project.category.join(" · ")}</p>
        <h1 className="mt-3 text-[38px] font-medium leading-[1.1] tracking-tight sm:text-[48px]">
          {project.title}
        </h1>
        <p className="lead mt-4 max-w-2xl text-pretty">{project.summary}</p>
        {(project.demo || project.github) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {project.demo && (
              <ButtonLink href={project.demo} external={project.demo.startsWith("http")} magnetic>
                Live demo
              </ButtonLink>
            )}
            {project.github && (
              <ButtonLink href={project.github} variant="secondary" external>
                Source code
              </ButtonLink>
            )}
          </div>
        )}
      </header>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-2">
        {project.video ? (
          <VideoCover video={project.video} title={project.title}>
            <ProjectVisual project={project} priority />
          </VideoCover>
        ) : (
          <ProjectVisual project={project} priority />
        )}
      </div>

      <Reveal>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-b border-border pb-8 sm:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="label">{m.label}</dt>
              <dd className="mt-1 text-[15px]">{m.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* ---- Client layer: the story ---- */}
      <div className="mt-14 space-y-12">
        <Block label="The problem">{project.problem}</Block>
        <Block label="The solution">{project.solution}</Block>
        {project.ai && (
          <Reveal>
            <div className="spotlight card overflow-hidden p-6">
              <p className="flex items-center gap-1.5 text-sm font-medium text-accent">
                <SparkleIcon weight="fill" className="size-4" /> Where AI fits in
              </p>
              <p className="mt-3 font-serif text-[22px] leading-snug text-pretty">{project.ai}</p>
            </div>
          </Reveal>
        )}
        <Reveal>
          <p className="label">Results</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="card p-4">
                <p className="text-xl font-medium tracking-tight sm:text-2xl">{m.value}</p>
                <p className="mt-1 text-sm text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ---- Technical layer: how it's built ---- */}
      <Reveal>
        <section className="card mt-16 overflow-hidden">
          <div className="border-b border-border px-6 py-5">
            <p className="label">Technical deep dive</p>
            <h2 className="mt-1 text-xl font-medium tracking-tight">
              How it&apos;s <span className="font-serif text-[1.15em] font-normal italic">built</span>
            </h2>
          </div>
          <div className="space-y-8 p-6">
            <div>
              <p className="label">Stack</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <Tag key={s} className="text-fg">
                    {s}
                  </Tag>
                ))}
              </div>
            </div>
            <div>
              <p className="label">Architecture</p>
              <ol className="mt-3">
                {project.architecture.map((step, i) => (
                  <li key={step} className="relative flex gap-4 pb-4 last:pb-0">
                    {i < project.architecture.length - 1 && (
                      <span className="absolute bottom-0 left-[11px] top-6 w-px bg-border" />
                    )}
                    <span className="relative flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-[11px] font-medium text-muted">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-[15px]">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <List label="Key decisions" items={project.decisions} />
              <List label="Challenges solved" items={project.challenges} />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Next project */}
      {next && next.slug !== project.slug && (
        <Reveal>
          <Link
            href={`/work/${next.slug}`}
            className="spotlight card card-hover group mt-16 flex items-center justify-between p-6"
          >
            <span>
              <span className="label">Next project</span>
              <span className="mt-1 block text-2xl font-medium tracking-tight">{next.title}</span>
            </span>
            <span className="flex size-11 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
              <ArrowRightIcon weight="bold" className="size-5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      )}
    </article>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="grid gap-2 sm:grid-cols-[150px_1fr] sm:gap-8">
        <p className="label pt-1">{label}</p>
        <p className="text-lg leading-relaxed text-pretty text-ink-2">{children}</p>
      </div>
    </Reveal>
  );
}

function List({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="label">{label}</p>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-[15px] text-muted">
            <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
