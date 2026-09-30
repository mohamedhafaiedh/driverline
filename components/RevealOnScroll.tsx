"use client";

import { useEffect } from "react";

// Fait apparaître en fondu les éléments [data-reveal] quand ils entrent à l'écran.
// Sans JavaScript ou avec « réduire les animations », tout reste visible.
export default function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    // Les éléments déjà à l'écran s'affichent tout de suite, sans flash.
    for (const el of elements) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      else observer.observe(el);
    }
    root.classList.add("reveal-ready");
    return () => observer.disconnect();
  }, []);

  return null;
}
