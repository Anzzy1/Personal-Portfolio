import Image from "next/image";
import type { BlogImage } from "@/content/blog";

/**
 * A post cover on a white card. The covers are black-on-white stipple art,
 * so dark mode simply inverts them to white-on-black. Served unoptimized:
 * the PNGs are tiny, and lossy re-encoding would smear the dots.
 */
export function BlogFigure({
  image,
  eager = false,
  className = "",
}: {
  image: BlogImage;
  eager?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-white dark:bg-black ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        width={1200}
        height={676}
        loading={eager ? "eager" : "lazy"}
        unoptimized
        className="h-full w-full object-cover dark:invert"
      />
    </div>
  );
}
