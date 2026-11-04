import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const caps = Anton({ subsets: ["latin"], weight: "400", variable: "--font-caps", display: "swap" });
const serif = Bodoni_Moda({ subsets: ["latin"], style: ["italic"], weight: ["400", "500"], variable: "--font-serif", display: "swap" });
const sans = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://bispo-studio.vercel.app"),
  title: "Bispo Studio | Sites para quem imprime e vende peças em 3D",
  description:
    "Sites e lojas virtuais para quem vende impressão 3D, feitos pelo André, que também vende peça impressa. Planos a partir de R$ 1.100 e o Precifica 3D para calcular o preço certo.",
  openGraph: {
    title: "Bispo Studio",
    description: "Sites para quem imprime e vende peças em 3D.",
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
    <html lang="pt-BR" className={`${caps.variable} ${serif.variable} ${sans.variable}`} suppressHydrationWarning>
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
