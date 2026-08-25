import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, getPosts } from "@/lib/posts";

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
  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-paper px-6 py-24 text-ink md:py-32">
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
    </main>
  );
}
