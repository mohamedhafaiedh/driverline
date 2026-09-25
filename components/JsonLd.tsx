import React from "react";
import { SITE_URL } from "@/lib/seo";

interface JsonLdProps {
  lang?: "fr" | "en";
}

export default function JsonLd({ lang = "fr" }: JsonLdProps) {
  const isEn = lang === "en";

  const schema = {
    "@context": "https://schema.org",
    "@type": ["TaxiService", "LocalBusiness"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: "Driver Line",
    legalName: "Driver Line",
    alternateName: "Driver Line Toulouse VTC",
    url: isEn ? `${SITE_URL}/en/` : `${SITE_URL}/`,
    logo: `${SITE_URL}/images/Driver-Line-logo-1000-x-200-px-1000-x-150-px.png`,
    image: `${SITE_URL}/images/services-DRL-3.jpg`,
    description: isEn
      ? "Premium private chauffeur and VTC service in Toulouse and Haute-Garonne: Toulouse-Blagnac Airport transfers, train stations, corporate travel and 24/7 private hire."
      : "Service de chauffeur privé VTC à Toulouse et en Haute-Garonne : transferts aéroport Toulouse-Blagnac, gares, trajets professionnels et mise à disposition 24/7.",
    telephone: "+33686603584",
    email: "contact@mohamedh57.sg-host.com",
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toulouse",
      postalCode: "31000",
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.6047,
      longitude: 1.4442,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Toulouse",
      },
      {
        "@type": "AdministrativeArea",
        name: "Haute-Garonne",
      },
      {
        "@type": "AdministrativeArea",
        name: "Occitanie",
      },
      {
        "@type": "Airport",
        name: "Aéroport de Toulouse-Blagnac (TLS)",
      },
      {
        "@type": "TrainStation",
        name: "Gare de Toulouse-Matabiau",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
