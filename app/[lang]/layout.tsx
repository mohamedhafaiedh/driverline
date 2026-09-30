import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import BaseLayout from "@/components/BaseLayout";
import { LANGS, SITE_ICONS, SITE_URL, isLang } from "@/lib/seo";

// Une version par langue générée au build ; une langue inconnue renvoie la 404
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: SITE_ICONS,
};

export const viewport: Viewport = { themeColor: "#0d0e11" };

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <BaseLayout lang={lang}>{children}</BaseLayout>;
}
