// Suggestions d'adresses Google Places (API « New »), chargées à la demande.
// Clé : variable NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (lue au build).
// Tout problème (clé absente, invalide, API non activée, domaine refusé, réseau) est silencieux :
// les champs adresse restent en saisie libre, sans message affiché au visiteur.

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const SCRIPT_ID = "google-maps-script";
const GIVE_UP_AFTER_MS = 15000;

/* eslint-disable @typescript-eslint/no-explicit-any */
export type PlacesLib = any; // AutocompleteSuggestion, AutocompleteSessionToken

let loading: Promise<PlacesLib> | null = null;
let disabled = !API_KEY;

/** Google appelle gm_authFailure quand la clé est refusée : on coupe les suggestions sans rien afficher. */
function watchAuthFailure() {
  const w = window as any;
  const previous = w.gm_authFailure;
  w.gm_authFailure = () => {
    disabled = true;
    previous?.();
  };
}

function waitForBootstrap(): Promise<any> {
  const w = window as any;
  return new Promise((resolve, reject) => {
    const started = Date.now();
    if (!document.getElementById(SCRIPT_ID)) {
      watchAuthFailure();
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(API_KEY ?? "")}&loading=async&v=weekly`;
      script.onerror = () => reject(new Error("Script Google Maps non chargé"));
      document.head.appendChild(script);
    }
    const tick = () => {
      if (w.google?.maps?.importLibrary) return resolve(w.google.maps);
      if (disabled || Date.now() - started > GIVE_UP_AFTER_MS) return reject(new Error("Google Maps indisponible"));
      setTimeout(tick, 150);
    };
    tick();
  });
}

export function placesDisabled() {
  return disabled;
}

/** Désactive les suggestions pour le reste de la visite (erreur de clé, d'autorisation ou de configuration). */
export function disablePlaces() {
  disabled = true;
}

/** Charge la bibliothèque « places » une seule fois par page ; rejette (sans bruit) si indisponible. */
export function loadPlaces(): Promise<PlacesLib> {
  if (typeof window === "undefined" || disabled) return Promise.reject(new Error("Suggestions désactivées"));
  loading ??= waitForBootstrap()
    .then((maps) => maps.importLibrary("places"))
    .catch((err) => {
      disabled = true;
      throw err;
    });
  return loading;
}
