import type { Metadata } from "next";
import Link from "next/link";
import { fetchProducts, formatPrice } from "@/lib/checkout";
import { PricingViewTracker } from "@/components/PricingViewTracker";

export const metadata: Metadata = {
  title: "Preise",
  description:
    "Audit Assistant Preise: Abos für Einzelsachverständige und Kanzleien — Diktat, Fotos und Belege werden automatisch zum Gutachten im eigenen Stil.",
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  const products = await fetchProducts();

  return (
    <main className="min-h-screen bg-paper text-ink">
      <PricingViewTracker />
      <header className="flex items-center justify-between border-b border-ink/10 px-6 py-6 md:px-16 md:py-8">
        <Link href="/" className="text-[13px] uppercase tracking-[0.22em]">
          Audit Assistant
        </Link>
        <nav className="flex items-center gap-6 text-[11px] uppercase tracking-[0.22em] text-ink/60">
          <Link href="/blog" className="hover:text-ink">
            Blog
          </Link>
          <Link href="/#anfrage" className="hover:text-ink">
            Kontakt
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-16 md:py-28">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          01 — Preise
        </span>
        <h1 className="mt-4 max-w-[720px] text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.05] tracking-tight">
          Ein Abo pro Kanzlei, kein Kleingedrucktes.
        </h1>
        <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-ink/70">
          Wählen Sie den Rahmen, der zu Ihrer Fallzahl passt. Jedes Abo enthält das
          vollständige Stilarchiv, den Diktat-Workflow und die automatische Belegverarbeitung.
        </p>

        <div className="mt-16 grid grid-cols-1 border-t border-ink/10 md:grid-cols-2">
          {products.length === 0 && (
            <p className="border-b border-ink/10 py-10 text-[15px] text-ink/60 md:col-span-2">
              Die Preisliste wird gerade aktualisiert — bitte nehmen Sie über die{" "}
              <Link href="/#anfrage" className="underline">
                Kontaktanfrage
              </Link>{" "}
              Kontakt mit uns auf.
            </p>
          )}
          {products.map((p, i) => (
            <div
              key={p.id}
              className="flex flex-col justify-between border-b border-ink/10 py-10 pr-0 md:border-r md:py-12 md:pr-12 [&:nth-child(2)]:md:border-r-0 [&:nth-child(2)]:md:pl-12"
            >
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.25rem)] font-normal tracking-tight">
                  {p.name}
                </h2>
                <p className="mt-4 max-w-[380px] text-[14px] leading-relaxed text-ink/60">
                  {p.description}
                </p>
              </div>
              <div className="mt-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-[clamp(2.25rem,4vw,3rem)] font-normal tabular-nums">
                    {formatPrice(p.price_cents, p.currency)}
                  </span>
                  <span className="text-[13px] uppercase tracking-[0.14em] text-ink/50">
                    / Monat
                  </span>
                </div>
                <Link
                  href={`/signup?plan=${p.id}`}
                  className="mt-8 inline-block bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90"
                >
                  Jetzt starten
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
