import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Über Audit Assistant",
  description:
    "Audit Assistant: KI-gestützte Gutachten-Zusammenstellung für Bau- und Versicherungssachverständige — was die Software leistet, für wen sie gebaut ist und was sie von generischen KI-Tools unterscheidet.",
  alternates: { canonical: "/ueber-uns" },
};

const CAPABILITIES = [
  {
    index: "01",
    name: "Stilarchiv",
    items: [
      "Automatische Archivierung abgeschlossener Fälle",
      "Sofortige und Bulk-Einlieferung bestehender Altgutachten",
      "Hybride Volltextsuche mit Quellenangabe",
      "Kennzahlen zum Archivbestand",
    ],
  },
  {
    index: "02",
    name: "Diktat & Transkription",
    items: [
      "Sprachaufnahme direkt im Browser",
      "Synchrone und asynchrone Transkription mit Statusabfrage",
      "Wiedergabe der Original-Aufnahme",
    ],
  },
  {
    index: "03",
    name: "Belege & Fotos",
    items: [
      "Foto-Galerie je Fall, Drag-and-drop-Upload",
      "Automatische Zuordnung von Fallfotos zum passenden Kapitel",
      "Texterkennung gescannter Angebote",
      "Automatische Übernahme von Rechnungs- und Angebotstexten in die Kostentabelle",
    ],
  },
  {
    index: "04",
    name: "Entwurf & Vorlagen",
    items: [
      "KI-gestützte Gutachten-Generierung aus Diktat, Fotos und Belegen",
      "Tenant-eigene, editierbare Berichtsvorlage mit sicherem Standard-Fallback",
      "Editierbare Berichtsstruktur mit Kostentabelle",
      "Prüfstufe vor Fertigstellung",
    ],
  },
  {
    index: "05",
    name: "Einbettung",
    items: [
      "Aufrufbar als Werkzeug aus einer KI-Assistenten-Umgebung",
      "Fallverwaltung mit Fortschrittsübersicht",
    ],
  },
] as const;

const USPS = [
  {
    index: "01",
    name: "Mitwachsendes Stilarchiv",
    body: "Jedes abgeschlossene Gutachten einer Kanzlei füllt automatisch das eigene Stilarchiv. Die hybride Suche darin wird mit jedem Fall präziser — ein Bestand, den kein Wettbewerber ohne Jahre derselben Kundschaft und Arbeitsweise nachbilden kann.",
  },
  {
    index: "02",
    name: "Tenant-eigene Vorlagen treiben die Generierung",
    body: "Der Entwurf folgt der im Vorlagen-Editor hinterlegten, kanzleieigenen Struktur statt einer generischen Standardform — mit sicherem Fallback, wenn keine eigene Vorlage existiert.",
  },
  {
    index: "03",
    name: "Belegkette statt Einzelfunktion",
    body: "Foto-Zuordnung, Texterkennung gescannter Angebote, Rechnungs-Extraktion und Bild-Platzierung im Bericht laufen als eine Kette zusammen — nicht als isolierte Werkzeuge.",
  },
  {
    index: "04",
    name: "Hintergrund-Jobs für Diktat und Archiv",
    body: "Transkription und Stilarchiv-Einlieferung laufen als abfragbare Hintergrundprozesse im selben Fall-Workflow, ohne die Arbeit am Fall zu unterbrechen.",
  },
] as const;

export default function UeberUnsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Über Audit Assistant",
    url: `${SITE_URL}/ueber-uns`,
    description: metadata.description,
    mainEntity: {
      "@type": "Organization",
      name: "Audit Assistant",
      url: SITE_URL,
      description:
        "Audit Assistant verwandelt Diktat, Fotos und Belege per KI automatisch in vollständige, professionelle Bau- und Versicherungsgutachten — mit einem mitwachsenden, kanzleieigenen Stilarchiv.",
      slogan:
        "Audit Assistant verwandelt Diktat, Fotos und Belege per KI automatisch in vollständige, professionelle Bau- und Versicherungsgutachten.",
      knowsAbout: [
        "Bauschaden-Gutachten",
        "Versicherungsschaden-Gutachten",
        "Diktat-Transkription für Sachverständige",
        "Stilarchiv und Vorlagenverwaltung für Gutachten",
      ],
      areaServed: "DE",
      audience: {
        "@type": "Audience",
        audienceType:
          "Bausachverständige, Versicherungssachverständige, Gutachter, Schadensregulierer",
      },
    },
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="flex items-center justify-between border-b border-ink/10 px-6 py-6 md:px-16 md:py-8">
        <Link href="/" className="text-[13px] uppercase tracking-[0.22em]">
          Audit Assistant
        </Link>
        <nav className="flex items-center gap-6 text-[11px] uppercase tracking-[0.22em] text-ink/60">
          <Link href="/pricing" className="hover:text-ink">
            Preise
          </Link>
          <Link href="/faq" className="hover:text-ink">
            FAQ
          </Link>
          <Link href="/blog" className="hover:text-ink">
            Blog
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-[900px] px-6 py-20 md:px-16 md:py-28">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          Über uns
        </span>
        <h1 className="mt-4 max-w-[720px] text-[clamp(2.25rem,5vw,3.5rem)] font-normal leading-[1.05] tracking-tight">
          Was Audit Assistant ist — und für wen.
        </h1>
        <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-ink/70">
          Audit Assistant verwandelt Diktat, Fotos und Belege per KI automatisch in
          vollständige, professionelle Bau- und Versicherungsgutachten — mit einem
          mitwachsenden, kanzleieigenen Stilarchiv, das kein Wettbewerber ohne Jahre
          gleicher Workflows replizieren kann.
        </p>
        <p className="mt-4 max-w-[620px] text-[15px] leading-relaxed text-ink/70">
          Gebaut für Bausachverständige, Versicherungssachverständige, Gutachter und
          Schadensregulierer, die formale Gutachten erstellen und schnellere, konsistente
          Berichtserstellung brauchen — ohne fachliche Sorgfalt zu verlieren. Kein
          Anwendungsfall für KFZ- oder Fahrzeuggutachten; der Fokus liegt auf Bau- und
          Versicherungsschäden wie Wasserschaden, Brandschaden, Sturmschaden, Schimmel
          und Risse.
        </p>

        <h2 className="mt-20 text-[11px] uppercase tracking-[0.18em] text-ink/50">
          Was die Software unterscheidet
        </h2>
        <div className="mt-6 border-t border-ink/10">
          {USPS.map((u) => (
            <div key={u.index} className="flex gap-6 border-b border-ink/10 py-6">
              <span className="font-mono text-[11px] text-accent">{u.index}</span>
              <div>
                <h3 className="text-[1.0625rem] font-normal">{u.name}</h3>
                <p className="mt-2 max-w-[560px] text-[14px] leading-relaxed text-ink/65">
                  {u.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-20 text-[11px] uppercase tracking-[0.18em] text-ink/50">
          Funktionsumfang
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-ink/10 pt-10 md:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <div key={c.index}>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[11px] text-accent">{c.index}</span>
                <h3 className="text-[1.0625rem] font-normal">{c.name}</h3>
              </div>
              <ul className="mt-3 space-y-2 pl-[2.25rem] text-[14px] leading-relaxed text-ink/65">
                {c.items.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="mt-20 text-[11px] uppercase tracking-[0.18em] text-ink/50">
          Pläne
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-8 border-t border-ink/10 pt-10 md:grid-cols-2">
          <div className="border border-ink/10 p-6">
            <h3 className="text-[1.0625rem] font-normal">Solo — 89 € / Monat</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink/65">
              Für Einzelsachverständige. Bis 15 Gutachten pro Monat, eigenes Stilarchiv,
              Diktat- und Foto-Workflow.
            </p>
          </div>
          <div className="border border-ink/10 p-6">
            <h3 className="text-[1.0625rem] font-normal">Kanzlei — 249 € / Monat</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink/65">
              Für Teams und Kanzleien. Unbegrenzte Gutachten, mehrere Nutzer, geteiltes
              Stilarchiv und Vorlagen.
            </p>
          </div>
        </div>

        <p className="mt-16 flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href="/pricing"
            className="text-[11px] uppercase tracking-[0.18em] text-accent underline-offset-4 hover:underline"
          >
            Preise im Detail →
          </Link>
          <Link
            href="/faq"
            className="text-[11px] uppercase tracking-[0.18em] text-accent underline-offset-4 hover:underline"
          >
            Häufige Fragen →
          </Link>
          <Link
            href="/"
            className="text-[11px] uppercase tracking-[0.18em] text-accent underline-offset-4 hover:underline"
          >
            ← Zur Startseite
          </Link>
        </p>
      </section>
    </main>
  );
}
