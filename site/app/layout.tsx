import type { Metadata, Viewport } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const display = Libre_Franklin({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
});

const text = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bispo Studio | Sites e lojas para quem vende impressão 3D",
  description:
    "Sites e lojas virtuais para quem vende impressão 3D, feitos pelo André, que também vende peça impressa. Planos a partir de R$ 1.100 e o Precifica 3D para calcular o preço certo.",
  openGraph: {
    title: "Bispo Studio",
    description: "Sites e lojas para quem vende impressão 3D.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#01010d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${text.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca que o JavaScript existe antes da primeira pintura: só então o CSS esconde o que vai entrar animado. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){document.documentElement.classList.add('revealed')},4000);",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
