// Vérifie les mentions légales avant le build.
// - Bloque si une langue n'a pas les mêmes rubriques (ancres) que le français (content/legal/*.ts).
// - Signale, sans bloquer, les informations obligatoires encore vides dans data/company.json
//   (elles ne sont pas affichées sur le site tant qu'elles sont vides).
import { readFileSync, readdirSync } from "node:fs";

const DIR = new URL("../content/legal/", import.meta.url);
const company = JSON.parse(readFileSync(new URL("../data/company.json", import.meta.url), "utf8"));

// Obligatoires (LCEN) : on privilégie le SIREN au RCS ; l'adresse de l'hébergeur n'est jamais publiée
const REQUIRED = {
  legalName: "dénomination sociale",
  legalForm: "forme juridique",
  shareCapital: "capital social",
  registeredOffice: "siège social",
  siren: "SIREN",
  publicationDirector: "directeur de la publication",
  "host.name": "hébergeur",
};

const get = (path) => path.split(".").reduce((value, key) => value?.[key], company);
const missing = Object.entries(REQUIRED)
  .filter(([path]) => !String(get(path) ?? "").trim())
  .map(([, label]) => label);
if (missing.length) console.warn(`⚠ Mentions légales : à compléter dans data/company.json (non affiché pour l'instant) : ${missing.join(", ")}`);

const LANGS = readdirSync(DIR)
  .filter((f) => /^[a-z]{2}\.ts$/.test(f))
  .map((f) => f.slice(0, 2));
const ids = (lang) => [...readFileSync(new URL(`${lang}.ts`, DIR), "utf8").matchAll(/^\s*id: "([^"]+)"/gm)].map((m) => m[1]).join(",");

const reference = ids("fr");
const wrong = LANGS.filter((lang) => ids(lang) !== reference);
for (const lang of wrong) console.error(`✗ ${lang} : rubriques différentes du français (${ids(lang)} au lieu de ${reference})`);
if (wrong.length) process.exit(1);
console.log(`✓ Mentions légales cohérentes (${LANGS.length} langues).`);
