"use client";

import { useEffect, useRef, useState, type InputHTMLAttributes, type KeyboardEvent } from "react";
import Icon from "@/components/Icon";
import { disablePlaces, loadPlaces, placesDisabled, type PlacesLib } from "@/lib/googlePlaces";

interface Suggestion {
  main: string;
  secondary: string;
  full: string;
}

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  id: string;
  name: string;
  value: string;
  lang: string;
  onValue: (value: string) => void;
};

const MIN_CHARS = 3;
const DEBOUNCE_MS = 250;
// Résultats favorisés autour de Toulouse (rayon maximal autorisé par Google : 50 km), limités aux pays autorisés
const TOULOUSE_BIAS = { center: { lat: 43.6047, lng: 1.4442 }, radius: 50000 };
const REGION_CODES = ["fr", "be", "ch", "de", "it", "es"]; // mêmes pays que Diamond Services

/**
 * Champ adresse avec suggestions Google Places, dans le style du formulaire
 * (clavier : ↑ ↓ Entrée Échap). Si Google est indisponible, c'est un champ texte normal.
 */
export default function AddressInput({ id, name, value, lang, onValue, ...props }: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const places = useRef<PlacesLib | null>(null);
  const token = useRef<unknown>(null);
  const requestId = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listId = `${id}-list`;

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const close = () => {
    setOpen(false);
    setActive(-1);
  };

  // Chargement de Google au premier focus seulement : rien n'est téléchargé tant qu'on ne remplit pas d'adresse
  const prepare = () => {
    if (places.current || placesDisabled()) return;
    loadPlaces()
      .then((lib) => (places.current = lib))
      .catch(() => {});
  };

  const fetchSuggestions = (input: string) => {
    if (timer.current) clearTimeout(timer.current);
    if (!places.current || placesDisabled() || input.trim().length < MIN_CHARS) {
      setSuggestions([]);
      close();
      return;
    }
    timer.current = setTimeout(async () => {
      const current = ++requestId.current;
      try {
        const { AutocompleteSuggestion, AutocompleteSessionToken } = places.current;
        // Un jeton par recherche : Google regroupe les frappes d'une même saisie
        token.current ??= new AutocompleteSessionToken();
        const { suggestions: results } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input,
          sessionToken: token.current,
          includedRegionCodes: REGION_CODES,
          locationBias: TOULOUSE_BIAS,
          language: lang,
        });
        if (current !== requestId.current || placesDisabled()) return; // réponse périmée ou clé refusée
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const list: Suggestion[] = (results ?? [])
          .filter((s: any) => s.placePrediction)
          .map((s: any) => {
            const p = s.placePrediction;
            const full = p.text.toString();
            return { main: p.mainText?.toString() ?? full, secondary: p.secondaryText?.toString() ?? "", full };
          });
        /* eslint-enable @typescript-eslint/no-explicit-any */
        setSuggestions(list);
        setActive(-1);
        setOpen(list.length > 0);
      } catch {
        // Clé, autorisation ou configuration en défaut : plus de suggestions, aucun message au visiteur
        disablePlaces();
        setSuggestions([]);
        close();
      }
    }, DEBOUNCE_MS);
  };

  const choose = (s: Suggestion) => {
    onValue(s.full);
    setSuggestions([]);
    close();
    token.current = null; // la sélection clôt la session
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter" && active >= 0) {
      // Choisit la suggestion au lieu de passer à l'étape suivante
      e.preventDefault();
      e.stopPropagation();
      choose(suggestions[active]);
    } else if (e.key === "Escape") {
      e.stopPropagation();
      close();
    }
  };

  return (
    <>
      <input
        {...props}
        id={id}
        name={name}
        type="text"
        value={value}
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        onFocus={() => {
          prepare();
          if (suggestions.length > 0) setOpen(true);
        }}
        onBlur={close}
        onChange={(e) => {
          onValue(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        onKeyDown={onKeyDown}
      />
      {open && (
        <ul id={listId} role="listbox" className="suggest">
          {suggestions.map((s, i) => (
            <li
              key={`${s.full}-${i}`}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              className="suggest__item"
              // mousedown : la suggestion est prise avant que le champ ne perde le focus
              onMouseDown={(e) => {
                e.preventDefault();
                choose(s);
              }}
              onMouseEnter={() => setActive(i)}
            >
              <Icon name="pin" className="suggest__icon" />
              <span className="suggest__text">
                <span className="suggest__main">{s.main}</span>
                {s.secondary && <span className="suggest__secondary">{s.secondary}</span>}
              </span>
            </li>
          ))}
          <li className="suggest__attribution" aria-hidden="true">
            Google
          </li>
        </ul>
      )}
    </>
  );
}
