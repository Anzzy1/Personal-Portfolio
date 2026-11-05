import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { profile, siteUrl } from "@/content/profile";
import { Providers } from "@/components/layout/providers";
import { AppShell } from "@/components/layout/app-shell";
import { DitherIntro } from "@/components/layout/dither-intro";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

// Professional display face for the "Anzyy Dev" wordmark
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Name first (what people search), then what the site is — "Portfolio" tells searchers what they'll get
const defaultTitle = `${profile.name} | ${profile.title} Portfolio`;
const description = `Portfolio of ${profile.name} (${profile.alias}), a freelance full-stack & AI developer from the Philippines. See websites, web systems, AI chatbots, and apps I've built — and hire me for yours.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${profile.name}`,
  },
  description,
  applicationName: profile.alias,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Mohamad Anzar Pangcoga",
    profile.alias,
    "Anzyy",
    "anzyydev",
    "full-stack developer Philippines",
    "AI developer Philippines",
    "freelance web developer",
    "AI chatbot developer",
    "Next.js developer",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Set GOOGLE_SITE_VERIFICATION in your hosting env if you verify Search Console via meta tag
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    title: defaultTitle,
    description,
    type: "website",
    siteName: profile.alias,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description },
};

// Structured data so Google knows who this site is about (name, alias, socials)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      alternateName: [profile.alias, "Mohamad Anzar Pangcoga", "Anzyy"],
      jobTitle: profile.title,
      description: profile.tagline,
      url: siteUrl,
      image: profile.photo ? `${siteUrl}${profile.photo}` : undefined,
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressCountry: "PH" },
      sameAs: profile.socials.map((s) => s.href).filter(Boolean),
      worksFor: { "@id": `${siteUrl}/#brand` },
      knowsAbout: ["Web development", "Full-stack development", "AI integrations", "Chatbots", "Next.js", "React"],
    },
    {
      // Brand entity with a logo — gives Google an explicit logo image for the site
      "@type": "Organization",
      "@id": `${siteUrl}/#brand`,
      name: profile.alias,
      url: siteUrl,
      logo: `${siteUrl}/icon-512.png`,
      founder: { "@id": `${siteUrl}/#person` },
      sameAs: profile.socials.map((s) => s.href).filter(Boolean),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: profile.alias,
      alternateName: [profile.name, "anzyydev.com"],
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${figtree.variable} ${instrumentSerif.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Providers>
          <DitherIntro />
          <ScrollProgress />
          <AppShell>
            {children}
            <Footer />
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
