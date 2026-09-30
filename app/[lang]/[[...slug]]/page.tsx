import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/components/HomePage";
import LegalPage from "@/components/LegalPage";
import ThanksPage from "@/components/ThanksPage";
import { LANGS, PAGE_KEYS, createPageMetadata, isLang, pageFromSlug, slugOf, type Lang, type PageKey } from "@/lib/seo";

// Route unique de toutes les pages, dans toutes les langues. Le français est servi à la racine
// grâce à une réécriture interne (next.config.ts) : /mentions-legales/ → /fr/mentions-legales/.
// Une URL inconnue passe par resolve() → notFound(), qui affiche la 404 traduite.
export const dynamicParams = true;

type Params = Promise<{ lang: string; slug?: string[] }>;

export function generateStaticParams({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang;
  if (!LANGS.includes(lang)) return [];
  return PAGE_KEYS.map((page) => {
    const slug = slugOf(page, lang);
    return { slug: slug ? [slug] : [] };
  });
}

async function resolve(params: Params): Promise<{ lang: Lang; page: PageKey }> {
  const { lang, slug = [] } = await params;
  const page = isLang(lang) && slug.length <= 1 ? pageFromSlug(lang, slug[0] ?? "") : undefined;
  if (!isLang(lang) || page === undefined) notFound();
  return { lang, page };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, page } = await resolve(params);
  return createPageMetadata(page, lang);
}

export default async function Page({ params }: { params: Params }) {
  const { lang, page } = await resolve(params);

  switch (page) {
    case "":
      return <HomePage lang={lang} />;
    case "mentions-legales":
      return <LegalPage lang={lang} />;
    case "merci":
      return <ThanksPage lang={lang} />;
  }
}
