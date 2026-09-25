import type { Metadata } from "next";

export const SITE_URL = "https://driverline.fr";

export const LOCALES = {
  fr: { code: "fr-FR", prefix: "" },
  en: { code: "en-US", prefix: "/en" },
} as const;

export type Lang = keyof typeof LOCALES;

export function buildAlternates(slug: string = "", lang: Lang = "fr") {
  const cleanSlug = slug.replace(/^\/|\/$/g, "").replace(/^en\/?/, "");
  const path = cleanSlug ? `${cleanSlug}/` : "";

  const canonical = lang === "en" ? `${SITE_URL}/en/${path}` : `${SITE_URL}/${path}`;

  return {
    canonical,
    languages: {
      "fr-FR": `${SITE_URL}/${path}`,
      "en-US": `${SITE_URL}/en/${path}`,
      "x-default": `${SITE_URL}/${path}`,
    },
  };
}

export interface PageSeoConfig {
  title: string;
  description: string;
}

export const SEO_DATA: Record<Lang, Record<string, PageSeoConfig>> = {
  fr: {
    home: {
      title: "Driver Line – Chauffeur privé VTC à Toulouse",
      description:
        "Driver Line, votre chauffeur privé VTC à Toulouse et en Haute-Garonne. Transferts aéroport Blagnac, gares, trajets professionnels et mise à disposition 24/7.",
    },
    "mentions-legales": {
      title: "Mentions légales – Driver Line – Chauffeur privé VTC à Toulouse",
      description:
        "Mentions légales et politique de confidentialité du site Driver Line, service de chauffeur privé VTC à Toulouse.",
    },
    merci: {
      title: "Merci – Driver Line – Chauffeur privé VTC à Toulouse",
      description:
        "Merci pour votre demande de devis auprès de Driver Line. Nous revenons vers vous dans les plus brefs délais.",
    },
  },
  en: {
    home: {
      title: "Driver Line – Private VTC driver in Toulouse",
      description:
        "Driver Line, your private VTC chauffeur in Toulouse and Haute-Garonne. Blagnac Airport transfers, train stations, business trips and 24/7 private hire.",
    },
    "mentions-legales": {
      title: "Legal notices – Driver Line – Private VTC driver in Toulouse",
      description:
        "Legal notices and privacy policy of Driver Line, private VTC chauffeur service in Toulouse.",
    },
    merci: {
      title: "Thank you – Driver Line – Private VTC driver in Toulouse",
      description:
        "Thank you for requesting a quote with Driver Line. We will get back to you as soon as possible.",
    },
  },
};

export function createPageMetadata(
  pageKey: "home" | "mentions-legales" | "merci",
  lang: Lang = "fr",
  slug: string = ""
): Metadata {
  const data = SEO_DATA[lang][pageKey];
  const isNoIndex = pageKey === "merci";
  const alternates = isNoIndex ? undefined : buildAlternates(slug, lang);

  return {
    title: data.title,
    description: data.description,
    metadataBase: new URL(SITE_URL),
    alternates,
    openGraph: {
      title: data.title,
      description: data.description,
      url: alternates?.canonical || `${SITE_URL}/${lang === "en" ? "en/" : ""}`,
      siteName: "Driver Line",
      locale: lang === "en" ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/Driver-Line-logo-1000-x-200-px-1000-x-150-px.png`,
          width: 1000,
          height: 150,
          alt: "Driver Line",
        },
      ],
    },
    robots: isNoIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
