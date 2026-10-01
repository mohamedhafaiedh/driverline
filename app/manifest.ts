import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Driver Line – Chauffeur privé à Toulouse",
    short_name: "Driver Line",
    start_url: "/",
    display: "browser",
    background_color: "#0d0e11",
    theme_color: "#0d0e11",
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
