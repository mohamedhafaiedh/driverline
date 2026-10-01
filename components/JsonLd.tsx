import { getMessages } from "@/lib/i18n";
import { SITE_URL, ogImage, pagePath, type Lang } from "@/lib/seo";
import { COMPANY, COMPANY_NAME, EMAIL, GOOGLE_RATING, PHONE_E164 } from "@/lib/site";

// Données structurées de l'entreprise, présentes sur toutes les pages
export default function JsonLd({ lang }: { lang: Lang }) {
  const isEn = lang === "en";

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: COMPANY.tradeName,
    legalName: COMPANY_NAME,
    alternateName: "Driver Line Chauffeur privé Toulouse",
    url: `${SITE_URL}${pagePath("", lang)}`,
    logo: `${SITE_URL}/images/Driver-Line-logo-plein.png`,
    image: ogImage(lang),
    description: isEn
      ? "Premium private chauffeur service in Toulouse and Haute-Garonne: Toulouse-Blagnac Airport transfers, train stations, corporate travel and 24/7 chauffeur at your disposal."
      : "Service de chauffeur privé haut de gamme à Toulouse et en Haute-Garonne : transferts aéroport Toulouse-Blagnac, gares, trajets professionnels et mise à disposition 24/7.",
    telephone: PHONE_E164,
    email: EMAIL,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_RATING,
      bestRating: "5",
      ratingCount: 19,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toulouse",
      postalCode: "31000",
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 43.6047, longitude: 1.4442 },
    areaServed: [
      { "@type": "City", name: "Toulouse" },
      { "@type": "AdministrativeArea", name: "Haute-Garonne" },
      { "@type": "AdministrativeArea", name: "Occitanie" },
      { "@type": "Airport", name: "Aéroport de Toulouse-Blagnac (TLS)" },
      { "@type": "TrainStation", name: "Gare de Toulouse-Matabiau" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/** FAQ de l'accueil, au format schema.org/FAQPage */
export function FaqJsonLd({ lang }: { lang: Lang }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getMessages(lang).faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
