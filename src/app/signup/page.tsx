import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { SignupClient } from "@/components/SignupClient";

export const metadata: Metadata = {
  title: "Anmeldung",
  description:
    "Richten Sie Ihr Audit Assistant Abo ein — inklusive Diktat-Workflow, Belegverarbeitung und Ihrem eigenen Stilarchiv.",
  alternates: { canonical: "/signup" },
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="flex items-center justify-between border-b border-ink/10 px-6 py-6 md:px-16 md:py-8">
        <Link href="/" className="text-[13px] uppercase tracking-[0.22em]">
          Audit Assistant
        </Link>
        <nav className="flex items-center gap-6 text-[11px] uppercase tracking-[0.22em] text-ink/60">
          <Link href="/pricing" className="hover:text-ink">
            Preise
          </Link>
          <Link href="/blog" className="hover:text-ink">
            Blog
          </Link>
        </nav>
      </header>
      <Suspense fallback={null}>
        <SignupClient />
      </Suspense>
    </main>
  );
}
