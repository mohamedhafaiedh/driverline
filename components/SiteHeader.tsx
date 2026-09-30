"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getMessages } from "@/lib/i18n";
import { pagePath, type Lang, type PageKey } from "@/lib/seo";
import { NAV, PHONE_DISPLAY, PHONE_HREF, SECTIONS } from "@/lib/site";

export default function SiteHeader({ lang, page }: { lang: Lang; page: PageKey }) {
  const { nav, common } = getMessages(lang);
  const isHome = page === "";
  const base = isHome ? "" : pagePath("", lang);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu plein écran : la page derrière ne défile plus
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);
    return () => document.documentElement.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const focusables = () =>
      [burgerRef.current, ...Array.from(menu?.querySelectorAll<HTMLElement>("a, button") ?? [])].filter(
        (el): el is HTMLElement => !!el
      );
    const close = () => {
      setMenuOpen(false);
      burgerRef.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab") return;
      // Tabulation bouclée entre le bouton du menu et les liens du menu ouvert
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onOutside = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
    };
  }, [menuOpen]);

  const classes = ["site-header", scrolled && "is-scrolled", menuOpen && "is-open"].filter(Boolean).join(" ");
  const href = (key: (typeof NAV)[number]) => `${base}#${SECTIONS[key]}`;

  return (
    <header ref={headerRef} className={classes}>
      <div className="site-header__bar container">
        <a className="site-header__logo" href={pagePath("", lang)} aria-label="Driver Line">
          <Image src="/images/Driver-Line-logo-1000-x-200-px-1000-x-150-px-1.png" alt="Driver Line" width={1000} height={150} />
        </a>

        <nav className="site-nav" aria-label="Menu">
          <ul>
            {NAV.map((key) => (
              <li key={key}>
                <a href={href(key)}>
                  {nav[key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <LanguageSwitcher lang={lang} page={page} />
          <a className="btn btn--light btn--sm site-header__call" href={PHONE_HREF}>
            <Icon name="phone" />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <button
            ref={burgerRef}
            type="button"
            className="burger"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? common.menuClose : common.menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav id="mobile-menu" ref={menuRef} className="mobile-menu" aria-label="Menu" hidden={!menuOpen}>
        <ul className="container">
          {NAV.filter((key) => key !== "quote").map((key) => (
            <li key={key}>
              <a href={href(key)} onClick={() => setMenuOpen(false)}>
                {nav[key]}
                <Icon name="arrowRight" />
              </a>
            </li>
          ))}
          <li className="mobile-menu__cta">
            <a className="btn btn--light" href={href("quote")} onClick={() => setMenuOpen(false)}>
              {common.menuQuote}
              <Icon name="arrowRight" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
