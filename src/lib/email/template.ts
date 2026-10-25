import { profile, siteUrl } from "@/content/profile";

export type Inquiry = {
  kind: "contact" | "claim";
  name: string;
  email: string;
  message: string;
  business?: string;
  services?: string[];
  page?: string;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// Gmail drops white-space: pre-wrap, so line breaks become <br>
const paragraphs = (s: string) => esc(s).replace(/\r?\n/g, "<br>");

const c = {
  accent: "#f2541b",
  accentSoft: "#fff1eb",
  accentLine: "#fbd5c5",
  ink: "#1c1917",
  body: "#44403c",
  muted: "#78716c",
  line: "#eee8e2",
  page: "#f4f1ed",
  panel: "#faf8f5",
  success: "#1f7a45",
  successSoft: "#e8f6ee",
};
const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

/** A small label above a section */
const label = (text: string) =>
  `<p style="margin:0 0 8px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${c.muted};">${text}</p>`;

/**
 * The email I receive for each form submission. Built with tables, inline
 * styles, and solid colors so it looks the same in Gmail (web and app),
 * Outlook, and Apple Mail.
 */
export function renderInquiryEmail(q: Inquiry) {
  const isClaim = q.kind === "claim";
  const firstName = q.name.split(/\s+/)[0];
  const sentAt = new Intl.DateTimeFormat("en-PH", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Manila",
  }).format(new Date());

  const subject = isClaim
    ? `New founding client: ${q.name}${q.business ? ` (${q.business})` : ""}`
    : `New inquiry from ${q.name}${q.business ? ` (${q.business})` : ""}`;
  const heading = isClaim ? `${firstName} claimed a founding client spot` : `${firstName} sent you a message`;
  const tag = isClaim ? "Founding client" : "New inquiry";
  const services = q.services?.length ? q.services : [];
  const replyHref = `mailto:${esc(q.email)}?subject=${encodeURIComponent(
    isClaim ? "Re: Your founding client spot" : "Re: Your message on my portfolio",
  )}`;
  const pageUrl = siteUrl + (q.page ?? "");

  const chips = services
    .map(
      (s) =>
        `<span style="display:inline-block;margin:0 6px 6px 0;padding:6px 12px;border-radius:999px;background:${c.accentSoft};border:1px solid ${c.accentLine};color:#b83d10;font-size:13px;line-height:18px;font-weight:600;">${esc(s)}</span>`,
    )
    .join("");

  // Quick facts shown as a two-column grid that stacks on phones
  const facts = [
    q.business && ["Business", esc(q.business)],
    ["Form", isClaim ? "Founding client claim" : "Contact page"],
    ["Received", `${esc(sentAt)}<br><span style="color:${c.muted};font-weight:400;">Philippine time</span>`],
  ].filter(Boolean) as [string, string][];

  const factCells = facts
    .map(
      ([k, v]) => `
      <td class="stack" valign="top" style="padding:0 6px 12px;width:${Math.floor(100 / facts.length)}%;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.panel};border:1px solid ${c.line};border-radius:12px;">
          <tr><td style="padding:12px 14px;">
            ${label(k)}
            <p style="margin:0;font-size:14px;line-height:20px;font-weight:600;color:${c.ink};">${v}</p>
          </td></tr>
        </table>
      </td>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(subject)}</title>
<style>
  @media (max-width: 560px) {
    .pad { padding-left: 20px !important; padding-right: 20px !important; }
    .pad-grid { padding-left: 14px !important; padding-right: 14px !important; }
    .stack { display: block !important; width: 100% !important; box-sizing: border-box; }
    .h1 { font-size: 22px !important; line-height: 28px !important; }
    .btn { display: block !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${c.page};font-family:${font};-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(q.message.slice(0, 140))}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${c.page}" style="background:${c.page};">
    <tr><td align="center" style="padding:28px 12px 40px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <!-- Brand -->
        <tr><td style="padding:0 4px 14px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="font-size:14px;font-weight:700;color:${c.ink};">
              <span style="display:inline-block;width:22px;height:22px;line-height:22px;border-radius:6px;background:${c.accent};color:#ffffff;font-size:11px;text-align:center;vertical-align:middle;">${esc(profile.initials)}</span>
              <span style="vertical-align:middle;padding-left:6px;">${esc(profile.alias)}</span>
            </td>
            <td align="right" style="font-size:12px;color:${c.muted};">Portfolio form</td>
          </tr></table>
        </td></tr>

        <!-- Card -->
        <tr><td bgcolor="#ffffff" style="background:#ffffff;border:1px solid ${c.line};border-radius:18px;overflow:hidden;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td height="5" bgcolor="${c.accent}" style="background:${c.accent};font-size:0;line-height:0;">&nbsp;</td></tr>

            <!-- Heading -->
            <tr><td class="pad" style="padding:28px 32px 6px;">
              <span style="display:inline-block;padding:4px 10px;border-radius:999px;background:${c.accentSoft};color:${c.accent};font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">${tag}</span>
              <h1 class="h1" style="margin:14px 0 6px;font-size:26px;line-height:32px;font-weight:700;letter-spacing:-0.4px;color:${c.ink};">${esc(heading)}</h1>
              <p style="margin:0;font-size:15px;line-height:22px;color:${c.muted};">Reply ${esc(profile.responseTime.replace(/^replies /i, "").toLowerCase())} to keep your promise on the site.</p>
            </td></tr>

            <!-- Sender -->
            <tr><td class="pad" style="padding:22px 32px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${c.line};border-radius:14px;">
                <tr><td style="padding:16px 18px;">
                  <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                    <td width="46" valign="middle" style="width:46px;min-width:46px;">
                      <div style="width:46px;height:46px;line-height:46px;border-radius:999px;background:${c.ink};color:#ffffff;font-size:19px;font-weight:700;text-align:center;">${esc(q.name.charAt(0).toUpperCase())}</div>
                    </td>
                    <td style="padding-left:14px;">
                      <p style="margin:0;font-size:17px;line-height:22px;font-weight:700;color:${c.ink};">${esc(q.name)}</p>
                      <p style="margin:3px 0 0;font-size:14px;line-height:20px;">
                        <a href="mailto:${esc(q.email)}" style="color:${c.accent};text-decoration:none;">${esc(q.email)}</a>
                        <span style="display:inline-block;margin-left:6px;padding:1px 8px;border-radius:999px;background:${c.successSoft};color:${c.success};font-size:11px;line-height:18px;font-weight:700;">&#10003; Email checked</span>
                      </p>
                    </td>
                  </tr></table>
                </td></tr>
              </table>
            </td></tr>

            <!-- Facts -->
            <tr><td class="pad-grid" style="padding:14px 26px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${factCells}</tr></table>
            </td></tr>

            ${
              services.length || isClaim
                ? `<!-- Services -->
            <tr><td class="pad" style="padding:6px 32px 4px;">
              ${label("Interested in")}
              ${chips || `<span style="font-size:14px;color:${c.body};">Not sure yet, wants advice</span>`}
            </td></tr>`
                : ""
            }

            <!-- Message -->
            <tr><td class="pad" style="padding:14px 32px 4px;">
              ${label("Message")}
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${c.panel}" style="background:${c.panel};border-radius:12px;">
                <tr>
                  <td width="4" bgcolor="${c.accent}" style="width:4px;background:${c.accent};border-radius:12px 0 0 12px;font-size:0;">&nbsp;</td>
                  <td style="padding:16px 18px;font-size:15px;line-height:24px;color:${c.body};word-break:break-word;">${paragraphs(q.message)}</td>
                </tr>
              </table>
            </td></tr>

            <!-- Reply -->
            <tr><td class="pad" align="center" style="padding:26px 32px 8px;">
              <a class="btn" href="${replyHref}" style="display:inline-block;padding:14px 30px;border-radius:999px;background:${c.ink};color:#ffffff;font-size:15px;line-height:20px;font-weight:700;text-decoration:none;">Reply to ${esc(firstName)} &rarr;</a>
            </td></tr>
            <tr><td class="pad" align="center" style="padding:0 32px 28px;">
              <p style="margin:0;font-size:13px;line-height:19px;color:${c.muted};">Or just hit Reply in Gmail. It goes straight to ${esc(q.email)}.</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding:18px 12px 0;font-size:12px;line-height:18px;color:#a8a29e;">
          Sent from <a href="${esc(pageUrl)}" style="color:${c.muted};text-decoration:underline;">${esc(pageUrl.replace(/^https?:\/\//, ""))}</a><br>
          You get this because someone filled in a form on your portfolio.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    heading,
    `${sentAt} (Philippine time)`,
    "",
    `Name: ${q.name}`,
    `Email: ${q.email}`,
    q.business ? `Business: ${q.business}` : null,
    services.length ? `Interested in: ${services.join(", ")}` : isClaim ? "Interested in: Not sure yet" : null,
    `Form: ${isClaim ? "Founding client claim" : "Contact page"}`,
    "",
    "Message:",
    q.message,
    "",
    `Hit reply to answer ${firstName} directly.`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return { subject, html, text };
}
