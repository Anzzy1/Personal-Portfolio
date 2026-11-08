import Image from "next/image";
import type { BlogImage } from "@/content/blog";
import { Illustration } from "./illustrations";

/** A post image: a built-in illustration or a real photo from /public, with an optional caption */
export function BlogFigure({ image, eager = false }: { image: BlogImage; eager?: boolean }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface-2">
        {image.src ? (
          <div className="relative aspect-video">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 672px, 100vw" className="object-cover" loading={eager ? "eager" : "lazy"} />
          </div>
        ) : image.illustration ? (
          <Illustration name={image.illustration} />
        ) : null}
      </div>
      {image.caption && <figcaption className="mt-2.5 text-center text-[13px] text-subtle">{image.caption}</figcaption>}
    </figure>
  );
}
