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
    case "facts":
      return (
        <dl className="legal__facts">
          {block.rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value || "—"}</dd>
            </div>
          ))}
        </dl>
      );
  }
}

export default function LegalPage({ lang }: { lang: Lang }) {
  const t = LEGAL[lang];
  return (
    <SimplePage lang={lang} page="mentions-legales">
      <div className="page-hero tone-dark">
        <div className="container">
          <h1 className="display display--lg">{t.title}</h1>
        </div>
      </div>
      <article className="legal container">
        {t.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </section>
        ))}
      </article>
    </SimplePage>
  );
}
