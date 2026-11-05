import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} · ${profile.alias} Portfolio`,
    short_name: profile.alias,
    description: profile.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f11",
    theme_color: "#0f0f11",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
