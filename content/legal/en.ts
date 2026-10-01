import { COMPANY, COMPANY_NAME, LEGAL_NAME_WITH_FORM } from "@/lib/site";
import type { LegalBlock, LegalContent } from "./types";

// Translation of the French legal notice (the French version prevails). Same structure as fr.ts.
const legal: LegalContent = {
  title: "Legal notice",
  subtitle: "Information about the website publisher, its host and the protection of your personal data.",
  intro:
    "In accordance with articles 6-III and 19 of French law no. 2004-575 of 21 June 2004 on confidence in the digital economy (LCEN), we provide users and visitors of this website with the following information.",
  sections: [
    {
      id: "editeur",
      icon: "building",
      title: "Website publisher",
      blocks: [
        {
          type: "facts",
          rows: [
            ["Company name", LEGAL_NAME_WITH_FORM],
            ["Share capital", COMPANY.shareCapital],
            ["Registered office", COMPANY.registeredOffice],
            ["SIREN", COMPANY.siren],
            ["EU VAT number", COMPANY.vatNumber],
            ["Phone", COMPANY.phone],
            ["Email", COMPANY.email],
            ["Publication director", COMPANY.publicationDirector],
          ],
        },
      ],
    },
    {
      id: "hebergement",
      icon: "server",
      title: COMPANY.creator.name.trim() ? "Hosting and website design" : "Hosting",
      blocks: [
        {
          type: "facts",
          rows: [
            ["Host", COMPANY.host.name],
            ["Website", COMPANY.host.website],
            ["Phone", COMPANY.host.phone],
          ],
        },
        // Créateur du site : affiché seulement si son nom est renseigné (chaque champ vide est masqué)
        ...(COMPANY.creator.name.trim()
          ? ([
              { type: "h3", text: "Website design" },
              {
                type: "facts",
                rows: [
                  ["Designed by", COMPANY.creator.name],
                  ["Website", COMPANY.creator.website],
                  ["Phone", COMPANY.creator.phone],
                  ["Email", COMPANY.creator.email],
                ],
              },
            ] as LegalBlock[])
          : []),
      ],
    },
    {
      id: "propriete",
      icon: "copyright",
      title: "Intellectual property and liability",
      blocks: [
        {
          type: "p",
          text: `All elements of this website (texts, logo, photographs, layout) are the property of ${COMPANY_NAME} or are used with permission. Any reproduction, representation or adaptation, in whole or in part, without prior written consent is prohibited (articles L.335-2 et seq. of the French Intellectual Property Code).`,
        },
        {
          type: "p",
          text: `The information on this website is provided for guidance only and does not constitute a contractual commitment. ${COMPANY_NAME} cannot be held responsible for the content of the websites it links to.`,
        },
        { type: "h3", text: "Photo credits" },
        {
          type: "ul",
          items: [
            "Aerial view of Toulouse: Caroline Léna Becker, CC BY 3.0 license (creativecommons.org/licenses/by/3.0), via Wikimedia Commons.",
            "Place du Capitole, airport, highway, Pont Neuf: royalty-free photographs (CC0), via Wikimedia Commons.",
          ],
        },
      ],
    },
    {
      id: "confidentialite",
      icon: "shieldCheck",
      title: "Personal data",
      blocks: [
        {
          type: "p",
          text: `${COMPANY_NAME} is the data controller for the personal data collected on this website. This data is processed in accordance with the General Data Protection Regulation (GDPR) and the French Data Protection Act.`,
        },
        { type: "h3", text: "Data collected and purposes" },
        {
          type: "p",
          text: "Through the quote form: pickup and dropoff addresses, date and time of the trip, requested vehicle, email address, phone number and, where applicable, any information you add in the message. This data is used to:",
        },
        {
          type: "ul",
          items: [
            "answer your quote request and organise the service: pre-contractual measures and performance of the contract (article 6.1.b GDPR);",
            "meet our accounting and tax obligations: legal obligation (article 6.1.c GDPR).",
          ],
        },
        { type: "h3", text: "Recipients and retention" },
        {
          type: "p",
          text: `The data is intended exclusively for ${COMPANY_NAME} and its technical providers (hosting, audience measurement), acting as processors. Some of them may process data outside the European Union; these transfers are subject to the safeguards provided for by the GDPR. The data is never sold or transferred to third parties.`,
        },
        {
          type: "ul",
          items: [
            "Quote requests not followed by a booking: 3 years from the last contact.",
            "Customer data: for the duration of the business relationship, then for the legal retention periods (10 years for accounting records).",
          ],
        },
        { type: "h3", text: "Your rights" },
        {
          type: "p",
          text: `You have the right to access, rectify, erase, restrict, port and object to the processing of your data, to withdraw your consent at any time and to set guidelines for the handling of your data after your death. To exercise these rights, email us at ${COMPANY.email}; we reply within one month. You may also lodge a complaint with the CNIL, the French data protection authority (www.cnil.fr).`,
        },
      ],
    },
    {
      id: "cookies",
      icon: "cookie",
      title: "Cookies",
      blocks: [
        {
          type: "p",
          text: "This website uses Google Tag Manager and Google Analytics to measure its audience and improve its content. These tools only set cookies if you accept them.",
        },
        {
          type: "p",
          text: "On your first visit, a banner lets you accept or refuse these cookies. Your choice is kept for 6 months and you can change it at any time; audience measurement cookies last 13 months at most. You can also configure your browser to block or delete cookies.",
        },
      ],
    },
  ],
};

export default legal;
