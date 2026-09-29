import type { Metadata } from "next";
import Link from "next/link";
import { FAQS } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Häufige Fragen",
  description:
    "Antworten zu Audit Assistant: Diktat-Workflow, Stilarchiv, Vorlagen, Belegverarbeitung und Pläne für Bau- und Versicherungsgutachten.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
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
          <Link href="/blog" className="hover:text-ink">
            Blog
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-[900px] px-6 py-20 md:px-16 md:py-28">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">FAQ</span>
        <h1 className="mt-4 max-w-[720px] text-[clamp(2.25rem,5vw,3.5rem)] font-normal leading-[1.05] tracking-tight">
          Häufige Fragen
        </h1>
        <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-ink/70">
          Kurze, verbindliche Antworten zu Funktionsumfang, Arbeitsweise und Grenzen von
          Audit Assistant — für Bau- und Versicherungssachverständige.
        </p>

        <div className="mt-14 border-t border-ink/10">
          {FAQS.map((item, i) => (
            <details key={item.q} className="group border-b border-ink/10 py-6" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-baseline gap-6">
                <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-[1.0625rem] font-normal md:text-[1.25rem]">{item.q}</span>
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

        <p className="mt-16">
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
