import { profile } from "@/content/profile";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `${profile.name} — ${profile.title}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: profile.title,
    title: profile.name,
    description: profile.tagline,
  });
}
