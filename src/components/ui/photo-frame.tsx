import Image from "next/image";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

/**
 * Large rounded portrait for the home hero. Shows `profile.photo` when set,
 * otherwise a dark placeholder with a drifting glow and a serif monogram.
 */
export function Portrait({ className }: { className?: string }) {
  return (
    <div className={cn("group relative shrink-0", className)}>
      <div className="relative size-full overflow-hidden rounded-[36px] bg-[#141416] shadow-[0_1px_2px_rgb(17_17_19/0.08),0_24px_48px_-16px_rgb(17_17_19/0.35)] ring-1 ring-black/5 transition-transform duration-700 ease-[var(--ease-out)] group-hover:-rotate-2 group-hover:scale-[1.02] dark:ring-white/10">
        {profile.photo ? (
          <Image
            src={profile.photo}
            alt={profile.name}
            fill
            priority
            sizes="256px"
            className="object-cover"
          />
        ) : (
          <>
            <div className="portrait-glow absolute -inset-1/4 bg-[radial-gradient(circle_at_30%_30%,var(--accent),transparent_45%)] opacity-60" />
            <div className="absolute inset-0 [background:var(--grain)] opacity-60" />
            <span className="wordmark absolute inset-0 flex items-center justify-center text-[96px] text-white/90">
              {profile.alias.charAt(0)}
            </span>
          </>
        )}
      </div>
      {profile.available && (
        <span className="raised absolute -bottom-3 left-1/2 inline-flex h-8 -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-3.5 text-[13px] font-medium">
          <span className="pulse-dot size-2 rounded-full bg-success text-success" />
          Open to work
        </span>
      )}
    </div>
  );
}

/** Larger rounded photo used on the About page */
export function PhotoFrame({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] overflow-hidden rounded-[20px] border border-border bg-surface-2",
        className,
      )}
    >
      {profile.photo ? (
        <Image
          src={profile.photo}
          alt={profile.name}
          fill
          priority
          sizes="(min-width: 640px) 220px, 160px"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-surface-2 to-border">
          <span className="font-serif text-6xl italic text-subtle">{profile.initials}</span>
          <span className="mt-2 text-xs text-subtle">your photo here</span>
        </div>
      )}
    </div>
  );
}
