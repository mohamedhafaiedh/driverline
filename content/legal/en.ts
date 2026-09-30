import type { LegalContent } from "./types";

// Translation of the French legal notice (the French version prevails).
const legal: LegalContent = {
  title: "Legal notice",
  sections: [
    {
      title: "Website publisher",
      blocks: [
        {
          type: "facts",
          rows: [
            ["Trade name", "Driver Line"],
            ["Legal form", ""],
            ["Share capital", ""],
            ["Registered office", ""],
            ["SIRET", ""],
            ["Trade register (RCS)", ""],
            ["EU VAT number", ""],
            ["Phone", "+33 6 86 60 35 84"],
            ["Email", "contact@driverline.fr"],
            ["Publication director", "Driver Line"],
          ],
        },
      ],
    },
    {
      title: "Hosting",
      blocks: [
        {
          type: "facts",
          rows: [
            ["Host", "Netlify, Inc."],
            ["Website", "www.netlify.com"],
          ],
        },
      ],
    },
    {
      title: "Intellectual property",
      blocks: [
        {
          type: "p",
          text: "All elements of this website (texts, logo, photographs, layout) are the property of Driver Line or are used with permission. Any reproduction, representation or adaptation, in whole or in part, without prior written consent is prohibited (articles L.335-2 et seq. of the French Intellectual Property Code).",
        },
      ],
    },
    {
      title: "Personal data",
      blocks: [
        {
          type: "p",
          text: "Driver Line is the data controller for the personal data collected on this website. This data is processed in accordance with the General Data Protection Regulation (GDPR) and the French Data Protection Act.",
        },
        { type: "h3", text: "Data collected" },
        {
          type: "p",
          text: "Through the quote form: pickup and dropoff addresses, date and time of the trip, requested vehicle, email address, phone number and, where applicable, any information you add in the message.",
        },
        { type: "h3", text: "Purposes and legal basis" },
        {
          type: "ul",
          items: [
            "Answering your quote request and organising the service: pre-contractual measures and performance of the contract (article 6.1.b GDPR).",
            "Meeting our accounting and tax obligations: legal obligation (article 6.1.c GDPR).",
          ],
        },
        { type: "h3", text: "Recipients" },
        {
          type: "p",
          text: "The data is intended exclusively for Driver Line. It passes through our host (Netlify), acting as a processor. It is never sold or transferred to third parties for commercial purposes.",
        },
        { type: "h3", text: "Transfers outside the European Union" },
        {
          type: "p",
          text: "As our host is based in the United States, some data may be transferred outside the European Union. These transfers are subject to the safeguards provided for by the GDPR.",
        },
        { type: "h3", text: "Retention period" },
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
          text: "You have the following rights over your data:",
        },
        {
          type: "ul",
          items: [
            "Right of access (article 15) and rectification (article 16)",
            "Right to erasure (article 17)",
            "Right to restriction of processing (article 18)",
            "Right to data portability (article 20)",
            "Right to object (article 21)",
            "Right to withdraw your consent at any time (article 7)",
            "Right to set guidelines for the handling of your data after your death",
          ],
        },
        {
          type: "p",
          text: "To exercise these rights, email us at contact@driverline.fr. We reply within one month. If you believe your rights have not been respected, you may lodge a complaint with the CNIL, the French data protection authority (www.cnil.fr).",
        },
      ],
    },
    {
      title: "Cookies and analytics",
      blocks: [
        {
          type: "p",
          text: "This website uses Google Tag Manager, a Google tool that may set analytics cookies. In line with CNIL guidelines, cookies that are not essential to the operation of the website may only be set with your consent.",
        },
        {
          type: "p",
          text: "You can configure your browser at any time to block or delete cookies.",
        },
      ],
    },
    {
      title: "Photo credits",
      blocks: [
        {
          type: "p",
          text: "Aerial view of Toulouse: Caroline Léna Becker, CC BY 3.0 license (creativecommons.org/licenses/by/3.0), via Wikimedia Commons. The other photographs are royalty-free (CC0).",
        },
      ],
    },
  ],
};

export default legal;
