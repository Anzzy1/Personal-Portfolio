import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile, siteUrl } from "@/content/profile";

// Shared social-preview card (Messenger, LinkedIn, X, Slack…).
// Mirrors the site's warm paper + ink look with the tangerine accent.

export const ogSize = { width: 1200, height: 630 };

async function photoDataUrl() {
  if (!profile.photo) return null;
  const file = await readFile(join(process.cwd(), "public", profile.photo));
  return `data:image/jpeg;base64,${file.toString("base64")}`;
}

function clamp(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1))}…`;
}

export async function renderOgImage({
  eyebrow,
  title,
  description,
  accent = "#f2541b",
}: {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
}) {
  const photo = await photoDataUrl();
  const host = siteUrl.replace(/^https?:\/\//, "");

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
          background: "#fbfaf7",
          color: "#141414",
          borderTop: `14px solid ${accent}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              width={72}
              height={72}
              alt=""
              style={{ borderRadius: 999, objectFit: "cover", border: "3px solid #ebe9e4" }}
            />
          ) : null}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>{profile.alias}</div>
            <div style={{ fontSize: 22, color: "#6b6b70" }}>{profile.name}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 24,
              fontWeight: 600,
              color: accent,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 999, background: accent }} />
            {eyebrow}
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {title}
          </div>
          <div style={{ fontSize: 30, color: "#3a3a3f", lineHeight: 1.35, maxWidth: 960 }}>
            {clamp(description, 140)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#6b6b70",
          }}
        >
          <div>{host}</div>
          {profile.available ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#1e6b3a" }}>
              <div style={{ width: 12, height: 12, borderRadius: 999, background: "#2f9e5b" }} />
              {profile.availabilityText}
            </div>
          ) : null}
        </div>
      </div>
    ),
    ogSize,
  );
}
