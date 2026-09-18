"use client";

import React, { useState } from "react";

interface LanguageSwitcherProps {
  currentLang?: "fr" | "en";
  frHref?: string;
  enHref?: string;
}

export default function LanguageSwitcher({
  currentLang = "fr",
  frHref = "/",
  enHref = "/en",
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      id="trp-floater-ls"
      className="trp-language-switcher-container trp-floater-ls-flags trp-bottom-right trp-color-light only-flags"
      data-no-translation=""
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div id="trp-floater-ls-current-language">
        <a
          href="#"
          className="trp-floater-ls-disabled-language trp-ls-disabled-language"
          onClick={(e) => e.preventDefault()}
        >
          <img
            src={currentLang === "fr" ? "/images/fr_FR.png" : "/images/en_US.png"}
            width={18}
            height={12}
            alt={currentLang === "fr" ? "fr_FR" : "en_US"}
            title={currentLang === "fr" ? "Français" : "English"}
            className="trp-flag-image"
          />
        </a>
      </div>
      <div
        id="trp-floater-ls-language-list"
        style={{ display: isOpen ? "block" : undefined }}
      >
        <div className="trp-language-wrap trp-language-wrap-bottom">
          <a href={frHref} title="Français">
            <img
              src="/images/fr_FR.png"
              width={18}
              height={12}
              alt="fr_FR"
              title="Français"
              className="trp-flag-image"
            />
          </a>
        </div>
        <div className="trp-language-wrap trp-language-wrap-bottom">
          <a href={enHref} title="English">
            <img
              src="/images/en_US.png"
              width={18}
              height={12}
              alt="en_US"
              title="English"
              className="trp-flag-image"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
