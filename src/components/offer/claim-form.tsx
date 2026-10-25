"use client";

import { useState } from "react";
import { CheckIcon, CircleNotchIcon, PaperPlaneTiltIcon, SealCheckIcon } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/content/profile";
import { services } from "@/content/services";
import { offer } from "@/content/offer";
import { cn } from "@/lib/utils";
import { SentSuccess } from "@/components/contact/sent-success";
import { EmailHint, FormError, Honeypot } from "@/components/contact/form-feedback";
import { useInquiry } from "@/components/contact/use-inquiry";

// Sends the claim to my inbox through /api/contact, like the contact form.
export function ClaimForm() {
  const [picked, setPicked] = useState<string[]>([]);
  const { sending, sent, error, mailto, emailIssue, emailRef, checkEmail, clearEmailIssue, applySuggestion, submit, reset } =
    useInquiry("claim");

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit({ ...Object.fromEntries(new FormData(e.currentTarget)), services: picked });
  }

  const field =
    "w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-[15px] outline-none transition-[border-color,box-shadow] placeholder:text-subtle focus:border-accent/50 focus:shadow-[0_0_0_4px_var(--accent-soft)]";

  return (
    <form id="claim-form" onSubmit={onSubmit} className="card relative scroll-mt-24 overflow-hidden shadow-card">
      <div className="flex items-center gap-3 border-b border-border bg-[linear-gradient(110deg,var(--accent-soft),transparent_70%)] px-5 py-4 sm:px-7">
        <span className="grid size-10 place-items-center rounded-xl bg-accent text-white shadow-[0_8px_18px_-8px_var(--accent)]">
          <SealCheckIcon weight="fill" className="size-5" />
        </span>
        <div>
          <p className="font-semibold tracking-tight">Claim your spot</p>
          <p className="text-[13px] text-muted">Takes a minute · {profile.responseTime.toLowerCase()}</p>
        </div>
      </div>

      {sent ? (
        <SentSuccess title="Spot claim sent!" onReset={reset} />
      ) : (
        <div className="flex flex-col gap-5 px-5 py-6 sm:px-7">
          <Honeypot />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input
                name="name"
                required
                autoComplete="name"
                placeholder="Juan Dela Cruz"
                className={cn(field, "mt-1.5")}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@business.com"
                ref={emailRef}
                aria-invalid={!!emailIssue}
                aria-describedby={emailIssue ? "email-hint" : undefined}
                onBlur={(e) => checkEmail(e.target.value)}
                onChange={clearEmailIssue}
                className={cn(field, "mt-1.5")}
              />
              <EmailHint issue={emailIssue} onUse={applySuggestion} />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium">
              Business or brand <span className="font-normal text-subtle">(optional)</span>
            </span>
            <input name="business" placeholder="e.g. Kape ni Juan" className={cn(field, "mt-1.5")} />
          </label>

          <fieldset>
            <legend className="text-sm font-medium">
              What do you need? <span className="font-normal text-subtle">(pick any)</span>
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {services.map((s) => {
                const on = picked.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(s.id)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-colors",
                      on
                        ? "border-accent bg-accent-soft text-fg"
                        : "border-border bg-bg text-ink-2 hover:border-border-strong hover:text-fg",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-[18px] shrink-0 place-items-center rounded-md border transition-colors",
                        on ? "border-accent bg-accent text-white" : "border-border-strong",
                      )}
                    >
                      {on && <CheckIcon weight="bold" className="size-3" />}
                    </span>
                    {s.title}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="block">
            <span className="text-sm font-medium">Tell me about your project</span>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="What do you want to build, and is there a deadline?"
              className={cn(field, "mt-1.5 resize-none")}
            />
          </label>

          <FormError message={error} mailto={mailto} />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-subtle">Only {offer.total} founding spots, ever.</p>
            <button
              type="submit"
              disabled={sending}
              className="cta-primary group inline-flex h-11 items-center justify-center gap-2 rounded-full pl-5 pr-4 text-sm font-semibold disabled:cursor-wait disabled:opacity-70"
            >
              {sending ? "Sending…" : "Claim my spot"}
              {sending ? (
                <CircleNotchIcon weight="bold" className="size-4 animate-spin" />
              ) : (
                <PaperPlaneTiltIcon
                  weight="fill"
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
