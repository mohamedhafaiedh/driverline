import type { Metadata } from "next";
import { getMessages, type Messages } from "./i18n";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://driverline.fr";

// Langues du site. Ajouter une langue : une entrée ici, ses slugs dans SLUGS,
// messages/<code>.json (+ lib/i18n.ts) et content/legal/<code>.ts.
// La clé sert de préfixe d'URL ; `code` sert à l'attribut lang et aux hreflang.
export const LOCALES = {
  fr: { code: "fr", ogLocale: "fr_FR", name: "Français", flag: "/images/fr_FR.png" },
  en: { code: "en", ogLocale: "en_US", name: "English", flag: "/images/en_US.png" },
} as const;

export type Lang = keyof typeof LOCALES;

// Langue par défaut : servie à la racine (/mentions-legales/), les autres sous leur préfixe (/en/legal-notice/)
export const DEFAULT_LANG: Lang = "fr";
export const LANGS = Object.keys(LOCALES) as Lang[];

export function isLang(value: string): value is Lang {
  return value in LOCALES;
}

// Pages indexables, identifiées par leur slug français
export const SITE_ROUTES = ["", "mentions-legales"] as const;
export type PageKey = (typeof SITE_ROUTES)[number] | "merci";
export const PAGE_KEYS: PageKey[] = [...SITE_ROUTES, "merci"];

const SLUGS: Record<Lang, Record<PageKey, string>> = {
  fr: { "": "", "mentions-legales": "mentions-legales", merci: "merci" },
  en: { "": "", "mentions-legales": "legal-notice", merci: "thank-you" },
};

function langPrefix(lang: Lang): string {
  return lang === DEFAULT_LANG ? "" : `/${lang}`;
}

/** Chemin relatif d'une page dans une langue : pagePath("mentions-legales", "en") → "/en/legal-notice/" */
export function pagePath(page: PageKey, lang: Lang): string {
  const slug = SLUGS[lang][page];
  return `${langPrefix(lang)}/${slug ? `${slug}/` : ""}`;
}

/** Page correspondant à un slug dans une langue (undefined si inconnu) */
export function pageFromSlug(lang: Lang, slug: string): PageKey | undefined {
  return PAGE_KEYS.find((page) => SLUGS[lang][page] === slug);
}

export function slugOf(page: PageKey, lang: Lang): string {
  return SLUGS[lang][page];
}

/** Anciennes URL anglaises (slugs français) à rediriger vers les slugs traduits */
export const LEGACY_EN_REDIRECTS = PAGE_KEYS.filter((page) => page && SLUGS.en[page] !== page).map((page) => ({
  source: `/en/${page}`,
  destination: pagePath(page, "en"),
}));

export function buildAlternates(page: PageKey, lang: Lang) {
  return {
    canonical: `${SITE_URL}${pagePath(page, lang)}`,
    languages: {
      ...Object.fromEntries(LANGS.map((l) => [LOCALES[l].code, `${SITE_URL}${pagePath(page, l)}`])),
      "x-default": `${SITE_URL}${pagePath(page, DEFAULT_LANG)}`,
    },
  };
}

export const SITE_ICONS: Metadata["icons"] = { icon: "/favicon.ico", apple: "/icon.png" };

const META_KEYS = {
  "": "home",
  "mentions-legales": "legalNotice",
  merci: "thankYou",
} as const satisfies Record<PageKey, keyof Messages["meta"]>;

export function ogImage(lang: Lang): string {
  return `${SITE_URL}/images/og-${lang}.jpg`;
}

export function createPageMetadata(page: PageKey, lang: Lang): Metadata {
  const data = getMessages(lang).meta[META_KEYS[page]];
  const noindex = page === "merci";

  return {
    metadataBase: new URL(SITE_URL),
    title: data.title,
    description: data.description,
    alternates: noindex ? undefined : buildAlternates(page, lang),
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${SITE_URL}${pagePath(page, lang)}`,
      siteName: "Driver Line",
      locale: LOCALES[lang].ogLocale,
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => LOCALES[l].ogLocale),
      type: "website",
      images: [{ url: ogImage(lang), width: 1200, height: 630, alt: data.title }],
    },
    // Grande vignette sur X/Twitter (reprend titre, description et image Open Graph)
    twitter: { card: "summary_large_image" },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
