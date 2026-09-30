import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import RevealOnScroll from "@/components/RevealOnScroll";
import WhatsAppFab from "@/components/WhatsAppFab";
import { sans, serif } from "@/lib/fonts";
import { LOCALES, type Lang } from "@/lib/seo";
import "@/app/globals.css";

export default function BaseLayout({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={LOCALES[lang].code} className={`${sans.variable} ${serif.variable}`}>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TRWRBQ98');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TRWRBQ98"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <JsonLd lang={lang} />
        {children}
        <WhatsAppFab lang={lang} />
        <RevealOnScroll />
      </body>
    </html>
  );
}
