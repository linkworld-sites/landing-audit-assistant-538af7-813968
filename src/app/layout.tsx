import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { EditBridge } from "@/components/EditBridge";
import { CookieConsent } from "@/components/CookieConsent";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Audit Assistant — Gutachten in Minuten statt Stunden",
    template: "%s · Audit Assistant",
  },
  description:
    "Audit Assistant verwandelt Diktat, Fotos und Belege in ein vollständiges, verteidigungsfähiges Gutachten für Bau- und Versicherungsschäden.",
  verification: { google: "WlJ66mw7eszwjs5WXh-HAJ_3n22gXQA1yf23ABf0enE" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Audit Assistant",
      url: SITE_URL,
      description:
        "Audit Assistant verwandelt Diktat, Fotos und Belege per KI in vollständige, verteidigungsfähige Gutachten für Bau- und Versicherungsschäden — mit einem mitwachsenden, kanzleieigenen Stilarchiv.",
      knowsAbout: [
        "Bauschaden-Gutachten",
        "Versicherungsschaden-Gutachten",
        "Wasserschaden-Gutachten",
        "Brandschaden-Gutachten",
        "Sturmschaden-Gutachten",
        "Schimmelschaden-Gutachten",
        "Diktat-Transkription für Sachverständige",
        "Stilarchiv und Vorlagenverwaltung für Gutachten",
      ],
    },
    { "@type": "WebSite", name: "Audit Assistant", url: SITE_URL, inLanguage: "de" },
    {
      "@type": "SoftwareApplication",
      name: "Audit Assistant",
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "KI-gestützte Gutachten-Zusammenstellung für Bau- und Versicherungssachverständige: Diktat-Transkription, Foto- und Belegverarbeitung, tenant-eigenes Stilarchiv und editierbare Vorlagen.",
      offers: [
        {
          "@type": "Offer",
          name: "Solo",
          price: "89.00",
          priceCurrency: "EUR",
          description:
            "Für Einzelsachverständige. Bis 15 Gutachten pro Monat, eigenes Stilarchiv, Diktat- und Foto-Workflow.",
        },
        {
          "@type": "Offer",
          name: "Kanzlei",
          price: "249.00",
          priceCurrency: "EUR",
          description:
            "Für Teams und Kanzleien. Unbegrenzte Gutachten, mehrere Nutzer, geteiltes Stilarchiv und Vorlagen.",
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${plexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <FunnelTracker />
        <EditBridge />
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
