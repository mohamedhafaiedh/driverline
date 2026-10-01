import Icon from "@/components/Icon";
import SimplePage from "@/components/SimplePage";
import { LEGAL } from "@/content/legal";
import type { LegalBlock } from "@/content/legal/types";
import type { Lang } from "@/lib/seo";

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "facts": {
      // On ne publie que les informations renseignées
      const rows = block.rows.filter(([, value]) => value.trim() !== "");
      if (!rows.length) return null;
      return (
        <dl className="legal__facts">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      );
    }
  }
}

/* Modèle commun des mentions légales : introduction LCEN, puis une rubrique par thème,
   chacune précédée de son icône (pastille), le texte aligné sous le titre. */
export default function LegalPage({ lang }: { lang: Lang }) {
  const t = LEGAL[lang];
  return (
    <SimplePage lang={lang} page="mentions-legales">
      <div className="page-hero tone-dark">
        <div className="container">
          <h1 className="display display--lg">{t.title}</h1>
          <p className="page-hero__subtitle">{t.subtitle}</p>
        </div>
      </div>
      <article className="legal container">
        <p className="legal__intro">{t.intro}</p>
        {t.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <div className="legal__head">
              <span className="legal__icon" aria-hidden="true">
                <Icon name={section.icon} />
              </span>
              <h2>{section.title}</h2>
            </div>
            <div className="legal__body">
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </section>
        ))}
      </article>
    </SimplePage>
  );
}
