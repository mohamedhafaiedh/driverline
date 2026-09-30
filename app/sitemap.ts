import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const PAGES = [
  { path: "", changeFrequency: "weekly", priority: [1.0, 0.9] },
  { path: "mentions-legales/", changeFrequency: "yearly", priority: [0.3, 0.3] },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PAGES.flatMap(({ path, changeFrequency, priority }) => {
    const languages = { fr: `${SITE_URL}/${path}`, en: `${SITE_URL}/en/${path}` };
    return [
      { url: languages.fr, lastModified, changeFrequency, priority: priority[0], alternates: { languages } },
      { url: languages.en, lastModified, changeFrequency, priority: priority[1], alternates: { languages } },
    ];
  });
}
