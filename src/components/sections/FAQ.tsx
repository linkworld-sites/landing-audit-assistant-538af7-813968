"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { WordStagger } from "@/components/WordStagger";

const FAQS = [
  {
    q: "Ersetzt Audit Assistant den Sachverständigen?",
    a: "Nein. Audit Assistant assistiert bei der Erstellung — Diktat, Fotos und Belege werden zu einem vollständigen Gutachten‑Entwurf zusammengeführt. Freigabe, fachliche Bewertung und Verantwortung bleiben beim Sachverständigen; die integrierte Kritik‑Stufe unterstützt die Prüfung vor Export.",
  },
  {
    q: "Welche Schadenarten deckt das Tool ab?",
    a: "Bau- und Versicherungsschäden: Wasserschaden, Brandschaden, Sturmschaden, Schimmel, Risse und vergleichbare Gutachten. KFZ‑ oder Fahrzeugschäden sind kein Anwendungsfall.",
  },
  {
    q: "Wie entsteht der Berichtsentwurf aus Diktat, Fotos und Belegen?",
    a: "Diktate werden im Hintergrund transkribiert, wobei fallbezogene Namen und Begriffe für eine genaue Erkennung an die Spracherkennung übergeben werden. Fotos werden der Anlage zugeordnet, Angebote und Rechnungen per OCR ausgelesen und als Text und Bild ins Gutachten übernommen. Daraus entsteht ein strukturierter Entwurf mit Kostentabelle und Experta‑Block.",
  },
  {
    q: "Was ist das Stilarchiv und wie wächst es?",
    a: "Jedes abgeschlossene Gutachten wird automatisch ins Stilarchiv übernommen; ältere Berichte lassen sich zusätzlich per Sammel‑Import einspielen. Eine hybride Suche liefert zitierfähige Ausschnitte aus dem eigenen Bestand, sodass der Baustil eines Hauses mit jedem Fall präziser wird.",
  },
  {
    q: "Werden eigene Berichtsvorlagen berücksichtigt?",
    a: "Ja. Ist eine eigene Freitext‑Vorlage hinterlegt, generiert Audit Assistant den Bericht danach; ohne eigene Vorlage greift automatisch eine gepflegte Standardvorlage.",
  },
  {
    q: "Welche Pläne gibt es und für wen sind sie gedacht?",
    a: "Solo (89 € / Monat) für Einzelsachverständige mit bis zu 15 Gutachten monatlich und eigenem Stilarchiv. Kanzlei (249 € / Monat) für Teams mit unbegrenzten Gutachten, mehreren Nutzern sowie geteiltem Stilarchiv und Vorlagen.",
  },
];

function FAQItem({ item, index, isOpen, onToggle }: { item: (typeof FAQS)[number]; index: number; isOpen: boolean; onToggle: () => void }) {
  const reduce = useReducedMotion();
  const n = String(index + 1).padStart(2, "0");
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-black/10"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-baseline gap-6 py-6 text-left"
      >
        <span className="font-mono text-[11px] text-accent">{n}</span>
        <span className="flex-1 text-[1.0625rem] font-normal md:text-[1.25rem]">{item.q}</span>
        <span aria-hidden className="font-mono text-[13px] text-black/40">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[640px] pb-6 pl-[3.25rem] text-[14px] leading-relaxed text-black/65">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
    <section className="bg-paper px-6 py-24 text-ink md:px-10 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-baseline justify-between border-b border-black/10 pb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/50">03 — Fragen</span>
          <WordStagger text="Häufige Fragen" className="text-[clamp(1.75rem,3vw,2.5rem)] font-normal" />
        </div>
        <div className="mt-4">
          {FAQS.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
