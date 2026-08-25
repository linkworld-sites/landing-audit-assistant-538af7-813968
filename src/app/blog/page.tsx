import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog",
  description: "Notizen zum Gutachten-Workflow von Audit Assistant.",
  alternates: { canonical: "/blog" },
};

/**
 * Blog index — lists every post from content/posts/. Ships with neutral
 * styling on purpose: restyle to the site's design tokens during the build.
 */
export default function BlogIndex() {
  const posts = getPosts();
  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-paper px-6 py-24 text-ink md:py-32">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/50">Blog</span>
      <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] font-normal leading-[1.05]">
        Notizen aus der Werkbank
      </h1>
      {posts.length === 0 ? (
        <p className="mt-8 text-black/60">Neue Beiträge folgen in Kürze.</p>
      ) : (
        <ul className="mt-14 divide-y divide-black/10 border-t border-black/10">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group block py-8">
                {p.date && <p className="font-mono text-[11px] text-black/50">{p.date}</p>}
                <h2 className="mt-2 text-2xl font-normal group-hover:text-accent">{p.title}</h2>
                {p.description && <p className="mt-2 text-black/65">{p.description}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-16">
        <Link href="/" className="text-[11px] uppercase tracking-[0.18em] text-accent underline-offset-4 hover:underline">
          ← Zur Startseite
        </Link>
      </p>
    </main>
  );
}
