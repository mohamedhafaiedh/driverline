// Vérifie la cohérence des dictionnaires : mêmes clés dans toutes les langues, aucune valeur vide.
// Signale aussi (sans bloquer) les textes identiques d'une langue à l'autre : souvent un oubli de traduction.
import { readFileSync, readdirSync } from "node:fs";

const REFERENCE = "fr";
const LANGS = readdirSync(new URL("../messages/", import.meta.url))
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.slice(0, -5));
// Textes identiques légitimes (noms propres, termes internationaux)
const SAME_OK = new Set(["Services", "Google", "WhatsApp", "Date", "Van", "Driver Line", "City tours", "Shopping"]);

const load = (lang) => JSON.parse(readFileSync(new URL(`../messages/${lang}.json`, import.meta.url), "utf8"));

function flatten(value, key = "", out = {}) {
  if (Array.isArray(value)) value.forEach((item, i) => flatten(item, `${key}[${i}]`, out));
  else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) flatten(v, key ? `${key}.${k}` : k, out);
  else out[key] = value;
  return out;
}

const dicts = Object.fromEntries(LANGS.map((l) => [l, flatten(load(l))]));
const ref = dicts[REFERENCE];
let errors = 0;

for (const lang of LANGS) {
  const d = dicts[lang];
  for (const key of Object.keys(ref)) {
    if (!(key in d)) { console.error(`✗ ${lang}: clé manquante « ${key} »`); errors++; }
  }
  for (const [key, value] of Object.entries(d)) {
    if (!(key in ref)) { console.error(`✗ ${lang}: clé inconnue « ${key} » (absente de ${REFERENCE}.json)`); errors++; }
    if (typeof value !== "string" || !value.trim()) { console.error(`✗ ${lang}: valeur vide « ${key} »`); errors++; }
  }
  if (lang !== REFERENCE) {
    for (const [key, value] of Object.entries(d)) {
      // noms de personnes (avis) et de villes : jamais traduits
      if (value === ref[key] && !SAME_OK.has(value) && !key.endsWith(".name") && !key.startsWith("zones.cities"))
        console.warn(`⚠ ${lang}: « ${key} » identique au ${REFERENCE} : ${value}`);
    }
  }
}

if (errors) {
  console.error(`\n${errors} erreur(s) dans les dictionnaires.`);
  process.exit(1);
}
console.log(`✓ Dictionnaires cohérents (${Object.keys(ref).length} textes × ${LANGS.length} langues).`);
