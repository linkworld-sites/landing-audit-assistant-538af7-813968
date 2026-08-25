"use client";

import { FadeUp } from "@/components/FadeUp";

export function Testimonial() {
  return (
    <section className="bg-paper px-6 py-24 text-ink md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <FadeUp>
          <div className="noise-overlay relative mx-auto max-w-3xl overflow-hidden rounded-2xl bg-ink p-8 text-white md:p-12">
            <span className="pointer-events-none absolute -right-4 -top-10 text-[10rem] leading-none text-white/[0.06]">
              &rdquo;
            </span>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">Anspruch</p>
            <p className="relative z-10 mt-6 text-[15px] leading-[1.7] text-white/85 md:text-[17px]">
              Ein Gutachten ist erst fertig, wenn es vor jedem Sachverständigen Bestand hat.
              Genau dafür ist Audit Assistant gebaut — nicht um Ihr fachliches Urteil zu
              ersetzen, sondern um jede Minute zurückzugeben, die sonst mit Abtippen,
              Sortieren und Formatieren verloren geht.
            </p>
            <p className="relative z-10 mt-6 text-[13px] font-medium text-white">
              Audit Assistant — Produktteam
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
