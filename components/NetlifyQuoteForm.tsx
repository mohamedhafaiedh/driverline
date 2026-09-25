"use client";

import React, { useState, useEffect } from "react";

interface NetlifyQuoteFormProps {
  lang?: "fr" | "en";
}

export default function NetlifyQuoteForm({ lang = "fr" }: NetlifyQuoteFormProps) {
  const isEn = lang === "en";
  const formName = isEn ? "devis-en" : "devis";
  const targetRedirect = isEn ? "/en/merci" : "/merci";

  const [today, setToday] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    adresse_depart: "",
    adresse_arrivee: "",
    date: "",
    heure: "",
    vehicule: "",
    email: "",
    telephone: "",
    message: "",
    "bot-field": "",
  });

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openPicker = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (input) {
      input.focus();
      try {
        if ("showPicker" in input && typeof input.showPicker === "function") {
          input.showPicker();
        }
      } catch (err) {
        // Fallback
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const encode = (data: Record<string, string>) =>
      Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");

    const payload: Record<string, string> = {
      "form-name": formName,
      subject: "Nouvelle demande de devis",
      "bot-field": formData["bot-field"],
      email: formData.email,
      message: formData.message,
    };

    if (isEn) {
      payload.pickup_address = formData.adresse_depart;
      payload.dropoff_address = formData.adresse_arrivee;
      payload.date = formData.date;
      payload.time = formData.heure;
      payload.vehicle = formData.vehicule;
      payload.phone = formData.telephone;
    } else {
      payload.adresse_depart = formData.adresse_depart;
      payload.adresse_arrivee = formData.adresse_arrivee;
      payload.date = formData.date;
      payload.heure = formData.heure;
      payload.vehicule = formData.vehicule;
      payload.telephone = formData.telephone;
    }

    try {
      await fetch("/form.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });
      window.location.href = targetRedirect;
    } catch (err) {
      console.error("Erreur de soumission :", err);
      window.location.href = targetRedirect;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      action="/form.html"
      aria-label={isEn ? "VTC Quote Form" : "Formulaire VTC"}
      className="elementor-form"
      method="POST"
      name={formName}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      {/* Champs obligatoires Netlify */}
      <input type="hidden" name="form-name" value={formName} />
      <input
        type="hidden"
        name="subject"
        value="Nouvelle demande de devis"
      />

      {/* Honeypot anti-spam */}
      <p style={{ display: "none" }}>
        <label>
          Ne pas remplir :{" "}
          <input
            name="bot-field"
            tabIndex={-1}
            autoComplete="off"
            value={formData["bot-field"]}
            onChange={handleChange}
          />
        </label>
      </p>

      <div className="elementor-form-fields-wrapper elementor-labels-">
        {/* Adresse de départ (pleine largeur) */}
        <div className="elementor-field-type-text elementor-field-group elementor-column elementor-col-100 elementor-field-required">
          <div className="netlify-floating-group">
            <div className="netlify-input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <input
              id={`field-pickup-${lang}`}
              name="adresse_depart"
              type="text"
              required
              placeholder={
                isEn
                  ? "Ex: Toulouse-Blagnac Airport, Hall B"
                  : "Ex : Aéroport Toulouse-Blagnac, Hall B"
              }
              className={`netlify-floating-input ${
                formData.adresse_depart ? "has-value" : ""
              }`}
              value={formData.adresse_depart}
              onChange={handleChange}
            />
            <label
              htmlFor={`field-pickup-${lang}`}
              className="netlify-floating-label"
            >
              {isEn ? "Pickup address *" : "Adresse de départ *"}
            </label>
          </div>
        </div>

        {/* Adresse d'arrivée (pleine largeur) */}
        <div className="elementor-field-type-text elementor-field-group elementor-column elementor-col-100 elementor-field-required">
          <div className="netlify-floating-group">
            <div className="netlify-input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
            <input
              id={`field-dropoff-${lang}`}
              name="adresse_arrivee"
              type="text"
              required
              placeholder={
                isEn
                  ? "Ex: Place du Capitole, Toulouse"
                  : "Ex : Place du Capitole, Toulouse"
              }
              className={`netlify-floating-input ${
                formData.adresse_arrivee ? "has-value" : ""
              }`}
              value={formData.adresse_arrivee}
              onChange={handleChange}
            />
            <label
              htmlFor={`field-dropoff-${lang}`}
              className="netlify-floating-label"
            >
              {isEn ? "Dropoff address *" : "Adresse d'arrivée *"}
            </label>
          </div>
        </div>

        {/* Date */}
        <div className="elementor-field-type-text elementor-field-group elementor-column elementor-col-50 elementor-field-required">
          <div
            className="netlify-floating-group date-time-group"
            onClick={() => openPicker(`field-date-${lang}`)}
          >
            <div className="netlify-input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <input
              id={`field-date-${lang}`}
              name="date"
              type="date"
              min={today}
              required
              className={`netlify-floating-input ${
                formData.date ? "has-value" : ""
              }`}
              value={formData.date}
              onChange={handleChange}
              onClick={(e) => {
                try {
                  if ("showPicker" in e.currentTarget && typeof e.currentTarget.showPicker === "function") {
                    e.currentTarget.showPicker();
                  }
                } catch (err) {}
              }}
              onFocus={(e) => {
                try {
                  if ("showPicker" in e.currentTarget && typeof e.currentTarget.showPicker === "function") {
                    e.currentTarget.showPicker();
                  }
                } catch (err) {}
              }}
            />
            <label
              htmlFor={`field-date-${lang}`}
              className="netlify-floating-label"
            >
              {isEn ? "Date *" : "Date *"}
            </label>
          </div>
        </div>

        {/* Heure */}
        <div className="elementor-field-type-text elementor-field-group elementor-column elementor-col-50 elementor-field-required">
          <div
            className="netlify-floating-group date-time-group"
            onClick={() => openPicker(`field-heure-${lang}`)}
          >
            <div className="netlify-input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <input
              id={`field-heure-${lang}`}
              name="heure"
              type="time"
              step="900"
              required
              className={`netlify-floating-input ${
                formData.heure ? "has-value" : ""
              }`}
              value={formData.heure}
              onChange={handleChange}
              onClick={(e) => {
                try {
                  if ("showPicker" in e.currentTarget && typeof e.currentTarget.showPicker === "function") {
                    e.currentTarget.showPicker();
                  }
                } catch (err) {}
              }}
              onFocus={(e) => {
                try {
                  if ("showPicker" in e.currentTarget && typeof e.currentTarget.showPicker === "function") {
                    e.currentTarget.showPicker();
                  }
                } catch (err) {}
              }}
            />
            <label
              htmlFor={`field-heure-${lang}`}
              className="netlify-floating-label"
            >
              {isEn ? "Time *" : "Heure *"}
            </label>
          </div>
        </div>

        {/* Voiture / Véhicule */}
        <div className="elementor-field-type-select elementor-field-group elementor-column elementor-col-100 elementor-field-required">
          <div className="netlify-floating-group">
            <div className="netlify-input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H7.5a1 1 0 0 0-.8.4L4 11l-5.16.86a1 1 0 0 0-.84.99V16h3" />
                <circle cx="6.5" cy="16.5" r="2.5" />
                <circle cx="16.5" cy="16.5" r="2.5" />
              </svg>
            </div>
            <select
              id={`field-vehicule-${lang}`}
              name="vehicule"
              required
              className={`netlify-floating-input netlify-floating-select ${
                !formData.vehicule ? "placeholder-selected" : ""
              }`}
              value={formData.vehicule}
              onChange={handleChange}
            >
              <option value="" disabled>
                {isEn ? "— Please choose a vehicle —" : "— Veuillez choisir un véhicule —"}
              </option>
              <option value={isEn ? "Berline (3 pax)" : "Berline (3 pax)"}>
                {isEn ? "Berline (3 pax)" : "Berline (3 pax)"}
              </option>
              <option value="Van (7 pax)">Van (7 pax)</option>
            </select>
            <label
              htmlFor={`field-vehicule-${lang}`}
              className="netlify-floating-label select-label"
            >
              {isEn ? "Vehicle *" : "Voiture *"}
            </label>
            <div className="netlify-select-chevron">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="elementor-field-type-email elementor-field-group elementor-column elementor-col-50 elementor-field-required">
          <div className="netlify-floating-group">
            <div className="netlify-input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <input
              id={`field-email-${lang}`}
              name="email"
              type="email"
              required
              placeholder={isEn ? "Ex: john.doe@email.com" : "Ex : jean.dupont@email.fr"}
              className={`netlify-floating-input ${
                formData.email ? "has-value" : ""
              }`}
              value={formData.email}
              onChange={handleChange}
            />
            <label
              htmlFor={`field-email-${lang}`}
              className="netlify-floating-label"
            >
              {isEn ? "Your email *" : "Votre email *"}
            </label>
          </div>
        </div>

        {/* Téléphone */}
        <div className="elementor-field-type-tel elementor-field-group elementor-column elementor-col-50 elementor-field-required">
          <div className="netlify-floating-group">
            <div className="netlify-input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <input
              id={`field-tel-${lang}`}
              name="telephone"
              type="tel"
              pattern="[0-9()#&amp;+*=\-.\s]+"
              title={
                isEn
                  ? "Only numbers and phone characters (#, -, *, etc) are accepted."
                  : "Seuls les caractères de numéros de téléphone (#, -, *, etc.) sont acceptés."
              }
              required
              placeholder={isEn ? "Ex: +33 6 12 34 56 78" : "Ex : 06 12 34 56 78"}
              className={`netlify-floating-input ${
                formData.telephone ? "has-value" : ""
              }`}
              value={formData.telephone}
              onChange={handleChange}
            />
            <label
              htmlFor={`field-tel-${lang}`}
              className="netlify-floating-label"
            >
              {isEn ? "Your phone *" : "Votre téléphone *"}
            </label>
          </div>
        </div>

        {/* Message */}
        <div className="elementor-field-type-textarea elementor-field-group elementor-column elementor-col-100">
          <div className="netlify-floating-group">
            <div className="netlify-input-icon icon-top">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <textarea
              id={`field-message-${lang}`}
              name="message"
              rows={3}
              placeholder={
                isEn
                  ? "Ex: Flight number, excess luggage, child seat needed..."
                  : "Ex : Numéro de vol, bagages volumineux, siège bébé souhaité..."
              }
              className={`netlify-floating-input netlify-floating-textarea ${
                formData.message ? "has-value" : ""
              }`}
              value={formData.message}
              onChange={handleChange}
            />
            <label
              htmlFor={`field-message-${lang}`}
              className="netlify-floating-label"
            >
              {isEn ? "Additional information" : "Informations additionnelles"}
            </label>
          </div>
        </div>

        {/* Bouton de soumission */}
        <div className="elementor-field-group elementor-column elementor-field-type-submit elementor-col-100 e-form__buttons">
          <button
            className="elementor-button elementor-size-sm"
            type="submit"
            disabled={isSubmitting}
          >
            <span className="elementor-button-content-wrapper">
              <span className="elementor-button-text">
                {isSubmitting
                  ? isEn
                    ? "Sending..."
                    : "Envoi en cours..."
                  : isEn
                  ? "I receive my free quote"
                  : "Je reçois mon devis gratuit"}
              </span>
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
