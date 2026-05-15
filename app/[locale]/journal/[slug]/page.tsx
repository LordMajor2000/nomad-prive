import { blogPosts } from "@/data/blog-posts";
import { routing } from "@/i18n/routing";
export { default } from "@/app/journal/[slug]/page";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}
