import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Les pages de remerciement ne sont pas bloquées ici : leur balise noindex doit rester lisible par Google
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
