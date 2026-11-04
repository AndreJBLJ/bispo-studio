import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { MotionRoot } from "@/components/shared/Motion";
import { Estudio } from "@/components/estudio/Estudio";

export const metadata: Metadata = {
  title: "Bispo Studio | Sites para quem vende impressão 3D",
};

export default function Page() {
  return (
    <>
      <MotionRoot />
      <Header />
      <Estudio />
    </>
  );
}
