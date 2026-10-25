import { profile, copyrightYear } from "@/content/profile";
import { ButtonLink } from "@/components/ui/primitives";
import { CopyEmail } from "@/components/ui/copy-email";
import { Reveal } from "@/components/ui/reveal";
import { HideOn } from "@/components/layout/hide-on";

/** Closing call-to-action + footer, shared by every page */
export function Footer() {
  return (
    <footer className="mt-28">
      {/* Not needed under the game, or on pages that already have their own form */}
      <HideOn paths={["/play", "/contact", "/claim"]}>
        <Reveal>
          <div className="spotlight card overflow-hidden px-6 py-10 text-center sm:px-10 sm:py-14">
            <p className="label">Got an idea?</p>
            <h2 className="mx-auto mt-3 max-w-md text-[32px] font-medium leading-[1.1] tracking-tight text-balance sm:text-[40px]">
              Let&apos;s turn it into something{" "}
              <span className="font-serif font-normal italic text-accent">people use.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-[15px] text-muted">
              Tell me what you need. I&apos;ll reply with a plan and a clear quote,{" "}
              {profile.responseTime.toLowerCase()}.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact" magnetic>
                Start a project
              </ButtonLink>
              <CopyEmail />
            </div>
          </div>
        </Reveal>
      </HideOn>

      <div className="mt-10 flex flex-col-reverse justify-between gap-4 border-t border-border py-6 sm:flex-row sm:items-center">
        <p className="shrink-0 whitespace-nowrap text-sm text-muted">
          © {copyrightYear} {profile.alias}
        </p>
        <nav aria-label="Social" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-fg">
            Email
          </a>
          {profile.socials.filter((s) => s.href).map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-fg"
            >
              {s.label}
            </a>
          ))}
          {profile.socials
            .filter((s) => !s.href)
            .map((s) => (
              <span key={s.label} title={`${s.label} username`}>
                {s.label}: <span className="text-ink-2">{s.handle}</span>
              </span>
            ))}
        </nav>
      </div>
    </footer>
  );
}
