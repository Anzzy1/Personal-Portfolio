import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/content/profile";
import { formatPostDate, posts, readingTime } from "@/content/blog";
import { PageHeader, Tag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Blog — My Story",
  description: `Stories from ${profile.name}: getting into coding, vibe coding with AI, and building for clients.`,
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Stories from"
        accent="the journey."
        description="How I got into coding, how I started building with AI, and what I learned along the way."
      />

      <div className="mt-10 flex flex-col gap-4">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={0.05 + i * 0.05}>
            <Link
              href={`/blog/${post.slug}`}
              className="card card-hover group flex flex-col gap-3 p-6 sm:p-7"
            >
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-subtle">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{readingTime(post)}</span>
              </span>
              <span className="text-xl font-medium leading-snug tracking-tight text-balance sm:text-[22px]">
                {post.title}
              </span>
              <span className="text-[15px] text-pretty text-muted">{post.excerpt}</span>
              <span className="mt-1 flex items-center justify-between gap-3">
                <span className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted transition-colors group-hover:text-fg">
                  Read
                  <ArrowRightIcon weight="bold" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
