"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CircleNotchIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/content/profile";
import { services } from "@/content/services";
import { SentSuccess } from "./sent-success";
import { EmailHint, FormError, Honeypot } from "./form-feedback";
import { useInquiry } from "./use-inquiry";

// Sends the message to my inbox through /api/contact, after checking the email can receive replies.
export function ContactForm() {
  const { sending, sent, error, mailto, emailIssue, emailRef, checkEmail, clearEmailIssue, applySuggestion, submit, reset } =
    useInquiry("contact");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Coming from a service (/contact?service=...) starts the message for them
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = services.find((s) => s.id === params.get("service"));
    if (!messageRef.current || messageRef.current.value) return;
    if (service) {
      messageRef.current.value = `Hi Anzar! I'm interested in ${service.title.toLowerCase()}. `;
    }
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(Object.fromEntries(new FormData(e.currentTarget)));
  }

  const field =
    "w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-[15px] outline-none transition-[border-color,box-shadow] placeholder:text-subtle focus:border-accent/50 focus:shadow-[0_0_0_4px_var(--accent-soft)]";

  return (
    <form onSubmit={onSubmit} className="card relative overflow-hidden shadow-card">
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4 sm:px-6">
        <span className="relative shrink-0">
          {profile.photo ? (
            <Image
              src={profile.photo}
              alt={profile.name}
              width={44}
              height={44}
              className="size-11 rounded-full object-cover ring-2 ring-surface"
            />
          ) : (
            <span className="grid size-11 place-items-center rounded-full bg-fg text-sm font-semibold text-bg">
              {profile.initials}
            </span>
          )}
          {profile.available && (
            <span className="absolute bottom-0 right-0 size-3 rounded-full bg-success ring-2 ring-surface" />
          )}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="font-semibold tracking-tight">{profile.name}</span>
          <span className="text-[13px] text-muted">
            {profile.available ? "Online" : "Away"} · {profile.responseTime.toLowerCase()}
          </span>
        </span>
      </div>

      {sent ? (
        <SentSuccess onReset={reset} />
      ) : (
        <>
          {/* Conversation */}
          <div className="flex flex-col gap-3 bg-[radial-gradient(120%_80%_at_0%_0%,var(--accent-soft),transparent_60%)] px-5 py-6 sm:px-6">
            <p className="max-w-[85%] rounded-2xl rounded-tl-md bg-surface-2 px-4 py-3 text-[15px] leading-relaxed text-ink-2">
              Hi there! 👋 Tell me a bit about what you have in mind — a website, a system, an AI chatbot, or just a
              question. English or Filipino is fine.
            </p>
          </div>

          {/* Composer */}
          <div className="flex flex-col gap-3 border-t border-border bg-surface px-5 py-5 sm:px-6">
            <Honeypot />
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">Your name</span>
                <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Your email</span>
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Your email"
                  aria-invalid={!!emailIssue}
                  aria-describedby={emailIssue ? "email-hint" : undefined}
                  onBlur={(e) => checkEmail(e.target.value)}
                  onChange={clearEmailIssue}
                  className={field}
                />
                <EmailHint issue={emailIssue} onUse={applySuggestion} />
              </label>
            </div>
            <label className="block">
              <span className="sr-only">Message</span>
              <textarea
                ref={messageRef}
                name="message"
                required
                rows={5}
                placeholder="Write your message…"
                className={`${field} resize-none`}
              />
            </label>
            <FormError message={error} mailto={mailto} />
            <div className="flex sm:justify-end">
              <button
                type="submit"
                disabled={sending}
                className="cta-primary group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full pl-5 pr-4 text-sm font-semibold disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {sending ? "Sending…" : "Send"}
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
        </>
      )}
    </form>
  );
}
