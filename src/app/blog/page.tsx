import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content/profile";
import { formatPostDate, posts, readingTime } from "@/content/blog";
import { PageHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { BlogFigure } from "@/components/blog/blog-figure";

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

      <div className="mt-12 border-t border-border">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={0.05 + i * 0.05}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-4 border-b border-border py-6 sm:flex-row sm:items-start sm:gap-5"
            >
              {post.cover && (
                <BlogFigure
                  image={post.cover}
                  eager={i === 0}
                  className="aspect-[3/2] w-full shrink-0 transition-opacity group-hover:opacity-85 sm:w-[136px]"
                />
              )}
              <span className="flex min-w-0 flex-col gap-1.5">
                <time dateTime={post.date} className="font-mono text-xs text-subtle">
                  {formatPostDate(post.date)}
                </time>
                <span className="text-lg font-medium leading-snug tracking-tight text-balance underline-offset-4 group-hover:underline">
                  {post.title}
                </span>
                <span className="text-[15px] text-pretty text-muted">{post.excerpt}</span>
                <span className="mt-1 font-mono text-xs text-subtle">
                  Read · {readingTime(post).replace(" read", "")}
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
