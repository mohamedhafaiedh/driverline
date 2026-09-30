import { WhatsAppGlyph } from "@/components/Icon";
import { getMessages } from "@/lib/i18n";
import type { Lang } from "@/lib/seo";
import { WHATSAPP_HREF } from "@/lib/site";

export default function WhatsAppFab({ lang }: { lang: Lang }) {
  const label = getMessages(lang).common.whatsapp;
  return (
    <a className="wa-fab" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
      <WhatsAppGlyph />
    </a>
  );
}
