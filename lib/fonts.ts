import { Inter, Instrument_Serif } from "next/font/google";

// Polices auto-hébergées par next/font (aucune requête vers Google côté visiteur)
export const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
