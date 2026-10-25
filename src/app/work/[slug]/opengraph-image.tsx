import { profile } from "@/content/profile";
import { getProject, projects } from "@/content/projects";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `Case study by ${profile.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: project ? `Case study · ${project.category.join(" · ")}` : "Case study",
    title: project?.title ?? profile.name,
    description: project?.summary ?? profile.tagline,
    accent: project?.color,
  });
}
