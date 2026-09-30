import Image from "next/image";
import CurrentYear from "@/components/CurrentYear";
import { getMessages } from "@/lib/i18n";
import { pagePath, type Lang, type PageKey } from "@/lib/seo";
import { NAV, SECTIONS } from "@/lib/site";

export default function SiteFooter({ lang, page }: { lang: Lang; page: PageKey }) {
  const { footer } = getMessages(lang);
  const base = page === "" ? "" : pagePath("", lang);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <a className="site-footer__logo" href={pagePath("", lang)} aria-label="Driver Line">
            <Image
              src="/images/Driver-Line-logo-1000-x-200-px-1000-x-150-px-1.png"
              alt="Driver Line"
              width={1000}
              height={150}
              loading="lazy"
            />
          </a>
          <nav aria-label="Menu">
            <ul className="site-footer__nav">
              {NAV.map((key) => (
                <li key={key}>
                  <a href={`${base}#${SECTIONS[key]}`}>{footer.nav[key]}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="site-footer__bottom">
          <p>
            Driver Line <CurrentYear /> {footer.rights}
          </p>
          <a href={pagePath("mentions-legales", lang)}>{footer.legal}</a>
        </div>
      </div>
    </footer>
  );
}
