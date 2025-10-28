import type { Metadata } from "next";
import { Poppins, Manrope } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  title: "🎄 Mi Lista de Deseos Navideña",
  description: "Comparte tus deseos navideños con familia y amigos",
  keywords: ["navidad", "deseos", "wishlist", "regalos"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${poppins.variable} ${manrope.variable}`}>
      <body className="bg-emerald-950" style={{
        background: 'radial-gradient(ellipse at top, #064e3b 0%, #022c22 50%, #0a1f1a 100%)',
        minHeight: '100vh'
      }}>
        {children}
      </body>
    </html>
  );
}
