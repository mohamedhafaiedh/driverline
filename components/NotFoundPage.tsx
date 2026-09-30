"use client";

import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import SimplePage from "@/components/SimplePage";
import { getMessages } from "@/lib/i18n";
import { DEFAULT_LANG, LANGS, pagePath, type Lang } from "@/lib/seo";

// Les pages 404 ne reçoivent pas les paramètres de route : la langue est déduite de l'URL visitée
function langFromPath(pathname: string | null): Lang {
  const first = pathname?.split("/")[1] ?? "";
  return LANGS.find((l) => l !== DEFAULT_LANG && l === first) ?? DEFAULT_LANG;
}

export default function NotFoundPage() {
  const lang = langFromPath(usePathname());
  const { notFound, meta, common } = getMessages(lang);
  return (
    <SimplePage lang={lang} page="">
      <title>{meta.notFound.title}</title>
      <meta name="robots" content="noindex" />
      <section className="thanks tone-dark">
        <div className="container thanks__inner">
          <p className="eyebrow">404</p>
          <h1 className="display display--lg">
            {notFound.title}
            <br />
            <em>{notFound.text}</em>
          </h1>
          <a className="btn btn--light" href={pagePath("", lang)}>
            {common.backHome}
            <Icon name="arrowRight" />
          </a>
        </div>
      </section>
    </SimplePage>
  );
}
