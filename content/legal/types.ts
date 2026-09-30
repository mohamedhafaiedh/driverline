// Une valeur vide ("") s'affiche « — » : information à compléter par l'entreprise.
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "facts"; rows: [string, string][] }
  | { type: "h3"; text: string };

export interface LegalContent {
  title: string;
  sections: { title: string; blocks: LegalBlock[] }[];
}
