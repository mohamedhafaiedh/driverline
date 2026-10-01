import { COMPANY, COMPANY_NAME, LEGAL_NAME_WITH_FORM } from "@/lib/site";
import type { LegalBlock, LegalContent } from "./types";

// Mentions obligatoires : loi n° 2004-575 du 21 juin 2004 (LCEN) et RGPD.
// Modèle commun : introduction + 5 rubriques (éditeur, hébergement, propriété intellectuelle, données, cookies).
// Une valeur vide n'est pas affichée ; les champs obligatoires manquants sont signalés au build.
const legal: LegalContent = {
  title: "Mentions légales",
  subtitle: "Informations sur l’éditeur du site, son hébergeur et la protection de vos données personnelles.",
  intro:
    "Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN), nous portons à la connaissance des utilisateurs et visiteurs du site les informations suivantes.",
  sections: [
    {
      id: "editeur",
      icon: "building",
      title: "Éditeur du site",
      blocks: [
        {
          type: "facts",
          rows: [
            ["Dénomination sociale", LEGAL_NAME_WITH_FORM],
            ["Capital social", COMPANY.shareCapital],
            ["Siège social", COMPANY.registeredOffice],
            ["SIREN", COMPANY.siren],
            ["N° de TVA intracommunautaire", COMPANY.vatNumber],
            ["Téléphone", COMPANY.phone],
            ["E-mail", COMPANY.email],
            ["Directeur de la publication", COMPANY.publicationDirector],
          ],
        },
      ],
    },
    {
      id: "hebergement",
      icon: "server",
      title: COMPANY.creator.name.trim() ? "Hébergement et réalisation" : "Hébergement",
      blocks: [
        {
          type: "facts",
          rows: [
            ["Hébergeur", COMPANY.host.name],
            ["Site web", COMPANY.host.website],
            ["Téléphone", COMPANY.host.phone],
          ],
        },
        // Créateur du site : affiché seulement si son nom est renseigné (chaque champ vide est masqué)
        ...(COMPANY.creator.name.trim()
          ? ([
              { type: "h3", text: "Conception et réalisation" },
              {
                type: "facts",
                rows: [
                  ["Réalisation", COMPANY.creator.name],
                  ["Site web", COMPANY.creator.website],
                  ["Téléphone", COMPANY.creator.phone],
                  ["E-mail", COMPANY.creator.email],
                ],
              },
            ] as LegalBlock[])
          : []),
      ],
    },
    {
      id: "propriete",
      icon: "copyright",
      title: "Propriété intellectuelle et responsabilité",
      blocks: [
        {
          type: "p",
          text: `L’ensemble des éléments du site (textes, logo, photographies, mise en page) est la propriété de ${COMPANY_NAME} ou fait l’objet d’une autorisation d’utilisation. Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite (articles L.335-2 et suivants du Code de la propriété intellectuelle).`,
        },
        {
          type: "p",
          text: `Les informations du site sont fournies à titre indicatif et ne constituent pas un engagement contractuel. ${COMPANY_NAME} ne saurait être tenue responsable du contenu des sites vers lesquels il renvoie.`,
        },
        { type: "h3", text: "Crédits photos" },
        {
          type: "ul",
          items: [
            "Vue aérienne de Toulouse : Caroline Léna Becker, licence CC BY 3.0 (creativecommons.org/licenses/by/3.0), via Wikimedia Commons.",
            "Place du Capitole, aéroport, autoroute, Pont Neuf : photographies libres de droits (CC0), via Wikimedia Commons.",
          ],
        },
      ],
    },
    {
      id: "confidentialite",
      icon: "shieldCheck",
      title: "Données personnelles",
      blocks: [
        {
          type: "p",
          text: `${COMPANY_NAME} est responsable du traitement des données personnelles collectées sur ce site. Ces données sont traitées conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.`,
        },
        { type: "h3", text: "Données collectées et finalités" },
        {
          type: "p",
          text: "Via le formulaire de devis : adresses de départ et d’arrivée, date et heure du trajet, véhicule souhaité, adresse e-mail, numéro de téléphone et, le cas échéant, les informations que vous ajoutez dans le message. Elles servent à :",
        },
        {
          type: "ul",
          items: [
            "répondre à votre demande de devis et organiser la prestation : mesures précontractuelles et exécution du contrat (article 6.1.b du RGPD) ;",
            "respecter nos obligations comptables et fiscales : obligation légale (article 6.1.c du RGPD).",
          ],
        },
        { type: "h3", text: "Destinataires et conservation" },
        {
          type: "p",
          text: `Les données sont destinées exclusivement à ${COMPANY_NAME} et à ses prestataires techniques (hébergement, mesure d’audience), qui agissent en qualité de sous-traitants. Certains d’entre eux peuvent traiter des données hors de l’Union européenne ; ces transferts sont encadrés par les garanties prévues par le RGPD. Les données ne sont jamais vendues ni cédées à des tiers.`,
        },
        {
          type: "ul",
          items: [
            "Demandes de devis sans suite : 3 ans à compter du dernier contact.",
            "Données clients : pendant la durée de la relation commerciale, puis selon les durées légales (10 ans pour les pièces comptables).",
          ],
        },
        { type: "h3", text: "Vos droits" },
        {
          type: "p",
          text: `Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, de portabilité et d’opposition, ainsi que du droit de retirer votre consentement à tout moment et de définir des directives sur le sort de vos données après votre décès. Pour les exercer, écrivez-nous à ${COMPANY.email} ; nous répondons dans un délai d’un mois. Vous pouvez aussi introduire une réclamation auprès de la CNIL (www.cnil.fr).`,
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
          text: "Ce site utilise Google Tag Manager et Google Analytics pour mesurer son audience et améliorer son contenu. Ces outils déposent des cookies uniquement si vous les acceptez.",
        },
        {
          type: "p",
          text: "Lors de votre première visite, un bandeau vous permet d’accepter ou de refuser ces cookies. Votre choix est conservé 6 mois et vous pouvez le modifier à tout moment ; les cookies de mesure d’audience ont une durée de vie de 13 mois au maximum. Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies.",
        },
      ],
    },
  ],
};

export default legal;
