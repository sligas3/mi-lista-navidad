import type { Metadata } from "next";
import { Mountains_of_Christmas } from "next/font/google";
import "./globals.css";

const mountainsOfChristmas = Mountains_of_Christmas({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-navidad",
});

export const metadata: Metadata = {
  title: "🎄 Mi Lista de Deseos Navideña",
  description: "Comparte tus deseos navideños con familia y amigos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${mountainsOfChristmas.variable} antialiased`}>{children}</body>
    </html>
  );
}
