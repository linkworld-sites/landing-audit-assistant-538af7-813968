"use client";

import Image from "next/image";
import Link from "next/link";
import ConversionForm from "@/components/ConversionForm";
import { WordStagger } from "@/components/WordStagger";
import { FadeUp } from "@/components/FadeUp";

const FIELDS = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "E-Mail (geschäftlich)", type: "email", required: true },
  { name: "company", label: "Büro / Unternehmen" },
  { name: "message", label: "Womit arbeiten Sie aktuell?", type: "textarea" },
];

export function CTASplit() {
  return (
    <section id="anfrage" className="relative -mt-16 rounded-t-[3rem] bg-ink px-6 py-24 text-white md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">03 — Zugang</span>
            <WordStagger
              text="Zeigen Sie uns einen Fall."
              className="mt-4 text-[clamp(2.25rem,4vw,3.5rem)] font-normal leading-[1.05]"
            />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
              Wir schalten Ihren Arbeitsbereich frei und richten das Stilarchiv mit Ihren
              bisherigen Gutachten ein — damit der erste Entwurf schon in Ihrem Stil steht.
            </p>
            <div className="mt-10 max-w-md text-white">
              <ConversionForm startStep="intent" submitStep="convert" cta="Zugang anfragen" fields={FIELDS} />
            </div>
          </FadeUp>
          <FadeUp delay={0.1} className="relative hidden h-[420px] overflow-hidden rounded-2xl md:block">
            <Image
              src="/images/detail.png"
              alt="Technische Detailaufnahme eines Gutachten-Belegs mit Messlinien"
              fill
              sizes="600px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </FadeUp>
        </div>

        <footer className="mt-24 flex flex-col items-start gap-6 border-t border-white/10 pt-8 text-[11px] uppercase tracking-[0.14em] text-white/50 md:flex-row md:items-center md:justify-between">
          <span>Audit Assistant</span>
          <nav className="flex flex-wrap gap-6">
            <a href="#werkbank" className="hover:text-white">
              So funktioniert&apos;s
            </a>
            <Link href="/pricing" className="hover:text-white">
              Preise
            </Link>
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
            <Link href="/legal/impressum" className="hover:text-white">
              Impressum
            </Link>
            <Link href="/legal/datenschutz" className="hover:text-white">
              Datenschutz
            </Link>
            <Link href="/legal/cookies" className="hover:text-white">
              Cookies
            </Link>
          </nav>
        </footer>
      </div>
    </section>
  );
}
