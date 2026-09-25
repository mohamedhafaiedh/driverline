import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/devis-envoye",
        destination: "/merci/",
        permanent: true,
      },
      {
        source: "/en/devis-envoye",
        destination: "/en/merci/",
        permanent: true,
      },
      // Redirection ancienne URL parasite
      {
        source: "/driverline-fr.preview-domain.com/mentions-legales",
        destination: "/mentions-legales/",
        permanent: true,
      },
      {
        source: "/driverline-fr.preview-domain.com/mentions-legales/:path*",
        destination: "/mentions-legales/",
        permanent: true,
      },
      {
        source: "/driverline-fr.preview-domain.com/:path*",
        destination: "/",
        permanent: true,
      },
      // Anciennes URLs WordPress
      {
        source: "/hello-world/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/category/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/author/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/tag/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/feed/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/comments/feed/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-login.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
