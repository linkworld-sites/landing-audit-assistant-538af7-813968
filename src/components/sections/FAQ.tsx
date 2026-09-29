"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { WordStagger } from "@/components/WordStagger";
import { FAQS } from "@/lib/faq-data";

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
        <p className="mt-8">
          <Link href="/faq" className="text-[11px] uppercase tracking-[0.18em] text-accent underline-offset-4 hover:underline">
            Alle Fragen auf einer Seite →
          </Link>
        </p>
      </div>
    </section>
  );
}
