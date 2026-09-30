import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Brand-, Sturm- und Schimmelschaden-Gutachten",
  description:
    "Wie Audit Assistant Brand-, Sturm- und Schimmelschaden-Gutachten aus Diktat, Fotos und Belegen zusammensetzt — Kostentabellen, Foto-Anlage und das eigene Stilarchiv inklusive.",
  alternates: { canonical: "/leistungen/brand-sturm-schimmelschaden-gutachten" },
};

const SCHADENARTEN = [
  {
    index: "01",
    name: "Brandschaden",
    lead: "Rußspuren, Brandausbreitung und Rauchschäden gehören lückenlos dokumentiert und begründet.",
    body: "Fotos vom Schadensbild werden dem passenden Berichtskapitel zugeordnet, das Diktat vor Ort transkribiert und Sanierungsangebote per Texterkennung ausgelesen — als Text im Bericht und als Anlage hinterlegt. Der Entwurf entsteht strukturiert mit Kostentabelle und Experta-Block, die fachliche Bewertung bleibt bei Ihnen.",
  },
  {
    index: "02",
    name: "Sturmschaden",
    lead: "Dach- und Fassadenschäden nach Sturm verlangen präzise Zuordnung von Fotos zu Deckungs- und Konstruktionsteilen.",
    body: "Angebote von Dachdecker- oder Sanierungsfirmen werden per Foto erfasst, per Texterkennung ausgelesen und automatisch in die Kostentabelle übernommen — kein manuelles Abtippen. Die Gliederung folgt Ihrer eigenen, tenant-editierbaren Vorlage.",
  },
  {
    index: "03",
    name: "Schimmelschaden",
    lead: "Feuchtemessprotokolle, Befallsflächen und Ursachenanalyse folgen oft wiederkehrenden Formulierungsmustern.",
    body: "Das Stilarchiv durchsucht Ihre eigenen, bereits abgeschlossenen Schimmelschadenfälle per Volltextsuche und liefert zitierfähige, mit Quellenangabe versehene Formulierungen für den nächsten Entwurf — kein anonymer KI-Text, sondern Ihr eigener, wachsender Bestand.",
  },
] as const;

const FAQS = [
  {
    q: "Deckt Audit Assistant auch Brand-, Sturm- und Schimmelschaden-Gutachten ab?",
    a: "Ja. Neben Wasserschaden gehören Brandschaden, Sturmschaden, Schimmel und vergleichbare Bau- und Versicherungsschäden zum Anwendungsbereich. KFZ- oder Fahrzeugschäden sind kein Anwendungsfall.",
  },
  {
    q: "Wie wird die Foto-Dokumentation eines Brand- oder Sturmschadens verarbeitet?",
    a: "Fotos werden als Beilagen dem Gutachten zugeordnet und einzelnen Berichtskapiteln zugewiesen, sodass Schadensbild und Textbefund im fertigen Entwurf zusammenpassen.",
  },
  {
    q: "Wie werden Angebote von Dachdecker- oder Sanierungsfirmen bei Sturm- oder Schimmelschäden erfasst?",
    a: "Fotografierte oder gescannte Angebote und Rechnungen werden per Texterkennung ausgelesen und automatisch als Text sowie als Anlage in die Kostentabelle des Gutachtens übernommen.",
  },
  {
    q: "Greift der Entwurf auf frühere eigene Brand-, Sturm- oder Schimmelschaden-Gutachten zurück?",
    a: "Ja, sofern vorhanden. Jedes abgeschlossene Gutachten wird automatisch ins tenant-eigene Stilarchiv übernommen; eine hybride Volltextsuche liefert daraus passende Formulierungen mit Quellenangabe zum jeweiligen Altfall.",
  },
  {
    q: "Bleibt die fachliche Bewertung bei Brand-, Sturm- und Schimmelschäden beim Sachverständigen?",
    a: "Ja. Audit Assistant assistiert bei der Zusammenstellung des Entwurfs; die integrierte Review-Stufe unterstützt die Prüfung, Freigabe und Verantwortung bleiben beim Sachverständigen.",
  },
] as const;

export default function BrandSturmSchimmelschadenPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Gutachten-Zusammenstellung für Brand-, Sturm- und Schimmelschäden",
    name: "Brand-, Sturm- und Schimmelschaden-Gutachten mit Audit Assistant",
    description:
      "Zusammenstellung von Brand-, Sturm- und Schimmelschaden-Gutachten aus Diktat, Fotos und Belegen, mit tenant-eigenem Stilarchiv und editierbaren Vorlagen.",
    provider: { "@type": "Organization", name: "Audit Assistant", url: SITE_URL },
    areaServed: "DE",
    audience: {
      "@type": "Audience",
      audienceType: "Bausachverständige, Versicherungssachverständige, Gutachter, Schadensregulierer",
    },
    url: `${SITE_URL}/leistungen/brand-sturm-schimmelschaden-gutachten`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
          Leistung
        </span>
        <h1 className="mt-4 max-w-[720px] text-[clamp(2.25rem,5vw,3.5rem)] font-normal leading-[1.05] tracking-tight">
          Brand-, Sturm- und Schimmelschaden-Gutachten
        </h1>
        <p className="mt-6 max-w-[600px] text-[15px] leading-relaxed text-ink/70">
          Neben Wasserschaden deckt Audit Assistant weitere Bau- und Versicherungsschäden ab:
          Brandschaden, Sturmschaden und Schimmel. Diktat, Fotos und Belege aus dem Ortstermin
          werden automatisch zu einem vollständigen, prüfbaren Entwurf zusammengesetzt — in
          Ihrem eigenen Stil.
        </p>

        <div className="mt-14 border-t border-ink/10">
          {SCHADENARTEN.map((item) => (
            <div key={item.name} className="grid gap-4 border-b border-ink/10 py-8 md:grid-cols-[3rem_1fr_1fr] md:gap-8">
              <span className="font-mono text-[11px] text-accent">{item.index}</span>
              <div>
                <h2 className="text-[1.0625rem] font-normal md:text-[1.25rem]">{item.name}</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/60">{item.lead}</p>
              </div>
              <p className="text-[14px] leading-relaxed text-ink/70">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Fragen &amp; Antworten
          </span>
          <div className="mt-8 border-t border-ink/10">
            {FAQS.map((item, i) => (
              <details key={item.q} className="group border-b border-ink/10 py-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-baseline gap-6">
                  <span className="font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[1.0625rem] font-normal md:text-[1.25rem]">
                    {item.q}
                  </span>
                  <span aria-hidden className="font-mono text-[13px] text-ink/40 group-open:hidden">
                    +
                  </span>
                  <span aria-hidden className="hidden font-mono text-[13px] text-ink/40 group-open:inline">
                    −
                  </span>
                </summary>
                <p className="mt-4 max-w-[640px] pl-[3.25rem] text-[14px] leading-relaxed text-ink/65">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        <p className="mt-16 flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href="/blog/2026-08-27-wasserschaden-gutachten-automatisieren"
            className="text-[11px] uppercase tracking-[0.18em] text-accent underline-offset-4 hover:underline"
          >
            Verwandt: Wasserschaden-Gutachten automatisieren →
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
