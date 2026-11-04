"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reducedMotion } from "@/components/shared/Motion";
import { MSG_ORCAMENTO, whatsappLink } from "@/lib/content";
import { ArrowIcon } from "@/components/shared/Icons";
import styles from "./Hero.module.css";

const LAYERS = 34;

/**
 * O nome impresso camada por camada: a marca é revelada de baixo para cima por um clip-path
 * que avança uma camada por vez, e cada camada nova é "desenhada" pelo bico (o retângulo mint)
 * indo e voltando, como na impressora.
 */
export function Hero() {
  const markRef = useRef<HTMLDivElement>(null);
  const nozzleRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mark = markRef.current!;
    const nozzle = nozzleRef.current!;
    const lines = lineRefs.current.filter(Boolean) as HTMLSpanElement[];
    let tl: gsap.core.Timeline | null = null;
    let cancelled = false;

    // Cada linha do nome ocupa a largura toda, sem passar da altura que sobra na tela.
    const fit = () => {
      const hero = mark.closest("section")!;
      const cs = getComputedStyle(hero);
      const padT = parseFloat(cs.paddingTop) || 0;
      const padB = parseFloat(cs.paddingBottom) || 0;
      const width = mark.parentElement!.getBoundingClientRect().width;
      const sizes = lines.map((l) => {
        l.style.fontSize = "100px";
        return (width / l.scrollWidth) * 100;
      });
      lines.forEach((l, i) => (l.style.fontSize = `${sizes[i]}px`));
      // Não deixa o nome passar do fim da primeira tela: encolhe as duas linhas juntas se faltar altura.
      let avail: number;
      if (window.innerWidth >= 1024) {
        const gap = parseFloat(getComputedStyle(mark.parentElement!.parentElement!).rowGap) || 24;
        avail = window.innerHeight - padT - padB - introRef.current!.offsetHeight - gap;
      } else {
        const introBottom = introRef.current!.getBoundingClientRect().bottom - hero.getBoundingClientRect().top;
        avail = window.innerHeight - introBottom - padB - (window.innerWidth < 760 ? 220 : 44);
      }
      const k = Math.min(1, Math.max(avail, 120) / mark.offsetHeight);
      if (k < 1) lines.forEach((l, i) => (l.style.fontSize = `${sizes[i] * k}px`));
      // A textura de camada acompanha a camada que o bico imprime (três linhas por camada).
      mark.style.setProperty("--layer", `${mark.clientHeight / LAYERS / 3}px`);
      ScrollTrigger.refresh();
    };

    const run = async () => {
      try {
        await document.fonts.ready;
      } catch {}
      if (cancelled) return;
      fit();
      mark.removeAttribute("data-js-hide");
      introRef.current?.removeAttribute("data-js-hide");

      if (reducedMotion()) {
        gsap.set(nozzle, { autoAlpha: 0 });
        return;
      }

      gsap.from(introRef.current!.children, {
        autoAlpha: 0,
        y: 18,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.08,
        clearProps: "transform",
      });

      const state = { p: 0 };
      const draw = () => {
        const w = mark.clientWidth;
        const h = mark.clientHeight;
        const layerH = h / LAYERS;
        const total = state.p * LAYERS;
        const done = Math.min(Math.floor(total), LAYERS);
        const frac = total - done;
        const top = h - done * layerH; // topo da última camada completa
        const next = top - layerH;
        const ltr = done % 2 === 0;
        const x = ltr ? frac * w : (1 - frac) * w;
        // Camadas prontas + o pedaço da camada atual que o bico já passou.
        const poly =
          done >= LAYERS
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            : ltr
              ? `polygon(0 ${next}px, ${x}px ${next}px, ${x}px ${top}px, ${w}px ${top}px, ${w}px ${h}px, 0 ${h}px)`
              : `polygon(${x}px ${next}px, ${w}px ${next}px, ${w}px ${h}px, 0 ${h}px, 0 ${top}px, ${x}px ${top}px)`;
        mark.style.clipPath = poly;
        nozzle.style.transform = `translate3d(${x}px, ${Math.max(next, 0)}px, 0)`;
      };

      gsap.set(nozzle, { autoAlpha: 1 });
      tl = gsap.timeline({ delay: 0.25 });
      tl.to(state, { p: 1, duration: 3.1, ease: "power1.inOut", onUpdate: draw })
        .to(nozzle, { y: "-=120", x: "+=40", autoAlpha: 0, duration: 0.6, ease: "expo.out" })
        .add(() => mark.style.removeProperty("clip-path"));
      draw();
    };
    run();

    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      tl?.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="titulo">

      <div className={styles.bottom}>
        <div className={styles.markWrap}>
          <h1 id="titulo" className={styles.mark} ref={markRef} data-js-hide>
            <span className={styles.line} ref={(el) => void (lineRefs.current[0] = el)}>
              <span className={styles.ink}>Bispo</span>
            </span>
            <span className={styles.line} ref={(el) => void (lineRefs.current[1] = el)}>
              <span className={styles.ink}>Studi</span>
              <span className={styles.oFrame} aria-hidden="true">
                <img src="/portfolio/torsa-03-aceso-perto.webp" width={900} height={1125} alt="" />
              </span>
              <span className="sr-only">o</span>
            </span>
          </h1>
          <div className={styles.nozzle} ref={nozzleRef} aria-hidden="true">
            <span className={styles.nozzleHead} />
            <span className={styles.nozzleTip} />
          </div>
        </div>

        <figure className={styles.mobilePhoto}>
          <img
            src="/portfolio/tcg-luffy-gear5.webp"
            width={1600}
            height={1600}
            alt="Deck box do Luffy Gear 5 impressa em 3D, vendida na loja Bispo TCG"
          />
        </figure>

        <div className={styles.intro} ref={introRef} data-js-hide>
          <p className={styles.lead}>
            Sites e lojas para quem vende impressão&nbsp;3D. Feitos por quem também vende peça impressa.
          </p>
          <div className={styles.actions}>
            <a className="btn" href={whatsappLink(MSG_ORCAMENTO)} target="_blank" rel="noopener">
              Pedir orçamento no WhatsApp <ArrowIcon className="btn-arrow" />
            </a>
            <a className={styles.textLink} href="#planos">
              Planos a partir de R$&nbsp;1.100
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
