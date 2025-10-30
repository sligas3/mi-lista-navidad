import type { Metadata } from "next";
import { Poppins, Manrope } from "next/font/google";
import "./globals.css";
import { ChristmasCountdown } from "@/components/ui/ChristmasCountdown";

export const dynamic = 'force-dynamic'

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-poppins",
  display: "swap",
  adjustFontFallback: true,
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Mi Lista de Deseos Navideña",
  description: "Comparte tus deseos navideños con familia y amigos",
  keywords: ["navidad", "deseos", "wishlist", "regalos"],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${poppins.variable} ${manrope.variable}`} style={{ WebkitFontSmoothing: 'antialiased' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="bg-emerald-950" style={{
        background: 'radial-gradient(ellipse at top, #064e3b 0%, #022c22 50%, #0a1f1a 100%)',
        minHeight: '100vh'
      }}>
        <ChristmasCountdown />
        {children}
      </body>
    </html>
  );
}
