"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { getMessages } from "@/lib/i18n";
import { LANGS, LOCALES, pagePath, type Lang, type PageKey } from "@/lib/seo";

export default function LanguageSwitcher({ lang, page }: { lang: Lang; page: PageKey }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const others = LANGS.filter((l) => l !== lang);

  useEffect(() => {
    const onOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`lang${isOpen ? " is-open" : ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="lang__trigger"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={getMessages(lang).common.language}
        onClick={() => setIsOpen((open) => !open)}
      >
        <img className="lang__flag" src={LOCALES[lang].flag} width={18} height={12} alt="" />
        <span className="lang__code">{lang.toUpperCase()}</span>
        <Icon name="chevronDown" className="lang__caret" />
      </button>
      <ul className="lang__menu">
        {others.map((l) => (
          <li key={l}>
            <a href={pagePath(page, l)} hrefLang={LOCALES[l].code} lang={LOCALES[l].code}>
              <img className="lang__flag" src={LOCALES[l].flag} width={18} height={12} alt="" />
              {LOCALES[l].name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
