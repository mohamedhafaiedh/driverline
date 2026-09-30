import type { LegalContent } from "./types";

// Mentions obligatoires : loi n° 2004-575 du 21 juin 2004 (LCEN) et RGPD.
const legal: LegalContent = {
  title: "Mentions légales",
  sections: [
    {
      title: "Éditeur du site",
      blocks: [
        {
          type: "facts",
          rows: [
            ["Nom commercial", "Driver Line"],
            ["Forme juridique", ""],
            ["Capital social", ""],
            ["Siège social", ""],
            ["SIRET", ""],
            ["RCS", ""],
            ["N° de TVA intracommunautaire", ""],
            ["Téléphone", "+33 6 86 60 35 84"],
            ["E-mail", "contact@driverline.fr"],
            ["Directeur de la publication", "Driver Line"],
          ],
        },
      ],
    },
    {
      title: "Hébergement",
      blocks: [
        {
          type: "facts",
          rows: [
            ["Hébergeur", "Netlify, Inc."],
            ["Site web", "www.netlify.com"],
          ],
        },
      ],
    },
    {
      title: "Propriété intellectuelle",
      blocks: [
        {
          type: "p",
          text: "L’ensemble des éléments du site (textes, logo, photographies, mise en page) est la propriété de Driver Line ou fait l’objet d’une autorisation d’utilisation. Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite (articles L.335-2 et suivants du Code de la propriété intellectuelle).",
        },
      ],
    },
    {
      title: "Données personnelles",
      blocks: [
        {
          type: "p",
          text: "Driver Line est responsable du traitement des données personnelles collectées sur ce site. Ces données sont traitées conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.",
        },
        { type: "h3", text: "Données collectées" },
        {
          type: "p",
          text: "Via le formulaire de devis : adresses de départ et d’arrivée, date et heure du trajet, véhicule souhaité, adresse e-mail, numéro de téléphone et, le cas échéant, les informations que vous ajoutez dans le message.",
        },
        { type: "h3", text: "Finalités et base légale" },
        {
          type: "ul",
          items: [
            "Répondre à votre demande de devis et organiser la prestation : mesures précontractuelles et exécution du contrat (article 6.1.b du RGPD).",
            "Respecter nos obligations comptables et fiscales : obligation légale (article 6.1.c du RGPD).",
          ],
        },
        { type: "h3", text: "Destinataires" },
        {
          type: "p",
          text: "Les données sont destinées exclusivement à Driver Line. Elles transitent par notre hébergeur (Netlify), qui agit en qualité de sous-traitant. Elles ne sont jamais vendues ni cédées à des tiers à des fins commerciales.",
        },
        { type: "h3", text: "Transferts hors de l’Union européenne" },
        {
          type: "p",
          text: "Notre hébergeur étant établi aux États-Unis, certaines données peuvent être transférées hors de l’Union européenne. Ces transferts sont encadrés par les garanties prévues par le RGPD.",
        },
        { type: "h3", text: "Durée de conservation" },
        {
          type: "ul",
          items: [
            "Demandes de devis sans suite : 3 ans à compter du dernier contact.",
            "Données clients : pendant la durée de la relation commerciale, puis selon les durées légales de conservation (10 ans pour les pièces comptables).",
          ],
        },
        { type: "h3", text: "Vos droits" },
        {
          type: "p",
          text: "Vous disposez des droits suivants sur vos données :",
        },
        {
          type: "ul",
          items: [
            "Droit d’accès (article 15) et de rectification (article 16)",
            "Droit à l’effacement (article 17)",
            "Droit à la limitation du traitement (article 18)",
            "Droit à la portabilité (article 20)",
            "Droit d’opposition (article 21)",
            "Droit de retirer votre consentement à tout moment (article 7)",
            "Droit de définir des directives relatives au sort de vos données après votre décès",
          ],
        },
        {
          type: "p",
          text: "Pour exercer ces droits, écrivez-nous à contact@driverline.fr. Nous répondons dans un délai d’un mois. Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL (www.cnil.fr).",
        },
      ],
    },
    {
      title: "Cookies et mesure d’audience",
      blocks: [
        {
          type: "p",
          text: "Ce site utilise Google Tag Manager, un outil de Google qui peut déposer des cookies de mesure d’audience. Conformément aux recommandations de la CNIL, les cookies non indispensables au fonctionnement du site ne doivent être déposés qu’avec votre consentement.",
        },
        {
          type: "p",
          text: "Vous pouvez à tout moment configurer votre navigateur pour bloquer ou supprimer les cookies.",
        },
      ],
    },
    {
      title: "Crédits photos",
      blocks: [
        {
          type: "p",
          text: "Vue aérienne de Toulouse : Caroline Léna Becker, licence CC BY 3.0 (creativecommons.org/licenses/by/3.0), via Wikimedia Commons. Les autres photographies sont libres de droits (CC0).",
        },
      ],
    },
  ],
};

export default legal;
