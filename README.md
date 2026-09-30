# Driver Line

Site Next.js (chauffeur privé VTC à Toulouse), déployé sur Netlify. Le français est à la racine (`/`), l'anglais sous `/en/`.

```bash
npm run dev          # développement
npm run build        # build de production (vérifie d'abord les traductions)
npm run i18n:check   # vérifie seulement les traductions
```

## Organisation

| Quoi | Où |
|---|---|
| Design (couleurs, polices, composants) | `app/globals.css` |
| Polices (Inter, Instrument Serif via next/font) | `lib/fonts.ts` |
| Coordonnées, ancres, icônes, véhicules (tout ce qui ne se traduit pas) | `lib/site.ts` |
| Accueil, mentions légales, merci, 404 | `components/HomePage.tsx`, `LegalPage.tsx`, `ThanksPage.tsx`, `NotFoundPage.tsx` |
| Données structurées (LocalBusiness, note Google, FAQ) | `components/JsonLd.tsx` |

## Variantes en test

Dans `lib/site.ts`, deux réglages permettent de revenir à la version précédente sans rien supprimer :

| Réglage | Valeurs |
|---|---|
| `HERO_IMAGE` | `"aerien"` (vue aérienne de Toulouse), `"toulouse"` (Pont Neuf et Garonne) ou `"chauffeur"` (photo d'origine) |
| `SERVICES_LAYOUT` | `"cards"` (4 services en lignes illustrées, images alternées) ou `"classic"` (6 services avec icônes) |

Les textes des deux versions des services sont dans `messages/*.json` (`services.cards` et `services.classic`). Les photos ajoutées viennent de Wikimedia Commons. Toutes sont en CC0, sauf la vue aérienne (CC BY 3.0, créditée dans les mentions légales : à retirer du crédit si on change d'image).

## Traductions

| Quoi | Où |
|---|---|
| Langues, URL traduites, métadonnées SEO | `LOCALES`, `DEFAULT_LANG` et `SLUGS` dans `lib/seo.ts` |
| Textes de l'interface et des pages | `messages/<langue>.json` |
| Textes juridiques | `content/legal/<langue>.ts` |
| Route unique de toutes les pages | `app/[lang]/[[...slug]]/page.tsx` |

- Le français est servi à la racine par une réécriture interne (`next.config.ts`), et `/fr/…` redirige vers la racine.
- Les URL anglaises sont traduites : `/en/legal-notice/`, `/en/thank-you/`. Les anciennes (`/en/mentions-legales/`, `/en/merci/`) redirigent en 301.
- `fr.json` est la référence. Chaque autre langue doit avoir exactement les mêmes clés, sinon le build est bloqué (`npm run i18n:check`).
- Les liens internes passent toujours par `pagePath("mentions-legales", lang)`, jamais par une URL écrite en dur.
- Formulaire de devis : un seul formulaire Netlify (`devis`) pour toutes les langues. Les champs sont en français, avec un champ caché `langue`, et l'objet de l'e-mail indique la langue si ce n'est pas le français. Les noms de champs doivent rester identiques à `public/form.html`. L'anti-spam est un champ piège `bot-field`.

### Ajouter une langue

1. `lib/seo.ts` : ajouter la langue dans `LOCALES` et ses URL dans `SLUGS`.
2. Créer `messages/<code>.json` (traduction de `fr.json`) et l'ajouter dans `lib/i18n.ts`.
3. Créer `content/legal/<code>.ts` et l'ajouter dans `content/legal/index.ts`.

Les pages, le sitemap, les hreflang, le sélecteur de langue et la réécriture d'URL suivent automatiquement.

## SEO

- Aperçu des liens partagés (Open Graph et X) : `public/images/og-fr.jpg` et `og-en.jpg` (1200×630).
- `app/sitemap.ts` (avec hreflang), `app/robots.ts`, `app/manifest.ts`.
- Pages de remerciement en `noindex` (non bloquées dans robots.txt, pour que Google lise la consigne).
