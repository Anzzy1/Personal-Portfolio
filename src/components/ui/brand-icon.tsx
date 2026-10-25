import { siDiscord, siFacebook, siGithub, siInstagram, siTiktok } from "simple-icons";
import { cn } from "@/lib/utils";

/** Brand color per platform, used for hover glows */
export const brandColors: Record<string, string> = {
  GitHub: "#6e7681",
  LinkedIn: "#0a66c2",
  Facebook: "#0866ff",
  Instagram: "#e1306c",
  TikTok: "#25f4ee",
  Discord: "#5865f2",
};

const tile = "relative grid shrink-0 place-items-center overflow-hidden text-white";

/**
 * Full-color platform logo on an app-style tile (size and rounding come from className).
 * Falls back to a plain accent tile for unknown platforms.
 */
export function BrandIcon({ label, className }: { label: string; className?: string }) {
  const glyph = "size-[56%]";

  switch (label.toLowerCase()) {
    case "github":
      return (
        <span className={cn(tile, "bg-[#181717] ring-1 ring-white/10", className)}>
          <Glyph path={siGithub.path} className={glyph} />
        </span>
      );
    case "linkedin":
      return (
        <span className={cn(tile, "bg-[#0a66c2]", className)}>
          {/* simple-icons no longer ships LinkedIn, so the "in" is drawn here */}
          <svg viewBox="0 0 24 24" aria-hidden className={glyph} fill="currentColor">
            <circle cx="5.6" cy="5.4" r="2.4" />
            <rect x="3.5" y="9" width="4.2" height="12" rx="0.6" />
            <path d="M10.2 9h4v1.7c.7-1.2 2.2-2 4-2 3.1 0 4.3 2 4.3 5.3V21h-4.2v-6.3c0-1.5-.5-2.5-1.9-2.5s-2.1 1.1-2.1 2.6V21h-4.1z" />
          </svg>
        </span>
      );
    case "facebook":
      return (
        <span className={cn(tile, "bg-[#0866ff]", className)}>
          <Glyph path={siFacebook.path} className="size-[62%]" />
        </span>
      );
    case "instagram":
      return (
        <span
          className={cn(
            tile,
            "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285aeb_90%)]",
            className,
          )}
        >
          <Glyph path={siInstagram.path} className={glyph} />
        </span>
      );
    case "tiktok":
      return (
        <span className={cn(tile, "bg-[#010101] ring-1 ring-white/10", className)}>
          {/* TikTok's signature cyan/red offset behind the white note */}
          <svg viewBox="0 0 24 24" aria-hidden className={glyph}>
            <path d={siTiktok.path} fill="#25f4ee" transform="translate(-0.9 -0.7)" />
            <path d={siTiktok.path} fill="#fe2c55" transform="translate(0.9 0.7)" />
            <path d={siTiktok.path} fill="#fff" />
          </svg>
        </span>
      );
    case "discord":
      return (
        <span className={cn(tile, "bg-[#5865f2]", className)}>
          <Glyph path={siDiscord.path} className={glyph} />
        </span>
      );
    default:
      return <span className={cn(tile, "bg-accent", className)} />;
  }
}

function Glyph({ path, className }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d={path} />
    </svg>
  );
}
