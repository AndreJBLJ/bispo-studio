"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Rolagem suave (Lenis) ligada ao relógio do GSAP, mais as entradas das seções.
 *
 * - [data-reveal]: cada filho direto entra subindo 24px com opacidade, em sequência de 70ms.
 * - [data-print]: o elemento é "impresso" de baixo para cima em camadas (clip-path em degraus),
 *   a mesma ideia do nome no topo, em escala de título.
 */
export function MotionRoot() {
  useEffect(() => {
    const reduce = reducedMotion();
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    if (!reduce) {
      lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: { offset: -72 } });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    // Entradas por IntersectionObserver: dispara com qualquer forma de rolar e não depende de posições
    // calculadas antes do layout assentar. Sem JavaScript, nada fica escondido.
    const ctx = gsap.context(() => {
      if (reduce) return;
      const fold = window.innerHeight * 0.9;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            io.unobserve(e.target);
            const el = e.target as HTMLElement;
            if (el.hasAttribute("data-print")) {
              const layers = Number(el.dataset.print) || 14;
              gsap.to(el, {
                clipPath: "inset(0% -2% -4% -2%)",
                duration: 0.9,
                ease: `steps(${layers})`,
                onComplete: () => gsap.set(el, { clearProps: "clipPath" }),
              });
            } else {
              gsap.to(Array.from(el.children), {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "expo.out",
                stagger: 0.07,
                clearProps: "transform,opacity,visibility",
              });
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((group) => {
        if (group.getBoundingClientRect().top < fold) return; // já visível: não esconde nada
        gsap.set(Array.from(group.children), { autoAlpha: 0, y: 24 });
        io.observe(group);
      });
      gsap.utils.toArray<HTMLElement>("[data-print]").forEach((el) => {
        if (el.getBoundingClientRect().top < fold) return;
        gsap.set(el, { clipPath: "inset(100% -2% -4% -2%)" });
        io.observe(el);
      });
      return () => io.disconnect();
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    // Quando a altura da página muda (fontes, ajuste do nome no topo), recalcula os gatilhos.
    let t = 0;
    let lastH = document.body.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastH) < 2) return;
      lastH = h;
      clearTimeout(t);
      t = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    ro.observe(document.body);

    return () => {
      window.removeEventListener("load", onLoad);
      ro.disconnect();
      clearTimeout(t);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
