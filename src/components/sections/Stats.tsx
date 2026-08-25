"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FadeUp } from "@/components/FadeUp";

const METRICS = [
  { value: 3, label: "Eingabeformen in einem Workflow — Diktat, Fotos, Belege" },
  { value: 29, label: "Funktionen — von der Aufnahme bis zur Kritik" },
  { value: 1, label: "Stilarchiv, das mit jedem abgeschlossenen Fall wächst" },
];

function CountUp({ target, inView }: { target: number; inView: boolean }) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? target : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const duration = 1200;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, target]);

  return <>{value}</>;
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="relative -mt-16 rounded-t-[3rem] bg-ink px-6 py-24 text-white md:px-10 md:py-28">
      <div ref={ref} className="mx-auto max-w-[1400px]">
        <FadeUp className="mx-auto max-w-xl text-center text-white/70">
          <p className="text-[15px]">
            Ein System, in dem jedes Diktat und jeder abgeschlossene Fall die nächste
            Erstellung präziser macht.
          </p>
        </FadeUp>
        <div className="mt-14 grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center px-6 py-10 text-center"
            >
              <span className="font-mono text-[clamp(3rem,6vw,5.5rem)] font-light tabular-nums">
                <CountUp target={m.value} inView={inView} />
              </span>
              <span className="mt-4 max-w-[220px] text-[11px] uppercase tracking-[0.14em] text-white/60">
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
