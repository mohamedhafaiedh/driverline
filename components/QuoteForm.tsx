"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Icon, { type IconName } from "@/components/Icon";
import { getMessages } from "@/lib/i18n";
import { DEFAULT_LANG, pagePath, type Lang } from "@/lib/seo";
import { PHONE_DISPLAY, PHONE_HREF, VEHICLE_OPTIONS } from "@/lib/site";

// Un seul formulaire Netlify pour toutes les langues : champs en français (identiques à public/form.html)
const FORM_NAME = "devis";
const LOCAL_HOST = /^(localhost|127\.\d+\.\d+\.\d+|\[::1\]|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)$/;

const EMPTY = {
  adresse_depart: "",
  adresse_arrivee: "",
  date: "",
  heure: "",
  vehicule: "",
  email: "",
  telephone: "",
  message: "",
  "bot-field": "",
};

type FieldName = keyof typeof EMPTY;

// Date minimale = aujourd'hui (fuseau du visiteur), fixée à l'ouverture du champ
function setMinToday(input: HTMLInputElement) {
  const now = new Date();
  input.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split("T")[0];
}

function openPicker(input: HTMLInputElement) {
  try {
    input.showPicker?.();
  } catch {
    // Navigateur sans showPicker : le champ natif reste utilisable.
  }
}

export default function QuoteForm({ lang }: { lang: Lang }) {
  const t = getMessages(lang).form;
  const subject = lang === DEFAULT_LANG ? "Nouvelle demande de devis" : `Nouvelle demande de devis (${lang.toUpperCase()})`;

  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [data, setData] = useState(EMPTY);
  const formRef = useRef<HTMLFormElement>(null);

  // Boutons « Réserver ce véhicule » (data-vehicle) : présélectionne le véhicule et revient à l'étape 1
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as Element | null)?.closest<HTMLElement>("[data-vehicle]");
      const vehicle = trigger?.dataset.vehicle;
      if (!vehicle) return;
      setData((prev) => ({ ...prev, vehicule: vehicle }));
      setStep(1);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const goToStep2 = () => {
    const fields = formRef.current?.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
      '[data-step="1"] input, [data-step="1"] select'
    );
    for (const field of Array.from(fields ?? [])) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return;
      }
    }
    setStep(2);
    requestAnimationFrame(() => document.getElementById(`q-email-${lang}`)?.focus());
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFailed(false);

    const payload: Record<string, string> = {
      "form-name": FORM_NAME,
      subject,
      langue: lang,
      ...data,
    };

    // Netlify Forms ne fonctionne qu'en ligne : en local (ou sur le réseau local), l'envoi est simulé
    if (LOCAL_HOST.test(window.location.hostname)) {
      console.info("Envoi simulé en local, données du formulaire :", payload);
      window.location.href = pagePath("merci", lang);
      return;
    }

    try {
      const res = await fetch("/form.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      window.location.href = pagePath("merci", lang);
    } catch (err) {
      console.error("Erreur de soumission :", err);
      setFailed(true);
      setIsSubmitting(false);
    }
  };

  const formattedDate = data.date
    ? new Date(`${data.date}T00:00`).toLocaleDateString(lang, { day: "numeric", month: "long", year: "numeric" })
    : "";

  const field = (
    name: FieldName,
    label: string,
    icon: IconName,
    stepNo: 1 | 2,
    props: Record<string, unknown> = {},
    wide = true
  ) => {
    const id = `q-${name}-${lang}`;
    const isPicker = props.type === "date" || props.type === "time";
    return (
      <div
        className={`field${wide ? " field--wide" : ""}`}
        data-step={stepNo}
        data-filled={data[name] !== ""}
        hidden={step !== stepNo}
      >
        <div className="field__control">
          <Icon name={icon} />
          {name === "message" ? (
            <textarea id={id} name={name} rows={3} value={data[name]} onChange={onChange} {...props} />
          ) : (
            <input
              id={id}
              name={name}
              value={data[name]}
              onChange={onChange}
              onClick={isPicker ? (e) => openPicker(e.currentTarget) : undefined}
              {...props}
            />
          )}
          <label htmlFor={id}>{label}</label>
        </div>
      </div>
    );
  };

  return (
    <form
      ref={formRef}
      className="quote-form"
      action="/form.html"
      method="POST"
      name={FORM_NAME}
      aria-label={t.aria}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      onKeyDown={(e) => {
        // Entrée à l'étape 1 : passe à l'étape 2 au lieu d'envoyer
        if (step === 1 && e.key === "Enter" && !(e.target instanceof HTMLTextAreaElement)) {
          e.preventDefault();
          goToStep2();
        }
      }}
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="langue" value={lang} />
      <p hidden>
        <label>
          Ne pas remplir : <input name="bot-field" tabIndex={-1} autoComplete="off" value={data["bot-field"]} onChange={onChange} />
        </label>
      </p>

      <ol className="steps" aria-label={t.stepsAria}>
        {t.steps.map((label, i) => {
          const n = i + 1;
          return (
            <li
              key={label}
              className={`steps__item${step === n ? " is-active" : ""}${step > n ? " is-done" : ""}`}
              aria-current={step === n ? "step" : undefined}
            >
              <span className="steps__num">{step > n ? <Icon name="check" /> : `0${n}`}</span>
              {label}
            </li>
          );
        })}
      </ol>
      <p className="sr-only" aria-live="polite">
        {step === 2 ? t.stepAnnounce : ""}
      </p>

      {step === 2 && (
        <div className="trip-summary">
          <div className="trip-summary__body">
            <p className="trip-summary__label">{t.summary}</p>
            <p className="trip-summary__route">
              {data.adresse_depart} <Icon name="arrowRight" /> {data.adresse_arrivee}
            </p>
            <p className="trip-summary__meta">
              {formattedDate} · {data.heure} · {data.vehicule}
            </p>
          </div>
          <button type="button" className="trip-summary__edit" onClick={() => setStep(1)}>
            {t.edit}
          </button>
        </div>
      )}

      <div className="quote-form__grid">
        {field("adresse_depart", `${t.pickup} *`, "pin", 1, { type: "text", required: true, placeholder: t.pickupPlaceholder, autoComplete: "street-address" })}
        {field("adresse_arrivee", `${t.dropoff} *`, "navigation", 1, { type: "text", required: true, placeholder: t.dropoffPlaceholder })}
        {field("date", `${t.date} *`, "calendar", 1, { type: "date", required: true, onFocus: (e: React.FocusEvent<HTMLInputElement>) => setMinToday(e.currentTarget) }, false)}
        {field("heure", `${t.time} *`, "clock", 1, { type: "time", required: true, step: 900 }, false)}

        <div className="field field--wide" data-step={1} data-filled={data.vehicule !== ""} hidden={step !== 1}>
          <div className="field__control field__control--select">
            <Icon name="car" />
            <select
              id={`q-vehicule-${lang}`}
              name="vehicule"
              required
              value={data.vehicule}
              onChange={onChange}
            >
              <option value="" disabled>
                {t.vehiclePlaceholder}
              </option>
              {VEHICLE_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <Icon name="chevronDown" className="field__chevron" />
            <label htmlFor={`q-vehicule-${lang}`}>{t.vehicle} *</label>
          </div>
        </div>

        {field("email", `${t.email} *`, "mail", 2, { type: "email", required: true, placeholder: t.emailPlaceholder, autoComplete: "email" })}
        {field("telephone", `${t.phone} *`, "phone", 2, {
          type: "tel",
          required: true,
          placeholder: t.phonePlaceholder,
          pattern: "[0-9()#&+*=\\-.\\s]+",
          title: t.phoneTitle,
          autoComplete: "tel",
        })}
        {field("message", t.message, "message", 2, { placeholder: t.messagePlaceholder })}
      </div>

      {failed && (
        <p className="quote-form__error" role="alert">
          {t.error} <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
        </p>
      )}

      <div className="quote-form__actions">
        {step === 1 ? (
          <button className="btn btn--dark btn--block" type="button" onClick={goToStep2}>
            {t.next}
            <Icon name="arrowRight" />
          </button>
        ) : (
          <>
            <button className="btn btn--outline" type="button" onClick={() => setStep(1)}>
              {t.back}
            </button>
            <button className="btn btn--dark btn--grow" type="submit" disabled={isSubmitting}>
              {isSubmitting ? t.sending : t.submit}
            </button>
          </>
        )}
      </div>
    </form>
  );
}
