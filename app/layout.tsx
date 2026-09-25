import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Driver Line – Chauffeur privé VTC à Toulouse",
  description:
    "Driver Line, votre chauffeur privé VTC à Toulouse et en Haute-Garonne. Transferts aéroport Blagnac, gares, trajets professionnels et mise à disposition.",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Driver Line – Chauffeur privé VTC à Toulouse",
    description:
      "Driver Line, votre chauffeur privé VTC à Toulouse et en Haute-Garonne.",
    url: `${SITE_URL}/`,
    siteName: "Driver Line",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/Driver-Line-logo-1000-x-200-px-1000-x-150-px.png`,
        width: 1000,
        height: 150,
        alt: "Driver Line",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Google Tag Manager */}
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
        {/* End Google Tag Manager */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="home wp-singular page-template page-template-elementor_header_footer page page-id-69 wp-custom-logo wp-embed-responsive wp-theme-hello-elementor wp-child-theme-hello-theme-child-master translatepress-fr_FR hello-elementor-default elementor-default elementor-template-full-width elementor-kit-11 elementor-page elementor-page-69">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TRWRBQ98"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
