// Données du site qui ne se traduisent pas (coordonnées, icônes, véhicules).
// Les textes sont dans messages/<langue>.json, dans le même ordre que ces listes.

export const PHONE_DISPLAY = "+33 6 86 60 35 84";
export const PHONE_HREF = "tel:+33686603584";
export const WHATSAPP_HREF = "https://wa.me/33686603584";
export const EMAIL = "contact@driverline.fr";
export const GOOGLE_RATING = "4.8";

// Ancres des sections de l'accueil
export const SECTIONS = {
  services: "services",
  fleet: "flotte",
  reviews: "avis",
  zones: "zones",
  faq: "faq",
  quote: "devis",
} as const;

export const NAV = ["services", "fleet", "reviews", "zones", "quote"] as const;

// Variantes en test : changer la valeur pour revenir à la version précédente
// - HERO_IMAGE : "aerien" (vue aérienne de Toulouse), "toulouse" (Pont Neuf et Garonne) ou "chauffeur" (photo d'origine)
// - SERVICES_LAYOUT : "cards" (4 cartes illustrées) ou "classic" (6 services avec icônes)
export const HERO_IMAGE: "aerien" | "toulouse" | "chauffeur" = "aerien";
export const SERVICES_LAYOUT: "cards" | "classic" = "cards";

export const HERO_IMAGES = {
  aerien: { src: "/images/hero-toulouse-aerien.jpg", width: 2400, height: 1600 },
  toulouse: { src: "/images/hero-toulouse.jpg", width: 2400, height: 1548 },
  chauffeur: { src: "/images/hero-drl-2.jpg", width: 1600, height: 1000 },
} as const;

// Photos des services, dans l'ordre de messages/*.json : CC0 (Wikimedia Commons), sauf chauffeur-portiere (photo d'origine du site)
export const SERVICE_IMAGES = [
  "/images/services/transferts-toulouse.jpg",
  "/images/services/gares-aeroports.jpg",
  "/images/services/chauffeur-portiere.jpg",
  "/images/services/longue-distance.jpg",
] as const;

// Version « classic » des services : une icône par service
export const SERVICE_ICONS = ["plane", "timer", "briefcase", "eye", "compass", "signpost"] as const;
export const ONBOARD_ICONS = ["wifi", "power", "baby", "sign"] as const;

// `vehicle` = valeur envoyée par le formulaire de devis (identique à public/form.html)
export const VEHICLE_OPTIONS = ["Berline (3 pax)", "Van (7 pax)"] as const;

export const FLEET = [
  { image: "/images/Tesla3.png", pax: 3, bags: 3, vehicle: VEHICLE_OPTIONS[0] },
  { image: "/images/V-Class.png", pax: 8, bags: 7, vehicle: VEHICLE_OPTIONS[1] },
  { image: "/images/eclass.png", pax: 3, bags: 3, vehicle: VEHICLE_OPTIONS[0] },
] as const;
