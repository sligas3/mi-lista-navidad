import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi Lista de Deseos Navideña 🎄 | Comparte con tu familia",
  description: "Crea y comparte tu lista de deseos navideños con familia y amigos. Agrega regalos con links, prioriza deseos y marca cumplidos. Simple, festivo y colaborativo.",
  keywords: ["navidad", "deseos", "wishlist", "regalos", "familia", "lista navideña", "christmas wishlist"],
  authors: [{ name: "Mi Lista Navideña" }],
  openGraph: {
    title: "Mi Lista de Deseos Navideña 🎄",
    description: "Crea y comparte tu lista de deseos navideños con familia y amigos. Simple, festivo y colaborativo.",
    type: "website",
    locale: "es_ES",
    siteName: "Mi Lista de Deseos Navideña",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mi Lista de Deseos Navideña 🎄",
    description: "Comparte tus deseos navideños con familia y amigos",
  },
  themeColor: "#064e3b",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Mi Lista de Deseos Navideña",
            description: "Crea y comparte tu lista de deseos navideños con familia y amigos",
            applicationCategory: "LifestyleApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
