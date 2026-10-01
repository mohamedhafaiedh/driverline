import type { IconName } from "@/components/Icon";

// Une ligne « facts » sans valeur ("") n'est pas affichée : on ne publie que ce qui est renseigné.
// Les champs obligatoires encore vides sont signalés au build (scripts/check-legal.mjs).
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "facts"; rows: [string, string][] }
  | { type: "h3"; text: string };

export interface LegalSection {
  // Ancre stable (#editeur, #hebergement, #propriete, #confidentialite, #cookies)
  id: string;
  icon: IconName;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalContent {
  title: string;
  subtitle: string;
  intro: string;
  sections: LegalSection[];
}
