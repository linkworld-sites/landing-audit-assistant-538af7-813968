import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts } from "@/lib/posts";
import { getLegalSlugs } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = ["", "/blog", "/pricing", "/signup"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
  }));
  const posts: MetadataRoute.Sitemap = getPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: now,
  }));
  const legal: MetadataRoute.Sitemap = getLegalSlugs().map((slug) => ({
    url: `${SITE_URL}/legal/${slug}`,
    lastModified: now,
  }));
  return [...staticRoutes, ...posts, ...legal];
}
