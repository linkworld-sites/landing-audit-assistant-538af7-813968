"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { WordStagger } from "@/components/WordStagger";

const STEPS = [
  {
    n: "01",
    title: "Aufnehmen",
    body: "Diktieren Sie vor Ort, fotografieren Sie den Schaden und legen Sie Angebote oder Rechnungen ab.",
  },
  {
    n: "02",
    title: "Verarbeiten",
    body: "Transkription, Fotos und OCR‑Belege laufen im Hintergrund zusammen — mit Ihrem Stilarchiv abgeglichen.",
  },
  {
    n: "03",
    title: "Prüfen",
    body: "Der Entwurf erhält eine automatische Kritik; Sie korrigieren Transkript und Textbausteine direkt.",
  },
  {
    n: "04",
    title: "Exportieren",
    body: "Freigeben und als DOCX oder PDF exportieren — in der Vorlage Ihres Hauses.",
  },
];

function Step({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-1 border-t border-black/10 pt-8 md:border-t-0 md:border-l md:pl-8 md:pt-0"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-2 right-0 select-none font-mono text-[6rem] leading-none text-black/[0.06] md:-right-2 md:top-0 md:text-[7rem]"
      >
        {step.n}
      </span>
      <span className="font-mono text-[11px] text-accent">{step.n}</span>
      <h3 className="mt-3 text-[1.375rem] font-normal">{step.title}</h3>
      <p className="mt-3 max-w-[260px] text-[14px] leading-relaxed text-black/65">{step.body}</p>
    </motion.div>
  );
}

export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section className="bg-paper px-6 py-24 text-ink md:px-10 md:py-32">
      <div ref={ref} className="mx-auto max-w-[1400px]">
        <div className="flex items-baseline justify-between border-b border-black/10 pb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/50">02 — Ablauf</span>
          <WordStagger text="Vier Schritte, ein Entwurf" className="text-[clamp(1.75rem,3vw,2.5rem)] font-normal" />
        </div>
        <div className="mt-12 flex flex-col gap-10 md:flex-row md:gap-0">
          {STEPS.map((s, i) => (
            <Step key={s.n} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
