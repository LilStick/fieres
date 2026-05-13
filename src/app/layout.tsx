import type { Metadata, Viewport } from "next";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { brand } from "@/data/brand";
import { CustomCursor } from "@/components/shared/custom-cursor";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { SmoothScrollProvider } from "@/components/shared/smooth-scroll-provider";
import { FestivalBanner } from "@/components/shared/festival-banner";

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
  metadataBase: new URL(`https://${brand.domain}`),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s — ${brand.name}`,
  },
  description: brand.description,
  openGraph: {
    title: `${brand.name} — podcast queer`,
    description: brand.description,
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
        <SmoothScrollProvider>
          <CustomCursor />
          <FestivalBanner />
          <Navbar />
          <main className="overflow-x-hidden">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
