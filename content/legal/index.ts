import type { Lang } from "@/lib/seo";
import fr from "./fr";
import en from "./en";
import type { LegalContent } from "./types";

export const LEGAL: Record<Lang, LegalContent> = { fr, en };
