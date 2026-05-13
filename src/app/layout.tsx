import type { Metadata, Viewport } from "next";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { festival } from "@/data/festival";
import { CustomCursor } from "@/components/custom-cursor";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["700", "900"],
  style: ["normal", "italic"],
});

const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: `${festival.name} — ${festival.date.label}`,
  description: festival.manifesto,
  openGraph: {
    title: `${festival.name} — ${festival.date.label}`,
    description: festival.manifesto,
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4620A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body className="bg-ink text-bone antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
