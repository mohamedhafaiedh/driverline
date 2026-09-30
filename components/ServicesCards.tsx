import Image from "next/image";
import Icon from "@/components/Icon";
import type { Messages } from "@/lib/i18n";
import { SECTIONS, SERVICE_IMAGES } from "@/lib/site";

/** Services en 4 cartes illustrées (SERVICES_LAYOUT = "cards") */
export default function ServicesCards({ t }: { t: Messages }) {
  return (
    <ul className="service-cards">
      {t.services.cards.map((card, i) => (
        <li className="service-card" key={card.title} data-reveal>
          <div className="service-card__media">
            <Image
              src={SERVICE_IMAGES[i]}
              alt={card.imageAlt}
              width={1400}
              height={900}
              sizes="(max-width: 1023px) 100vw, 600px"
            />
          </div>
          <div className="service-card__body">
            <span className="service-card__num">0{i + 1}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <ul className="service-card__points">
              {card.points.map((point) => (
                <li key={point}>
                  <Icon name="check" />
                  {point}
                </li>
              ))}
            </ul>
            <a className="service-card__cta" href={`#${SECTIONS.quote}`}>
              {t.services.cta}
              <Icon name="arrowRight" />
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
