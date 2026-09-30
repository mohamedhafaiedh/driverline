import Icon from "@/components/Icon";
import type { Messages } from "@/lib/i18n";
import { SERVICE_ICONS } from "@/lib/site";

/** Version précédente des services : 6 blocs avec icône (SERVICES_LAYOUT = "classic") */
export default function ServicesClassic({ t }: { t: Messages }) {
  return (
    <ul className="services">
      {t.services.classic.map((item, i) => (
        <li className="service" key={item.title} data-reveal>
          <div className="service__top">
            <span className="service__icon">
              <Icon name={SERVICE_ICONS[i]} />
            </span>
            <span className="service__num">0{i + 1}</span>
          </div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
