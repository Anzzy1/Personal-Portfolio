import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile, siteUrl } from "@/content/profile";

// Shared social-preview cards (Messenger, LinkedIn, X, Slack…).
// The home card puts my face and name first; project cards reuse the
// same fonts and accent so every shared link looks like one brand.

export const ogSize = { width: 1200, height: 630 };

const ink = "#0f0f11";
const paper = "#fbfaf7";
const tangerine = "#f2541b";

async function photoDataUrl() {
  if (!profile.photo) return null;
  const file = await readFile(join(process.cwd(), "public", profile.photo));
  return `data:image/jpeg;base64,${file.toString("base64")}`;
}

// Bundled so the card renders the same everywhere (the default OG font has no bold)
async function loadFonts() {
  const font = (file: string) => readFile(join(process.cwd(), "assets", "fonts", file));
  const [bold, medium, serif] = await Promise.all([
    font("Geist-Bold.ttf"),
    font("Geist-Medium.ttf"),
    font("InstrumentSerif-Italic.ttf"),
  ]);
  return [
    { name: "Geist", data: bold, weight: 700 as const, style: "normal" as const },
    { name: "Geist", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Instrument Serif", data: serif, weight: 400 as const, style: "italic" as const },
  ];
}

function clamp(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1))}…`;
}

const host = () => siteUrl.replace(/^https?:\/\//, "");

/** Home card: big name, role, and my photo — reads as "this is my portfolio" */
export async function renderProfileOg() {
  const [photo, fonts] = await Promise.all([photoDataUrl(), loadFonts()]);
  const parts = profile.name.split(" ");
  const last = parts.pop();
  const first = parts.join(" ");
  // "Full-Stack & AI Developer" → "Full-Stack &" + serif "AI Developer"
  const [roleLead, roleAccent] = profile.title.includes("&")
    ? [profile.title.slice(0, profile.title.indexOf("&") + 1), profile.title.slice(profile.title.indexOf("&") + 1).trim()]
    : ["", profile.title];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: ink,
          // Warm glows behind the photo and under the name
          backgroundImage:
            "radial-gradient(circle at 82% 30%, rgba(242,84,27,0.34) 0%, rgba(242,84,27,0) 42%), radial-gradient(circle at 0% 100%, rgba(242,84,27,0.16) 0%, rgba(242,84,27,0) 45%)",
          color: paper,
          fontFamily: "Geist",
        }}
      >

        {/* Left: who I am */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 700,
            padding: "60px 0 58px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 12,
                background: tangerine,
                fontSize: 24,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {profile.initials.charAt(0)}
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>{profile.alias}</div>
            <div
              style={{
                display: "flex",
                marginLeft: 6,
                padding: "6px 14px",
                borderRadius: 999,
                border: "1.5px solid rgba(251,250,247,0.18)",
                fontSize: 17,
                fontWeight: 500,
                letterSpacing: 2.5,
                color: "rgba(251,250,247,0.7)",
              }}
            >
              PORTFOLIO
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 104, fontWeight: 700, lineHeight: 0.98, letterSpacing: -4.5 }}>
              {first}
            </div>
            <div style={{ display: "flex", fontSize: 104, fontWeight: 700, lineHeight: 0.98, letterSpacing: -4.5 }}>
              {last}
              <span style={{ color: tangerine }}>.</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 26, fontSize: 40, fontWeight: 500 }}>
              {roleLead ? <span style={{ color: "rgba(251,250,247,0.85)" }}>{roleLead}</span> : null}
              <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: 50, color: tangerine }}>
                {roleAccent}
              </span>
            </div>
            <div style={{ display: "flex", marginTop: 18, fontSize: 24, lineHeight: 1.4, color: "rgba(251,250,247,0.6)", maxWidth: 580 }}>
              Websites, web systems, and AI integrations that help businesses work smarter.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 21, fontWeight: 500 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                borderRadius: 999,
                background: paper,
                color: ink,
              }}
            >
              {host()}
              <span style={{ color: tangerine }}>→</span>
            </div>
            {profile.available ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(251,250,247,0.75)" }}>
                <div style={{ width: 11, height: 11, borderRadius: 999, background: "#3ccf7a" }} />
                {profile.availabilityText}
              </div>
            ) : null}
          </div>
        </div>

        {/* Right: my photo on a tilted accent card */}
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              width: 380,
              height: 470,
              borderRadius: 36,
              background: tangerine,
              transform: "rotate(6deg) translate(18px, 6px)",
            }}
          />
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              width={380}
              height={470}
              alt=""
              style={{
                borderRadius: 36,
                objectFit: "cover",
                objectPosition: "50% 20%",
                border: `6px solid ${paper}`,
                transform: "rotate(-2deg)",
              }}
            />
          ) : null}
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}

/** Project cards: the case study up front, with my face and name as the byline */
export async function renderOgImage({
  eyebrow,
  title,
  description,
  accent = tangerine,
}: {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
}) {
  const [photo, fonts] = await Promise.all([photoDataUrl(), loadFonts()]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: paper,
          color: "#141414",
          borderTop: `14px solid ${accent}`,
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              width={76}
              height={76}
              alt=""
              style={{ borderRadius: 999, objectFit: "cover", objectPosition: "50% 20%", border: "3px solid #ebe9e4" }}
            />
          ) : null}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>{profile.name}</div>
            <div style={{ fontSize: 22, fontWeight: 500, color: "#6b6b70" }}>{profile.title}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              fontWeight: 500,
              color: accent,
              textTransform: "uppercase",
              letterSpacing: 2.5,
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 999, background: accent }} />
            {eyebrow}
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>{title}</div>
          <div style={{ fontSize: 30, fontWeight: 500, color: "#4a4a50", lineHeight: 1.35, maxWidth: 980 }}>
            {clamp(description, 110)}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, fontWeight: 500, color: "#6b6b70" }}>
          <div>{host()}</div>
          <div style={{ display: "flex", color: accent }}>View case study →</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
