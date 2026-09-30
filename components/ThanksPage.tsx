import Icon from "@/components/Icon";
import SimplePage from "@/components/SimplePage";
import { getMessages } from "@/lib/i18n";
import { pagePath, type Lang } from "@/lib/seo";

export default function ThanksPage({ lang }: { lang: Lang }) {
  const { thanks, common } = getMessages(lang);
  return (
    <SimplePage lang={lang} page="merci">
      <section className="thanks tone-dark">
        <div className="container thanks__inner">
          <span className="thanks__badge" aria-hidden="true">
            <Icon name="check" />
          </span>
          <h1 className="display display--lg">
            {thanks.title}
            <br />
            <em>{thanks.text}</em>
          </h1>
          <a className="btn btn--light" href={pagePath("", lang)}>
            {common.backHome}
            <Icon name="arrowRight" />
          </a>
        </div>
      </section>
    </SimplePage>
  );
}
