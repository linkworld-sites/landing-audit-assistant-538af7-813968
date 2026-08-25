"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/lib/checkout";
import { checkout, fetchProducts, formatPrice } from "@/lib/checkout";
import { track } from "@/lib/funnel";

export function SignupClient() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");
  const trackedSignup = useRef(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (trackedSignup.current) return;
    trackedSignup.current = true;
    track("signup");
  }, []);

  useEffect(() => {
    let alive = true;
    fetchProducts().then((list) => {
      if (alive) {
        setProducts(list);
        setLoaded(true);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  const selected = products.find((p) => p.id === planId) ?? products[0];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selected) {
      setError("Es ist derzeit kein Abo verfügbar. Bitte kontaktieren Sie uns direkt.");
      return;
    }
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    setError(null);
    setBusy(true);
    track("subscription_checkout");
    const ok = await checkout([{ product_id: selected.id, quantity: 1 }], {
      customerEmail: email,
    });
    if (ok) {
      track("subscription_active");
      setSent(true);
    } else {
      setBusy(false);
      setError("Das Abo konnte nicht gestartet werden. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-16 md:py-28">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        02 — Anmeldung
      </span>
      <h1 className="mt-4 max-w-[640px] text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.05] tracking-tight">
        Abo einrichten.
      </h1>

      <div className="mt-14 grid grid-cols-1 gap-12 border-t border-ink/10 pt-12 md:grid-cols-[1fr_360px]">
        {sent ? (
          <div className="border border-ink/10 p-10">
            <p className="text-xl font-medium">Fast fertig.</p>
            <p className="mt-2 text-ink/60">
              Sie werden zur gesicherten Zahlungsseite weitergeleitet, um das Abo abzuschließen.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-6">
            <label className="grid gap-2 text-sm">
              <span className="text-[11px] uppercase tracking-[0.14em] text-ink/60">Name</span>
              <input
                name="name"
                type="text"
                required
                className="border border-ink/20 bg-transparent px-4 py-3 outline-none focus:border-ink"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[11px] uppercase tracking-[0.14em] text-ink/60">
                E-Mail (geschäftlich)
              </span>
              <input
                name="email"
                type="email"
                required
                className="border border-ink/20 bg-transparent px-4 py-3 outline-none focus:border-ink"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[11px] uppercase tracking-[0.14em] text-ink/60">
                Büro / Kanzlei
              </span>
              <input
                name="company"
                type="text"
                className="border border-ink/20 bg-transparent px-4 py-3 outline-none focus:border-ink"
              />
            </label>
            {error && <p className="text-sm text-accent">{error}</p>}
            <button
              type="submit"
              disabled={busy || !loaded}
              className="mt-2 justify-self-start bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {busy ? "Wird gestartet…" : "Abo starten"}
            </button>
          </form>
        )}

        <aside className="border border-ink/10 p-8">
          <span className="text-[11px] uppercase tracking-[0.14em] text-ink/60">Gewähltes Abo</span>
          {selected ? (
            <div className="mt-4">
              <p className="text-[1.5rem] font-normal">{selected.name}</p>
              <p className="mt-2 text-[15px] text-ink/60">{selected.description}</p>
              <p className="mt-6 text-[2rem] font-normal tabular-nums">
                {formatPrice(selected.price_cents, selected.currency)}
                <span className="ml-2 text-[13px] uppercase tracking-[0.14em] text-ink/50">
                  / Monat
                </span>
              </p>
            </div>
          ) : (
            <p className="mt-4 text-[14px] text-ink/60">
              {loaded ? "Kein Abo ausgewählt." : "Wird geladen…"}
            </p>
          )}
          <Link href="/pricing" className="mt-6 inline-block text-[13px] underline underline-offset-4">
            Preise ansehen
          </Link>
        </aside>
      </div>
    </section>
  );
}
