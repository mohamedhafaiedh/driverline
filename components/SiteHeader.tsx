"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getMessages } from "@/lib/i18n";
import { pagePath, type Lang, type PageKey } from "@/lib/seo";
import { NAV, PHONE_DISPLAY, PHONE_HREF, SECTIONS } from "@/lib/site";

// Au-delà de cette largeur, la navigation complète est visible : le menu mobile se ferme
const DESKTOP_QUERY = "(min-width: 1024px)";

export default function SiteHeader({ lang, page }: { lang: Lang; page: PageKey }) {
  const { nav, common } = getMessages(lang);
  const isHome = page === "";
  const base = isHome ? "" : pagePath("", lang);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu plein écran en <dialog> modal : le navigateur garde le focus dans le menu,
  // rend la page inactive derrière, ferme avec Échap et rend le focus au burger.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (!menuOpen && dialog.open) {
      dialog.close();
    }
    // La page derrière ne défile plus
    document.documentElement.classList.toggle("menu-open", menuOpen);
    return () => document.documentElement.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => desktop.matches && setMenuOpen(false);
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const href = (key: (typeof NAV)[number]) => `${base}#${SECTIONS[key]}`;

  // Barre d'en-tête, rendue dans l'en-tête et en haut du menu : la croix tombe exactement à la place du burger
  const bar = (inMenu: boolean) => (
    <div className="site-header__bar container">
      <a className="site-header__logo" href={pagePath("", lang)} aria-label="Driver Line" onClick={inMenu ? closeMenu : undefined}>
        <Image src="/images/Driver-Line-logo-plein-blanc.png" alt="Driver Line" width={1000} height={150} />
      </a>

      {!inMenu && (
        <nav className="site-nav" aria-label="Menu">
          <ul>
            {NAV.map((key) => (
              <li key={key}>
                <a href={href(key)}>{nav[key]}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="site-header__actions">
        <LanguageSwitcher lang={lang} page={page} />
        <a className="btn btn--light btn--sm site-header__call" href={PHONE_HREF}>
          <Icon name="phone" />
          <span>{PHONE_DISPLAY}</span>
        </a>
        {inMenu ? (
          <button ref={closeRef} type="button" className="burger is-close" aria-label={common.menuClose} onClick={closeMenu}>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            className="burger"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={common.menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>{bar(false)}</header>

      <dialog id="mobile-menu" ref={dialogRef} className="menu-dialog" aria-label="Menu" onClose={closeMenu}>
        {bar(true)}
        <nav className="mobile-menu" aria-label="Menu">
          <ul className="container">
            {NAV.filter((key) => key !== "quote").map((key) => (
              <li key={key}>
                <a href={href(key)} onClick={closeMenu}>
                  {nav[key]}
                  <Icon name="arrowRight" />
                </a>
              </li>
            ))}
            <li className="mobile-menu__cta">
              <a className="btn btn--light" href={href("quote")} onClick={closeMenu}>
                {common.menuQuote}
                <Icon name="arrowRight" />
              </a>
            </li>
          </ul>
        </nav>
      </dialog>
    </>
  );
}
