"use client";

import { useState } from "react";
import Link from "next/link";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { LocalTime } from "@/components/layout/local-time";
import { SectionHead } from "@/components/ui/rows";

/** Experience: open-to-work pill, then roles that expand to show every bullet */
export function ExperienceRows() {
  return (
    <section className="flex flex-col gap-4">
      <SectionHead label="Experience" />
      <div className="flex flex-col">
        {profile.available && (
          <div className="mb-6 flex items-center gap-2.5 rounded-full bg-surface-2 py-1.5 pl-5 pr-1.5">
            <span className="pulse-dot size-[7px] shrink-0 rounded-full bg-success text-success" />
            <span className="mr-auto text-[15px] font-medium">
              Currently open to new work
              <span className="hidden font-normal text-muted sm:inline">
                {" "}
                · <LocalTime /> in Manila
              </span>
            </span>
            <Link
              href="/contact"
              className="raised inline-flex h-9 shrink-0 items-center rounded-full px-4 text-sm font-medium"
            >
              Contact me
            </Link>
          </div>
        )}
        <div className="flex flex-col gap-10">
          {experience.map((e) => (
            <Role key={e.company + e.role} role={e} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Role({ role }: { role: (typeof experience)[number] }) {
  const [open, setOpen] = useState(false);
  const [first, ...more] = role.points;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-medium">
          {role.role} <span className="font-normal text-muted">· {role.company}</span>
        </span>
        <span className="shrink-0 text-[13px] text-subtle">{role.period}</span>
      </div>
      <div className="flex flex-col">
        <ul className="bullets">
          <li>{first}</li>
        </ul>
        {more.length > 0 && (
          <>
            <div className="expander" data-open={open} inert={!open}>
              <div>
                <ul className="bullets pt-2.5">
                  {more.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="mt-2 self-start text-[13px] font-medium text-muted transition-colors hover:text-fg"
            >
              {open ? "Show less" : `+ ${more.length} more`}
            </button>
          </>
        )}
      </div>
      <span className="text-sm text-muted">{role.tags.join(" · ")}</span>
    </div>
  );
}
