import { resolveMx } from "node:dns/promises";

export type EmailCheck = { ok: true } | { ok: false; reason: string; suggestion?: string };

// Throwaway inboxes people use to skip a real reply
const disposable = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "yopmail.com",
  "trashmail.com",
  "getnada.com",
  "sharklasers.com",
  "dispostable.com",
  "maildrop.cc",
  "fakeinbox.com",
  "throwawaymail.com",
  "mailnesia.com",
  "emailondeck.com",
]);

// Common typos of popular providers → the domain they meant
const typos: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.cm": "gmail.com",
  "gamil.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahoo.co": "yahoo.com",
  "yahoo.con": "yahoo.com",
  "yhoo.com": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "hotmail.co": "hotmail.com",
  "hotmal.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "outlook.co": "outlook.com",
  "iclod.com": "icloud.com",
  "icloud.co": "icloud.com",
};

const pattern = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

const withTimeout = <T>(p: Promise<T>, ms: number) =>
  Promise.race([p, new Promise<never>((_, reject) => setTimeout(() => reject(new Error("ETIMEOUT")), ms))]);

/**
 * Checks that an address can actually receive mail: valid format, not a
 * throwaway inbox, not a typo, and the domain has mail servers (MX records).
 * Mail providers don't let anyone confirm a single mailbox, so this is the
 * strongest check possible without sending a code.
 */
export async function verifyEmail(raw: string): Promise<EmailCheck> {
  const email = raw.trim().toLowerCase();
  if (!email) return { ok: false, reason: "Please enter your email." };
  if (email.length > 254 || !pattern.test(email) || email.includes("..")) {
    return { ok: false, reason: "That doesn't look like a valid email address." };
  }

  const [local, domain] = email.split("@");
  if (typos[domain]) {
    return { ok: false, reason: "Check the spelling of your email.", suggestion: `${local}@${typos[domain]}` };
  }
  if (disposable.has(domain)) {
    return { ok: false, reason: "Please use a real email so I can reply to you." };
  }

  try {
    const mx = await withTimeout(resolveMx(domain), 4000);
    // A "null MX" (a single record pointing to ".") means the domain accepts no mail
    if (!mx.length || mx.every((r) => !r.exchange || r.exchange === ".")) {
      return { ok: false, reason: `${domain} can't receive emails. Please check your address.` };
    }
    return { ok: true };
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code ?? (err as Error).message;
    if (code === "ENOTFOUND" || code === "ENODATA" || code === "ENONAME") {
      return { ok: false, reason: `${domain} doesn't exist or can't receive emails. Please check your address.` };
    }
    // DNS hiccup on our side: don't block a real visitor over it
    return { ok: true };
  }
}
