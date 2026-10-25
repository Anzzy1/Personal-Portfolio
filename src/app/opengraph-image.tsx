import { profile } from "@/content/profile";
import { ogSize, renderProfileOg } from "@/lib/og";

export const alt = `${profile.name} — ${profile.title} portfolio`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderProfileOg();
}
