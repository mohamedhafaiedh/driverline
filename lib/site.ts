// Données du site qui ne se traduisent pas (coordonnées, icônes, véhicules).
// Les textes sont dans messages/<langue>.json, dans le même ordre que ces listes.
// Coordonnées et informations légales de l'entreprise : data/company.json (saisies une seule fois).
import company from "@/data/company.json";

export const COMPANY = company;
// Nom utilisé dans les textes légaux : dénomination sociale si renseignée, sinon nom commercial
export const COMPANY_NAME = company.legalName.trim() || company.tradeName;
// Ligne « Dénomination sociale » des mentions légales : la forme juridique suit le nom après une virgule
// (« MECA Services, SAS »). Vide si la dénomination n'est pas renseignée.
export const LEGAL_NAME_WITH_FORM = company.legalName.trim()
  ? [company.legalName.trim(), company.legalForm.trim()].filter(Boolean).join(", ")
  : "";

const digits = (phone: string) => phone.replace(/[^\d+]/g, "");

export const PHONE_DISPLAY = company.phone;
export const PHONE_HREF = `tel:${digits(company.phone)}`;
export const PHONE_E164 = digits(company.phone);
export const WHATSAPP_HREF = `https://wa.me/${digits(company.whatsapp).replace("+", "")}`;
export const EMAIL = company.email;
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

// Deux véhicules, présentés « ou équivalent » (le modèle exact peut varier selon la disponibilité)
export const FLEET = [
  { image: "/images/V-Class.png", pax: 7, bags: 7, vehicle: VEHICLE_OPTIONS[1] },
  { image: "/images/eclass.png", pax: 3, bags: 3, vehicle: VEHICLE_OPTIONS[0] },
] as const;
