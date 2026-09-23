import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, getPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "Audit Assistant", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Audit Assistant", url: SITE_URL },
  };
  const faqJsonLd = post.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;
  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-paper px-6 py-24 text-ink md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Link
        href="/blog"
        className="text-[11px] uppercase tracking-[0.18em] text-accent underline-offset-4 hover:underline"
      >
        ← Alle Beiträge
      </Link>
      <h1 className="mt-8 text-[clamp(2.25rem,5vw,3.5rem)] font-normal leading-[1.05]">{post.title}</h1>
      {post.date && <p className="mt-3 font-mono text-[11px] text-black/50">{post.date}</p>}
      <article
        className="post-body mt-10 border-t border-black/10 pt-10"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      {post.faq.length > 0 && (
        <section className="mt-16 border-t border-black/10 pt-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/50">
            Kurz beantwortet
          </span>
          <div className="mt-4">
            {post.faq.map((item, i) => (
              <div key={item.q} className="border-b border-black/10 py-6">
                <p className="flex items-baseline gap-4 text-[1.0625rem] font-normal">
                  <span className="font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.q}
                </p>
                <p className="mt-3 pl-[2.25rem] text-[14px] leading-relaxed text-black/65">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
