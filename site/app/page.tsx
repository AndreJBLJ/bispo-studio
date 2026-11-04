import { Header } from "@/components/shared/Header";
import { MotionRoot } from "@/components/shared/Motion";
import { Hero } from "@/components/camadas/Hero";
import { Work } from "@/components/camadas/Work";
import { Pieces } from "@/components/camadas/Pieces";
import { About } from "@/components/camadas/About";
import { Pricing } from "@/components/camadas/Pricing";
import { Precifica } from "@/components/camadas/Precifica";
import { Faq } from "@/components/camadas/Faq";
import { Close } from "@/components/camadas/Close";

export default function Page() {
  return (
    <>
      <MotionRoot />
      <Header />
      <main id="conteudo">
        <div id="topo" />
        <Hero />
        <Work />
        <Pieces />
        <About />
        <Pricing />
        <Precifica />
        <Faq />
      </main>
      <Close other={{ href: "/estudio", label: "Ver a versão Padrão de estúdio" }} />
    </>
  );
}
