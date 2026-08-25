"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { VideoLoop } from "@/components/VideoLoop";
import { track } from "@/lib/funnel";

const LINES = ["Diktat wird", "Gutachten.", "In Minuten."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-ink text-white">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: videoScale }}>
        <VideoLoop src="/videos/hero.mp4" className="absolute inset-0 h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

      <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-16 md:py-8">
        <span className="text-[13px] uppercase tracking-[0.22em]">Audit Assistant</span>
        <nav className="flex items-center gap-6 text-[11px] uppercase tracking-[0.22em] text-white/80">
          <a href="#werkbank" className="hover:text-white">
            So funktioniert&apos;s
          </a>
          <a href="/pricing" className="hover:text-white">
            Preise
          </a>
          <a href="/blog" className="hover:text-white">
            Blog
          </a>
          <a
            href="#anfrage"
            onClick={() => track("intent")}
            className="border border-white/40 px-4 py-2 text-white hover:border-white"
          >
            Zugang anfragen
          </a>
        </nav>
      </header>

      <motion.div
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
        className="relative z-10 flex h-[calc(100%-88px)] max-w-[720px] flex-col justify-center px-6 md:px-16"
      >
        <p className="mb-6 text-[11px] uppercase tracking-[0.22em] text-white/70">
          Für Bau- und Versicherungssachverständige
        </p>
        <h1 className="flex flex-col text-[clamp(3rem,8vw,5.5rem)] font-normal leading-[1.02] tracking-tight">
          {LINES.map((line, i) => (
            <span key={line} className="overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "112%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-[480px] text-[1.0625rem] leading-relaxed text-white/85"
        >
          Audit Assistant verwandelt Diktat, Fotos und Belege in ein vollständiges,
          verteidigungsfähiges Gutachten für Wasser‑, Brand‑ und Sturmschäden — in einem
          Bruchteil der Zeit, ohne Abstriche am fachlichen Anspruch.
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <motion.a
            href="#anfrage"
            onClick={() => track("intent")}
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.97 }}
            className="bg-accent px-7 py-3.5 text-sm uppercase tracking-[0.12em] text-white"
          >
            Zugang anfragen
          </motion.a>
          <motion.a
            href="#werkbank"
            whileHover={{ x: 4 }}
            className="text-sm uppercase tracking-[0.12em] text-white/80 underline-offset-4 hover:underline"
          >
            So funktioniert&apos;s →
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[11px] uppercase tracking-[0.22em] text-white/60"
      >
        Scrollen ↓
      </motion.div>
    </section>
  );
}
