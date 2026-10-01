import Image from "next/image";
import Icon, { GoogleG, Stars } from "@/components/Icon";
import { FaqJsonLd } from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import ServicesCards from "@/components/ServicesCards";
import ServicesClassic from "@/components/ServicesClassic";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getMessages, type Messages } from "@/lib/i18n";
import type { Lang } from "@/lib/seo";
import {
  EMAIL,
  FLEET,
  HERO_IMAGE,
  HERO_IMAGES,
  ONBOARD_ICONS,
  PHONE_DISPLAY,
  PHONE_HREF,
  SECTIONS,
  SERVICES_LAYOUT,
  WHATSAPP_HREF,
} from "@/lib/site";

const QUOTE_HREF = `#${SECTIONS.quote}`;

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <div className="heading" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display" id={id}>
        {title}
      </h2>
    </div>
  );
}

/** Appel + devis, repris sous les sections clés */
function CtaRow({ t, tone = "light", align = "start" }: { t: Messages; tone?: "light" | "dark"; align?: "start" | "center" }) {
  return (
    <div className={`cta-row cta-row--${align}`} data-reveal>
      <a className={`btn ${tone === "dark" ? "btn--light" : "btn--dark"}`} href={PHONE_HREF}>
        <Icon name="phone" />
        {PHONE_DISPLAY}
      </a>
      <a className={`btn ${tone === "dark" ? "btn--ghost-light" : "btn--outline"}`} href={QUOTE_HREF}>
        {t.common.quote}
        <Icon name="arrowRight" />
      </a>
    </div>
  );
}

export default function HomePage({ lang }: { lang: Lang }) {
  const t = getMessages(lang);

  return (
    <>
      <FaqJsonLd lang={lang} />
      <a className="skip-link" href="#content">
        {t.common.skip}
      </a>

      <SiteHeader lang={lang} page="" />

      <main id="content">
        {/* HERO + FORMULAIRE */}
        <section className="hero tone-dark">
          <Image
            className={`hero__bg hero__bg--${HERO_IMAGE}`}
            src={HERO_IMAGES[HERO_IMAGE].src}
            alt={t.hero.imageAlts[HERO_IMAGE]}
            width={HERO_IMAGES[HERO_IMAGE].width}
            height={HERO_IMAGES[HERO_IMAGE].height}
            sizes="100vw"
            preload
            fetchPriority="high"
          />
          <div className="container hero__inner">
            <div className="hero__copy">
              <p className="rating-chip">
                <GoogleG label={t.common.google} />
                <Stars label={t.reviews.starsLabel} />
                <span>{t.hero.rating}</span>
              </p>
              <h1 className="display display--xl">{t.hero.title}</h1>
              <p className="hero__lead">{t.hero.lead}</p>
              <ul className="hero__perks">
                {t.hero.perks.map((perk) => (
                  <li key={perk}>
                    <Icon name="check" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hero__form" id={SECTIONS.quote}>
              <p className="hero__form-title">{t.hero.formTitle}</p>
              <QuoteForm lang={lang} />
            </div>
          </div>
        </section>

        {/* À PROPOS */}
        <section className="section about" id="a-propos" aria-labelledby="about-title">
          <div className="container about__grid">
            <div className="about__copy">
              <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} id="about-title" />
              <p className="lead" data-reveal>
                {t.about.text}
              </p>
            </div>
            <figure className="photo about__photo" data-reveal>
              <Image src="/images/services-DRL-3.jpg" alt={t.about.imageAlt} width={450} height={300} sizes="(max-width: 900px) 100vw, 450px" />
            </figure>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section tone-dark" id={SECTIONS.services} aria-labelledby="services-title">
          <div className="container">
            <div className="section__head">
              <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} id="services-title" />
            </div>
            {SERVICES_LAYOUT === "cards" ? <ServicesCards t={t} /> : <ServicesClassic t={t} />}
            <CtaRow t={t} tone="dark" align="center" />
          </div>
        </section>

        {/* FLOTTE */}
        <section className="section tone-muted" id={SECTIONS.fleet} aria-labelledby="fleet-title">
          <div className="container">
            <div className="section__head section__head--center">
              <SectionHeading eyebrow={t.fleet.eyebrow} title={t.fleet.title} id="fleet-title" />
            </div>
            <ul className="fleet">
              {FLEET.map((car, i) => {
                const text = t.fleet.items[i];
                return (
                  <li className="car" key={car.image} data-reveal>
                    <div className="car__stage">
                      <Image src={car.image} alt={text.model} width={439} height={340} sizes="(max-width: 900px) 90vw, 600px" />
                    </div>
                    <div className="car__body">
                      <p className="car__category">{text.category}</p>
                      {/* Le modèle exact peut varier selon la disponibilité : « ou équivalent », en plus petit */}
                      <h3 className="car__model">
                        {text.model} <span className="car__equiv">{t.fleet.equivalent}</span>
                      </h3>
                      <ul className="car__specs">
                        <li>
                          <Icon name="users" />
                          {car.pax} {t.fleet.passengers}
                        </li>
                        <li>
                          <Icon name="luggage" />
                          {car.bags} {t.fleet.luggage}
                        </li>
                      </ul>
                      <a className="car__book" href={QUOTE_HREF} data-vehicle={car.vehicle}>
                        {t.fleet.book}
                        <Icon name="arrowRight" />
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
            <CtaRow t={t} align="center" />
          </div>
        </section>

        {/* SERVICES À BORD */}
        <section className="section onboard" id="a-bord" aria-labelledby="onboard-title">
          <div className="container onboard__grid">
            <figure className="photo onboard__photo" data-reveal>
              <Image src="/images/services-DRL-2.jpg" alt={t.onboard.imageAlt} width={450} height={300} sizes="(max-width: 900px) 100vw, 450px" />
            </figure>
            <div className="onboard__copy">
              <SectionHeading eyebrow={t.onboard.eyebrow} title={t.onboard.title} id="onboard-title" />
              <ul className="amenities" data-reveal>
                {t.onboard.items.map((label, i) => (
                  <li key={label}>
                    <span className="amenities__icon">
                      <Icon name={ONBOARD_ICONS[i]} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* AVIS */}
        <section className="section tone-dark" id={SECTIONS.reviews} aria-labelledby="reviews-title">
          <div className="container">
            <div className="section__head section__head--split">
              <SectionHeading eyebrow={t.reviews.eyebrow} title={t.reviews.title} id="reviews-title" />
              <div className="score" data-reveal>
                <span className="score__badge">
                  <GoogleG label={t.common.google} />
                </span>
                <div>
                  <Stars label={t.reviews.starsLabel} />
                  <p>{t.reviews.rating}</p>
                </div>
              </div>
            </div>
            <ul className="reviews">
              {t.reviews.items.map((review) => (
                <li key={review.name} data-reveal>
                  <figure className="review">
                    <div className="review__top">
                      <Stars label={t.reviews.starsLabel} />
                      <span className="review__source">
                        <GoogleG />
                        {t.reviews.source}
                      </span>
                    </div>
                    <blockquote>
                      <p>{review.text}</p>
                    </blockquote>
                    <figcaption>
                      <span className="review__avatar" aria-hidden="true">
                        {review.name.charAt(0)}
                      </span>
                      <span className="review__name">{review.name}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            <CtaRow t={t} tone="dark" align="center" />
          </div>
        </section>

        {/* ZONE DE COUVERTURE */}
        <section className="section tone-muted" id={SECTIONS.zones} aria-labelledby="zones-title">
          <div className="container zones__grid">
            <div className="zones__copy">
              <SectionHeading eyebrow={t.zones.eyebrow} title={t.zones.title} id="zones-title" />
              <div className="zones__text" data-reveal>
                {t.zones.text.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="zones__places" data-reveal>
              <ul className="cities">
                {t.zones.cities.map((city) => (
                  <li key={city}>
                    <Icon name="navigation" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section faq" id={SECTIONS.faq} aria-labelledby="faq-title">
          <div className="container faq__grid">
            <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} id="faq-title" />
            <div className="faq__list" data-reveal>
              {t.faq.items.map((item) => (
                <details className="faq__item" key={item.q}>
                  <summary>
                    {item.q}
                    <Icon name="chevronDown" className="faq__chevron" />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="container">
            <div className="contact__panel tone-dark" data-reveal>
              <div className="contact__intro">
                <p className="eyebrow">{t.contact.eyebrow}</p>
                <h2 className="display" id="contact-title">
                  {t.contact.title}
                </h2>
                <a className="btn btn--light" href={QUOTE_HREF}>
                  {t.contact.quote}
                  <Icon name="arrowRight" />
                </a>
              </div>
              <ul className="contact__list">
                <li>
                  <a href={PHONE_HREF}>
                    <Icon name="phone" />
                    <span className="contact__label">{t.contact.phone}</span>
                    <span className="contact__value">{PHONE_DISPLAY}</span>
                    <Icon name="arrowUpRight" className="contact__arrow" />
                  </a>
                </li>
                <li>
                  <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                    <Icon name="whatsapp" />
                    <span className="contact__label">{t.contact.whatsapp}</span>
                    <span className="contact__value">{PHONE_DISPLAY}</span>
                    <Icon name="arrowUpRight" className="contact__arrow" />
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`}>
                    <Icon name="mail" />
                    <span className="contact__label">{t.contact.email}</span>
                    <span className="contact__value">{EMAIL}</span>
                    <Icon name="arrowUpRight" className="contact__arrow" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} page="" />
    </>
  );
}
