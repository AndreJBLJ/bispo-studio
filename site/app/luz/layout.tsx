import type { Metadata } from "next";
import { Anton, Archivo, Bodoni_Moda } from "next/font/google";

const caps = Anton({ subsets: ["latin"], weight: "400", variable: "--font-caps", display: "swap" });
const serif = Bodoni_Moda({ subsets: ["latin"], style: ["italic"], weight: ["400", "500"], variable: "--font-serif", display: "swap" });
const sans = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Bispo Studio | Sites para quem imprime e vende peças em 3D",
};

export default function LuzLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${caps.variable} ${serif.variable} ${sans.variable}`}>{children}</div>;
}
