import { profile, siteUrl } from "@/content/profile";
import { services } from "@/content/services";
import { renderInquiryEmail, type Inquiry } from "@/lib/email/template";
import { verifyEmail } from "@/lib/email/verify";

// Simple per-IP limit so the form can't be used to flood my inbox
const hits = new Map<string, number[]>();
const limit = 5;
const windowMs = 10 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > limit;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const fail = (error: string, status = 400, field?: string, suggestion?: string) =>
  Response.json({ ok: false, error, field, suggestion }, { status });

type Delivery = { ok: true } | { ok: false };

// Where inquiries land. Defaults to the address in profile.ts.
const inbox = process.env.CONTACT_TO_EMAIL ?? profile.email;

/**
 * Resend (used when RESEND_API_KEY is set) — sends the designed HTML email
 * from src/lib/email/template.ts.
 */
async function sendWithResend(inquiry: Inquiry, subject: string, html: string, text: string): Promise<Delivery> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? `${profile.alias} Portfolio <onboarding@resend.dev>`,
      to: [inbox],
      reply_to: inquiry.email,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return { ok: false };
  }

  const data = (await res.json().catch(() => null)) as { id?: string } | null;
  console.log("[contact] sent via Resend", data?.id ?? "");
  return { ok: true };
}

/**
 * FormSubmit (default, no account or API key) — posts the inquiry straight to
 * the inbox. The very first submission triggers a one-time activation email
 * from formsubmit.co; click the link in it and every submission after that is
 * delivered normally.
 */
async function sendWithFormSubmit(inquiry: Inquiry, subject: string): Promise<Delivery> {
  const details = [
    inquiry.message,
    "",
    "—",
    `Form: ${inquiry.kind === "claim" ? "Founding client claim" : "Contact form"}`,
    inquiry.business ? `Business: ${inquiry.business}` : null,
    inquiry.services?.length ? `Interested in: ${inquiry.services.join(", ")}` : null,
    inquiry.page ? `Page: ${inquiry.page}` : null,
    `Email verified: yes`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // FormSubmit rejects requests with no page context ("browsed as HTML files")
      Referer: `${siteUrl}/contact`,
      Origin: siteUrl,
    },
    body: JSON.stringify({
      _subject: subject,
      _template: "table",
      _captcha: "false",
      _honey: "",
      _replyto: inquiry.email,
      name: inquiry.name,
      email: inquiry.email,
      business: inquiry.business ?? "",
      services: inquiry.services?.join(", ") ?? "",
      page: inquiry.page ?? "",
      message: details,
    }),
  });

  const data = (await res.json().catch(() => null)) as { success?: string; message?: string } | null;

  if (res.ok && data?.success !== "false") return { ok: true };

  const message = data?.message ?? "";
  if (/activation/i.test(message)) {
    // One-time setup state: the owner must click the link in the email
    // FormSubmit just sent, then submissions deliver normally.
    console.error(
      `[contact] FormSubmit needs activation. Open the email sent to ${inbox} and click "Activate Form".`,
    );
  } else {
    console.error("[contact] FormSubmit error", res.status, message);
  }
  return { ok: false };
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  console.log("[contact] POST from", ip);

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return fail("Something went wrong. Please try again.");

  // Hidden field only bots fill in: pretend it worked
  if (str(body.hp_confirm, 200)) {
    console.warn("[contact] honeypot triggered — submission ignored (no email sent)");
    return Response.json({ ok: true });
  }

  const inquiry: Inquiry = {
    kind: body.kind === "claim" ? "claim" : "contact",
    name: str(body.name, 100),
    email: str(body.email, 254).toLowerCase(),
    message: str(body.message, 5000),
    business: str(body.business, 120) || undefined,
    services: Array.isArray(body.services)
      ? services.filter((s) => (body.services as unknown[]).includes(s.id)).map((s) => s.title)
      : undefined,
    page: str(body.page, 200) || undefined,
  };

  if (!inquiry.name) return fail("Please enter your name.", 400, "name");
  if (inquiry.message.length < 10) return fail("Please write a little more about what you need.", 400, "message");

  const check = await verifyEmail(inquiry.email);
  if (!check.ok) return fail(check.reason, 422, "email", check.suggestion);

  // Counted only after validation, so a few typos can't lock a real visitor out
  if (rateLimited(ip)) {
    console.warn("[contact] rate limited", ip);
    return fail("Too many messages. Please try again in a few minutes.", 429);
  }

  const { subject, html, text } = renderInquiryEmail(inquiry);

  const delivery = process.env.RESEND_API_KEY
    ? await sendWithResend(inquiry, subject, html, text)
    : await sendWithFormSubmit(inquiry, subject);

  if (!delivery.ok) {
    return fail(`Couldn't send right now. Please email me directly at ${profile.email}.`, 502);
  }
  return Response.json({ ok: true });
}
