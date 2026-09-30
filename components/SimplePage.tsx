import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getMessages } from "@/lib/i18n";
import type { Lang, PageKey } from "@/lib/seo";

/** Gabarit des pages secondaires (merci, mentions légales, 404) : même en-tête et pied de page que l'accueil. */
export default function SimplePage({ lang, page, children }: { lang: Lang; page: PageKey; children: React.ReactNode }) {
  return (
    <div className="simple-page">
      <a className="skip-link" href="#content">
        {getMessages(lang).common.skip}
      </a>
      <SiteHeader lang={lang} page={page} />
      <main id="content">{children}</main>
      <SiteFooter lang={lang} page={page} />
    </div>
  );
}
