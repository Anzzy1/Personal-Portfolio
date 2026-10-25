import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, FileTextIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/content/profile";
import { Portrait } from "@/components/ui/photo-frame";
import { PixelName } from "@/components/ui/pixel-name";
import { RotatingWords } from "@/components/ui/rotating-words";
import { CountUp } from "@/components/ui/count-up";

const [brand, ...rest] = profile.alias.split(" ");
const [country, workMode] = profile.location.split(" · ");
// Only show the résumé button once the PDF actually exists in /public
const hasResume = fs.existsSync(path.join(process.cwd(), "public", profile.resume));

/** Portrait, "Anzyy Dev" wordmark, short intro, and linked stats */
export function Identity() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
        <Portrait className="size-56 sm:size-[240px]" />

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="wordmark text-[42px] leading-none sm:text-[46px]">
                <PixelName text={brand} />
                {rest.length > 0 && (
                  <>
                    {" "}
                    <em>
                      <PixelName text={rest.join(" ")} />
                    </em>
                  </>
                )}
                <span className="sr-only"> — {profile.name}</span>
              </h1>
              <p className="mt-4 font-display text-[26px] font-medium leading-[1.2] tracking-[-0.03em] text-fg sm:text-[32px]">
                I build{" "}
                <RotatingWords
                  words={["websites", "web systems", "AI integrations", "apps"]}
                  className="pb-[0.12em] font-serif text-[1.12em] font-normal italic tracking-[-0.01em] text-accent"
                />
                <span className="text-fg">.</span>
              </p>
              <div className="mt-4 flex items-center gap-3 whitespace-nowrap text-sm">
                <span className="font-medium text-fg">{profile.name}</span>
                <span aria-hidden className="h-3.5 w-px bg-border-strong" />
                <span className="inline-flex items-center gap-1.5 text-ink-2">
                  <MapPinIcon weight="fill" className="size-3.5 text-accent" />
                  {country}
                  {workMode && <span className="text-ink-2">· {workMode}</span>}
                </span>
              </div>
            </div>
            {hasResume && (
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                aria-label="Résumé"
                title="Résumé"
                className="foot-btn size-10 shrink-0"
              >
                <FileTextIcon className="size-[18px]" />
              </a>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="lead lead-teaser text-pretty">{profile.bio.join(" ")}</p>
            <Link
              href="/about"
              className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
            >
              <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              More about me
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {profile.stats.map((s) => (
          <Link key={s.label} href={s.href} className="group relative flex flex-col gap-1">
            <span className="text-[30px] font-medium leading-none tracking-[-0.03em]">
              <CountUp value={s.value} />
            </span>
            <span className="text-sm text-muted">{s.label}</span>
            <ArrowUpRightIcon className="absolute right-0 top-0.5 size-4 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
          </Link>
        ))}
      </div>
    </div>
  );
}
