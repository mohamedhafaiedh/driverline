import type { NextConfig } from "next";
import { DEFAULT_LANG, LANGS, LEGACY_EN_REDIRECTS, pagePath } from "./lib/seo";

// Préfixes réservés aux autres langues (ex. « en ») : tout le reste est servi en langue par défaut
const OTHER_LANGS = LANGS.filter((lang) => lang !== DEFAULT_LANG).join("|");

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/devis-envoye", destination: pagePath("merci", "fr"), permanent: true },
      { source: "/en/devis-envoye", destination: pagePath("merci", "en"), permanent: true },
      ...LEGACY_EN_REDIRECTS.map((r) => ({ ...r, permanent: true })),
      // Redirection ancienne URL parasite
      {
        source: "/driverline-fr.preview-domain.com/mentions-legales",
        destination: "/mentions-legales/",
        permanent: true,
      },
      {
        source: "/driverline-fr.preview-domain.com/mentions-legales/:path*",
        destination: "/mentions-legales/",
        permanent: true,
      },
      { source: "/driverline-fr.preview-domain.com/:path*", destination: "/", permanent: true },
      // Anciennes URLs WordPress
      { source: "/hello-world/:path*", destination: "/", permanent: true },
      { source: "/category/:path*", destination: "/", permanent: true },
      { source: "/author/:path*", destination: "/", permanent: true },
      { source: "/tag/:path*", destination: "/", permanent: true },
      { source: "/feed/:path*", destination: "/", permanent: true },
      { source: "/comments/feed/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      // La langue par défaut n'a pas de préfixe public : /fr/merci/ → /merci/
      { source: `/${DEFAULT_LANG}`, destination: "/", permanent: true },
      { source: `/${DEFAULT_LANG}/:path+`, destination: "/:path+/", permanent: true },
    ];
  },
  async rewrites() {
    return {
      // La langue par défaut est servie à la racine : /merci/ affiche app/[lang]/… avec lang = fr.
      // Exclus : préfixes des autres langues, fichiers (extension), ressources Next.js et Netlify.
      beforeFiles: [
        { source: "/", destination: `/${DEFAULT_LANG}/` },
        {
          source: `/:path((?!(?:${OTHER_LANGS}|${DEFAULT_LANG})(?:/|$))(?!_next/|\\.netlify/)(?!.*\\.[a-zA-Z0-9]+$).+)`,
          destination: `/${DEFAULT_LANG}/:path`,
        },
      ],
    };
  },
};

export default nextConfig;
