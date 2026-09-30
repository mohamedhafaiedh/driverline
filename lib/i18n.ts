import fr from "../messages/fr.json";
import en from "../messages/en.json";
import type { Lang } from "./seo";

// Le français est la langue de référence : toute autre langue doit avoir exactement
// la même structure. Une clé absente de en.json fait échouer la compilation.
export type Messages = typeof fr;

const MESSAGES: Record<Lang, Messages> = { fr, en };

export function getMessages(lang: Lang): Messages {
  return MESSAGES[lang];
}
