import { projects } from "@/content/projects";
import { buildSystemPrompt } from "@/lib/ai/context";

// Per-IP limit so a public endpoint can't burn through the Groq quota
const hits = new Map<string, number[]>();
const limit = 20;
const windowMs = 10 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > limit;
}

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
// Each Groq model has its own per-minute token limit, so when one is busy
// the next one answers. GROQ_MODEL overrides the first choice.
const MODELS = [process.env.GROQ_MODEL ?? "openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.8-27b"];

const MAX_MESSAGES = 12;
const MAX_CHARS = 2000;

type ChatTurn = { role: "user" | "assistant"; content: string };
type Incoming = { role?: unknown; content?: unknown };

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Page links worth offering, based on what the answer actually mentions */
function linksFor(answer: string) {
  const text = answer.toLowerCase();
  const links: { label: string; href: string }[] = [];

  for (const p of projects) {
    if (text.includes(p.title.toLowerCase())) {
      links.push({ label: p.title, href: `/work/${p.slug}` });
    }
  }

  if (/\bservices?\b|\bpricing\b|\bquote\b/.test(text)) links.push({ label: "Services", href: "/services" });
  if (/\bcontact\b|\bemail\b|\bhire\b|\bavailable\b|\bbook\b/.test(text)) {
    links.push({ label: "Contact", href: "/contact" });
  }
  if (/\bexperience\b|\bbackground\b|\btech stack\b|\bhis stack\b|\babout him\b/.test(text)) {
    links.push({ label: "About", href: "/about" });
  }
  if (/\bfounding\b|\/claim\b/.test(text)) links.push({ label: "Claim a spot", href: "/claim" });
  if (/\bcertificat|\baward\b|\bfreecodecamp\b/.test(text)) {
    links.push({ label: "Certifications", href: "/certifications" });
  }
  if (/\btestimonials?\b|\breviews?\b/.test(text)) links.push({ label: "Testimonials", href: "/testimonials" });

  const seen = new Set<string>();
  return links.filter((l) => (seen.has(l.href) ? false : (seen.add(l.href), true))).slice(0, 3);
}

/** Lets the UI show whether a real model is connected */
export async function GET() {
  return Response.json({ configured: Boolean(process.env.GROQ_API_KEY) });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as { messages?: unknown } | null;
  const raw = Array.isArray(body?.messages) ? (body!.messages as Incoming[]) : null;
  if (!raw?.length) return Response.json({ ok: false, error: "No messages." }, { status: 400 });

  const messages: ChatTurn[] = raw
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: str(m.content, MAX_CHARS),
    }))
    .filter((m) => m.content.length > 0);

  if (!messages.length) return Response.json({ ok: false, error: "No messages." }, { status: 400 });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    // The client falls back to the offline demo responder
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const system = buildSystemPrompt(messages);
  let res: Response | null = null;

  for (const model of [...new Set(MODELS)]) {
    const payload: Record<string, unknown> = {
      model,
      messages: [{ role: "system", content: system }, ...messages],
      // Low temperature keeps answers close to the context
      temperature: 0.3,
      max_completion_tokens: 900,
      top_p: 1,
    };
    // gpt-oss spends part of the budget on reasoning; keep it low for chat replies
    if (model.includes("gpt-oss")) payload.reasoning_effort = "low";
    // Qwen thinks out loud by default; hide that from the visitor
    if (model.includes("qwen")) payload.reasoning_format = "hidden";

    res = await fetch(GROQ_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(20_000),
    }).catch(() => null);

    // Rate-limited or down: try the next model
    if (res?.ok || (res && res.status !== 429 && res.status < 500)) break;
    console.warn(`[chat] ${model} unavailable (${res?.status ?? "network"}), trying the next model`);
  }

  if (!res?.ok) {
    console.error("[chat] Groq error", res?.status, await res?.text());
    return Response.json({ ok: false, error: "upstream" }, { status: 502 });
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const content = data.choices?.[0]?.message?.content
    ?.replace(/[\u2010\u2011]/g, "-")
    .replace(/[\u00a0\u2007\u202f]/g, " ")
    .trim();

  if (!content) {
    console.error("[chat] Groq returned an empty reply");
    return Response.json({ ok: false, error: "empty" }, { status: 502 });
  }

  return Response.json({ ok: true, content, links: linksFor(content) });
}
