"use client";

import { useRef, useState } from "react";
import { profile } from "@/content/profile";

type EmailIssue = { reason: string; suggestion?: string } | null;

/** Prefilled mail draft, offered when the form backend can't deliver */
function draftMailto(kind: "contact" | "claim", fields: Record<string, unknown>) {
  const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const picked = Array.isArray(fields.services) ? fields.services.map(String) : [];
  const subject = kind === "claim" ? "Founding client spot — portfolio" : "Project inquiry — portfolio";
  const body = [
    `Name: ${text(fields.name)}`,
    `Email: ${text(fields.email)}`,
    text(fields.business) && `Business: ${text(fields.business)}`,
    picked.length > 0 && `Interested in: ${picked.join(", ")}`,
    "",
    text(fields.message),
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Shared logic for the contact and claim forms: checks the email when the
 * visitor leaves the field, then sends the form to /api/contact.
 */
export function useInquiry(kind: "contact" | "claim") {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mailto, setMailto] = useState<string | null>(null);
  const [emailIssue, setEmailIssue] = useState<EmailIssue>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const lastChecked = useRef("");

  async function checkEmail(email: string) {
    email = email.trim();
    if (!email || email === lastChecked.current) return;
    lastChecked.current = email;
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setEmailIssue(data.ok ? null : { reason: data.reason, suggestion: data.suggestion });
    } catch {
      // Offline or server hiccup: the send step checks again anyway
    }
  }

  function applySuggestion(suggestion: string) {
    if (emailRef.current) emailRef.current.value = suggestion;
    lastChecked.current = suggestion;
    setEmailIssue(null);
  }

  async function submit(fields: Record<string, unknown>) {
    setSending(true);
    setError(null);
    setMailto(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, page: window.location.pathname, ...fields }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (data.ok) {
        setSent(true);
        setEmailIssue(null);
      } else if (data.field === "email") {
        setEmailIssue({ reason: data.error, suggestion: data.suggestion });
        emailRef.current?.focus();
      } else {
        setError(data.error ?? "Couldn't send right now. Please try again.");
        // Never a dead end: let the visitor send the same message from their own mail app
        setMailto(draftMailto(kind, fields));
      }
    } catch {
      setError("You seem to be offline. Please check your connection and try again.");
      setMailto(draftMailto(kind, fields));
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setSent(false);
    setError(null);
    setMailto(null);
    lastChecked.current = "";
  }

  return {
    sending,
    sent,
    error,
    mailto,
    emailIssue,
    emailRef,
    checkEmail,
    clearEmailIssue: () => setEmailIssue(null),
    applySuggestion,
    submit,
    reset,
  };
}
