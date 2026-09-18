import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Driver Line – Chauffeur privé VTC à Toulouse",
  description: "Driver Line, votre chauffeur privé VTC à Toulouse et en Haute-Garonne. Transferts aéroport Blagnac, gares, trajets professionnels et mise à disposition.",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Driver Line – Chauffeur privé VTC à Toulouse",
    description: "Driver Line, votre chauffeur privé VTC à Toulouse et en Haute-Garonne.",
    url: "https://driverline.fr",
    siteName: "Driver Line",
    locale: "fr_FR",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="home wp-singular page-template page-template-elementor_header_footer page page-id-69 wp-custom-logo wp-embed-responsive wp-theme-hello-elementor wp-child-theme-hello-theme-child-master translatepress-fr_FR hello-elementor-default elementor-default elementor-template-full-width elementor-kit-11 elementor-page elementor-page-69">
        {children}
      </body>
    </html>
  );
}
