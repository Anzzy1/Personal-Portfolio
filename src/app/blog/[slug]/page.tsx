import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { formatPostDate, getPost, posts, readingTime } from "@/content/blog";
import { getProject } from "@/content/projects";
import { Tag } from "@/components/ui/primitives";
import { BlogFigure } from "@/components/blog/blog-figure";
import { Reveal } from "@/components/ui/reveal";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      publishedTime: post.date,
    },
  };
}

export default function PostPage(props: PageProps<"/blog/[slug]">) {
  return (
    <>
      <Link
        href="/blog"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
      >
        <ArrowLeftIcon weight="bold" className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        All posts
      </Link>
      <Suspense fallback={<PostSkeleton />}>
        <PostContent params={props.params} />
      </Suspense>
    </>
  );
}

function PostSkeleton() {
  return (
    <div className="mt-8 animate-pulse">
      <div className="h-4 w-32 rounded-full bg-surface-2" />
      <div className="mt-4 h-10 w-3/4 rounded-xl bg-surface-2" />
      <div className="mt-4 h-5 w-2/3 rounded-full bg-surface-2" />
    </div>
  );
}

async function PostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const project = post.project ? getProject(post.project) : undefined;
  const index = posts.findIndex((p) => p.slug === slug);
  const next = posts[(index + 1) % posts.length];

  return (
    <article className="max-w-2xl">
      <header className="stagger mt-8">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-subtle">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{readingTime(post)}</span>
        </p>
        <h1 className="mt-3 text-[32px] font-medium leading-[1.15] tracking-tight text-balance sm:text-[42px]">
          {post.title}
        </h1>
        <p className="lead mt-4 text-pretty">{post.excerpt}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        {post.cover && (
          <div className="mt-8">
            <BlogFigure image={post.cover} eager />
          </div>
        )}
      </header>

      <div className="mt-10 space-y-9 border-t border-border pt-10">
        {post.body.map((section, i) => (
          <Reveal key={i}>
            <section className="space-y-4">
              {section.heading && <h2 className="text-[22px] font-medium tracking-tight">{section.heading}</h2>}
              {section.paragraphs.map((p) => (
                <p key={p} className="text-[16.5px] leading-relaxed text-pretty text-ink-2">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="space-y-2.5">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-3 text-[16px] leading-relaxed text-ink-2">
                      <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.image && (
                <div className="pt-2">
                  <BlogFigure image={section.image} />
                </div>
              )}
            </section>
          </Reveal>
        ))}
      </div>

      {project && (
        <Reveal>
          <Link
            href={`/work/${project.slug}`}
            className="card card-hover group mt-14 flex items-center justify-between gap-4 p-5"
          >
            <span>
              <span className="label">See the project</span>
              <span className="mt-1 block text-lg font-medium tracking-tight">{project.title}</span>
            </span>
            <ArrowRightIcon weight="bold" className="size-4 text-muted transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      )}

      {next && next.slug !== post.slug && (
        <Reveal>
          <Link
            href={`/blog/${next.slug}`}
            className="spotlight card card-hover group mt-4 flex items-center justify-between gap-4 p-6"
          >
            <span className="min-w-0">
              <span className="label">Next post</span>
              <span className="mt-1 block text-xl font-medium tracking-tight text-balance">{next.title}</span>
            </span>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
              <ArrowRightIcon weight="bold" className="size-5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      )}
    </article>
  );
}
