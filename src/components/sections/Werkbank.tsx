"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { WordStagger } from "@/components/WordStagger";

const STAGES = ["Aufnahme", "Diktat", "OCR", "Vorlage", "Entwurf", "Kritik"];

type Part = string | { e: string };
const TRANSCRIPT: Part[][] = [
  ["Ortsbegehung ", { e: "14.03.2026" }, ", Wasserschaden im Kellergeschoss."],
  ["Auftraggeber: ", { e: "Versicherung Nordlicht AG" }, "."],
  ["Anwesend: ", { e: "Herr M. Brandt" }, ", Eigentümer."],
  ["Schadensbild: durchfeuchtete Wände, ", { e: "Raum 2 – Waschküche" }, "."],
  ["Vermutete Ursache: Rohrbruch, Leitung DN 32."],
];

const REPORT_SECTIONS = [
  { title: "1. Sachverhalt", cite: "§ Sachverhalt — Stil 2024-087" },
  { title: "2. Befund vor Ort", cite: "§ Befund — Stil 2023-114" },
  { title: "3. Schadensursache", cite: "§ Ursache — Stil 2025-021" },
  { title: "4. Kostenschätzung", cite: "§ Kosten — Stil 2024-203" },
  { title: "5. Zusammenfassung", cite: "§ Fazit — Stil 2023-114" },
];

const THUMBS = [
  { src: "/images/detail.png", id: "F-2026-0341" },
  { src: "/images/material.png", id: "F-2026-0342" },
  { src: "/images/process.png", id: "F-2026-0343" },
];

function ScrollReveal({
  progress,
  range,
  className,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

function StageLabel({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const start = index / STAGES.length;
  const end = (index + 1) / STAGES.length;
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.03), start, end, Math.min(1, end + 0.03)],
    [0.35, 1, 1, 0.35],
  );
  return (
    <motion.li style={{ opacity }} className="flex items-baseline gap-3">
      <span className="font-mono text-[11px] text-accent">{String(index + 1).padStart(2, "0")}</span>
      <span className="text-[11px] uppercase tracking-[0.18em]">{STAGES[index]}</span>
    </motion.li>
  );
}

function renderParts(parts: Part[]) {
  return parts.map((p, i) =>
    typeof p === "string" ? (
      <span key={i}>{p}</span>
    ) : (
      <span key={i} className="mx-0.5 rounded-[3px] border border-accent px-1 text-accent">
        {p.e}
      </span>
    ),
  );
}

export function Werkbank() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });
  const stampOpacity = useTransform(scrollYProgress, [0.9, 0.97], [0, 1]);
  const playheadX = useTransform(scrollYProgress, [0, 1], ["0%", "92%"]);

  return (
    <section id="werkbank" ref={wrapperRef} className="relative h-[320vh] bg-paper text-ink">
      <div className="sticky top-0 h-screen overflow-hidden border-t border-black/10">
        <div className="mx-auto flex h-full max-w-[1400px] flex-col px-6 py-10 md:px-10">
          <div className="flex items-baseline justify-between border-b border-black/10 pb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/50">
              01 — Die Werkbank
            </span>
            <WordStagger text="Vom Fall zum Entwurf" className="text-[clamp(1.75rem,3vw,2.5rem)] font-normal" />
          </div>

          <div className="grid flex-1 grid-cols-1 gap-8 overflow-hidden py-8 md:grid-cols-12">
            {/* Left: dictation waveform */}
            <div className="flex flex-col border-t border-black/10 pt-6 md:col-span-4 md:border-t-0 md:border-r md:pr-8 md:pt-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/50">Aufnahme</span>
              <div className="relative mt-6 h-16">
                <div className="flex h-full items-end gap-[3px]">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-full bg-black/15"
                      style={{ height: `${18 + ((i * 37) % 60)}%` }}
                    />
                  ))}
                </div>
                <motion.div
                  style={{ left: playheadX }}
                  className="absolute top-0 h-16 w-px bg-accent"
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] text-black/40">
                <span>00:00</span>
                <span>06:40</span>
              </div>
              <div className="mt-10 space-y-4 font-mono text-[13px] leading-relaxed">
                {TRANSCRIPT.map((parts, i) => (
                  <ScrollReveal key={i} progress={scrollYProgress} range={[0.05 + i * 0.06, 0.12 + i * 0.06]}>
                    {renderParts(parts)}
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Center: transcript / entities already shown left; center becomes style-library search */}
            <div className="flex flex-col border-t border-black/10 pt-6 md:col-span-4 md:border-t-0 md:border-r md:pr-8 md:pt-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/50">
                Stilarchiv — Suche
              </span>
              <div className="mt-6 space-y-3">
                {REPORT_SECTIONS.map((s, i) => (
                  <ScrollReveal
                    key={s.title}
                    progress={scrollYProgress}
                    range={[0.35 + i * 0.06, 0.42 + i * 0.06]}
                    className="flex items-center justify-between border-b border-black/10 pb-3"
                  >
                    <span className="text-[13px]">{s.title}</span>
                    <span className="font-mono text-[10px] text-accent">{s.cite}</span>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Right: assembling Gutachten document */}
            <div className="flex flex-col border-t border-black/10 pt-6 md:col-span-4 md:pt-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/50">
                Gutachten — Entwurf
              </span>
              <div className="mt-6 space-y-4">
                {REPORT_SECTIONS.map((s, i) => (
                  <ScrollReveal
                    key={s.title}
                    progress={scrollYProgress}
                    range={[0.55 + i * 0.07, 0.63 + i * 0.07]}
                  >
                    <p className="text-[13px] font-medium">{s.title}</p>
                    <div className="mt-2 h-1.5 w-full bg-black/[0.06]">
                      <div className="h-full w-full bg-black/20" />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex items-center gap-4 border-t border-black/10 pt-6">
            {THUMBS.map((t, i) => (
              <ScrollReveal
                key={t.id}
                progress={scrollYProgress}
                range={[0.5 + i * 0.05, 0.58 + i * 0.05]}
                className="relative h-14 w-20 shrink-0 border border-black/15"
              >
                <Image src={t.src} alt="" fill sizes="80px" className="object-cover" />
                <span className="absolute -bottom-5 left-0 whitespace-nowrap font-mono text-[9px] text-black/50">
                  {t.id}
                </span>
              </ScrollReveal>
            ))}
            <ul className="ml-auto flex gap-6">
              {STAGES.map((_, i) => (
                <StageLabel key={i} progress={scrollYProgress} index={i} />
              ))}
            </ul>
          </div>

          <motion.p
            style={{ opacity: stampOpacity }}
            className="mt-4 text-right font-mono text-[11px] text-black/50"
          >
            Erstellt in 6 Min 40 Sek.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
